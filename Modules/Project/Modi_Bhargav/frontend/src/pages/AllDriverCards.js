import React, { useState, useEffect, useContext } from "react";
import AdminNavbar from "../components/AdminNavbar";
import DriverService from "../Services/DriverService";
import { olaContext } from "../Context/Context";

const AllDriverCards = (props) => {
  const [Drivers, setDriver] = useState([]);
  const [Data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(3);

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

  const handleEdit = (id) => {
    props.history.push(`/EditData/${id}`);
  };

  const handleDelete = (id) => {
    DriverService.deleteDriverById(id).then((res) => {
      let sortData = Drivers.filter((d) => d.registrationNumber !== id);
      setDriver(sortData);
    });
  };

  return (
    <div>
      <AdminNavbar />
      <div className="container card-page" style={{ marginTop: "120px" }}>
        <div class="row mt-5 justify-content-center">
          {Data.length === 0 ? (
            <h1 className="text-center mt-4 text-danger">Driver Not Found</h1>
          ) : (
            <>
              <h3 className="text-capitalize text-center text-dark bg-info">
                All Drivers Details
              </h3>
              {currentItems.map((data, index) => (
                <div
                  className="m-3 col-12 col-sm-6 col-md-4"
                  style={{ width: "22rem" }}
                  key={index}
                >
                  <div
                    className="card-body bg-dark mb-0"
                    style={{ border: "5px solid red" }}
                  >
                    <div className="m-2 text-center">
                      <img
                        src={data.Img}
                        className="img-fluid rounded-circle mb-2"
                        width="80"
                      />
                    </div>
                    <div className="text-center text-info h1">Driver Info</div>
                    <ul className="list-group list-group-flush text-dark">
                      <li className="list-group-item border border-info">
                        Full Name : {data.driverName}
                      </li>
                      <li className="list-group-item border border-info">
                        Email : {data.Email}
                      </li>
                      <li className="list-group-item border border-info">
                        phoneNumber : {data.phoneNumber}
                      </li>
                      <li className="list-group-item border border-info">
                        gender : {data.Gender}
                      </li>
                      <li className="list-group-item border border-info">
                        licenseNumber : {data.licenseNumber}
                      </li>
                      <li className="list-group-item border border-info">
                        carNumber : {data.carNumber}
                      </li>
                      <li className="list-group-item border border-info">
                        carType : {data.carType}
                      </li>
                      <li className="list-group-item border border-info">
                        carModel : {data.carModel}
                      </li>
                      <li className="list-group-item border border-info">
                        Location : {data.Source}
                      </li>
                    </ul>
                    <div className="card-footer bg-primary">
                      <button
                        type="button"
                        class="btn btn-danger my-3 ml-2"
                        onClick={() => handleDelete(data.registrationNumber)}
                        style={{ marginRight: "30px" }}
                      >
                        Delete Data
                      </button>
                      <button
                        type="button"
                        class="btn btn-success my-3 ml-2"
                        onClick={() => handleEdit(data.registrationNumber)}
                      >
                        Edit Data
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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

export default AllDriverCards;
