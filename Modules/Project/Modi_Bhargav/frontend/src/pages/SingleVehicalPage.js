import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import MiniCar from "../OlacabAsset/images/small_mini.png";
import Auto from "../OlacabAsset/images/small_auto.png";
import Bike from "../OlacabAsset/images/small_bike.png";
import Sedan from "../OlacabAsset/images/prime_sedan.png";
import Suv from "../OlacabAsset/images/prime_suv.png";
import Map from "../OlacabAsset/images/map.png";
import cashImg from "../OlacabAsset/images/cashimg.jpg";
import couponImg from "../OlacabAsset/images/coupon.png";
import CustomerService from "../Services/CustomerService";
import { olaContext } from "../Context/Context";
import moment from "moment";

const SingleVehicalPage = (props) => {
  const message = localStorage.getItem("message");

  const token1 = localStorage.getItem("token");

  const {
    trip,
    setCancelTrip,
    setRentalTrip,
    setOutstationTrip,
    distance,
    setDriverdetail,
    setVerifyotp,
  } = useContext(olaContext);

  const [car, setCar] = useState([]);

  useEffect(() => {
    const Id = props.match.params.Id;
    console.log(Id);

    CustomerService.getDriverCarId(Id).then((res) => {
      console.log(res.data[0]);
      setCar(res.data[0]);
    });
  }, [message]);

  const TripData = {
    registrationNumber: car.registrationNumber,
    carType: car.carType,
    carNumber: car.carNumber,
    carModel: car.carModel,
    driverEmail: car.Email,
    driverNumber: car.phoneNumber,
    Img: car.Img,
    Source: trip.Source,
    Destination: trip.Destination,
    Schedule: trip.Schedules,
    dateTime: trip.dateTime,
    fareDetails: car.kilometerPrice * distance,
  };

  const phoneNumber = localStorage.getItem("phoneNumber");

  const handleClick = (e) => {
    e.preventDefault();
    CustomerService.cityTripByCustomer(phoneNumber, TripData, token1).then(
      (res) => {
        props.history.push(`/driverDetails/${res.data.result._id}`);
        setDriverdetail(res.data.carDriverData[0]);
        setCancelTrip(res.data.result);
        setVerifyotp(res.data.sendOtp);
        setRentalTrip({
          Source: "",
          Package: "",
          Schedule: "Now",
          dateTime: "",
        });
        setOutstationTrip({
          Source: "",
          Destination: "",
          Journey: "One way",
          dateTimeDepart: "",
          dateTimeReturn: "",
        });
      }
    );
  };
  return (
    <div
      className="container-fluid container-singleVehical"
      style={{ maxHeight: "100vh" }}
    >
      <div className="row">
        <div className="col-xl-5 singlepageCard">
          <div className="d-flex flex-row justify-content-between row-hl border-bottom">
            <div className="item-hl mt-4">
              <Link to="/cityTaxi/" className="text-dark">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
              </Link>
            </div>
            {car.carType === "mini" ? (
              <>
                <div className="item-hl mt-3">
                  <img src={MiniCar} width="80" height="70" alt="Mini Cab" />
                </div>
                <div>
                  <h3 className="mt-4 mr-2 text-muted">{car.carType}</h3>
                </div>
              </>
            ) : null}
            {car.carType === "auto" ? (
              <>
                <div className="item-hl mt-3">
                  <img src={Auto} width="80" height="70" alt="Auto cab" />
                </div>
                <div>
                  <h3 className="mt-4 mr-2 text-muted">{car.carType}</h3>
                </div>
              </>
            ) : null}
            {car.carType === "bike" ? (
              <>
                <div className="item-hl mt-3">
                  <img src={Bike} width="80" height="70" alt="Bike" />
                </div>
                <div>
                  <h3 className="mt-4 mr-2 text-muted">{car.carType}</h3>
                </div>
              </>
            ) : null}
            {car.carType === "prime" ? (
              <>
                <div className="item-hl mt-3">
                  <img src={Sedan} width="80" height="70" alt="sedan cab" />
                </div>
                <div>
                  <h3 className="mt-4 mr-2 text-muted">{car.carType}</h3>
                </div>
              </>
            ) : null}
            {car.carType === "primeSuv" ? (
              <>
                <div className="item-hl mt-3">
                  <img src={Suv} width="80" height="70" alt="suv cab" />
                </div>
                <div>
                  <h3 className="mt-4 mr-2 text-muted">{car.carType}</h3>
                </div>
              </>
            ) : null}
          </div>
          {trip.Schedules === "Schedule for later" ? (
            <div className="text-center text-primary h5">{`Your Schedule At ${moment(
              trip.dateTime
            ).format("MMM DD, YYYY hh:mm a")}`}</div>
          ) : null}
          <div className="card" style={{ width: "38rem" }}>
            <div className="mt-3 mr-3">
              <img
                className="card-img-top"
                src={Map}
                height="250"
                alt="map image"
              />
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item py-2">
                PICKUP &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {trip.Source}
              </li>
              <li className="list-group-item py-2">
                DROP &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {trip.Destination}
              </li>
              {message === "Login Successful" ? (
                <li className="list-group-item">
                  FARE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &#8377;
                  {car.kilometerPrice * distance}
                  <div className="ml-5">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;Total Fare
                  </div>
                </li>
              ) : (
                <li className="list-group-item py-2">FARE</li>
              )}
            </ul>
          </div>
          <div className="card card-body py-2 w-100 mt-3">
            <Link className="nav-link text-dark h5 mb-0">
              <img src={cashImg} width="30" className="mr-5" alt="cars" />
              Cash
            </Link>
          </div>
          <div className="card card-body py-2 w-100">
            <Link className="nav-link text-dark h5 mb-0">
              <img src={couponImg} width="30" className="mr-5" alt="cars" />
              Enter code (optional)
            </Link>
          </div>
          {message === "Login Successful" ? (
            <button
              type="submit"
              className="btn btn-block bg-dark text-warning mt-3"
              onClick={handleClick}
            >
              Continue And Book
            </button>
          ) : (
            <Link to="/LogIn/">
              <button
                type="submit"
                className="btn btn-block bg-dark text-warning mt-3"
              >
                Continue
              </button>
            </Link>
          )}
        </div>
        <div className="col-xl-7 singlePage-img">
          <div className="text text-center mt-4">
            <h4>Everyday city commute</h4>
            <p>Affordable AC cab rides at your doorstep</p>
            <p className="text-primary">#OlaForWeb</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleVehicalPage;
