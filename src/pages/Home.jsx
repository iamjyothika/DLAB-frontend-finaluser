import React, { useState, useEffect } from "react";
// import micro from "./micro.gif";
import bokk2 from "./bokk2.gif";
import chem from "./chem.jpg";
import dna from "./dna.gif";
import dna2 from "./dna2.avif";
import carousel1 from "./carousel1.jpeg";
import '../App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "../baseurl";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
// import { useParams } from "react-router-dom";


// import postnatal2 from "./postnatal2.gif";
import "./Myacc.css";
function Home() {
  const [labs, setLabs] = useState([]);
  const [packages, setPackage] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const navigate = useNavigate();
  // const { id } = useParams();

 useEffect(() => {
    axios.get(`${BASE_URL}/user/all-labs/`, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

      .then((response) => {
        console.log(response)
        setLabs(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error("Error fetching labs:", error));

    axios.get(`${BASE_URL}/user/all-package/`, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        setPackage(response.data); 
        console.log(response.data);// You might want to use a different state variable for packages
      })
      .catch((error) => console.error("Error fetching packages:", error));
  }, [navigate]);
  useEffect(() => {
    const getTestCount = (tests) => {
      return tests ? tests.length : 0;
    };

    // Combine packages with lab names and test counts
    const combined = packages.map(pkg => {
      // Find the lab corresponding to the package
      const lab = labs.find(lab => lab.id === pkg.lab_name);
      // Calculate the number of tests
      const testCount = getTestCount(pkg.tests);


      return {
        ...pkg,
        labname: lab ? lab.labname : 'Unknown Lab', // Add labname to the package
        testCount: testCount, // Add test count to the package
      };
    });
    setCombinedData(combined);
  }, [labs, packages]);
  const handleLabClick=(labId)=> {
    sessionStorage.setItem('labId', labId);
    navigate('/Lab_details');

  };

  return (
    <div>
      {/* <!-- SLIDER AREA START (slider-3) --> */}
      <div className="ltn__slider-area ltn__slider-3  section-bg-1" id="section3">
        <div
          style={{ backgroundColor: "white" }}
          className="ltn__slide-one-active slick-slide-arrow-1 slick-slide-dots-1"
        >
          {/* <!-- ltn__slide-item --> */}
          <div
            className="ltn__slide-item ltn__slide-item-2 ltn__slide-item-3-normal--- ltn__slide-item-3 bg-image bg-overlay-theme-black-60---"
            data-bs-bg="img/photos/labmain7.webp"
          >
            <div className="ltn__slide-item-inner text-center">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 ">
                    <div className="slide-item-info">
                      <div className="slide-item-info-inner ltn__slide-animation">
                        <div className="slide-video mb-50 d-none">
                          <a
                            className="ltn__video-icon-2 ltn__video-icon-2-border"
                            href="https://www.youtube.com/embed/tlThdr3O5Qo"
                            data-rel="lightcase:myCollection"
                          >
                            <i className="fa fa-play"></i>
                          </a>
                        </div>
                        <h1
                          style={{
                            color: "#0A9A73",
                            fontFamily: "inherit",
                            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                          }}
                          className="slide-title animated "
                        >
                          Leading the way in Laboratory Technology
                        </h1>
                        <div className="slide-brief animated">
                          <p
                            style={{
                              color: "#0A9A73",
                              fontFamily: "inherit",
                              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                            }}
                          >
                            Every diagnosis, every treatment, crafted with
                            expertise and empathy
                          </p>
                        </div>
                        <div className="btn-wrapper animated">
                          {/* <a href="shop.html" className="theme-btn-1 btn btn-effect-1">View Details</a> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Other slide items go here */}
        </div>
      </div>
      {/* <!-- SLIDER AREA END --> */}

      {/* <!-- PRODUCT AREA START (product-item-3) --> */}
      <div className="ltn__product-area ltn__product-gutter  no-product-ratting pt-115 pb-70---">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title-area ltn__section-title-2 text-center">
                <h1
                  style={{
                    fontSize: "40px",
                    color: "black",
                    fontFamily: "inherit",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                  }}
                  className="section-title"
                >
                  LABS NEAR YOU
                </h1>
                {/* <!-- SEARCH AREA BEGIN --> */}

                <div
                  className="header-search-2"
                  style={{
                    maxWidth: "55%",
                    marginLeft: "22.5%",
                    marginTop: "5%",
                    marginRight: "22.5%",
                  }}
                >
                  <form id="#123" method="get" action="#">
                    <input type="text" name="search" placeholder="Search here..." />
                    <button type="submit">
                      <span>
                        <i className="icon-search"></i>
                      </span>
                    </button>
                  </form>
                </div>
                {/* <!-- SEARCH AREA END --> */}
              </div>
            </div>
          </div>
          <div className="row ltn__tab-product-slider-one-active--- slick-arrow-1">
  {labs.map((lab, index) => (
    <div
      key={index}
      className="col-lg-4 col-md-6 col-sm-12"
      style={{ marginBottom: "20px", padding: "0 10px" }}
    >
      <div
        style={{
          backgroundColor: "white",
          textAlign: "center",
          border: "1px solid #ddd",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "calc(100% - 40px)", // Adjust width from both ends
          height: "450px", // Set a fixed height for the card
          margin: "0 auto", // Center align the cards
          overflow: "hidden",
          boxSizing: "border-box", // Include padding and border in the element's total width and height
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between", // Push content to the top and bottom
        }}
        className="ltn__product-item ltn__product-item-3"
      >
        {/* Image Section */}
        <div
          style={{
            width: "100%",
            height: "75%", // Increased height for image section
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <a
            onClick={() => handleLabClick(lab.id)}
            className="zoomable"
            style={{ cursor: "pointer", width: "100%", height: "100%" }}
          >
            <img
              src={`${BASE_URL}/${lab.profile_pic}`}
              alt={lab.labname}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover", // Ensure the image covers the entire container
                objectPosition: "center", // Center the image within the container
              }}
            />
          </a>
        </div>

        {/* Text Section */}
        <div
          style={{
            padding: "15px",
            textAlign: "center",
          }}
        >
          <h2 className="product-title" style={{ margin: "5px 0" }}>
            <a href="product-details.html">{lab.labname}</a>
          </h2>
          <div className="product-price" style={{ marginTop: "5px" }}>
            <span>
              <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: "5px" }} />
              <a>{lab.city}, {lab.state}</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>






<div className="ltn__blog-area pt-115 pb-70" id="section2">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="section-title-area ltn__section-title-2--- text-center">
          <h1 style={{ color: "black", textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', marginBottom: '5%' }} className="section-title">
            POPULAR PACKAGES
          </h1>
        </div>
      </div>
    </div>
    <div className="row ltn__tab-product-slider-one-active--- slick-arrow-1">
      {combinedData.map((pkg, index) => (
        <div key={index} className="col-lg-4 col-md-6 col-sm-12" style={{ marginBottom: "20px", padding: "0 10px" }}>
          <div style={{
            backgroundColor: "white",
            textAlign: "center",
            border: "1px solid #ddd",
            // borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            width: "calc(100% - 40px)", // Adjust width from both ends
            height: "auto", // Height adjusted to fit content
            margin: "0 auto", // Center align the cards
            overflow: "hidden",
            boxSizing: "border-box", // Include padding and border in the element's total width and height
            display: "flex",
            flexDirection: "column"
          }} className="ltn__blog-item ltn__blog-item-3">
            <div style={{
              width: "100%",
              height: "50%", // Adjust height proportionally
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              flexShrink: 0,
            }} className="ltn__blog-img">
              <a href="blog-details.html">
                <img
                  src={`${BASE_URL}/${pkg.packageimage}`}
                  alt="#"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
              </a>
            </div>
            <div
              className="ltn__blog-brief mt-10"
              style={{
                padding: "15px",
                width: "100%",  // Ensures full width inside the card
                textAlign: "center",
                flexGrow: 1, // Allows the section to take up available space
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between", // Ensures content is spaced between the top and bottom
                height: "100%",
              }}
            >
              <div className="ltn__blog-meta">
                <ul style={{ padding: 0, listStyle: "none", margin: 0 }}>
                  <li className="ltn__blog-author">
                    <a href="#">
                      <i className="far fa-user"></i>{pkg.labname}
                    </a>
                  </li>
                  <li className="ltn__blog-tags">
                    <a href="#">
                      <i className="fas fa-tags"></i>{pkg.testCount} Tests included
                    </a>
                  </li>
                </ul>
              </div>

              <div className="ltn__blog-meta-btn">
                <div className="ltn__blog-meta">
                  <ul style={{ padding: 0, listStyle: "none", margin: 0 }}>
                    <li className="ltn__blog-date">
                      <i className="fas fa-rupee-sign" style={{ color: "green" }}></i>
                      {pkg.price}
                    </li>
                  </ul>
                </div>
                <div className="ltn__blog-btn">
                            <a href="blog-details.html">Book Now</a>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
             
          
         
       
      ))}
    </div>
  </div>
</div>





        </div>
      </div>
    </div>
  );
}

export default Home;