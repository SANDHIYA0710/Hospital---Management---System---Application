import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";


// Doctors
export const getDoctors = () => axios.get(`${BASE_URL}/doctors`);

export const addDoctor = (data) =>
  axios.post(`${BASE_URL}/doctors`, data, {
    headers: {
      "Content-Type": "application/json"
    }
  });

export const deleteDoctor = (id) =>
  axios.delete(`${BASE_URL}/doctors/${id}`);


// Patients
export const getPatients = () => axios.get(`${BASE_URL}/patients`);

export const addPatient = (data) =>
  axios.post(`${BASE_URL}/patients`, data, {
    headers: {
      "Content-Type": "application/json"
    }
  });

// ✅ NEW FUNCTION (ADDED — DO NOT REMOVE OLD)
export const addPatientJSON = (data) =>
  axios.post(`${BASE_URL}/patients/json`, data, {
    headers: {
      "Content-Type": "application/json"
    }
  });

export const deletePatient = (id) =>
  axios.delete(`${BASE_URL}/patients/${id}`);


// Appointments
export const getAppointments = () => axios.get(`${BASE_URL}/appointments`);

export const addAppointment = (data) =>
  axios.post(`${BASE_URL}/appointments`, data, {
    headers: {
      "Content-Type": "application/json"
    }
  });

export const cancelAppointment = (id) =>
  axios.put(`${BASE_URL}/appointments/${id}/cancel`);



// Login
export const loginUser = (email, password) =>
  axios.post("http://127.0.0.1:8000/auth/login", null, {
    params: {
      email: email,
      password: password,
    },
  });