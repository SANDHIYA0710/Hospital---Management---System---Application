import React from "react";

function Navbar() {
  return (
    <>
      {/* TOP BAR */}
      <div className="top-bar">
        <span>📞 Call: 223 556 7890</span>
        <span>✉️ demo@gmail.com</span>
        <span>📍 Location</span>
      </div>

      {/* MAIN NAV */}
      <div className="navbar">
        <h2>MEDWIN</h2>

        <div className="nav-links">
          <a href="#">HOME</a>
          <a href="#">ABOUT</a>
          <a href="#">TREATMENT</a>
          <a href="#">DOCTORS</a>
          <a href="#">BLOG</a>
          <a href="#">CONTACT</a>
        </div>
      </div>
    </>
  );
}

export default Navbar;