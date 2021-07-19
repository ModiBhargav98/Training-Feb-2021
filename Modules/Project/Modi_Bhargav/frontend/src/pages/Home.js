import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/UserNavbar";
import { olaContext } from "../Context/Context";
import Footer from "../components/Footer";
import home from "../OlacabAsset/images/prime-play.png";
import city from "../OlacabAsset/images/city-taxi-card1.jpg";
import taxicity from "../OlacabAsset/images/city-taxi1.svg";
import outstation from "../OlacabAsset/images/outstation-card.jpg";
import taxioutstation from "../OlacabAsset/images/outstation-taxi2.svg";
import rental from "../OlacabAsset/images/rental-taxi-card.jpg";
import pocket from "../OlacabAsset/images/pocket.jpg";
import secure from "../OlacabAsset/images/secure.jpg";
import olaselect from "../OlacabAsset/images/olaselect.jpg";
import entertainment from "../OlacabAsset/images/entertainment.jpg";
import share from "../OlacabAsset/images/share.jpg";
import cashless from "../OlacabAsset/images/cashless.jpg";
import olabooking from "../OlacabAsset/images/ola-booking.png";
import playstore from "../OlacabAsset/images/playstore.png";
import appstore from "../OlacabAsset/images/appstore.png";
import windowstore from "../OlacabAsset/images/windowstore.png";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import moment from "moment";

