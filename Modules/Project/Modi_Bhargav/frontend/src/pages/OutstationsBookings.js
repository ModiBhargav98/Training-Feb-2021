import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import logo2 from "../OlacabAsset/images/ola-logo.svg";
import lowestImg from "../OlacabAsset/images/lowest.svg";
import auditedImg from "../OlacabAsset/images/audited.svg";
import emptyImg from "../OlacabAsset/images/rental-empty.png";
import rsaImg from "../OlacabAsset/images/rsa.svg";
import trackingImg from "../OlacabAsset/images/tracking.svg";
import { olaContext } from "../Context/Context";
import axios from "axios";
import OutstationCarshow from "../components/outstationCarshow";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import moment from "moment";

const OutstationBookings = () => {
  const message = localStorage.getItem("message");

  const { outstationTrip, setOutstationTrip, distance, setDistance } =
    useContext(olaContext);

  const hours = Math.ceil(distance / 40);
  // console.log(hours);

  const [messages, setMessage] = useState(false);

  const [carType, setCartype] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errors = outstationTrip.errors;
    switch (name) {
      case "dateTimeDepart":
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
          errors.dateTimeDepart = "";
        } else if (date === date1) {
          if (time === "am" && time1 === "pm") {
            errors.dateTimeDepart = false;
          } else if (hou1 === "12" && time === time1 && hou < hou1) {
            errors.dateTimeDepart = true;
          } else {
            errors.dateTimeDepart = true;
            if (hou < hou1 && time === time1) {
              errors.dateTimeDepart = false;
            } else if (hou === hou1 && time === time1) {
              if (min <= min1) {
                errors.dateTimeDepart = false;
              } else {
                errors.dateTimeDepart = true;
              }
            } else {
              errors.dateTimeDepart = true;
            }
          }
        } else {
          errors.dateTimeDepart = false;
        }
        break;
      case "dateTimeReturn":
        const timeString1 = value;
        const date2 = moment(new Date()).format("DD");
        const hou2 = moment(new Date()).format("hh");
        const min2 = moment(new Date()).format("mm");
        const time2 = moment(new Date()).format("a");
        const date3 = moment(timeString1).format("DD");
        const hou3 = moment(timeString1).format("hh");
        const min3 = moment(timeString1).format("mm");
        const time3 = moment(timeString1).format("a");
        const datePre = moment(outstationTrip.dateTimeDepart).format("DD");
        const houPre = moment(outstationTrip.dateTimeDepart).format("hh");
        const minPre = moment(outstationTrip.dateTimeDepart).format("mm");
        const timePre = moment(outstationTrip.dateTimeDepart).format("a");
        // console.log(outstationTrip.dateTimeDepart);
        // console.log(outstationTrip.dateTimeReturn);
        if (
          outstationTrip.dateTimeDepart === "" ||
          outstationTrip.dateTimeDepart === null
        ) {
          console.log("null");
          if (date2 === date3) {
            console.log("right");
            console.log(parseInt(hou2) + parseInt(hours));
            console.log(parseInt(hou3));
            // console.log(hou2 + hours);
            if (hou2 + hours < hou3) {
              console.log("hours right");
            } else {
              console.log("hours wrong");
            }
          } else {
            console.log("wrong");
          }
        } else {
          console.log("Not null");
        }
        //     if (
        //       outstationTrip.dateTimeDepart === "" ||
        //       outstationTrip.dateTimeDepart === null
        //     ) {
        //       console.log("length1");
        //       if (timeString1 === null) {
        //         errors.dateTimeReturn = "";
        //       } else if (date2 === date3) {
        //         if (time2 === "am" && time3 === "pm") {
        //           errors.dateTimeReturn = false;
        //         } else if (hou3 === "12" && time2 === time3 && hou2 < hou3) {
        //           errors.dateTimeReturn = true;
        //         } else {
        //           errors.dateTimeReturn = true;
        //           if (hou2 < hou3 && time2 === time3) {
        //             errors.dateTimeReturn = false;
        //           } else if (hou2 === hou3 && time2 === time3) {
        //             if (min2 <= min3) {
        //               errors.dateTimeReturn = false;
        //             } else {
        //               errors.dateTimeReturn = true;
        //             }
        //           } else {
        //             errors.dateTimeReturn = true;
        //           }
        //         }
        //       } else {
        //         errors.dateTimeReturn = false;
        //       }
        //     } else {
        //       console.log("length");
        //     }
        break;
    }
    setOutstationTrip({ ...outstationTrip, [e.target.name]: e.target.value });
    if (e.target.value === "") {
      setMessage(false);
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .post("http://localhost:80/customer/outstationCar/", outstationTrip, {
        cancelToken: source.token,
      })
      .then((res) => {
        console.log(res.data);
        setCartype(res.data.carDetailsSource);
        setDistance(res.data.distance1);
        setMessage(false);
      })
      .catch((err) => {
        console.log("error meassage");
        setCartype([]);
        if (outstationTrip.Source !== "" || outstationTrip.Destination !== "") {
          setMessage(true);
        } else {
          setMessage(false);
        }
      });
    return () => source.cancel();
  }, [outstationTrip]);
  return (
    <div className="container-fluid container-outstation">
      <div className="row">
        <div className="col-xl-5 outsationCard">
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
                <div className="ml-4 item-hl ">DAILY RIDES</div>
              </Link>
            </Tooltip>
            <Tooltip
              title="One-way and Round-trip options for inter-city travel"
              arrow
            >
              <Link to="/Outstation" className="nav">
                <div className="mr-2 p-1 item-hl background">OUTSTATION</div>
              </Link>
            </Tooltip>
            <Tooltip
              title="Hourly packages at affordable prices for travel within city"
              arrow
            >
              <Link to="/Rental" className="nav">
                <div className="mr-4 item-hl">RENTALS</div>
              </Link>
            </Tooltip>
          </div>
          <div className="form-group">
            <select
              id="schedual1"
              name="Source"
              className="form-select"
              value={outstationTrip.Source}
              onChange={handleChange}
            >
              <option value="" selected>
                FROM Enter pickup location
              </option>
              <option value="surat">surat</option>
              <option value="ahmedabad">ahmedabad</option>
            </select>
          </div>
          <div className="form-group">
            <select
              id="schedual1"
              name="Destination"
              className="form-select"
              value={outstationTrip.Destination}
              onChange={handleChange}
            >
              <option value="" selected>
                To Enter a city,hotel and address
              </option>
              <option value="patan">patan</option>
              <option value="ahmedabad">ahmedabad</option>
            </select>
          </div>
          <div>
            {outstationTrip.Source !== "" &&
            outstationTrip.Destination !== "" ? (
              <>
                <div className="form-group">
                  <select
                    id="schedual1"
                    name="Journey"
                    className="form-select"
                    placeholder="when"
                    value={outstationTrip.Journey}
                    onChange={handleChange}
                  >
                    <option selected>One Way</option>
                    <option value="Round trip">Round trip</option>
                  </select>
                </div>
                <div class="form-group">
                  <DateTimePickerComponent
                    placeholder="Choose a date and time"
                    min={new Date().toISOString().split("T")[0]}
                    max={
                      new Date(new Date().getTime() + 6 * 24 * 60 * 60 * 1000)
                        .toISOString()
                        .split("T")[0]
                    }
                    name="dateTimeDepart"
                    value={outstationTrip.dateTimeDepart}
                    onChange={handleChange}
                    className="form-control form-control-md"
                  />
                  {outstationTrip.errors.dateTimeDepart === true ? (
                    <span
                      className="text-danger ml-1"
                      style={{ fontSize: "20px" }}
                    >
                      Your Selected Time Is Not Valid !
                    </span>
                  ) : null}
                </div>
                <div>
                  {outstationTrip.Journey === "Round trip" ? (
                    <div class="form-group">
                      <DateTimePickerComponent
                        placeholder="Choose a date and time"
                        min={new Date().toISOString().split("T")[0]}
                        max={
                          new Date(
                            new Date().getTime() + 6 * 24 * 60 * 60 * 1000
                          )
                            .toISOString()
                            .split("T")[0]
                        }
                        name="dateTimeReturn"
                        value={outstationTrip.dateTimeReturn}
                        onChange={handleChange}
                        className="form-control form-control-md"
                      />
                      {outstationTrip.errors.dateTimeReturn === true ? (
                        <span
                          className="text-danger ml-1"
                          style={{ fontSize: "20px" }}
                        >
                          Your Selected Time Is Not Valid !
                        </span>
                      ) : null}
                      {outstationTrip.errors.dateTimeReturn === "" ? (
                        <span
                          className="text-danger ml-1"
                          style={{ fontSize: "20px" }}
                        >
                          Please Select a Time And Date !
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                </div>
                {(outstationTrip.Journey === "One way" &&
                  outstationTrip.errors.dateTimeDepart === false) ||
                (outstationTrip.Journey === "One way" &&
                  outstationTrip.errors.dateTimeDepart === "") ? (
                  <>
                    <h5 className="text-dark">Avilable Rides</h5>
                    <OutstationCarshow carType={carType} />
                  </>
                ) : outstationTrip.errors.dateTimeReturn === false &&
                  outstationTrip.errors.dateTimeReturn !== "" ? (
                  <>
                    <h5 className="text-dark">Avilable Rides</h5>
                    <OutstationCarshow carType={carType} />
                  </>
                ) : null}
              </>
            ) : (
              <div>
                <h4 className="ml-3 my-4">Why book with us ?</h4>
                <div className="ml-4 text-muted h6">
                  <img src={lowestImg} alt="lowest img" className="mr-3 pt-2" />
                  Lowest Ac cab fares statring from &#8377;8/km
                </div>
                <div className="ml-4 mt-4 text-muted h6">
                  <img
                    src={auditedImg}
                    alt="lowest img"
                    className="mr-3 pt-2"
                  />
                  Regularly-audited cars
                </div>
                <div className="ml-4 mt-4 text-muted h6">
                  <img src={rsaImg} alt="lowest img" className="mr-3 pt-2" />
                  24 x 7 support and on-road assistance
                </div>
                <div className="ml-4 mt-4 text-muted h6">
                  <img
                    src={trackingImg}
                    alt="lowest img"
                    className="mr-3 pt-2"
                  />
                  Real-time tracking for your-family and SOS support
                </div>
              </div>
            )}
          </div>

          {outstationTrip.Source !== "" && outstationTrip.Destination !== "" ? (
            outstationTrip.Journey === "One Way" ? (
              <>
                <h5 className="text-dark">Avilable Rides</h5>
                <OutstationCarshow carType={carType} />
              </>
            ) : outstationTrip.errors.dateTime === false &&
              outstationTrip.errors.dateTime !== "" ? (
              <>
                <h5 className="text-dark">Avilable Rides</h5>
                <OutstationCarshow carType={carType} />
              </>
            ) : null
          ) : null}
        </div>
        <div className="col-xl-7 outstation-img">
          <div className="text float-left">
            <h4>Ride out of twon</h4>
            <p>Book and depart in an hour</p>
            <p className="text-warning">#OlaForWeb</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OutstationBookings;
