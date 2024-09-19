import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

import { BASE_URL } from '../baseurl';

function AppointmentBookingForm() {
  const navigate = useNavigate();
  const userid=sessionStorage.getItem('Userid')
  const [formData, setFormData] = useState({
    
    lab: '',
    test: '',
    time_slot: '',
    client:userid
  });

  const [labOptions, setLabOptions] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const token = sessionStorage.getItem('access_token');
  console.log(formData);

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/all-labs/`);
        console.log(response.data);
        setLabOptions(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching labs:', error);
        setError('Failed to load lab options. Please try again later.');
        setLoading(false);
      }
    };

    fetchLabs();
  }, []);

  const handleLabChange = async (e) => {
    const selectedLabId = e.target.value;
    setFormData({ ...formData, lab: selectedLabId });

    try {
      const [testResponse, timeResponse] = await Promise.all([
        axios.get(`${BASE_URL}/user/lab-tests/${selectedLabId}/`),
        axios.get(`${BASE_URL}/user/lab-timeslot/${selectedLabId}/`),
      ]);
      console.log(testResponse.data);
      setFilteredTests(testResponse.data);
      console.log(timeResponse.data);
      setAvailableTimeSlots(timeResponse.data);
    } catch (error) {
      console.error('Error fetching tests or time slots for selected lab:', error);
      setFilteredTests([]);
      setAvailableTimeSlots([]);
    }
  };

  const handleTestChange = (e) => {
    const selectedTestId = e.target.value;
    setFormData({ ...formData, test: selectedTestId });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === 'time_slot') {
      console.log('Selected time_slot:', value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      console.error('Token not found. Please login again.');
      setModalMessage('Login required');
      setShowModal(true);
      return;
      
       
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/user/reservations/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

  

      console.log('Reservation created successfully:', response.data);
      setShowModal(true);
      // Redirect or perform additional actions after a successful submission
    } catch (error) {
      console.error('Error creating reservation:', error);
      alert('Failed to create reservation. Please try again.');
    }
  };
  const handleClose = () => setShowModal(false); // Close the modal
  const handleRedirect = () => {
    setShowModal(false); // Close the modal
    navigate('/');// Redirect to the home page
  };

  if (loading) {
    return <div>Loading lab options...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

//   Helper function to format the time as required
const formatDateTime = (startTime, endTime) => {
  const formatTime = (dateTimeString) => {
    const [date, time] = dateTimeString.split('T');
    const [hours, minutes] = time.split(':');
    const ampm = +hours >= 12 ? 'PM' : 'AM';
    const formattedHours = +hours % 12 || 12;
    return `${date} ${formattedHours}:${minutes} ${ampm}`;
  };

  return `${formatTime(startTime)} - ${formatTime(endTime)}`;
};

  return (
    <div style={{ maxWidth: '690px', margin: '10% auto' }}>
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          borderRadius: '18px',
          padding: '20px',
        }}
      >
        <h2
          style={{
            marginBottom: '20px',
            marginTop: '20px',
            textAlign: 'center',
            fontFamily: 'inherit',
          }}
        >
          BOOK YOUR APPOINTMENT
        </h2>
        <form onSubmit={handleSubmit} noValidate>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              fontWeight: 'bold',
            }}
          >
           

            <label htmlFor="lab">LAB NAME:</label>
            <select
              id="lab"
              name="lab"
              value={formData.lab}
              onChange={handleLabChange}
              required
              style={{
                width: '100%',
                border: '1px solid #ccc',
                padding: '10px',
                borderRadius: '6px',
                height: '50px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <option value="" disabled>
                Select Lab Name
              </option>
              {labOptions.length > 0 ? (
                labOptions.map((lab) => (
                  <option key={lab.id} value={lab.id}>
                    {lab.labname}
                  </option>
                ))
              ) : (
                <option disabled>No labs available</option>
              )}
            </select>

            <label htmlFor="test">TEST NAME:</label>
            <select
              id="test"
              name="test"
              value={formData.test}
              onChange={handleTestChange}
              required
              style={{
                width: '100%',
                border: 'none',
                borderBottom: '1px solid #ccc',
                padding: '8px',
                borderRadius: '6px',
                height: '50px',
              }}
            >
              <option value="">Select Test Name</option>
              {filteredTests.length > 0 ? (
                filteredTests.map((test) => (
                  <option key={test.id} value={test.id}>
                    {test.testname}
                  </option>
                ))
              ) : (
                <option disabled>No tests available</option>
              )}
            </select>

            <label htmlFor="time_slot">TIME:</label>
            <select
              id="time_slot"
              name="time_slot"
              value={formData.time_slot}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                border: 'none',
                borderBottom: '1px solid #ccc',
                padding: '8px',
                borderRadius: '6px',
                height: '50px',
              }}
            >
              <option value="" disabled>
                Select Time Slot
              </option>
              {availableTimeSlots.length > 0 ? (
                availableTimeSlots.map((time) => (
                  <option key={time.id} value={time.id}>
                    {formatDateTime(time.start_time,time.end_time)}
                  </option>
                ))
              ) : (
                <option disabled>No time slots available</option>
              )}
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              type="submit"
              style={{
                width: '40%',
                marginTop: '20px',
                fontFamily: 'inherit',
                height: '50px',
                backgroundColor: '#28a745',
                border: 'none',
                borderRadius: '6px',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '18px',
                cursor: 'pointer',
              }}
            >
              BOOK NOW
            </button>
          </div>
        </form>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalMessage.includes('Login required') ? 'Login Required' : 'Booking Confirmation'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleRedirect}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AppointmentBookingForm;
 