import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="http://sununtdev.com">
        <img src="/image/Alumni-rm2.png" width="100" height="50" className="d-inline-block align-top" alt="" loading="lazy"/>
      </a>
      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="http://sununtdev.com">หน้าแรก</a>
          </li>
          <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="http://sununtdev.com" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            เพิ่มเติม
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <a className="dropdown-item" href="http://sununtdev.com">-</a>
            <a className="dropdown-item" href="http://sununtdev.com">-</a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="http://sununtdev.com">-</a>
          </div>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
            <a href="http://sununtdev.com/cpepsru/" className="btn btn-secondary active" role="button" aria-pressed="true">เว็บไซต์หลัก</a>
            </li>
          </ul>
        </form>
      </div>
    </nav>
  );
}