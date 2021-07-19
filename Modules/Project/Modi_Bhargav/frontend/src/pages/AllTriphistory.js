import React, { useState, useEffect, useContext } from "react";
import AdminNavbar from "../components/AdminNavbar";
import DriverService from "../Services/DriverService";
import { olaContext } from "../Context/Context";
import moment from "moment";

const AllTriphistory = () => {
  const [History, setHistory] = useState([]);

  const [Data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(2);

  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  useEffect(() => {
    DriverService.GetDriverHistory().then((res) => {
      setHistory(res.data);
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
  const number = phoneNumber;

  useEffect(() => {
    if (number.length > 0) {
      const searchData = History.filter((item) => {
        let dataSearch = number;
        let tempNumber = item.customerNumber.toString().slice(0, number.length);
        if (dataSearch === tempNumber) {
          return item;
        }
      });
      setData(searchData);
    } else {
      setData(History);
    }
  }, [number]);

  return (
    <>
      <AdminNavbar />
      <div className="container" style={{ marginTop: "120px" }}>
        {Data.length === 0 ? (
          <h1 className="text-center mt-4 text-danger">Trip Not Founded</h1>
        ) : (
          <>
            {currentItems.map((driver) => (
              <div className="row border border-dark bg-light">
                <div className="col-md-4 mt-4">
                  <img
                    src={driver.Img}
                    alt="driver Photo"
                    className="mx-5"
                    width="200"
                    height="200"
                  />
                </div>
                <div className="col-md-6 text-primary">
                  {driver.ScheduleDate != null ? (
                    <h4>
                      DateTime :
                      {moment(driver.ScheduleDate).format(
                        "MMM DD, YYYY hh:mm a"
                      )}
                    </h4>
                  ) : (
                    <h4>
                      DateTime :
                      {moment(driver.dateTime).format("MMM DD, YYYY hh:mm a")}
                    </h4>
                  )}
                  <h4>Source : {driver.Source}</h4>
                  {driver.Package == null ? (
                    <h4 className="text-primary">
                      Destination : {driver.Destination}
                    </h4>
                  ) : (
                    <h4 className="text-primary">Package : {driver.Package}</h4>
                  )}
                  <h4>DriverEmail : {driver.driverEmail}</h4>
                  <h4>DriverContact : {driver.driverNumber}</h4>
                  <h4>CustomerContact : {driver.customerNumber}</h4>
                  <h4>FareAmount : {driver.fareAmount}</h4>
                </div>
                <div className="col-md-2 text-center py-5">
                  {driver.Reason == null && driver.Status == "Accepted" ? (
                    <h4 className="text-success mr-5 my-5">Succesfully</h4>
                  ) : (
                    <h4 className="text-danger mr-5 my-5">Cancelled</h4>
                  )}
                </div>
              </div>
            ))}
            {pages.length > 1 ? (
              <ul
                className="pagination pagination-lg justify-content-center mt-3"
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
    </>
  );
};
export default AllTriphistory;