const Home = () => {
  const { trip, setTrip } = useContext(olaContext);

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
        if (date === date1) {
          if (hou1 === "12" && time === time && hou < hou1) {
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
  };

  return (
    <>
      <Navbar />
      <div className="homepage">
        <div className="page pb-5">
          <div className="row">
            <div className="col-lg-12 text-center text-dark font-weight-bold">
              <h1 className="mt-4">
                Book a City Taxi to your destination in town
              </h1>
              <h5>Choose from a range of categories and prices</h5>
            </div>
            <div className="col-lg-5">
              <div className="card card-body bg-light mt-5">
                <div className="d-flex flex-row justify-content-between row-hl">
                  <Link to="/CityTaxi" className="nav">
                    <div className="p-1 item-hl background">CITY TAXI</div>
                  </Link>
                  <Link to="/Outstation" className="nav">
                    <div className="p-1 item-hl">OUTSTATION</div>
                  </Link>
                  <Link to="/Rental" className="nav">
                    <div className="p-1 item-hl">RENTAL</div>
                  </Link>
                </div>
                <div className="mt-3 border-top">
                  <h6 className="text-center mt-3 text-dark">
                    Your everyday travel partner
                  </h6>
                  <p class="text-center">AC Cabs for point to point travel</p>
                </div>
                <div className="form-group">
                  <select
                    id="schedual1"
                    name="Source"
                    className="form-select"
                    value={trip.Source}
                    onChange={handleChange}
                  >
                    <option selected>PICKUP Current location</option>
                    <option value="navrangpura">navrangpura</option>
                    <option value="bopal">bopal</option>
                    <option value="bopal">vejalpur</option>
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
                    <option selected>DROP Enter drop for ride estimate</option>
                    <option value="Gota">Gota</option>
                    <option value="Sarkhej">Sarkhej</option>
                  </select>
                </div>
                <div className="form-group">
                  <select
                    id="schedual1"
                    name="Schedules"
                    className="form-select"
                    placeholder="when"
                    value={trip.Schedules}
                    onChange={handleChange}
                  >
                    <option value="Now" selected>
                      Now
                    </option>
                    <option value="Schedule for later">
                      Schedule for later
                    </option>
                  </select>
                </div>
                {trip.Schedules === "Schedule for later" ? (
                  <div className="form-group">
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
                      <span
                        className="text-danger ml-1"
                        style={{ fontSize: "20px" }}
                      >
                        Your Selected Time Is Not Valid !
                      </span>
                    ) : null}
                  </div>
                ) : null}
                <Link to="/CityTaxi/">
                  <button className="btn btn-block search-btn">
                    Search Cabs
                  </button>
                </Link>
              </div>
            </div>
            <div className="col-lg-7">
              <img
                src={home}
                alt="ola cabs"
                className="img-fluid d-none d-md-block"
              />
            </div>
          </div>
        </div>
        <div className="my-5 mx-5">
          <h2 className="mx-4 font-weight-bold">A car for every occasion</h2>
          <h5 className="text-muted mx-4">
            Ola offers city taxis, inter-city cabs, and local cabs at hourly
            packages
          </h5>
        </div>
        <div className="row justify-content-center">
          <div className="my-3" style={{ width: "28rem" }}>
            <Link to="/cityTaxi/" className="nav-link">
              <img
                src={city}
                className="card-img-top rounded"
                height="220"
                alt="user img"
              />
              <div class="card-body bg-light">
                <div className="float-right">
                  <img
                    src={taxicity}
                    className="img-fluid rounded-circle bg-warning ml-3"
                    width="80"
                    alt="user img"
                  />
                </div>
                <h4 class="card-title my-4 text-dark">CITY TAXI</h4>
                <h5 class="card-text text-muted">
                  The perfect way to get through your everyday travel needs.
                  city taxis are avilable 24/7 and you can book and travel in an
                  insatnt with rides starting form as low as Rs 6/km ,you can
                  choose from a wide range of options! You can choose from a
                  wide range of options! You can to do your bit,for the
                  environment with Ola Share!
                </h5>
              </div>
            </Link>
          </div>
          <div className="my-3" style={{ width: "28rem" }}>
            <Link to="/Outstation/" className="nav-link">
              <img
                src={outstation}
                class="card-img-top rounded"
                height="220"
                alt="user img"
              />
              <div class="card-body bg-light">
                <div className="float-right">
                  <img
                    src={taxioutstation}
                    className="img-fluid rounded-circle bg-warning ml-3"
                    width="80"
                    alt="user img"
                  />
                </div>
                <h4 class="card-title my-4 text-dark">OUTSTATION</h4>
                <h5 class="card-text text-muted my-3 pb-1">
                  Ride out of town at affordable one-way and round-trip fares
                  with Ola's intercity travel service.Choose from a range of AC
                  cabs driven by top partners. available in 1 hour or book upto
                  7 days in advance. We have you covered across india with
                  presence in 90+ cities with over 500 one way routes.
                </h5>
              </div>
            </Link>
          </div>
          <div className="my-3" style={{ width: "28rem" }}>
            <Link to="/Rental/" className="nav-link">
              <img
                src={rental}
                class="card-img-top rounded"
                height="220"
                alt="user img"
              />
              <div class="card-body bg-light">
                <div className="float-right">
                  <img
                    src={taxicity}
                    className="img-fluid rounded-circle bg-warning ml-3"
                    width="80"
                    alt="user img"
                  />
                </div>
                <h4 class="card-title my-4 text-dark">RANTALS</h4>
                <h5 class="card-text text-muted my-3 pb-5">
                  With Ola Rentals you get a cab at your disposal.So be it a day
                  long business meeting, a shopping trip with your friends or
                  just a day out in anew city,we have you covered. Packages
                  start at 1 hour and can be extended upto 12 hours!
                </h5>
              </div>
            </Link>
          </div>
        </div>
        <div className="my-5 mx-5">
          <h1 className="mx-4 font-weight-bold">Why ride with Ola?</h1>
          <h4 className="text-muted mx-4">
            The best way to travel to your destination
          </h4>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-5 mb-4">
            <div className="media pl-3 pb-3">
              <img
                src={pocket}
                alt="pocket pick"
                className="mr-3 mt-3 rounded"
                height="120"
              />
              <div className="media-body mt-3">
                <h4 className="texts">Cabs for Every Pocket</h4>
                <p className="text-muted">
                  From Sedans and SUVs to Luxury cars for special occasions, we
                  have cabs to suit every pocket.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-5 mb-4">
            <div className="media pl-3 pb-3">
              <img
                src={secure}
                alt="secure pick"
                className="mr-3 mt-3 rounded"
                height="120"
              />
              <div className="media-body mt-3">
                <h4 className="texts">Secure and Safer Rides</h4>
                <p className="text-muted">
                  Verified drivers, an emergency alert button, and live ride
                  tracking are some of the features that we have in place to
                  ensure you a safe travel experience.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-5 mb-4">
            <div className="media pl-3 pb-3">
              <img
                src={olaselect}
                alt="olaselect pick"
                className="mr-3 mt-3 rounded"
                height="120"
              />
              <div className="media-body mt-3">
                <h4 className="texts">Ola Select</h4>
                <p className="text-muted">
                  A membership program with Ola that lets you ride a Prime Sedan
                  at Mini fares, book cabs without peak pricing and has zero
                  wait time
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-5  mb-4">
            <div className="media pl-3 pb-0">
              <img
                src={entertainment}
                alt="entertainment pick"
                className="mr-3 mt-3 rounded"
                height="120"
              />
              <div className="media-body mt-3">
                <h4 className="texts">In Cab Entertainment</h4>
                <p className="text-muted">
                  Play music, watch videos and a lot more with Ola Play! Also
                  stay connected even if you are travelling through poor network
                  areas with our free wifi facility.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-5 mb-4">
            <div className="media pl-3 pb-0">
              <img
                src={share}
                alt="Share  pick"
                className="mr-3 mt-3 rounded"
                height="120"
              />
              <div className="media-body mt-3">
                <h4 className="texts">Share and Express</h4>
                <p className="text-muted">
                  To travel with the lowest fares choose Ola Share. For a faster
                  travel experience we have Share Express on some fixed routes
                  with zero deviations. Choose your ride and zoom away!
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-5 mb-4">
            <div className="media pl-3 pb-3">
              <img
                src={cashless}
                alt="cashless  pick"
                className="mr-3 mt-3 rounded"
                height="120"
              />
              <div className="media-body mt-3">
                <h4 className="texts">Cashless Rides</h4>
                <p className="text-muted">
                  Now go cashless and travel easy. Simply recharge your Ola
                  money or add your credit/debit card to enjoy hassle free
                  payments.
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-lg-6 my-5">
            <div className="my-5 ml-5">
              <h2 className="mx-5 font-weight-bold">
                Book an Ola from the App
              </h2>
              <h5 className="text-center mr-5 text-muted pt-1">
                Download the app for exclusive deals and ease of booking
              </h5>
            </div>
            <div className="mx-5">
              <img
                src={playstore}
                className="my-5 ml-5"
                width="180"
                alt="playstore pick"
              />
              <img
                src={appstore}
                width="180"
                className="mx-3"
                alt="playstore pick"
              />
              <img src={windowstore} width="150" alt="playstore pick" />
            </div>
          </div>
          <div className="col-lg-5 ml-3">
            <img
              src={olabooking}
              width="500"
              className="ml-5 mt-4"
              alt="booking"
            />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default Home;
