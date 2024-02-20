import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  grade: {
    type: Number,
    required: true
  },
  gpa: {
    type: Number,
    required: true
  },
  cool: {
    type: Boolean,
    required: true
  }
});

// Check if the model exists before compiling it
const Student = mongoose.models.Student || mongoose.model('Student', StudentSchema);

export default Student;
