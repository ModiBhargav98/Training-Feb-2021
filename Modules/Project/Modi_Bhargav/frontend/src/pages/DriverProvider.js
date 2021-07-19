import React, { useState, useContext, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { olaContext } from "../Context/Context";
import { Link } from "react-router-dom";
import callImg from "../OlacabAsset/images/callimg.png";
import Img1 from "../OlacabAsset/images/small_mini.png";
import Img2 from "../OlacabAsset/images/small_auto.png";
import Img3 from "../OlacabAsset/images/small_bike.png";
import Img4 from "../OlacabAsset/images/prime_sedan.png";
import Img5 from "../OlacabAsset/images/prime_suv.png";
import Img6 from "../OlacabAsset/images/keyimg.jpg";
import Img7 from "../OlacabAsset/images/star.png";
import carOnWay from "../OlacabAsset/images/carOnWay.gif";
import CarRunning from "../OlacabAsset/images/carloading.gif";
import DriverService from "../Services/DriverService";

const DriverProvider = (props) => {
  const {
    trip,
    rentalTrip,
    outstationTrip,
    setRentalTrip,
    setOutstationTrip,
    driverDetail,
    setTrip,
    verifyOtp,
  } = useContext(olaContext);

  const [drivers, setDrivers] = useState({});

  useEffect(() => {
    const id = props.match.params.Id;
    const timeout = setInterval(() => {
      DriverService.GetTripId(id).then((res) => {
        setDrivers(res.data[0]);
      });
    }, 100);
  }, []);

  const handleBack = (e) => {
    e.preventDefault();
    props.history.push("/");
    setRentalTrip({
      pickUp: "",
      Package: "",
      Schedule: "Now",
      dateTime: "",
    });
    setTrip({
      Source: "",
      Destination: "",
      Schedules: "Now",
      dateTime: "",
    });
    setOutstationTrip({
      Source: "",
      Destination: "",
      Journey: "One way",
      dateTimeDepart: "",
      dateTimeReturn: "",
    });
  };

  const [ratingData, setRatingData] = useState({
    User: 1,
    Rating: "",
  });

  const ratingChanged = (newRate) => {
    setRatingData({ ...ratingData, Rating: newRate });
  };

  const handleRating = (e) => {
    e.preventDefault();
    DriverService.DriverByRating(drivers.registrationNumber, ratingData).then(
      (res) => {
        props.history.push("/");
        setRentalTrip({
          pickUp: "",
          Package: "",
          Schedule: "Now",
          dateTime: "",
        });
        setTrip({
          Source: "",
          Destination: "",
          Schedules: "Now",
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
    <div className="container-fluid container-DriveDetails">
      <div className="row">
        {drivers.Status === "Pending" && (
          <div
            className="col-xl-5 singlepageCard text-center"
            style={{ marginTop: "100px" }}
          >
            <div>
              <img
                src={CarRunning}
                alt="Loading Data"
                width="300"
                height="300"
              />
            </div>
            <div className="h1 text-warning">
              Wait Till Driver Accept Your Request
            </div>
          </div>
        )}
        {drivers.Status === "Reject" && (
          <div
            className="col-xl-5 singlepageCard text-center"
            style={{ marginTop: "200px" }}
          >
            <div className="mt-5 h2 text-danger">
              Driver Has Not Accepted Your Request
            </div>
            <div>
              <button
                type="submit"
                className="btn btn-primary mt-3"
                onClick={handleBack}
              >
                Back to Home Page
              </button>
            </div>
          </div>
        )}
        {drivers.Status === "Accept" && (
          <div className="col-xl-5 driversCard">
            <div className="d-flex flex-row justify-content-between row-hl border-bottom">
              <div className="item-hl mt-4">
                {rentalTrip.Source.length > 0 &&
                rentalTrip.Package.length > 0 ? (
                  <Link to="/Rental/" className="text-dark">
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
                ) : null}
                {trip.Source.length > 0 && trip.Destination.length > 0 ? (
                  <Link to="/CityTaxi/" className="text-dark">
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
                ) : null}
                {outstationTrip.Source.length > 0 &&
                outstationTrip.Destination.length > 0 ? (
                  <Link to="/Outstation/" className="text-dark">
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
                ) : null}
              </div>
              <div className="item-hl mt-4 pb-2 h3 text-muted text-center">
                {drivers._id}
              </div>
              <div className="item-hl mt-4 h3 text-muted text-center"></div>
            </div>
            {trip.Source.length > 0 && trip.Destination.length > 0 ? (
              <>
                <div className="card" style={{ width: "38rem" }}>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item bg-light py-2 border-bottom">
                      PICKUP &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {trip.Source}
                    </li>
                    <li className="list-group-item py-2">
                      DROP &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {trip.Destination}
                    </li>
                  </ul>
                </div>
              </>
            ) : null}
            {outstationTrip.Source.length > 0 &&
            outstationTrip.Destination.length > 0 ? (
              <div className="card" style={{ width: "38rem" }}>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item bg-light py-2 border-bottom">
                    PICKUP &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                    {outstationTrip.Source}
                  </li>
                  <li className="list-group-item py-2">
                    DROP &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {outstationTrip.Destination}
                  </li>
                </ul>
              </div>
            ) : null}
            {rentalTrip.Source.length > 0 && rentalTrip.Package.length > 0 ? (
              <div className="card" style={{ width: "38rem" }}>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item py-2 h6">
                    PICKUP &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {rentalTrip.Source}
                  </li>
                  <li className="list-group-item py-2 h6">
                    DEPART &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; just a minues
                  </li>
                </ul>
              </div>
            ) : null}
            <div className="card mt-2 text-white text-center">
              Pickup arriving in Just a min
            </div>
            {driverDetail.carType === "mini" ? (
              <div className="card card-body py-2 w-100 mt-3">
                <Link className="nav-link text-dark h5 mb-0">
                  <img src={Img1} width="60" className="mr-5" alt="mini car" />
                  {driverDetail.carModel}
                  <h3 className="float-right mt-3">{driverDetail.carNumber}</h3>
                  <div className="ml-5">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {driverDetail.carType}
                  </div>
                </Link>
              </div>
            ) : null}
            {driverDetail.carType === "auto" ? (
              <div className="card card-body py-2 w-100 mt-3">
                <Link className="nav-link text-dark h5 mb-0">
                  <img src={Img2} width="60" className="mr-5" alt="mini car" />
                  {driverDetail.carModel}
                  <h3 className="float-right mt-3">{driverDetail.carNumber}</h3>
                  <div className="ml-5">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {driverDetail.carType}
                  </div>
                </Link>
              </div>
            ) : null}
            {driverDetail.carType === "bike" ? (
              <div className="card card-body py-2 w-100 mt-3">
                <Link className="nav-link text-dark h5 mb-0">
                  <img src={Img3} width="60" className="mr-5" alt="mini car" />
                  {driverDetail.carModel}
                  <h3 className="float-right mt-3">{driverDetail.carNumber}</h3>
                  <div className="ml-5">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {driverDetail.carType}
                  </div>
                </Link>
              </div>
            ) : null}
            {driverDetail.carType === "prime" ? (
              <div className="card card-body py-2 w-100 mt-3">
                <Link className="nav-link text-dark h5 mb-0">
                  <img src={Img4} width="60" className="mr-5" alt="mini car" />
                  {driverDetail.carModel}
                  <h3 className="float-right mt-3">{driverDetail.carNumber}</h3>
                  <div className="ml-5">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {driverDetail.carType}
                  </div>
                </Link>
              </div>
            ) : null}
            {driverDetail.carType === "primeSuv" ? (
              <div className="card card-body py-2 w-100 mt-3">
                <Link className="nav-link text-dark h5 mb-0">
                  <img src={Img5} width="60" className="mr-5" alt="mini car" />
                  {driverDetail.carModel}
                  <h3 className="float-right mt-3">{driverDetail.carNumber}</h3>
                  <div className="ml-5">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {driverDetail.carType}
                  </div>
                </Link>
              </div>
            ) : null}
            <div className="card card-body py-2 w-100">
              <Link className="nav-link text-dark h5 mb-0">
                <img
                  src={driverDetail.Img}
                  width="60"
                  className="mr-5"
                  alt="user profile"
                />
                {driverDetail.driverName}
                <div className="ml-5">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {(driverDetail.Rating / driverDetail.User).toFixed(1)}
                  <img src={Img7} alt="star img" width="40" />
                  <span className="text-muted">
                    Rated By {driverDetail.User} Customer
                  </span>
                </div>
              </Link>
            </div>
            <div className="card card-body py-2 w-100">
              <Link className="nav-link text-dark h5 mb-0">
                <img src={Img6} width="60" className="mr-5" alt="mini car" />
                OTP
                <h3 className="float-right mt-3">{verifyOtp}</h3>
              </Link>
            </div>
            <div className="card card-body py-2 w-100">
              <Link className="nav-link text-dark h5 mb-0">
                <img src={callImg} width="60" className="mr-5" alt="calls" />
                {driverDetail.phoneNumber}
              </Link>
            </div>
            <Link to={`/cancelTrip/${drivers._id}`}>
              <button
                type="submit"
                className="btn btn-block bg-dark text-warning h3 mt-2"
              >
                Cancel Trip
              </button>
            </Link>
          </div>
        )}
        {drivers.otpVerify === "Done" ? (
          <div className="text-center" style={{ marginTop: "50px" }}>
            <div className="mb-4 h1 text-success">
              Congratulations ! your journey has begun.
            </div>
            <div>
              <img src={carOnWay} alt="Loading Data" width="800" height="250" />
            </div>
            <div>
              <h2 className="mt-3 text-warning">Please Rating By Driver</h2>
              <div className="ReactStar">
                <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  size={50}
                  isHalf={true}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#ffd700"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-3"
                onClick={handleRating}
              >
                Submit Rating And Back To Home
              </button>
            </div>
          </div>
        ) : (
          <div className="col-xl-7 driverPage-img">
            <div className="text text-warning">
              <h4>Everyday city commute</h4>
              <p>Affordable AC cab rides at your doorstep</p>
              <p className="text-primary">#OlaForWeb</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default DriverProvider;
