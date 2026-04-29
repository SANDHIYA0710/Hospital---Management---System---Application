// components/AppointmentForm.js
import React from "react";

function AppointmentForm() {
  return (
    <div className="appointment-card">
      <h2>
        BOOK <span>APPOINTMENT</span>
      </h2>

      <div className="form-grid">
        <input placeholder="Patient Name" />
        <select>
          <option>Doctor Name</option>
        </select>
        <select>
          <option>Department</option>
        </select>

        <input placeholder="Phone Number" />
        <select>
          <option>Department</option>
        </select>
        <input type="date" />

        <button>Submit</button>
      </div>
    </div>
  );
}

export default AppointmentForm;