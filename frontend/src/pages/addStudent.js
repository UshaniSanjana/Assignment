import React from "react";
import { useNavigate } from "react-router-dom";
import StudentForm from "../components/StudentForm";

const AddStudent = () => {
  const navigate = useNavigate();
  return (
    <div>
      <StudentForm onSubmit={() => navigate("/")} />
    </div>
  );
};

export default AddStudent;
