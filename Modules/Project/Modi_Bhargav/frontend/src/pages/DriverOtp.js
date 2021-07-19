import React, { useState, useEffect } from "react";
import logo2 from "../OlacabAsset/images/ola-logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DriverService from "../Services/DriverService";

const validOtp = new RegExp(/^\d{6}$/);

const DriverOtp = (props) => {
  const Id = props.match.params.id;
  const Id1 = props.match.params.id1;

  const [otp, setOtp] = useState({
    otp: "",
    errors: {
      otp: "",
    },
  });

  const [otpValid, setOtpValid] = useState({
    otpVerify: "Done",
    Status: "Accepted",
  });

  const [tripData, setTripData] = useState({});

  useEffect(() => {
    const timeout = setInterval(() => {
      DriverService.GetTripId(Id1).then((res) => {
        setTripData(res.data[0]);
      });
    }, 2000);
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let errors = otp.errors;
    switch (name) {
      case "otp":
        errors.otp = validOtp.test(value) ? false : true;
        break;
    }
    setOtp({ ...otp, [e.target.name]: e.target.value });
  };

  const handleBack = (e) => {
    e.preventDefault();
    props.history.push(`/DriverProfile/${Id}`);
  };

  const submitOtp = (e) => {
    e.preventDefault();
    DriverService.verifyOTP(otp.otp).then((res) => {
      console.log(res.data);
      if (res.data === "Your Otp Is Not valid") {
        toast.error("Your Otp Validation Wrong!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        DriverService.verifyDriverByTrips(Id1, otpValid).then((res) => {
          props.history.push(`/DriverProfile/${Id}`);
        });
      }
    });
  };
  return (
    <>
      {tripData.Reason != null ? (
        <div className="container-fluid container-DriveDetails">
          <div className="row">
            <div
              className="col-xl-5 singlepageCard text-center"
              style={{ marginTop: "200px" }}
            >
              <div className="mt-5 h2 text-danger">
                Customer Trip Is Cancelled
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
            <div className="col-xl-7 driverPage-img">
              <div className="text text-warning">
                <h4>Everyday city commute</h4>
                <p>Affordable AC cab rides at your doorstep</p>
                <p className="text-primary">#OlaForWeb</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container-fluid continer-verify">
          <ToastContainer />
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-row justify-content-between row-hl">
                <div className="item-hl"></div>
                <div className="item-hl">
                  <img src={logo2} width="70" height="70" alt="ola cab" />
                </div>
                <div className="item-hl"></div>
              </div>
              <div className="text-center mb-4">
                <h3>Please Verify Your Otp</h3>
                <h6 className="text-muted">Enter your 6-digit otp verify</h6>
              </div>
              <form>
                <div className="float-right">
                  {otp.errors.otp ? (
                    <span className="text-danger" style={{ fontSize: "20px" }}>
                      * otp length is Not Valid
                    </span>
                  ) : (
                    <span className="text-success" style={{ fontSize: "20px" }}>
                      * Otp is Valid
                    </span>
                  )}
                </div>
                <div class="input-group mb-2">
                  <span class="input-group-addon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-file-lock-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M7 6a1 1 0 0 1 2 0v1H7V6zM6 8.3c0-.042.02-.107.105-.175A.637.637 0 0 1 6.5 8h3a.64.64 0 0 1 .395.125c.085.068.105.133.105.175v2.4c0 .042-.02.107-.105.175A.637.637 0 0 1 9.5 11h-3a.637.637 0 0 1-.395-.125C6.02 10.807 6 10.742 6 10.7V8.3z" />
                      <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-2 6v1.076c.54.166 1 .597 1 1.224v2.4c0 .816-.781 1.3-1.5 1.3h-3c-.719 0-1.5-.484-1.5-1.3V8.3c0-.627.46-1.058 1-1.224V6a2 2 0 1 1 4 0z" />
                    </svg>
                  </span>
                  <input
                    id="otp"
                    type="number"
                    class="form-control form-control-md"
                    name="otp"
                    value={otp.otp}
                    onChange={handleChange}
                    placeholder="Enter Otp Number"
                    required
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    onClick={submitOtp}
                    className="btn bg-dark text-white mt-2 py-2"
                  >
                    Submit Otp
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default DriverOtp;
