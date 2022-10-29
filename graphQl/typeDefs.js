const { gql } = require("apollo-server");
module.exports = gql`
  type Student {
    surname: String!
    otherNames: String!
    schoolFees: Int!
    balance: Int!
    studentClass: String!
    DOB: String!
    stateOfOrigin: String!
    LGA: String!
    gender: String!
    guardianName: String!
    guardianPhone: String!
    permAddress: String!
    paymentHistory: [Payment]
    cleared: Boolean!
    admissionNumber: String!
  }
  type ExStudent {
    surname: String!
    otherNames: String!
    schoolFees: Int!
    balance: Int!
    studentClass: String!
    DOB: String!
    stateOfOrigin: String!
    LGA: String!
    gender: String!
    guardianName: String!
    guardianPhone: String!
    permAddress: String!
    paymentHistory: [Payment]
    admissionNumber: String!
    yearOfWithdrawal: String
  }
  type Payment {
    date: String!
    term: String!
    academicSession: String!
    amount: Int!
  }
  input RegisterInput {
    surname: String!
    otherNames: String!
    schoolFees: Int!
    studentClass: String!
    DOB: String!
    stateOfOrigin: String!
    LGA: String!
    gender: String!
    guardianName: String!
    guardianPhone: String!
    permAddress: String!
    admissionNumber: String!
  }
  type Admin {
    username: String!
    password: String!
    token: String!
  }
  input EditInput {
    surname: String
    otherNames: String
    schoolFees: String
    studentClass: String
    DOB: String
    stateOfOrigin: String
    LGA: String
    gender: String
    guardianName: String
    guardianPhone: String
    permAddress: String
    admissionNumber: String!
  }
  input PaymentInput {
    otherNames: String!
    term: String!
    academicSession: String!
    amount: Int!
  }
  input StudentsDetails {
    oldClass: String!
    newClass: String!
  }
  input DemoteStudentsDetails {
    admissionNumber: String!
    newClass: String!
  }
  input SchoolfeesDetails {
    amount: Int!
    studentClass: String!
  }
  type Mutation {
    registerStudent(registerInput: RegisterInput): Student!
    editStudent(editInput: EditInput): Student!
    promoteStudents(studentsDetails: StudentsDetails!): String!
    demoteStudent(demoteStudentsDetails: DemoteStudentsDetails!): String!
    withdrawStudent(admissionNumber: String!): String!
    editPayment(paymentInput: PaymentInput!): Student!
    setSchoolfee(schoolfeesDetails: SchoolfeesDetails): String!
    adminLogin(username: String!, password: String!): Admin!
  }
  type Query {
    getStudents: [Student]!
    getExStudents: [ExStudent]!
    getStudent(otherNames: String!): Student
    getStudentByNumber(admissionNumber: String!): Student
    getExStudent(otherNames: String!): ExStudent
    getClassOfStudents(classNumber: ID!): [Student]
  }
`;
