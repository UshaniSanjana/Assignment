import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentForm = ({ currenStudentId, onSubmit }) => {
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    image: null,
    age: "",
    status: "",
  });

  useEffect(() => {
    const fetchStudentDetails = async () => {
      if (currenStudentId) {
        try {
          const { data } = await axios.get(
            `http://localhost:5000/api/students/${currenStudentId}`
          );
          setStudent({
            name: data.name,
            image: data.image,
            age: data.age,
            status: data.status,
          });
        } catch (error) {
          console.error("Error fetching student details", error);
        }
      }
    };
    fetchStudentDetails();
  }, [currenStudentId]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setStudent({ ...student, image: files[0] }); // Set new image file
    } else {
      setStudent({ ...student, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", student.name);
    formData.append("age", student.age);
    formData.append("status", student.status);

    if (student.image instanceof File) {
      formData.append("image", student.image);
    } else if (typeof student.image === "string") {
      formData.append("imageUrl", student.image);
    }

    try {
      if (currenStudentId) {
        await axios.put(
          `http://localhost:5000/api/students/${currenStudentId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        alert("edited successfully");
      } else {
        await axios.post("http://localhost:5000/api/students", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Student added successfully");
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting student details", error);
      alert("Error submitting student details");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-success">
      <div
        className="p-4 border rounded shadow bg-white"
        style={{ width: "400px" }}
      >
        <form onSubmit={handleSubmit}>
          <p className="text-center fw-bold fs-5">
            {currenStudentId ? "Edit Student" : "Add Student"}
          </p>

          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              name="name"
              type="text"
              className="form-control"
              value={student.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Image</label>
            <input
              name="image"
              type="file"
              className="form-control"
              onChange={handleChange}
            />
            {student.image && !(student.image instanceof File) && (
              <img
                src={student.image}
                alt="Current"
                width="100"
                className="mt-2"
              />
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Age</label>
            <input
              name="age"
              type="number"
              className="form-control"
              min="0"
              max="120"
              value={student.age}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Status</label>
            <input
              name="status"
              type="text"
              className="form-control"
              value={student.status}
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-flex justify-content-center mt-3">
            <button type="submit" className="btn btn-success">
              {currenStudentId ? "Update Student" : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
