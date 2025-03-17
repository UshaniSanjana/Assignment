import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentCard = ({ student }) => {
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${student._id}`);
      window.location.reload();
      alert("Student deleted successfully");
    } catch (error) {
      alert("Failed to delete student");
    }
  };
  return (
    <div className="d-flex justify-content-center">
      <div className="card bg-success text-white" style={{ width: "18rem" }}>
        <img
          src={student.image}
          className="card-img-top"
          alt={student.name}
          style={{
            objectFit: "cover",
          }}
        />
        <div className="card-body">
          <h5 className="card-title fw-bold text-center">{student.name}</h5>
          <p className="card-text">Student ID: {student._id}</p>
          <p className="card-text">Age: {student.age}</p>
          <p className="card-text">Status: {student.status}</p>
        </div>
        <div className="d-flex justify-content-center gap-3">
          <button
            type="submit"
            className="btn btn-secondary"
            onClick={() => navigate(`/edit/${student._id}`)}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
