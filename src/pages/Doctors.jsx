import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../baseurl';






 function Doctor() {
    const [doctors,setDoctors]=useState([]);
    const [labs, setLabs] = useState([]);
    const [combinedData, setCombinedData] = useState([]);
   


    useEffect(() => {
        const fetchDoctors = async () => {
            try {
              const response = await axios.get(`${BASE_URL}/user/all-doctor/`);
              setDoctors(response.data);
            } catch (error) {
              console.error('Error fetching doctors:', error);
            }
          };
          const fetchLabs = async () => {
            try {
              const response = await axios.get(`${BASE_URL}/user/all-labs/`);
              setLabs(response.data);
            } catch (error) {
              console.error('Error fetching labs:', error);
            }
          };
      
          fetchDoctors();
          fetchLabs();
        }, []);
      
        useEffect(() => {
          // Combine doctors with lab names
          const combined = doctors.map(doc => {
            // Find the lab corresponding to the doctor
            const lab = labs.find(lab => lab.id === doc.lab);
      
            return {
              ...doc,
              labname: lab ? lab.labname : 'Unknown Lab', // Add labname to the doctor
            };
          });
      
          setCombinedData(combined);
        }, [doctors, labs]);  


       
    return (
        <>

    {/* <!-- BREADCRUMB AREA START --> */}
    <div class="ltn__breadcrumb-area text-left bg-overlay-white-30 bg-image "  data-bs-bg="img/photos/docr.jpg">
        <div class="container">
            <div class="row">
                <div class="col-lg-14">
                    <div class="ltn__breadcrumb-inner" style={{paddingBottom:'90px'}}>
                        {/* <h1 class="page-title">Our Team</h1> */}
                        {/* <div class="ltn__breadcrumb-list">
                            <ul>
                                <li><a href="index.html"><span class="ltn__secondary-color"><i class="fas fa-home"></i></span> Home</a></li>
                                <li>Team</li>
                            </ul>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- BREADCRUMB AREA END --> */}

    <div>
    <h1 style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '5%', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>OUR DOCTORS</h1>
    <p style={{ textAlign: 'justify', margin: '0 10%',fontSize:'17px',color:'black',fontFamily:'inherit',marginBottom:'5%',fontWeight:'bold',  
      color:'black',
      fontSize:'18px',
      marginTop:'15px',
      fontFamily:'inherit',
      opacity: '0',
      animation: 'fadeIn 2s forwards'
    }}>
      At  DLABS, we take pride in our team of highly qualified and experienced doctors who are dedicated to providing exceptional healthcare services. Our doctors specialize in a wide range of medical fields, ensuring that you receive comprehensive and personalized care tailored to your specific needs. From general practitioners to specialists in cardiology, neurology, orthopedics, and more, our medical professionals are committed to staying at the forefront of medical advancements and technologies. They work collaboratively to diagnose, treat, and manage a variety of health conditions, ensuring that each patient receives the highest standard of care. Our doctors prioritize patient education and preventive care, empowering you to make informed decisions about your health. Whether you require routine check-ups, diagnostic tests, or specialized treatments, you can trust our team to provide compassionate and expert care every step of the way. Your health and well-being are our top priorities, and we strive to create a supportive and welcoming environment for all our patients.From general practitioners to specialists in cardiology, neurology, orthopedics, and more, our medical professionals are committed to staying at the forefront of medical advancements and technologies. They work collaboratively to diagnose, treat, and manage a variety of health conditions, ensuring that each patient receives the highest standard of care. Our doctors prioritize patient education and preventive care, empowering you to make informed decisions about your health. Whether you require routine check-ups, diagnostic tests, or specialized treatments, you can trust our team to provide compassionate and expert care every step of the way. Your health and well-being are our top priorities, and we strive to create a supportive and welcoming environment for all our patients.
    </p>
  </div>


    {/* <!-- TEAM AREA START (Team - 3) --> */}
    <div className="ltn__team-area pt-110--- pb-90">
      <div className="container">
        <div className="row justify-content-center">
          {combinedData.map((doctor, index) => (
            <div key={index} className="col-lg-4 col-sm-6">
              <div className="ltn__team-item ltn__team-item-3---">
                <div className="team-img" style={{ width: '100%', height: '300px', overflow: 'hidden' }}>
                  <img
                    src={`${BASE_URL}/${doctor.doctorimage}`}
                    alt="Doctor"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover', // Ensure the image fits nicely in the div
                    }}
                  />
                </div>
                <div style={{ backgroundColor: 'white' }} className="team-info">
                  <h4>
                    <a href="team-details.html">{doctor.doctorname}</a>
                  </h4>
                  <h6>{doctor.qualification}</h6>
                  <h6 className="ltn__secondary-color">
                    {doctor.specialiazation}, {doctor.labname}
                  </h6>
                  <div className="ltn__social-media">
                    <ul>
                      <li>
                        <a href="#">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-linkedin"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      
        <div class="ltn__pagination-area text-center"style={{marginTop:'5%',marginBottom:'5%'}}>
                         <div class="ltn__pagination">
                            <ul>
                                <li><a href="#"><i class="fas fa-angle-double-left"></i></a></li>
                             
                                <li class="active"><a href="#">1</a></li>
                                <li><a href="#">2</a></li>
                               <li><a href="#">3</a></li>
                               <li><a href="#">...</a></li>
                               <li><a href="#">10</a></li>
                              <li><a href="#"><i class="fas fa-angle-double-right"></i></a></li>
                          </ul>
                      </div>
                   </div>
    </div>
    {/* <!-- TEAM AREA END --> */}









        </>
    )
    }
    export default Doctor;