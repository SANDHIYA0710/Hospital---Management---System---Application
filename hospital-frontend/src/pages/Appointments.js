import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  getAppointments,
  addAppointment,
  getDoctors,
  getPatients,
  cancelAppointment  
} from "../api/api";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  const [doctorId, setDoctorId] = useState("");
  const [patientId, setPatientId] = useState("");

  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [date, setDate] = useState("");

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (!isLoggedIn) {
      navigate("/");
      return;
    }

    fetchAll();
  }, []);

  const fetchAll = async () => {
    const appt = await getAppointments();
    const doc = await getDoctors();
    const pat = await getPatients();

    setAppointments(appt.data);
    setDoctors(doc.data);
    setPatients(pat.data);
  };

  // ✅ ADDED HERE (OUTSIDE handleAdd)
  const handleCancel = async (id) => {
    try {
      await cancelAppointment(id);
      setMessage("❌ Appointment cancelled");
      fetchAll();
    } catch (error) {
      console.log(error.response?.data);
      setMessage("❌ Error cancelling");
    }
  };

  const handleAdd = async () => {
    if (!doctorId || !patientId || !date) {
      alert("Select doctor, patient and date");
      return;
    }

    try {
      const selectedDoctor = doctors.find(d => d.id == doctorId);
      const selectedPatient = patients.find(p => p.id == patientId);

      await addAppointment({
        doctor_name: selectedDoctor.name,
        patient_name: selectedPatient.name,
        date: date
      });

      setMessage("✅ Appointment created");

      fetchAll();
    } catch (error) {
      console.log(error.response?.data);
      setMessage("❌ Error creating appointment");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
      <h2>📅 Appointments</h2>

      {message && <p style={{ color: "green" }}>{message}</p>}

      {/* 🔽 Doctor Dropdown */}
      <select onChange={(e) => setDoctorId(e.target.value)}>
        <option>Select Doctor</option>
        {doctors.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>

      <br /><br />

      {/* 🔽 Patient Dropdown */}
      <select onChange={(e) => setPatientId(e.target.value)}>
        <option>Select Patient</option>
        {patients.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <br /><br />

      {/* ✅ DATE INPUT */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <br /><br />

      <button onClick={handleAdd}>Create Appointment</button>

      <hr />

      {/* 📋 Appointment List */}
      {appointments.map((a) => (
        <div key={a.id}>
          <p>Doctor: {a.doctor_name}</p>
          <p>Patient: {a.patient_name}</p>
          <p>Date: {a.date}</p>

          {/* ✅ ADDED CANCEL BUTTON */}
          <button
            onClick={() => handleCancel(a.id)}
            style={{
              backgroundColor: "red",
              color: "white",
              border: "none",
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Cancel
          </button>
        </div>
      ))}
    </div>
  );
}

export default Appointments;