import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getDoctors, deleteDoctor, addDoctor } from "../api/api";
import axios from "axios"; // ✅ ADDED

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [email, setEmail] = useState(""); 
  const [search, setSearch] = useState(""); // ✅ ADDED

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");

    if (!isLoggedIn) {
      navigate("/");
      return;
    }

    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const res = await getDoctors();
      setDoctors(res.data);
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  // ➕ Add doctor
  const handleAddDoctor = async () => {
    if (!name || !specialization || !experience || !email) {
      setMessage("⚠️ All fields required");
      return;
    }

    try {
      await addDoctor({
        name,
        specialization,
        experience: parseInt(experience),
        email, // ✅ ADDED
      });

      setMessage("✅ Doctor added successfully");

      setName("");
      setSpecialization("");
      setExperience("");
      setEmail(""); // ✅ ADDED

      fetchDoctors();
    } catch (error) {
  console.log("🔥 BACKEND ERROR:", error.response?.data); // ✅ ADD THIS
  setMessage("❌ Error adding doctor");
}
  };

  // ❌ Delete doctor
  const handleDelete = async (id) => {
    try {
      await deleteDoctor(id);
      setMessage("🗑️ Doctor deleted");
      fetchDoctors();
    } catch (error) {
      console.error(error);
      setMessage("❌ Error deleting doctor");
    }
  };

  // ✅ ACTIVATE / DEACTIVATE FUNCTION (ADDED)
  const toggleDoctor = async (id, isActive) => {
    try {
      if (isActive) {
        await axios.patch(`http://127.0.0.1:8000/doctors/${id}/deactivate`);
      } else {
        await axios.patch(`http://127.0.0.1:8000/doctors/${id}/activate`);
      }

      fetchDoctors();
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ FILTER SEARCH (ADDED)
  const filteredDoctors = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase()) ||
    doc.specialization.toLowerCase().includes(search.toLowerCase()) ||
    (doc.email || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h2>👨‍⚕️ Doctors</h2>

      {/* ✅ SEARCH BAR */}
      <input
        placeholder="🔍 Search by name, specialization or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "1px solid #ccc"
        }}
      />

      {message && (
        <p style={{ color: message.includes("❌") ? "red" : "green" }}>
          {message}
        </p>
      )}

      {/* ➕ Add Doctor Form */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br /><br />

        <input
          placeholder="Specialization"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
        /><br /><br />

        <input
          placeholder="Experience"
          type="number"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        /><br /><br />

        {/* ✅ EMAIL INPUT */}
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br /><br />

        <button onClick={handleAddDoctor}>
          ➕ Add Doctor
        </button>
      </div>

      {/* 🔄 Loading */}
      {loading ? (
        <p>Loading doctors...</p>
      ) : filteredDoctors.length === 0 ? (
        <p>No doctors available</p>
      ) : (
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                width: "250px",
                borderRadius: "10px",
                boxShadow: "0px 2px 5px rgba(0,0,0,0.1)"
              }}
            >
              <h3 style={{ color: "blue" }}>{doc.name}</h3>

              <p>🩺 {doc.specialization}</p>
              <p>⏳ {doc.experience} years</p>

              {/* ✅ EMAIL DISPLAY */}
              <p>📧 {doc.email}</p>

              {/* ✅ STATUS */}
              <p>
                Status:{" "}
                <span style={{ color: doc.is_active ? "green" : "red" }}>
                  {doc.is_active ? "✅ Active" : "❌ Inactive"}
                </span>
              </p>

              {/* ✅ ACTIVATE / DEACTIVATE */}
              <button
                onClick={() => toggleDoctor(doc.id, doc.is_active)}
                style={{
                  backgroundColor: "orange",
                  marginRight: "10px",
                  border: "none",
                  padding: "5px 10px",
                  cursor: "pointer",
                  borderRadius: "4px"
                }}
              >
                {doc.is_active ? "Deactivate" : "Activate"}
              </button>

              <button
                onClick={() => handleDelete(doc.id)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  cursor: "pointer",
                  borderRadius: "4px"
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Doctors;