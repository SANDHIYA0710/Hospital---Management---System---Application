import React from "react";
import Navbar from "../components/Navbar";
import "../styles.css";

function Home() {
  return (
    <div className="home-container">

      {/* HERO SECTION */}
      <div className="hero">

        {/* 🔥 NAVBAR INSIDE HERO */}
        <Navbar />

        <div className="hero-content">
          <h1>WE CARE OF YOU</h1>
          <p>
            When looking at its layout, the point of using Lorem Ipsum is that it
            has a more-or-less normal distribution.
          </p>
          <button>READ MORE</button>
        </div>
      </div>

      {/* 🔥 APPOINTMENT CARD */}
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

    </div>
  );
}

export default Home;