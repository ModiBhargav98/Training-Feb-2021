import axios from "axios";

// const CUSTOMER_API_BASE_URL = "http://20.198.103.48:1023/customer";
const CUSTOMER_API_BASE_URL = "http://localhost:80/customer";

// const DRIVERCAR_API_BASE_URL = "http://20.198.103.48:1023/carsDriver/";
const DRIVERCAR_API_BASE_URL = "http://localhost:80/carsDriver/";

class CustomerService {
  getCustomers() {
    return axios.get(CUSTOMER_API_BASE_URL);
  }

  createCustomer(data) {
    return axios.post(CUSTOMER_API_BASE_URL + "/signup/", data);
  }

  loginCustomer(customer) {
    return axios.post(CUSTOMER_API_BASE_URL + "/signin/", customer);
  }

  customerCitycar(tripData) {
    return axios.post(CUSTOMER_API_BASE_URL + "/cityCar/", tripData);
  }

  customerRentalcar(rentalTrips) {
    return axios.post(CUSTOMER_API_BASE_URL + "/rentalCar/", rentalTrips);
  }

  customerOutstationcar(outstationTrips) {
    return axios.post(
      CUSTOMER_API_BASE_URL + "/outstationCar/",
      outstationTrips
    );
  }

  getCustomerById(phoneNumber, token1) {
    return axios.get(CUSTOMER_API_BASE_URL + "/" + phoneNumber, {
      headers: {
        token1: `${token1}`,
      },
    });
  }

  updateCustomer(customerData, phoneNumber) {
    return axios.put(CUSTOMER_API_BASE_URL + "/" + phoneNumber, customerData);
  }

  deleteCustomer(phoneNumber) {
    return axios.delete(CUSTOMER_API_BASE_URL + "/" + phoneNumber);
  }

  verifyOtp(OTP) {
    console.log(OTP);
    return axios.post(CUSTOMER_API_BASE_URL + "/signup/verify/" + OTP);
  }

  getDriverCarId(Id) {
    return axios.get(DRIVERCAR_API_BASE_URL + Id);
  }

  cityTripByCustomer(Number, tripData, token1) {
    return axios.post(
      CUSTOMER_API_BASE_URL + "/" + Number + "/cityTaxi/booking/",
      tripData,
      {
        headers: {
          token1: `${token1}`,
        },
      }
    );
  }

  rentalTripByCustomer(Number, rentalTrip, token1) {
    return axios.post(
      CUSTOMER_API_BASE_URL + "/" + Number + "/rental/booking/",
      rentalTrip,
      {
        headers: {
          token1: `${token1}`,
        },
      }
    );
  }
  outstationTripByCustomer(Number, outstationTrip, token1) {
    return axios.post(
      CUSTOMER_API_BASE_URL + "/" + Number + "/outstation/booking/",
      outstationTrip,
      {
        headers: {
          token1: `${token1}`,
        },
      }
    );
  }
  cancelTripByCustomer(id, reason, token1) {
    return axios.post(
      CUSTOMER_API_BASE_URL + "/" + id + "/cancelTrip/",
      reason,
      {
        headers: {
          token1: `${token1}`,
        },
      }
    );
  }
  customerTriphistory(id, token1) {
    return axios.get(CUSTOMER_API_BASE_URL + "/" + id + "/tripHistory/", {
      headers: {
        token1: `${token1}`,
      },
    });
  }
}

export default new CustomerService();
