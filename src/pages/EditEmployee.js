import { useState, useEffect } from "react";
import api from "../api";
import { useParams, useNavigate } from "react-router-dom";

export default function EditEmployee() {
  const { id } = useParams();
  const nav = useNavigate();
  const [form, setForm] = useState(null);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const load = async () => {
    const res = await api.get("/employees/" + id);
    setForm({
      firstName: res.data.firstName || "",
      lastName: res.data.lastName || "",
      email: res.data.email || "",
      phone: res.data.phone || "",
      department: res.data.department || "",
      position: res.data.position || "",
      salary: res.data.salary || ""
    });
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    setError("");
    if (!form.firstName || !form.lastName || !form.email || !form.department || !form.position) {
      setError("Required fields missing");
      return;
    }
    const fd = new FormData();
    Object.keys(form).forEach((key) => fd.append(key, form[key]));
    if (image) fd.append("profileImage", image);

    await api.put("/employees/" + id, fd);
    nav("/employees");
  };

  if (!form) return <div style={{ padding: "30px" }}>Loading...</div>;

  return (
    <div style={{ padding: "30px" }}>
      <h2>Edit Employee</h2>
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
      <button onClick={handleSubmit}>Update</button>
      <button style={{ marginLeft: "10px" }} onClick={() => nav("/employees")}>
        Cancel
      </button>
    </div>
  );
}
