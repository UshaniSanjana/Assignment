import mongoose from "mongoose";
import Student from "../models/student.model.js";

export const addStudent = async (req, res) => {
  try {
    const student = req.body;

    if (!student.name || !student.image || !student.age || !student.status) {
      return res.status(400).json({ message: "Provide all the fields" });
    }

    const newStudent = new Student(student);
    await newStudent.save();
    res.status(201).json({ message: "student added successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error", error: error.message });
  }
};

export const getStudentDetails = async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(201).json({ data: students });
  } catch (error) {
    return res.status(500).json({ message: "error", error: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    await Student.findByIdAndDelete(id);

    res.status(200).json({ message: "Student details deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "error", error: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Student not found" });
    }

    const updatedStudent = await Student.findByIdAndUpdate(id, student, {
      new: true,
    });

    res.status(200).json({
      message: "Student details updated successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "error", error: error.message });
  }
};
