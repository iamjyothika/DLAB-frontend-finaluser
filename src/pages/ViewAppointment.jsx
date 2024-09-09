import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../baseurl";
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// axios.get(`${BASE_URL}/user/test-detail/14/
// axios.get(`${BASE_URL}/user/timeslot-details/2/
// /user/testresult/id/



function MyAccount() {
  const [userData, setUserData] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [reservationDetails, setReservationDetails] = useState({});
  const [testDetails, setTestDetails] = useState({});
  const [slotDetails, setSlotDetails] = useState({});

  const token = sessionStorage.getItem('access_token');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axios.get(`${BASE_URL}/user/users/update/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        if (error.response && error.response.status === 401) {
          navigate('/userlogin');
        }
      });

      axios.get(`${BASE_URL}/user/reservations/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((response) => {
        const reservationData = response.data;
        const approvedReservations = reservationData.filter(reservation => reservation.status === 'approved');
        setReservations(approvedReservations);

        approvedReservations.forEach((reservation) => {
          const testId = reservation.test;
          const timeslotId = reservation.time_slot;
          if (testId) fetchTestDetails(testId);
          if (timeslotId) fetchTimeslotDetails(timeslotId);

          const labId = reservation.lab;
          if (labId) {
            sessionStorage.setItem(`labId_${reservation.id}`, labId.toString());
            fetchReservationDetails(reservation.id);
          }
        });
      })
      .catch((error) => {
        console.error('Error fetching reservations:', error);
        if (error.response && error.response.status === 401) {
          navigate('/userlogin');
        }
      });
    } else {
      console.error('Token not found. Please login again.');
      navigate('/userlogin');
    }
  }, [navigate, token]);

  const fetchReservationDetails = (reservationId) => {
    const storedLabId = sessionStorage.getItem(`labId_${reservationId}`);
    if (storedLabId) {
      axios.get(`${BASE_URL}/user/lab-detail/${storedLabId}/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((response) => {
        const labDetails = response.data;
        setReservationDetails(prevDetails => ({
          ...prevDetails,
          [reservationId]: {
            ...prevDetails[reservationId],
            labname: labDetails.labname,
          },
        }));
      })
      .catch((error) => {
        console.error(`Error fetching lab details for labId ${storedLabId}:`, error);
      });
    } else {
      console.log(`No labId found in session storage for reservationId ${reservationId}`);
    }
  };

  const fetchTestDetails = (testId) => {
    axios.get(`${BASE_URL}/user/test-detail/${testId}/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then((response) => {
      const testData = response.data;
      setTestDetails(prevDetails => ({
        ...prevDetails,
        [testId]: testData.testname,
      }));
    })
    .catch((error) => {
      console.error(`Error fetching test details for testId ${testId}:`, error);
    });
  };

  const fetchTimeslotDetails = (timeslotId) => {
    axios.get(`${BASE_URL}/user/timeslot-details/${timeslotId}/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then((response) => {
      const timeslotData = response.data;
      setSlotDetails(prevDetails => ({
        ...prevDetails,
        [timeslotId]: {
          start_time: timeslotData.start_time,
          end_time: timeslotData.end_time,
        }
      }));
    })
    .catch((error) => {
      console.error(`Error fetching timeslot details for timeslotId ${timeslotId}:`, error);
    });
  };

  const formatTimeSlot = (startTime, endTime) => {
    if (!startTime || !endTime) return 'N/A';

    const startDateStr = startTime.endsWith('Z') ? startTime : startTime + 'Z';
    const endDateStr = endTime.endsWith('Z') ? endTime : endTime + 'Z';

    const start = new Date(startDateStr);
    const end = new Date(endDateStr);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      console.error('Invalid time slot dates:', startTime, endTime);
      return 'Invalid time';
    }

    const formatTime = (date) => {
      const hours = date.getUTCHours();
      const minutes = date.getUTCMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes.toString().padStart(2, '0');
      return `${formattedHours}:${formattedMinutes} ${ampm}`;
    };

    return `${formatTime(start)} - ${formatTime(end)}`;
  };

  const extractDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so +1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  if (!reservations.length) {
    return (
      <div className="container-wrapper d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="container-md text-center">
          <p style={{ color: "white", fontSize: '20px' }}>Loading...</p>
        </div>
      </div>
    );
  }
  const handleViewTestReport = (reservationId) => {
    navigate(`/test-report/${reservationId}`);
  };

  return (
    <div className="container-wrapper d-flex justify-content-center align-items-center" style={{ height: '100vh', margin: '7%', borderRadius: '8px' }}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} className="border bg-light rounded-lg p-5 my-5">
            <div className="text-center" style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}>
              <h2 style={{ fontFamily: 'inherit', fontWeight: 'bold' }} className="mb-4">YOUR APPOINTMENT DETAILS</h2>
              <div className="mt-5">
                {userData && (
                  <div style={{ marginLeft: '18%' }} className="d-flex flex-column align-items-center">
                    <div className="d-flex w-100 mb-3">
                      <div className="w-25 text-right pr-3" style={{ paddingRight: '20px' }}>
                        <p className="text-muted m-0" style={{ fontWeight: 'bold' }}>Name:</p>
                      </div>
                      <div className="w-75 text-left pl-3">
                        <p className="text-dark m-0" style={{ fontWeight: 'bold' }}>
                          {userData.email || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {reservations.map((reservation) => {
                  const details = reservationDetails[reservation.id] || {};
                  const testName = testDetails[reservation.test] || 'N/A';
                  const timeslot = slotDetails[reservation.time_slot] || {};

                  const formattedDate = timeslot.start_time ? extractDate(timeslot.start_time) : 'N/A';
                  const formattedTimeSlot = formatTimeSlot(timeslot.start_time, timeslot.end_time);

                  return (
                    <div key={reservation.id} className="border-bottom mb-4" style={{ width: '100%' }}>
                      <h4 className="mb-3">Reservation ID: {reservation.id}</h4>
                      <div className="d-flex w-100 mb-3">
                        <div className="w-25 text-right pr-3" style={{ paddingRight: '20px' }}>
                          <p className="text-muted m-0" style={{ fontWeight: 'bold' }}>Labname:</p>
                        </div>
                        <div className="w-75 text-left pl-3">
                          <p className="text-dark m-0" style={{ fontWeight: 'bold' }}>
                            {details.labname || 'N/A'}
                          </p>
                        </div>
                      </div>
                      <div className="d-flex w-100 mb-3">
                        <div className="w-25 text-right pr-3" style={{ paddingRight: '20px' }}>
                          <p className="text-muted m-0" style={{ fontWeight: 'bold' }}>Test:</p>
                        </div>
                        <div className="w-75 text-left pl-3">
                          <p className="text-dark m-0" style={{ fontWeight: 'bold' }}>
                            {testName}
                          </p>
                        </div>
                      </div>
                      <div className="d-flex w-100 mb-3">
                        <div className="w-25 text-right pr-3" style={{ paddingRight: '20px' }}>
                          <p className="text-muted m-0" style={{ fontWeight: 'bold' }}>Date:</p>
                        </div>
                        <div className="w-75 text-left pl-3">
                          <p className="text-dark m-0" style={{ fontWeight: 'bold' }}>
                            {formattedDate}
                          </p>
                        </div>
                      </div>
                      <div className="d-flex w-100 mb-3">
                        <div className="w-25 text-right pr-3" style={{ paddingRight: '20px' }}>
                          <p className="text-muted m-0" style={{ fontWeight: 'bold' }}>Timeslot:</p>
                        </div>
                        <div className="w-75 text-left pl-3">
                          <p className="text-dark m-0" style={{ fontWeight: 'bold' }}>
                            {formattedTimeSlot}
                          </p>
                        </div>
                      
                      </div>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleViewTestReport(reservation.id)}
                      >
                        View Test Report
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MyAccount;
