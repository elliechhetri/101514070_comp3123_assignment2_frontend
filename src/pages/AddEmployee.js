import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function AddEmployee() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    salary: ""
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    setError("");
    if (!form.firstName || !form.lastName || !form.email || !form.department || !form.position) {
      setError("First name, last name, email, department, position are required");
      return;
    }

    const fd = new FormData();
    Object.keys(form).forEach((key) => fd.append(key, form[key]));
    if (image) fd.append("profileImage", image);

    await api.post("/employees", fd);
    nav("/employees");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Add Employee</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {Object.keys(form).map((key) => (
        <div key={key}>
          <input
            placeholder={key}
            value={form[key]}
            onChange={e => handleChange(key, e.target.value)}
          /><br/><br/>
        </div>
      ))}
      <input type="file" onChange={e => setImage(e.target.files[0])} /><br/><br/>
      <button onClick={handleSubmit}>Save</button>
      <button style={{ marginLeft: "10px" }} onClick={() => nav("/employees")}>
        Cancel
      </button>
    </div>
  );
}
