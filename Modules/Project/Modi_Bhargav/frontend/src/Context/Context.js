import React, { useState } from "react";

const olaContext = React.createContext();

const OlaProvider = (props) => {
  const [trip, setTrip] = useState({
    Source: "",
    Destination: "",
    Schedules: "Now",
    dateTime: "",
    errors: {
      dateTime: "",
    },
  });

  const [rentalTrip, setRentalTrip] = useState({
    Source: "",
    Package: "",
    Schedule: "Now",
    dateTime: "",
    errors: {
      dateTime: "",
    },
  });

  const [outstationTrip, setOutstationTrip] = useState({
    Source: "",
    Destination: "",
    Journey: "One way",
    dateTimeDepart: "",
    dateTimeReturn: "",
    errors: {
      dateTimeDepart: "",
      dateTimeReturn: "",
    },
  });

  const [rentalPrice, setPrice] = useState("");

  const [distance, setDistance] = useState("");

  const [distances, setDistances] = useState("");

  const [hours, setHours] = useState("");

  const [customer, setCustomer] = useState({
    Email: "",
    passWord: "",
  });

  const [driverDetail, setDriverdetail] = useState({});

  const [cancelTrip, setCancelTrip] = useState([]);

  const [verifyOtp, setVerifyotp] = useState("");

  const [phoneNumber, setNumber] = useState("");

  return (
    <olaContext.Provider
      value={{
        trip,
        setTrip,
        customer,
        setCustomer,
        driverDetail,
        setDriverdetail,
        outstationTrip,
        phoneNumber,
        setNumber,
        setOutstationTrip,
        rentalTrip,
        setRentalTrip,
        rentalPrice,
        setPrice,
        distance,
        setDistance,
        cancelTrip,
        setCancelTrip,
        distances,
        setDistances,
        hours,
        setHours,
        verifyOtp,
        setVerifyotp,
      }}
    >
      {props.children}
    </olaContext.Provider>
  );
};
export { OlaProvider, olaContext };
