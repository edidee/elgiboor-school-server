const { model, Schema } = require("mongoose");

const exStudentSchema = new Schema({
  surname: String,
  otherNames: String,
  admissionNumber: String,
  studentClass: String,
  gender: String,
  schoolFees: Number,
  balance: Number,
  DOB: String,
  stateOfOrigin: String,
  LGA: String,
  guardianName: String,
  guardianPhone: String,
  permAddress: String,
  paymentHistory: [
    {
      date: String,
      term: String,
      academicSession: String,
      amount: Number,
    },
  ],
  cleared: Boolean,
  yearOfWithdrawal: String,
});
module.exports = model("ExStudent", exStudentSchema);
