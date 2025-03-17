import "./App.css";
import { Routes, Route } from "react-router-dom"; // No need to import BrowserRouter again
import Login from "./pages/loginPage";
import SignUp from "./pages/signUpPage";
import Dashboard from "./pages/dashboard";
import EditStudent from "./components/EditStudent";
import AddStudent from "./pages/addStudent";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add" element={<AddStudent />} />
      <Route path="/edit/:id" element={<EditStudent />} />
    </Routes>
  );
}

export default App;
