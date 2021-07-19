import React, { useState, useEffect, useContext } from "react";
import AdminNavbar from "../components/AdminNavbar";
import DriverService from "../Services/DriverService";

const EnquiryList = () => {
  const [enquiry, setEnquiry] = useState([]);

  useEffect(() => {
    DriverService.getAllEnquiry().then((res) => {
      setEnquiry(res.data);
    });
  }, []);

  const handleDelete = (id) => {
    DriverService.deleteEnquiry(id).then((res) => {
      let sortData = enquiry.filter((d) => d.phoneNumber !== id);
      setEnquiry(sortData);
    });
  };

  return (
    <div>
      <AdminNavbar />
      <div className="container" style={{ marginTop: "100px" }}>
        <h2 className="text-center text-white">ALL Driver List</h2>
        <div className="row">
          <table
            className="table table-hover"
            style={{ border: "3px solid black" }}
          >
            <thead className="table-dark">
              <tr>
                <th className="text-center"> Full Name</th>
                <th className="text-center"> PhoneNumber</th>
                <th className="text-center"> City</th>
                <th className="text-center"> Delete</th>
              </tr>
            </thead>
            <tbody>
              {enquiry.map((data) => (
                <tr
                  className="table-light"
                  style={{ border: "2px solid black" }}
                  key={data.phoneNumber}
                >
                  <td className="t1 text-center"> {data.driverName} </td>
                  <td className="t1 text-center">{data.phoneNumber}</td>
                  <td className="t1 text-center">{data.City}</td>
                  <td className="t1 text-center">
                    <button
                      type="button"
                      class="btn btn-danger"
                      onClick={() => handleDelete(data.phoneNumber)}
                      style={{ marginRight: "30px" }}
                    >
                      Delete Data
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default EnquiryList;
