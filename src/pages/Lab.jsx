import React from 'react';
// import './Lab.css'; 
import { Row,Col } from 'react-bootstrap';
import { CCard, CCardBody, CCardImage, CCardText, CCardTitle, CCol, CRow,CPagination} from '@coreui/react';
import labmain6edit from './labmain6edit.png';
import Carousel from 'react-bootstrap/Carousel';
// import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar } from '@fortawesome/free-solid-svg-icons';
import ExampleCarouselImage from './labmain5.webp';
import ExampleCarouselImage1 from './labmain1.jpg';
import ExampleCarouselImage2 from './rare.png';
import l2 from './l2.webp';
import l1 from  './l1.webp';
import l3 from './l3.jpg';
import l6 from  './l6.jpg';
import l7 from  './l7.jpg';
import l8 from  './l8.webp';
import { BASE_URL } from "../baseurl";
import { useState, useEffect } from "react";
import axios from "axios";


const Lab = () => {
    const [labs, setLabs] = useState([]);
    useEffect(() => {
        axios.get(`${BASE_URL}/user/all-labs/`, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((response) => {
            console.log(response);
            setLabs(response.data);
        })
        .catch((error) => console.error("Error fetching labs:", error));
    }, []); 
    


  return (
    <>
   <div style={{ position: 'relative', height: "80vh", width: "100%", overflow: "hidden" }}>
  <img src={ExampleCarouselImage1} alt='img' style={{ height: "100%", width: "100%", objectFit: "cover" }} />
  <div style={{ position: 'absolute', top: '60%', left: '60%', transform: 'translate(-50%, -50%)', textAlign: 'center', zIndex: '2', color: 'white' }}>
    <h2 style={{ fontFamily: 'inherit', fontWeight: 'bold', fontSize: '40px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', margin: '0' }}>REVOLUTIONIZING HEALTH</h2>
    <p style={{ fontFamily: 'inherit', fontSize:'25px', margin: '0',color:'white',marginTop:'10px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>One Step At a Time</p>
  </div>
</div>

      <div style={{ marginTop: '5%', textAlign: 'center' }}>
   <h2 style={{ fontFamily: 'inherit', fontWeight: 'bold', fontSize: '50px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>OUR BEST RATING LABS</h2>

    <p style={{fontFamily:'inherit',fontWeight:'bold',color:'white'}}>EXPLORE OUR STATE-OF-THE-ART LABORATORIES.</p>
  </div>
     
    
    <div className="containers1  mb-5">
 
    <div className="ltn__product-area ltn__product-gutter  no-product-ratting pt-115 pb-70---">
        <div className="container">
        <div className="row ltn__tab-product-slider-one-active--- slick-arrow-1">
         {labs.map((lab, index) => (
        <div key={index} className="col-lg-3 col-md-4 col-sm-6 col-6">
            <div
                style={{
                    backgroundColor: 'white',
                    marginBottom: '30px',
                    border: '1px solid #e5e5e5',
                    borderRadius: '0',
                    overflow: 'hidden',
                    height: '500px', // Set a fixed height for the entire div
                    display: 'flex',
                    flexDirection: 'column'
                }}
                className="ltn__product-item ltn__product-item-3 text-center"
            >
                <div
                    style={{
                        flex: '1 1 auto', // Image takes up the remaining space
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                    className="product-img"
                >
                    <a href="/Lab_details" className="zoomable">
                        <img
                            src={`${BASE_URL}/${lab.profile_pic}`}
                            alt={lab.labname}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block'
                            }}
                            className="product-image"
                        />
                    </a>
                    <div className="product-hover-action">
                        {/* Add your hover action buttons here */}
                    </div>
                </div>
                <div
                    style={{
                        padding: '15px',
                        backgroundColor: 'white', // Ensure this section is separated from the image
                        flexShrink: 0 // Prevent shrinking
                    }}
                    className="product-info"
                >
                    <h2
                        style={{
                            margin: '0 0 10px',
                            fontSize: '16px',
                            color: 'blue' // Lab name in blue color
                        }}
                        className="product-title"
                    >
                        <a href="product-details.html" style={{ textDecoration: 'none', color: 'blue' }}>
                            {lab.labname}
                        </a>
                    </h2>
                    <div
                        style={{
                            fontSize: '14px',
                            color: 'green', // City and state in green color
                            textAlign: 'center', // Align text to the center
                            marginBottom: '0' // Align to the bottom of the div
                        }}
                        className="product-price"
                    >
                        <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: '8px' }} />
                            <a>{lab.city}, {lab.state}</a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    ))}
</div>

          
          
        

            {/* <!-- ltn__product-item --> */}



            {/* <!--  --> */}
          </div>
        </div>
      </div>
    <div class="ltn__pagination-area text-center"style={{marginTop:'5%',marginBottom:'5%',marginRight:'25px'}}>
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
   
 
  <h1 style={{textAlign:'center',fontFamily:'inherit',fontWeight:'bold',marginBottom:'5%', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', fontSize: '50px'}}>DLABS</h1>
  <div className="container d-flex">
  
    <Row>
<col-6>
      <img style={{height:'290px',width:'3800px',marginRight:'5px'}} src="/img/photos/labs3.jpg" alt="Example" className="image" />
      </col-6>
      <Col>
      </Col>
      </Row>
      <div>
      <p className="text"style={{color:'black',marginLeft:'25px',fontSize:'18px',fontFamily:'inherit'}}>
      Robust central lab services that offer an integrated, flexible, one-stop solution for the collection, management and analysis of lab and study data in the clinical trial ecosystem.
      Clinical trial sponsors want accurate, reliable and fast data to successfully manage their clinical trials. It’s critical to engage a central lab that ensures consistent test methodologies, equipment and reporting standards, which drives standardization, accuracy and reliability of data across multiple study sites. Our global central lab helps enable informed decision-making, drive site excellence and address challenges that drug developers face. Through our award-winning drug development database solution, globally standardized clinical testing and centralized data visibility, our team helps customers make more informed decisions about their clinical trials.When working with a large amount of lab data, powerful digital tools that provide data integration in real time allow for insights to help inform clinical decisions. But finding a lab service provider with the required expertise can be a challenge. Our award-winning Preclarus Lab solutions centralize and integrate data across labs to guide, accelerate and advance our customers’ development efforts.
      </p>
      </div>
    </div>
    <div className="container d-flex">
    <p style={{color:'black',fontSize:'18px',fontFamily:'inherit'}}>
    We are dedicated to helping customers make faster, more informed decisions about their clinical trials through our award-winning drug development database solution, globally standardized clinical testing and centralized data visibility. Our central lab provides an integrated, flexible, one-stop solution for the collection, management and analysis of lab and study data, and an enhanced clinical focus.Secure access for customer project teams to real-time, study-wide data including the ability to visualize, organize, search and manage lab data.
      </p>
      </div>
  
  



    </>
  );
}

export default Lab;







//                
