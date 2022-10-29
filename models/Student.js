const { model, Schema } = require("mongoose");

const studentSchema = new Schema({
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
});
module.exports = model("Student", studentSchema);
