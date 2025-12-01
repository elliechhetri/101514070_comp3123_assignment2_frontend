import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Employees() {
  const nav = useNavigate();
  const [list, setList] = useState([]);
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");

  const loadEmployees = async () => {
    try {
      let url = "/employees";
      const params = [];
      if (department) params.push("department=" + encodeURIComponent(department));
      if (position) params.push("position=" + encodeURIComponent(position));
      if (params.length > 0) {
        url += "?" + params.join("&");
      }
      const res = await api.get(url);
      setList(res.data);
    } catch (e) {
      alert("Failed to load employees. Please login again.");
      nav("/login");
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this employee?")) return;
    await api.delete("/employees/" + id);
    loadEmployees();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    nav("/login");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Employee List</h2>

      <div style={{ marginBottom: "15px" }}>
        <button onClick={() => nav("/employees/new")}>Add Employee</button>
        <button style={{ marginLeft: "10px" }} onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <input
          placeholder="Department"
          value={department}
          onChange={e => setDepartment(e.target.value)}
        />
        <input
          placeholder="Position"
          value={position}
          onChange={e => setPosition(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
        <button style={{ marginLeft: "10px" }} onClick={loadEmployees}>
          Search
        </button>
      </div>

      <table
        border="1"
        cellPadding="8"
        style={{ marginTop: "10px", width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map(e => (
            <tr key={e._id}>
              <td>{e.firstName} {e.lastName}</td>
              <td>{e.email}</td>
              <td>{e.department}</td>
              <td>{e.position}</td>
              <td>{e.salary}</td>
              <td>
                <button onClick={() => nav("/employees/" + e._id)}>Edit</button>
                <button
                  style={{ marginLeft: "5px" }}
                  onClick={() => handleDelete(e._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {list.length === 0 && (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No employees
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
