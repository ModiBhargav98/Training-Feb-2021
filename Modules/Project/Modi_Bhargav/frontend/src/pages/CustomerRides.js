import React, { useState, useEffect } from "react";
import CustomerService from "../Services/CustomerService";
import moment from "moment";
import Img1 from "../OlacabAsset/images/small_mini.png";
import Img2 from "../OlacabAsset/images/small_auto.png";
import Img3 from "../OlacabAsset/images/small_bike.png";
import Img4 from "../OlacabAsset/images/prime_sedan.png";
import Img5 from "../OlacabAsset/images/prime_suv.png";

const CustomerRides = () => {
  const token1 = localStorage.getItem("token");

  const Number = localStorage.getItem("phoneNumber");

  const [customerHistory, setHistory] = useState([]);

  useEffect(() => {
    CustomerService.customerTriphistory(Number, token1).then((res) => {
      console.log(res.data);
      setHistory(res.data);
    });
  }, []);
  return (
    <div className="container-fluid container-allrides">
      <div className="row">
        <div className="col-xl-5 ridecard">
          {customerHistory.map((city) => (
            <>
              <div className="card">
                <div className="row">
                  {city.carType === "mini" ? (
                    <div className="col-md-3 text-center ml-2 mt-4">
                      <img src={Img1} alt="mini car" />
                    </div>
                  ) : null}
                  {city.carType === "auto" ? (
                    <div className="col-md-3 text-center ml-2 mt-4">
                      <img src={Img2} alt="mini car" />
                    </div>
                  ) : null}
                  {city.carType === "bike" ? (
                    <div className="col-md-3 text-center ml-2 mt-4">
                      <img src={Img3} alt="mini car" />
                    </div>
                  ) : null}
                  {city.carType === "prime" ? (
                    <div className="col-md-3 text-center ml-2 mt-4">
                      <img src={Img4} alt="mini car" />
                    </div>
                  ) : null}
                  {city.carType === "primeSuv" ? (
                    <div className="col-md-3 text-center ml-2 mt-4">
                      <img src={Img5} alt="mini car" />
                    </div>
                  ) : null}

                  <div className="col-md-5 mt-2">
                    <div className="text-dark h6">
                      {moment(city.dateTime).format("MMM DD, YYYY hh:mm a")}
                    </div>
                    <div className="text-warning h6">
                      driver Contact: {city.driverNumber}
                    </div>
                    <div className="text-dark h6"> {city.carType}</div>
                    <div className="text-success h6"> {city.Source}</div>
                    {city.Package == null ? (
                      <div className="text-danger h6">{city.Destination}</div>
                    ) : (
                      <div className="text-danger h6">{city.Package}</div>
                    )}
                  </div>
                  {city.Reason == null && city.Status === "Accepted" ? (
                    <div className="col-md-3 pl-5 py-3">
                      <h6 className="text-success py-2">Successful</h6>
                      <img
                        src={city.Img}
                        alt="driver Pic"
                        width="50"
                        className="img-fluid rounded-circle ml-2"
                      />
                    </div>
                  ) : (
                    <div className="col-md-3 pl-5 py-3">
                      <h6 className="text-danger py-2">Cancelled</h6>
                      <img
                        src={city.Img}
                        alt="driver Pic"
                        width="50"
                        className="img-fluid rounded-circle ml-2"
                      />
                    </div>
                  )}
                </div>
              </div>
            </>
          ))}
        </div>
        <div className="col-xl-7 ride-img">
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
export default CustomerRides;
