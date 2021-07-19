import React, { useContext } from "react";
import { Link } from "react-router-dom";
import OlaLogo from "../OlacabAsset/images/olacab-logo.svg";
import { olaContext } from "../Context/Context";

const AdminNavbar = () => {
  const { phoneNumber, setNumber } = useContext(olaContext);
  const handleChange = (e) => {
    setNumber(e.target.value);
  };

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top navbar-light"
      style={{ backgroundColor: "#e3f2fd" }}
    >
      <Link to="/AdminPage/" className="navbar-brand ml-5">
        <img src={OlaLogo} alt="Ola cabs Img" />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item py-1 mt-1 ml-5">
            <Link className="nav-link text-dark h4" to="/AddDetails/">
              AddDetails
            </Link>
          </li>
          <li className="nav-item py-1 mt-1 ml-5">
            <Link className="nav-link text-dark h4" to="/DriversData/">
              AllDrivers
            </Link>
          </li>
          <li className="nav-item py-1 mt-1 ml-5">
            <Link className="nav-link text-dark h4" to="/Triphistory/">
              TripHistory
            </Link>
          </li>
          <li className="nav-item py-1 mt-1 ml-5">
            <Link className="nav-link text-dark h4" to="/EnquiryData/">
              EnquiryList
            </Link>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2 border border-dark"
            type="number"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
            placeholder="Search Here"
          />
        </form>
      </div>
    </nav>
  );
};
export default AdminNavbar;
