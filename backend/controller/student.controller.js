import mongoose from "mongoose";
import Student from "../models/student.model.js";

export const addStudent = async (req, res) => {
  try {
    const { name, age, status } = req.body;
    const image = req.file?.path;

    if (!name || !image || !age || !status) {
      return res.status(400).json({ message: "Provide all the fields" });
    }

    const newStudent = new Student({ name, image, age, status });
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

export const getStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    return res.status(500).json({ message: "error", error: error.message });
  }
};
