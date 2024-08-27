// Header.js
import React from 'react';
import './Header.css';

function Header() {
  return (
    <div className="header">
      <button className="back-button">←</button>
      <div className="contact-info">
        <div className="contact-name">Contact Name</div>
        <div className="contact-status">Last seen today at 3:00 PM</div>
      </div>
      <div className="header-icons">
        <button>📹</button>
        <button>📞</button>
        <button>⋮</button>
      </div>
    </div>
  );
}

export default Header;
