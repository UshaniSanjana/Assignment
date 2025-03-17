import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentCard from "../components/StudentCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/students");
        setStudents(response.data.data);
      } catch (error) {
        console.log("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="bg-success min-vh-100">
      <nav className="navbar">
        <div className="container-fluid">
          <a className="navbar-brand text-white">Dashboard</a>

          <button
            className="btn btn-outline-light"
            onClick={() => navigate("/add")}
          >
            Add
          </button>
        </div>
      </nav>

      <div>
        <div className="container mt-5">
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            {students.map((student) => (
              <div key={student._id}>
                <StudentCard student={student} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
