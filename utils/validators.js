module.exports.validateRegisterStudent = (
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
) => {
  const errors = {};
  if (surname.trim() === "") {
    errors.surName = "Surname must not be empty";
  }
  if (otherNames.trim() === "") {
    errors.otherNames = "otherNames must not be empty";
  }
  if (schoolFees == null) {
    errors.schoolFees = "schoolFees must not be empty";
  }
  if (DOB.trim() === "") {
    errors.DOB = "DOB must not be empty";
  }
  if (studentClass.trim() === "") {
    errors.studentClass = "studentClass must not be empty";
  }
  if (stateOfOrigin.trim() === "") {
    errors.stateOfOrigin = "students must have a state of origin";
  }
  if (LGA.trim() === "") {
    errors.LGA = "students must have a Local government of origin";
  }
  if (gender.trim() === "") {
    errors.gender = "gender must not be empty";
  }
  if (guardianName.trim() === "") {
    errors.guardianName = "guardianName must not be empty";
  }
  if (guardianPhone === null) {
    errors.guardianPhone = "guardianPhone must not be empty";
  }
  if (permAddress.trim() === "") {
    errors.permAddress = "permAddress must not be empty";
  }
  if (admissionNumber.trim() === "") {
    errors.admissionNumber = "admissionNumber must not be empty";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validatePaymentInput = (
  otherNames,
  term,
  academicSession,
  amount
) => {
  const errors = {};
  if (otherNames.trim() === "") {
    errors.otherNames = "Student must have a Name";
  }
  if (term.trim() === "") {
    errors.term = "academic term cannot be empty";
  }
  if (academicSession.trim() === "") {
    errors.date = "academic Session cannot be empty";
  }
  if (amount == null) {
    errors.date = "amount paid cannot be empty";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateAdminLogin = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Admin username cannot be empty";
  }
  if (password.trim() === "") {
    errors.password = "Admin password cannot be empty";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
module.exports.validateStudentsDetails = (oldClass, newClass) => {
  const errors = {};
  if (oldClass.trim() === "") {
    errors.oldClass = "oldClass cannot be empty";
  }
  if (newClass.trim() === "") {
    errors.newClass = "newClass cannot be empty";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
module.exports.validateDemoteStudentsDetails = (admissionNumber, newClass) => {
  const errors = {};
  if (admissionNumber.trim() === "") {
    errors.admissionNumber = "admissionNumber cannot be empty";
  }
  if (newClass.trim() === "") {
    errors.newClass = "newClass cannot be empty";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
module.exports.validateSetSchoolfeesDetails = (amount, studentClass) => {
  const errors = {};
  if (amount === 0 || null) {
    errors.amount = "school fees amount cannot be Zero";
  }
  if (studentClass === "") {
    errors.studentClass = "Students Class cannot be empty";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
