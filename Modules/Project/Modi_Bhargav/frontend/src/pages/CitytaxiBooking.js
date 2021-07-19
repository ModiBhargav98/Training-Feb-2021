import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import logo2 from "../OlacabAsset/images/ola-logo.svg";
import emptyImg from "../OlacabAsset/images/rental-empty.png";
import CarShow from "../components/CarShow";
import axios from "axios";
import { olaContext } from "../Context/Context";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import moment from "moment";

const CitytaxiBooking = () => {
  const message = localStorage.getItem("message");

  const { trip, setTrip, setDistance } = useContext(olaContext);

  const [messages, setMessage] = useState(false);

  const [carType, setCartype] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errors = trip.errors;
    switch (name) {
      case "dateTime":
        const timeString = value;
        const date = moment(new Date()).format("DD");
        const hou = moment(new Date()).format("hh");
        const min = moment(new Date()).format("mm");
        const time = moment(new Date()).format("a");
        const date1 = moment(timeString).format("DD");
        const hou1 = moment(timeString).format("hh");
        const min1 = moment(timeString).format("mm");
        const time1 = moment(timeString).format("a");
        if (timeString === null) {
          errors.dateTime = "";
        } else if (date === date1) {
          if (time === "am" && time1 === "pm") {
            errors.dateTime = false;
          } else if (hou1 === "12" && time === time1 && hou < hou1) {
            errors.dateTime = true;
          } else {
            errors.dateTime = true;
            if (hou < hou1 && time === time1) {
              errors.dateTime = false;
            } else if (hou === hou1 && time === time1) {
              if (min <= min1) {
                errors.dateTime = false;
              } else {
                errors.dateTime = true;
              }
            } else {
              errors.dateTime = true;
            }
          }
        } else {
          errors.dateTime = false;
        }
        break;
    }
    setTrip({ ...trip, [e.target.name]: e.target.value });
    if (e.target.value === "") {
      setMessage(false);
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .post("http://localhost:80/customer/cityCar/", trip, {
        cancelToken: source.token,
      })
      .then((res) => {
        setCartype(res.data.carDetailsSource);
        setDistance(res.data.distance1);
        setMessage(false);
      })
      .catch((err) => {
        setCartype([]);
        if (trip.Source !== "" || trip.Destination !== "") {
          setMessage(false);
        } else {
          setMessage(false);
        }
      });
    return () => source.cancel();
  }, [trip]);

  return (
    <div className="container-fluid container-citytaxi">
      <div className="row">
        <div className="col-xl-5 cityCard">
          {message === "Login Successful" ? (
            <div className="d-flex flex-row justify-content-between row-hl my-1">
              <div className="p-1 item-hl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="blackColor"
                  class="bi bi-list"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
              </div>
              <div className="item-hl">
                <img src={logo2} width="70" height="70" alt="ola cab" />
              </div>
              <Link to="/CustomerProfile/" className="nav">
                <div className="p-1 item-hl text-muted">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-person-square"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z" />
                  </svg>
                </div>
              </Link>
            </div>
          ) : (
            <div className="d-flex flex-row justify-content-between row-hl my-1">
              <div className="p-1 item-hl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="blackColor"
                  class="bi bi-list"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
              </div>
              <div className="item-hl">
                <img src={logo2} width="70" height="70" alt="ola cab" />
              </div>
              <Link to="/LogIn" className="nav">
                <div className="p-1 item-hl text-muted">LOG IN</div>
              </Link>
            </div>
          )}
          <div className="d-flex flex-row justify-content-between row-hl mb-2">
            <Tooltip
              title="Affordable AC cabs for point-to-point travel within city"
              arrow
            >
              <Link to="/CityTaxi" className="nav">
                <div className="item-hl background ml-4">DAILY RIDES</div>
              </Link>
            </Tooltip>
            <Tooltip
              title="One-way and Round-trip options for inter-city travel"
              arrow
            >
              <Link to="/Outstation" className="nav">
                <div className=" item-hl mr-2">OUTSTATION</div>
              </Link>
            </Tooltip>
            <Tooltip
              title="Hourly packages at affordable prices for travel within city"
              arrow
            >
              <Link to="/Rental" className="nav">
                <div className="item-hl mr-4">RENTALS</div>
              </Link>
            </Tooltip>
          </div>
          <div className="form-group">
            <select
              id="schedual1"
              name="Source"
              className="form-select"
              value={trip.Source}
              onChange={handleChange}
            >
              <option disable selected>
                FROM Enter pickup location
              </option>
              <option value="navrangpura">Navrangpura</option>
              <option value="bopal">Bopal</option>
            </select>
          </div>
          <div className="form-group">
            <select
              id="schedual2"
              name="Destination"
              className="form-select"
              placeholder="when"
              value={trip.Destination}
              onChange={handleChange}
            >
              <option value="" selected>
                To Search for a locality or landmark
              </option>
              <option value="Gota">Gota</option>
              <option value="Sarkhej">Sarkhej</option>
            </select>
          </div>
          <div className="form-group">
            <select
              id="gender"
              name="Schedules"
              value={trip.Schedules}
              onChange={handleChange}
              className="form-select"
            >
              <option value="Now" selected>
                Now
              </option>
              <option value="Schedule for later">Schedule for later</option>
            </select>
          </div>
          {trip.Schedules === "Schedule for later" ? (
            <div class="form-group">
              <DateTimePickerComponent
                placeholder="Choose a date and time"
                min={new Date().toISOString().split("T")[0]}
                max={
                  new Date(new Date().getTime() + 6 * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split("T")[0]
                }
                name="dateTime"
                value={trip.dateTime}
                onChange={handleChange}
                className="form-control form-control-md"
              />
              {trip.errors.dateTime === true ? (
                <span className="text-danger ml-1" style={{ fontSize: "20px" }}>
                  Your Selected Time Is Not Valid !
                </span>
              ) : null}
              {trip.errors.dateTime === "" ? (
                <span className="text-danger ml-1" style={{ fontSize: "20px" }}>
                  Please Select a Time And Date !
                </span>
              ) : null}
            </div>
          ) : null}
          {messages ? (
            <div className="text-center text-muted">
              <img src={emptyImg} alt="empty Img" />
              <h3>Service unavailable</h3>
              <p>Sorry, we don't serve this location yet</p>
            </div>
          ) : null}
          <div>
            {trip.Source.length > 0 && trip.Destination.length > 0 ? (
              trip.Schedules === "Now" ? (
                <>
                  <h5 className="text-dark">Avilable Rides</h5>
                  <CarShow carType={carType} />
                </>
              ) : trip.errors.dateTime === false &&
                trip.errors.dateTime !== "" ? (
                <>
                  <h5 className="text-dark">Avilable Rides</h5>
                  <CarShow carType={carType} />
                </>
              ) : null
            ) : (
              <div className="location-guid text-center text-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  class="bi bi-geo-alt-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                </svg>
                <h5>For an accurate pickup -</h5>
                <h5>Please allow location access</h5>
                <h5>1. Turn On your device location</h5>
                <h5>2. Give 'OlaCabs' access to your</h5>
                <h5>browser's location</h5>
              </div>
            )}
          </div>
        </div>
        <div className="col-xl-7 cityTaxi-img">
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
export default CitytaxiBooking;
