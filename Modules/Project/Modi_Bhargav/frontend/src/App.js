import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import pages
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import CitytaxiBooking from "./pages/CitytaxiBooking";
import OutstationBooking from "./pages/OutstationsBookings";
import CustomerProfile from "./pages/CustomerProfile";
import CustomerRides from "./pages/CustomerRides";
import RentalBooking from "./pages/RentalBooking";
import OlaDrive from "./pages/OlaDrive";
import OlaFeets from "./pages/OlaFeets";
import OlaSelect from "./pages/OlaSelect";
import Features from "./pages/Features";
import DriveWithOla from "./pages/DriveWithOla";
import OlaMoney from "./pages/OlaMoney";
import OlaCorporate from "./pages/OlaCorporate";
import OlaFoundation from "./pages/OlaFoundation";
import Share from "./pages/Share";
import Offers from "./pages/Offers";
import Support from "./pages/Support";
import SignUp from "./pages/SignUp";
import OtpSend from "./pages/OtpSend";
import AttachFleet from "./pages/AttachFleet";
import LeaseCar from "./pages/LeaseCar";
import SingleVehicalPage from "./pages/SingleVehicalPage";
import DriverHomepage from "./pages/DriverHomepage";
import DriverProvider from "./pages/DriverProvider";
import CancelTrip from "./pages/CancelTrip";
import RentalCarSinglePage from "./pages/rentalCarsinglepage";
import OutstationCarSinglepage from "./pages/OutstationcarSinglepage";
import Driver_AdminLogin from "./pages/Driver_AdminLogin";
import AdminPage from "./pages/AdminPage";
import DriverInfo from "./pages/DriverInfo";
import AddData from "./pages/AddDriver";
import AllTriphistory from "./pages/AllTriphistory";
import DriverCards from "./pages/AllDriverCards";
import DriverOtp from "./pages/DriverOtp";
import EnquiryList from "./pages/DriverEnquiry";
import EditForm from "./pages/editDriverData";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/LogIn/" component={LogIn} />
          <Route path="/SignUp/" component={SignUp} />
          <Route path="/verify/otp/" component={OtpSend} />
          <Route path="/CustomerProfile/" component={CustomerProfile} />
          <Route path="/yourRides/" component={CustomerRides} />
          <Route path="/CityTaxi/" component={CitytaxiBooking} />
          <Route path="/singleVehical/:Id" component={SingleVehicalPage} />
          <Route path="/rentalCar/:Id" component={RentalCarSinglePage} />
          <Route
            path="/outstationCar/:Id"
            component={OutstationCarSinglepage}
          />
          <Route path="/driverDetails/:Id" component={DriverProvider} />
          <Route path="/cancelTrip/:Id" component={CancelTrip} />
          <Route path="/Outstation/" component={OutstationBooking} />
          <Route path="/Rental/" component={RentalBooking} />
          <Route path="/OlaDrive/" component={OlaDrive} />
          <Route path="/OlaSelect/" component={OlaSelect} />
          <Route path="/OlaFeets/" component={OlaFeets} />
          <Route path="/Features/" component={Features} />
          <Route path="/DriveHomePage/" component={DriverHomepage} />
          <Route path="/OlaMoney/" component={OlaMoney} />
          <Route path="/OlaCorporate/" component={OlaCorporate} />
          <Route path="/OlaFoundation/" component={OlaFoundation} />
          <Route path="/Share/" component={Share} />
          <Route path="/Offers/" component={Offers} />
          <Route path="/Support/" component={Support} />
          {/* driver navbar routers */}
          <Route path="/DriveWithOla/" component={DriveWithOla} />
          <Route path="/LeaseCar/" component={LeaseCar} />
          <Route path="/AttachFleet/" component={AttachFleet} />
          <Route path="/Driver-Admin/Login/" component={Driver_AdminLogin} />
          <Route path="/AdminPage/" component={AdminPage} />
          <Route path="/DriverProfile/:id" component={DriverInfo} />
          <Route path="/AddDetails/" component={AddData} />
          <Route path="/Triphistory/" component={AllTriphistory} />
          <Route path="/DriversData/" component={DriverCards} />
          <Route path="/DriverOtp/Verify/:id/:id1" component={DriverOtp} />
          <Route path="/EditData/:id" component={EditForm} />
          <Route path="/EnquiryData/" component={EnquiryList} />
        </Switch>
      </Router>
    </>
  );
}
export default App;
