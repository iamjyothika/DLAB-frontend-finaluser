import img from './labmain6.webp';
import { BASE_URL } from '../baseurl';
import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


// Import your background image if needed
// import img from './path/to/your/image.jpg';

function TestReport() {
  

  const { reservationId } = useParams(); // Get the reservation ID from the route parameters
  const [reportUrl, setReportUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestReport = async () => {
      try {
        const token = sessionStorage.getItem('access_token'); // Get the JWT token from session storage
        const response = await axios.get(`${BASE_URL}/user/testresult/${reservationId}/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log('API Response:', response.data);

        // Extract the URL of the result file
        const resultData = response.data[0]; // Assuming there's only one result per reservation
        if (resultData) {
          const fileUrl = resultData.result_file.startsWith('/')
          ? `${BASE_URL}${resultData.result_file}`
          : resultData.result_file;
        setReportUrl(fileUrl);
      } else {
        setError('No test report available for this reservation.');
      }
          
      } catch (err) {
        setError('Failed to load test report');
      } finally {
        setLoading(false);
      }
    };

    fetchTestReport();
  }, [reservationId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{
      backgroundImage: `url(${img})`, // Assuming 'img' is the path to your background image
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      opacity: '0.8'
    }}>
      <div className="container">
        <h2>Test Report for Reservation ID: {reservationId}</h2>
        {reportUrl ? (
          <div>
            {/* Remove the iframe and replace it with a button or link */}
            <a href={reportUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-3">
              View Report
            </a>
            <p>(The report will open in a new tab.)</p>
          </div>
            
              
           
        ) : (
          <p>No test report available for this reservation.</p>
        )}
      </div>
    </div>
  );
};

export default TestReport;

  