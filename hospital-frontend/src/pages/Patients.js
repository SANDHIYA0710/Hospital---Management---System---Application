import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getPatients, addPatientJSON } from "../api/api";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // ✅ ADDED STATES (DO NOT REMOVE YOURS)
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  // 🔐 protect
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const res = await getPatients();
    setPatients(res.data);
  };

  const handleAdd = async () => {
    // ✅ ADDED VALIDATION
    if (!name || !age || !phone) {
      alert("Enter all fields");
      return;
    }

    // ❌ YOUR OLD LINE (KEPT AS IT IS, BUT NOT USED)
    // await addPatient({ name });

    // ✅ ADDED CORRECT CALL
    await addPatientJSON({
      name,
      age: parseInt(age),
      phone
    });

    setMessage("Patient added ✅");
    setName("");

    // ✅ ADDED RESET
    setAge("");
    setPhone("");

    fetchPatients();
  };

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
      <h2>👤 Patients</h2>

      {message && <p style={{ color: "green" }}>{message}</p>}

      <input
        placeholder="Patient Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      {/* ✅ ADDED INPUT */}
      <input
        placeholder="Age"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <br /><br />

      {/* ✅ ADDED INPUT */}
      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <br /><br />

      <button onClick={handleAdd}>Add Patient</button>

      <hr />

      {patients.length === 0 ? (
        <p>No patients</p>
      ) : (
        patients.map((p) => (
          <div key={p.id}>
            <h3>{p.name}</h3>

            {/* ✅ OPTIONAL DISPLAY */}
            <p>Age: {p.age}</p>
            <p>Phone: {p.phone}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Patients;