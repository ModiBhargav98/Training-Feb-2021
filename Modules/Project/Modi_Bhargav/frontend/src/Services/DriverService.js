import axios from "axios";
// const ENQUIRY_API_BASE_URL = "http://20.198.103.48:1023/driverEnquiry/";
const ENQUIRY_API_BASE_URL = "http://localhost:80/driverEnquiry/";

// const LOGIN_API_BASE_URL = "http://20.198.103.48:1023/driverLogin";
const LOGIN_API_BASE_URL = "http://localhost:80/driverLogin";

// const DRIVERTRIPS_API_BASE_URL = "http://20.198.103.48:1023/driverTrips/";
const DRIVERTRIPS_API_BASE_URL = "http://localhost:80/driverTrips/";

// const CARSDRIVER_API_BASE_URL = "http://20.198.103.48:1023/carsDriver/";
const CARSDRIVER_API_BASE_URL = "http://localhost:80/carsDriver/";

const CLOUDANRYURL = "https://api.cloudinary.com/v1_1/modi321/image/upload";
// const VERIFYOTP_API_BASE_URL = "http://20.198.103.48:1023/verifyOtp/";
const VERIFYOTP_API_BASE_URL = "http://localhost:80/verifyOtp/";

class DriverService {
  GetDriverHistory() {
    return axios.get(DRIVERTRIPS_API_BASE_URL);
  }

  getAllDriver() {
    return axios.get(CARSDRIVER_API_BASE_URL);
  }

  GetDriverById(id) {
    return axios.get(CARSDRIVER_API_BASE_URL + id);
  }

  GetDriverByTrips(id) {
    return axios.get(DRIVERTRIPS_API_BASE_URL + id);
  }

  GetTripId(id) {
    console.log(id);
    return axios.get(DRIVERTRIPS_API_BASE_URL + "trip/" + id);
  }

  verifyDriverByTrips(id, Status) {
    return axios.put(DRIVERTRIPS_API_BASE_URL + id, Status);
  }

  postImg(formData) {
    return axios.post(CLOUDANRYURL, formData);
  }

  createDriver(data) {
    return axios.post(CARSDRIVER_API_BASE_URL, data);
  }

  deleteDriverById(id) {
    return axios.delete(CARSDRIVER_API_BASE_URL + id);
  }

  updateDriver(id, data) {
    return axios.put(CARSDRIVER_API_BASE_URL + id, data);
  }

  DriverByRating(id, data) {
    return axios.put(CARSDRIVER_API_BASE_URL + id + "/Rating", data);
  }

  createEnquiry(enquiry) {
    return axios.post(ENQUIRY_API_BASE_URL, enquiry);
  }

  getAllEnquiry() {
    return axios.get(ENQUIRY_API_BASE_URL);
  }

  deleteEnquiry(id) {
    return axios.delete(ENQUIRY_API_BASE_URL + id);
  }

  loginDriverAdmin(loginData) {
    return axios.post(LOGIN_API_BASE_URL + "/", loginData);
  }

  verifyOTP(id) {
    return axios.post(VERIFYOTP_API_BASE_URL + id);
  }
}

export default new DriverService();
