import React from "react";
import StudentForm from "./StudentForm";
import { useNavigate, useParams } from "react-router-dom";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <StudentForm currenStudentId={id} onSubmit={() => navigate("/")} />
    </div>
  );
};

export default EditStudent;
