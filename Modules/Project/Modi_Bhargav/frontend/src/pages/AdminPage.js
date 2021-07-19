import React, { useState, useEffect, useContext } from "react";
import AdminNavbar from "../components/AdminNavbar";
import DriverService from "../Services/DriverService";
import { olaContext } from "../Context/Context";

const AdminPage = () => {
  const [Drivers, setDriver] = useState([]);
  const [Data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(10);

  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  useEffect(() => {
    DriverService.getAllDriver().then((res) => {
      setDriver(res.data);
      setData(res.data);
    });
  }, []);

  const pages = [];
  for (let i = 1; i <= Math.ceil(Data.length / itemPerPage); i++) {
    pages.push(i);
  }
  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={
            currentPage === number
              ? "page-item page-link bg-primary text-white"
              : "page-item page-link "
          }
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const indexofLastItem = currentPage * itemPerPage;
  const indexofFirstItem = indexofLastItem - itemPerPage;
  const currentItems = Data.slice(indexofFirstItem, indexofLastItem);

  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  const handlePrevBtn = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const { phoneNumber } = useContext(olaContext);
  console.log(phoneNumber);
  const number = phoneNumber;

  useEffect(() => {
    if (number.length > 0) {
      const searchData = Drivers.filter((item) => {
        let dataSearch = number;
        let tempNumber = item.phoneNumber.toString().slice(0, number.length);
        if (dataSearch === tempNumber) {
          return item;
        }
      });
      setData(searchData);
    } else {
      setData(Drivers);
    }
  }, [phoneNumber]);

  return (
    <div>
      <AdminNavbar />
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="row">
          {Data.length === 0 ? (
            <h1 className="text-center mt-4 text-danger">Driver Not Found</h1>
          ) : (
            <>
              <h2 className="text-center text-primary">ALL Driver List</h2>
              <table
                className="table p-4 my-2 text-center table-hover"
                style={{ border: "3px solid black" }}
              >
                <thead className="table-dark">
                  <tr>
                    <th> Number</th>
                    <th> Full Name</th>
                    <th> Car Type</th>
                    <th> Email</th>
                    <th> PhoneNumber</th>
                  </tr>
                </thead>
                <tbody className="bg-light">
                  {currentItems.map((user, index) => {
                    return (
                      <tr
                        className="table-light"
                        style={{ border: "2px solid black" }}
                        key={index}
                      >
                        <td>{(currentPage - 1) * itemPerPage + index + 1}</td>
                        <td className="t1">{user.driverName}</td>
                        <td className="t1">{user.carType}</td>
                        <td className="t1">{user.Email}</td>
                        <td className="t1">{user.phoneNumber}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {pages.length > 1 ? (
                <ul
                  className="pagination pagination-lg justify-content-center"
                  style={{ cursor: "pointer" }}
                >
                  {currentPage === 1 ? (
                    <li className="page-item page-link text-muted"> Prev</li>
                  ) : (
                    <li className="page-item page-link" onClick={handlePrevBtn}>
                      Prev
                    </li>
                  )}
                  {renderPageNumbers}
                  {currentPage === pages.length ? (
                    <li className="page-item  page-link text-muted"> Next</li>
                  ) : (
                    <li className="page-item page-link" onClick={handleNextBtn}>
                      Next
                    </li>
                  )}
                </ul>
              ) : (
                ""
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default AdminPage;
