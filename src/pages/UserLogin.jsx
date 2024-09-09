import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import lab from './labmain5.webp';
import Lottie from 'lottie-react';
import Image from 'react-bootstrap/Image';
import animation1 from './Animate1.json';
import person from './person.svg';
// import loginback from './loginback.avif';
import user2 from './user2.gif';
// import loginim from './loginim.jpg';
// import user3 from './user3.gif';
// import labmain1 from './labmain1.jpg';
import loginlabb from "./loginlabb.webp";
// import loginlab from "./loginlab.jpg";
import "./login.css";
import axios from 'axios';
import { BASE_URL } from '../baseurl';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [showModal, setShowModal] = useState(false); // State variable to manage modal visibility
  const [number, setNumber] = useState("");
  console.log(number);
  const navigate=useNavigate();
  const [otp, setOtp] = useState();
  console.log(otp);
  const handleRequestOTP = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/user/login/`, { contact: number });
      console.log('OTP request response:', response);
      
      if (response.status === 200) {
        setShowModal(true);
      } else {
        console.error('Failed to request OTP:', response.data);
      }
    } catch (error) {
      console.error('Error requesting OTP:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  const handleOtpChange = (e) => {
    const { name, value } = e.target;

    // Limit the input to a single digit
    if (value.length > 1) return;

    setOtp(prevState => ({
        ...prevState,
        [name]: value
    }));  // Handle OTP as a single string
  };


 



  const handelVerify=async (e)=>{
    e.preventDefault();
    const fullOtp = `${otp.dig1}${otp.dig2}${otp.dig3}${otp.dig4}`;

    try {
      const response = await axios.post(`${BASE_URL}/user/verify-otp/`, { otp :fullOtp});
      
      if (response.status === 200) {
       
        // Store the access token in local storage
        const { access,user_id } = response.data;
   
        sessionStorage.setItem('access_token', access);
        sessionStorage.setItem('Userid',user_id);
        console.log('Userid',user_id);
        console.log('access token',access);
        
        navigate('/')
        
        // Adjust the URL based on your routing
      } else {
        console.log('OTP verification failed', response.data);
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
    }
  };
   

  
  return (
    <div style={{ marginRight: '2px',height:'700px' }}>
      <Container style={{ margin:'7%', paddingLeft: '20px' }}>
        <Row noGutters >
          <Col className='colorbox' style={{ paddingRight: '0' }}>
            {/* Content for the first column */}
            <div className='userbox' style={{
              backgroundColor: 'lightblue',
              height: '700px',
              textAlign: 'center',
              lineHeight: '200px',
              borderRadius: '5px',
              margintop: '80%',
              position: 'relative',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}>
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
              }}>
                <div style={{ height: '170%' }}>
                  <div>
                    <h2 style={{ marginTop: '70%' }}>Welcome Back!</h2>
                    <h4 style={{ fontSize: '21px' }}>Your Health journey starts here...</h4>
                  </div>
                  <div>
                    <Image src={user2} style={{ width: '25%', height: '20%', marginTop: '7%', marginBottom: '10px', marginRight: '5%', borderRadius: '60%' }} />
                  </div>
                  <Form>
                    <Form.Control
                      type="tel"
                      placeholder="Enter phone number"
                      style={{
                        borderRadius: '10px',
                        width: '80%',
                        boxSizing: 'border-box',
                        paddingLeft: '20px',
                        alignItems: 'center',
                        marginLeft: '40px',
                        marginRight: '50px',
                      }}
                      onChange={(x)=>setNumber(x.target.value)}
                    />
                    <Button
                      variant='success'
                      type="button"
                      onClick={handleRequestOTP} // Call handleRequestOTP on button click
                      style={{
                        borderRadius: "3px",
                        padding: "6px 20px",
                        backgroundColor: 'mediumseagreen',
                        marginBottom: '35%',
                        marginTop: '1px',
                      }}
                    >
                      Request OTP
                    </Button>
                    <a href="/register">
                      <h6 style={{fontWeight:'bold'}}>New to DLabs? REGISTER Here</h6>
                    </a>
                  </Form>
                </div>
              </div>
            </div>
          </Col>
          <Col className='colorbox' style={{ paddingLeft: '0' }}>
            <a style={{}}>
              <img src={loginlabb} alt="Background" style={{ maxwidth: '100%', height: '700px', objectFit: 'cover' }} />
              <p style={{
                position: 'absolute',
                top: '35%',
                left: '50%',
                width: '60%',
                fontWeight: 'bold',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                fontSize: '2rem',
                textShadow: '4px 4px 4px rgba(0, 0, 0, 0.5)',
                animation: 'fadeIn 2s forwards',
                animationDelay: '1s'
              }}>
                Pushing the Boundaries
              </p>
              <p style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '80%',
                fontWeight: 'bold',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                paddingLeft: '5%',
                fontSize: '2.5rem',
                textShadow: '4px 4px 4px rgba(0, 0, 0, 0.5)',
                animation: 'fadeIn 2s forwards',
                animationDelay: '1s'
              }}>
                Of Scientific Discovery
              </p>
            </a>
          </Col>
        </Row>
      </Container>

      {/* Modal for OTP */}
      <Modal show={showModal} onHide={handleCloseModal} style={{marginTop:'10%'}}>
  <Modal.Header closeButton>
    <Modal.Title style={{ color: '#333' }}> OTP VERIFICATION</Modal.Title>
  </Modal.Header>
  <div className="container " style={{ textAlign: 'center', marginTop: '20px',alignContent:'center' }}>
  <h4 style={{ color: '#333' }}>Enter OTP</h4>
  <form onSubmit={handelVerify}>
    <div className="input-field" style={{ margin: 'auto', maxWidth: '300px' }}>
      <input type="number" name='dig1' onChange={handleOtpChange} style={{ width: '50px', marginRight: '5px', borderRadius: '5px', border: '1px solid #ccc', padding: '8px' }} />
      <input type="number" name='dig2' onChange={handleOtpChange}  style={{ width: '50px', marginRight: '5px', borderRadius: '5px', border: '1px solid #ccc', padding: '8px' }} />
      <input type="number" name='dig3' onChange={handleOtpChange}  style={{ width: '50px', marginRight: '5px', borderRadius: '5px', border: '1px solid #ccc', padding: '8px' }} />
      <input type="number" name='dig4' onChange={handleOtpChange}  style={{ width: '50px', borderRadius: '5px', border: '1px solid #ccc', padding: '8px' }} />
      <br />
      <button style={{ marginTop: '20px',marginBottom:'25px', backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer',marginRight:'15px' }} onSubmit={handelVerify}>Verify OTP</button>
      <button style={{ marginTop: '20px',marginBottom:'25px', backgroundColor: 'grey', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }} type='button' onClick={handleRequestOTP}>Resend OTP</button>
    </div>
  </form>
</div>

</Modal>

    </div>
  );
}
export default Login;









// export default function Login() {
//   return (
//     <Container className="over no-gutters" style={{ minWidth: "400px", margin: '80px', position: 'relative' }}>
//       <Row>
//         <Col md={6} style={{ height: '510px', position: 'relative' }}>
//           <Lottie animationData={animation1} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
//           <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2 }}>
//             <div style={{ textAlign: 'center' }}>
//               <h2>Welcome Back!</h2>
//               <h4>Your Health journey starts here...</h4>
//               <div style={{ marginLeft: '130px' }}>
//                 <Lottie animationData={animation} style={{ maxWidth: "30%"}} />
//               </div>
//               <Form>
//                 <Form.Group controlId="formGridPhone">
//                   <Form.Label style={{ fontWeight: "bold" }}><h4>Phone</h4></Form.Label>
//                   <Form.Control type="tel" placeholder="Enter phone number" style={{ borderRadius: '10px' }} />
//                 </Form.Group>
//                 <Button variant="primary" type="submit" style={{ borderRadius: "3px", padding: "5px 10px", marginTop: "10px", backgroundColor: 'teal' }}>
//                   Request OTP
//                 </Button>
//               </Form>
//             </div>
//           </div>
//         </Col>
//         <Col md={6} className='over1'>
//           <img src={lab} alt="Background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//         </Col>
//       </Row>
//     </Container>
//   );
// }
