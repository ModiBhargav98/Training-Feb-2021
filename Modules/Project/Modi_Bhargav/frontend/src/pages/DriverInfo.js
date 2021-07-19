import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import moment from "moment";
import DriverService from "../Services/DriverService";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const DriverInfo = (props) => {
  const [driverInfo, setDriverData] = useState([]);
  const [driverHistory, setDriverHistory] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [bookRide, setBookRide] = useState([]);
  const [accept, setAccept] = useState({
    Status: "Accept",
  });
  const [reject, setReject] = useState({
    Status: "Reject",
  });

  const Number = localStorage.getItem("phoneNumber1");

  useEffect(() => {
    const Id = props.match.params.id;
    DriverService.GetDriverById(Id).then((res) => {
      setDriverData(res.data[0]);
    });
    const times = setInterval(() => {
      DriverService.GetDriverByTrips(Number)
        .then((res) => {
          if (res.data && res.data.length > 0) {
            res.data.sort((a, b) => {
              return moment(b.dateTime).diff(a.dateTime);
            });
            if (res.data[0].Status === "Pending") {
              setIsOpen(true);
              setBookRide(res.data[0]);
            }
          }
          setDriverHistory(res.data);
          // console.log(res.data);
        })
        .catch((err) => {
          setDriverHistory([]);
        });
    }, 100);
  }, []);

  let sum = 0;
  const sums = (a) => {
    return (sum += a);
  };

  const handleAccept = (id) => {
    DriverService.verifyDriverByTrips(id, accept).then((res) => {
      console.log(res.data);
      setIsOpen(false);
      props.history.push(
        `/DriverOtp/Verify/${res.data.registrationNumber}/${res.data._id}`
      );
    });
  };

  const handleReject = (id) => {
    DriverService.verifyDriverByTrips(id, reject).then((res) => {
      setIsOpen(false);
    });
  };
  return (
    <div>
      <div className="text-center bg-dark h4 text-white py-3 fixed-top">
        User Personal Info
      </div>
      <div className="container" style={{ marginTop: "100px" }}>
        <div class="card col-md-3 border-dark text-center bg-light m-auto mt-5">
          <div class="card-body">
            <img
              src={driverInfo.Img}
              class="img-fluid rounded-circle w-50 mb-3"
            />
            <h3>{driverInfo.driverName}</h3>
            <h5 class="text-muted">{driverInfo.Email}</h5>
            <h5 class="text-muted">{driverInfo.phoneNumber}</h5>
            <div class="d-flex flex-row justify-content-center">
              <div class="p-4">
                <a href="#">
                  <i class="fa fa-facebook"></i>
                </a>
              </div>
              <div class="p-4">
                <a href="#">
                  <i class="fa fa-twitter"></i>
                </a>
              </div>
              <div class="p-4">
                <a href="#">
                  <i class="fa fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          {driverHistory.map((driver) => {
            if (driver.Reason == null && driver.Status === "Accepted") {
              sums(driver.fareAmount);
            }
          })}
        </div>
        <div className="mt-5">
          <div className="text-center bg-info h4 text-dark py-3">
            Your Total Trip History
          </div>
          <div className="text-center bg-dark h4 text-white mt-2 py-1">
            Your Total Succesful Trip Amount : {sum}
          </div>
          {driverHistory.length != 0 ? (
            <>
              {driverHistory.map((driver) => {
                return (
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
                          {moment(driver.dateTime).format(
                            "MMM DD, YYYY hh:mm a"
                          )}
                        </h4>
                      )}
                      <h4>Source : {driver.Source}</h4>
                      {driver.Package != null ? (
                        <h4>Package : {driver.Package}</h4>
                      ) : (
                        <h4>Destination : {driver.Destination}</h4>
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
                );
              })}
            </>
          ) : (
            <div className="text-center h4 text-dark mt-2 py-1">
              Your Trip History Details is Not avilables
            </div>
          )}
        </div>
      </div>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={false}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="text-primary border-bottom">
            <h4>
              bookingTime :
              {moment(bookRide.dateTime).format("MMM DD, YYYY hh:mm a")}
            </h4>
            {bookRide.ScheduleDepart != null ? (
              <h4>
                ScheduleDepart :
                {moment(bookRide.ScheduleDepart).format("MMM DD, YYYY hh:mm a")}
              </h4>
            ) : null}
            {bookRide.dateTimeReturn != null ? (
              <h4>
                ScheduleReturn :
                {moment(bookRide.dateTimeReturn).format("MMM DD, YYYY hh:mm a")}
              </h4>
            ) : null}
            {bookRide.ScheduleDate != null ? (
              <h4>
                ScheduleDate :
                {moment(bookRide.ScheduleDate).format("MMM DD, YYYY hh:mm a")}
              </h4>
            ) : null}
            <h4>Source : {bookRide.Source}</h4>
            {bookRide.Package != null ? (
              <h4>Package : {bookRide.Package}</h4>
            ) : (
              <h4>Destination : {bookRide.Destination}</h4>
            )}
            <h4>CustomerContact : {bookRide.customerNumber}</h4>
            <h4>FareAmount : &#8377;{bookRide.fareAmount}</h4>
          </div>
          <div className="text-center text-dark h4 border-bottom mb-3 py-3">
            Are You Sure Confirm your Ride
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-success text-dark ml-5"
              onClick={(e) => handleAccept(bookRide._id)}
            >
              Accept
            </button>
            <button
              type="submit"
              className="btn btn-danger text-dark float-right mr-5"
              onClick={(e) => handleReject(bookRide._id)}
            >
              Reject
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};
export default DriverInfo;
