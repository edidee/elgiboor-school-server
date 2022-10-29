const { UserInputError } = require("apollo-server-express");
const { json } = require("node:stream/consumers");
const ExStudent = require("../../models/ExStudent");
const Student = require("../../models/Student");
const {
  validateRegisterStudent,
  validatePaymentInput,
  validateStudentsDetails,
  validateDemoteStudentsDetails,
  validateSetSchoolfeesDetails,
} = require("../../utils/validators");

module.exports = {
  Query: {
    async getStudents() {
      const students = await Student.find();
      if (students) {
        return students;
      }
      return new UserInputError("No Students found");
    },
    async getExStudents() {
      const exStudents = await ExStudent.find();
      if (exStudents) {
        return exStudents;
      }
      return new UserInputError("No ExStudents found");
    },
    async getStudent(_, { otherNames }) {
      const student = await Student.findOne({ otherNames });
      if (student) {
        return student;
      }
      return new UserInputError("Student not found");
    },
    async getStudentByNumber(_, { admissionNumber }) {
      const student = await Student.findOne({ admissionNumber });
      if (student) {
        return student;
      }
      return new UserInputError("Student not found");
    },
    async getExStudent(_, { otherNames }) {
      const exStudent = await ExStudent.findOne({ otherNames });
      if (exStudent) {
        return exStudent;
      }
      return new UserInputError("ExStudent not found");
    },
    async getClassOfStudents(_, { classNumber }) {
      const students = await Student.find({ classNumber });
      if (students == 0) {
        return new UserInputError("Students class not found");
      }
      const studentClass = students.filter(
        (student) => student.studentClass === classNumber
      );
      if (studentClass == 0) {
        return new UserInputError("No students found");
      }
      return studentClass;
    },
  },
  Mutation: {
    async registerStudent(
      _,
      {
        registerInput: {
          surname,
          otherNames,
          schoolFees,
          DOB,
          studentClass,
          stateOfOrigin,
          LGA,
          gender,
          guardianName,
          guardianPhone,
          permAddress,
          admissionNumber,
        },
      }
    ) {
      // Validate student credentials
      const { errors, valid } = validateRegisterStudent(
        surname,
        otherNames,
        schoolFees,
        DOB,
        studentClass,
        stateOfOrigin,
        LGA,
        gender,
        guardianName,
        guardianPhone,
        permAddress,
        admissionNumber
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const student = await Student.findOne({ admissionNumber });
      if (student) {
        throw new UserInputError(
          "The above Student already exist in the database",
          {
            errors: {
              admissionNumber: " admission number already assigned",
            },
          }
        );
      }
      if (!DOB) {
        throw new UserInputError("Students must have a date of Birth");
      }
      const newStudent = new Student({
        surname,
        otherNames,
        schoolFees,
        balance: schoolFees,
        studentClass,
        DOB,
        stateOfOrigin,
        LGA,
        gender,
        guardianName,
        guardianPhone,
        permAddress,
        admissionNumber,
        paymentHistory: [],
        cleared: false,
      });
      await newStudent.save();
      return newStudent;
    },
    async withdrawStudent(_, { admissionNumber }) {
      try {
        const student = await Student.findOne({ admissionNumber });
        if (student) {
          let {
            surname,
            otherNames,
            schoolFees,
            balance,
            studentClass,
            DOB,
            stateOfOrigin,
            LGA,
            gender,
            guardianName,
            guardianPhone,
            permAddress,
            admissionNumber,
            paymentHistory,
          } = student;
          const newExStudent = new ExStudent({
            surname,
            otherNames,
            schoolFees,
            balance,
            studentClass,
            DOB,
            stateOfOrigin,
            LGA,
            gender,
            guardianName,
            guardianPhone,
            permAddress,
            admissionNumber,
            paymentHistory,
            yearOfWithdrawal: new Date().getFullYear(),
          });
          await newExStudent.save();
          await student.delete();
          return "Student withdrawn successfully";
        }
      } catch (err) {
        throw new Error(
          "Student not found, please check the student's admission number and retry"
        );
      }
    },
    async editPayment(
      _,
      { paymentInput: { otherNames, term, academicSession, amount } }
    ) {
      try {
        const { errors, valid } = validatePaymentInput(
          otherNames,
          term,
          academicSession,
          amount
        );
        if (!valid) {
          throw new UserInputError("Errors", { errors });
        }
        const student = await Student.findOne({ otherNames });
        if (student) {
          student.paymentHistory.push({
            date: new Date().toLocaleDateString(),
            term,
            academicSession,
            amount,
          });
          student.balance = student.balance - amount;
          student.cleared = student.balance === 0 ? true : false;
        }
        await student.save();
        return student;
      } catch (error) {
        throw new UserInputError("Errors", { error });
      }
    },
    async editStudent(
      _,
      {
        editInput: {
          surname,
          otherNames,
          schoolFees,
          studentClass,
          DOB,
          stateOfOrigin,
          LGA,
          gender,
          guardianName,
          guardianPhone,
          permAddress,
          admissionNumber,
        },
      }
    ) {
      try {
        const student = await Student.findOne({ admissionNumber });
        if (student) {
          if (surname) {
            student.surname = surname;
          }
          if (otherNames) {
            student.otherNames = otherNames;
          }
          if (schoolFees) {
            student.schoolFees = schoolFees;
          }
          if (studentClass) {
            student.studentClass = studentClass;
          }
          if (DOB) {
            student.DOB = DOB;
          }
          if (stateOfOrigin) {
            student.stateOfOrigin = stateOfOrigin;
          }
          if (LGA) {
            student.LGA = LGA;
          }
          if (gender) {
            student.gender = gender;
          }
          if (guardianName) {
            student.guardianName = guardianName;
          }
          if (guardianPhone) {
            student.guardianPhone = guardianPhone;
          }
          if (permAddress) {
            student.permAddress = permAddress;
          }
        } else {
          throw new UserInputError("No student found");
        }
        await student.save();
        return student;
      } catch (error) {
        throw new UserInputError(error);
      }
    },
    async setSchoolfee(_, { schoolfeesDetails: { studentClass, amount } }) {
      try {
        const { errors, valid } = validateSetSchoolfeesDetails(
          studentClass,
          amount
        );
        if (!valid) {
          throw new UserInputError("Errors", { errors });
        }

        const students = await Student.find({ studentClass });
        if (students == 0) {
          return "Student class does not exist";
        } else {
          students.map(
            (student) => (
              (student.schoolFees = amount),
              (student.balance = student.balance + amount),
              (student.cleared = false)
            )
          );
          await Student.bulkSave(students);
          return "School fees updated Successfully!";
        }
      } catch (error) {
        throw new UserInputError(error);
      }
    },
    async promoteStudents(_, { studentsDetails: { oldClass, newClass } }) {
      try {
        const { errors, valid } = validateStudentsDetails(oldClass, newClass);
        if (!valid) {
          throw new UserInputError("Errors", { errors });
        }
        const students = await Student.find({ oldClass });
        if (students == 0) {
          return "Student class does not exist";
        }
        const studentClass = students.filter(
          (student) => student.studentClass === oldClass
        );
        if (studentClass == 0) {
          return new UserInputError("No students found");
        } else {
          studentClass.map((student) => (student.studentClass = newClass));
          await Student.bulkSave(students);
          return "Students promoted Successfully!";
        }
      } catch (error) {
        throw new UserInputError(error);
      }
    },
    async demoteStudent(
      _,
      { demoteStudentsDetails: { admissionNumber, newClass } }
    ) {
      const { errors, valid } = validateDemoteStudentsDetails(
        admissionNumber,
        newClass
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const student = await Student.findOne({ admissionNumber });
      if (!student) {
        throw new UserInputError("Student not found");
      }
      if (student.studentClass == newClass) {
        return "Student already demoted";
      } else {
        student.studentClass = newClass;
        await student.save();
        return "Student demoted successfully";
      }
    },
  },
};
