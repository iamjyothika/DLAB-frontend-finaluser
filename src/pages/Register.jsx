import React, { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
// import labmain5 from "./labmain5.webp";
import labmain6edit from "./labmain6.webp";
// import { faCity } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { BASE_URL } from "../baseurl";
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate=useNavigate();


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    profile_pic: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  console.log(formData);

  const handleImageChange = (e) => {
    //setImage();

    setFormData({...formData, profile_pic : e.target.files[0]})
  };

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  // const handleCheckboxChange = (event) => {
  //   const { name, checked } = event.target;
  //   setFormData({
  //     ...formData,
  //     [name]: checked,
  //   });
  // };
  


  const handleSubmit = (e) => {
    e.preventDefault();
  
    let updatedToJson = new FormData();
  
    // Append all form fields to FormData
    updatedToJson.append('name', formData.name);
    updatedToJson.append('email', formData.email);
    updatedToJson.append('contact', formData.contact);
    updatedToJson.append('address', formData.address);
    updatedToJson.append('city', formData.city);
    updatedToJson.append('state', formData.state);
    updatedToJson.append('pincode', formData.pincode);
  
    // Only append the profile_pic if it's not null
    if (formData.profile_pic) {
      updatedToJson.append('profile_pic', formData.profile_pic);
    }
  
    axios.post(`${BASE_URL}/user/register/`, updatedToJson)
      .then((response) => {
        console.log(response.data);
        navigate('/userlogin');
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  return (
    <>
      <div
        className="section5"
        id="section5"
        style={{ position: "relative", width: "100%", height: "100vh" }}
      >
        {/* Image */}
        <img
          src={labmain6edit}
          alt="background"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: "0.4",
          }}
        />

        {/* Form Container */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            width: "50%",
            marginRight: "25%",
            right: "1%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            padding: "30px",
            borderRadius: "20px",
            height: "85%",
          }}
        >
          <Form encType="multipart/form-data" onSubmit={handleSubmit}>
            <h1
              className="text-center"
              style={{ fontFamily: "Helvetica", marginTop: "12px" }}
            >
              REGISTER HERE!
            </h1>
            <Row className="mb-3 mt-4">
              <Form.Group as={Col} controlId="formGridName">
                <Form.Label style={{ fontWeight: "bold", marginLeft: "6px" }}>
                  Name
                </Form.Label>
                <Form.Control
               
                  name="name"
                  style={{ borderRadius: "8px" }}
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={(e)=>setFormData({...formData,name:e.target.value})}
                 
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label style={{ fontWeight: "bold", marginLeft: "6px" }}>
                  Email
                </Form.Label>
                <Form.Control
               
                  name="email"
                  style={{ borderRadius: "8px" }}
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={(e)=>setFormData({...formData,email:e.target.value})}
                 
                 
                />
              </Form.Group>
            </Row>

            <Row className="mb-3 mt-4">
              {/* Phone Field */}
              <Form.Group as={Col} controlId="formGridPhone">
                <Form.Label
                  style={{
                    fontWeight: "bold",
                    marginLeft: "6px",
                    color: "black",
                  }}
                >
                  Phone
                </Form.Label>
                <Form.Control
                  name="contact"
                 
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.contact}
                  onChange={(e)=>setFormData({...formData,contact:e.target.value})}
                 
                  style={{ width: "70%", borderRadius: "8px" }}
                />
              </Form.Group>

              {/* Image Upload Field */}
              <Form.Group as={Col} controlId="formGridImage">
                <Form.Label style={{ fontWeight: "bold", marginLeft: "6px" }}>
                  Upload Image
                </Form.Label>
                <Form.Control
                  name="profile_pic"
                  style={{ borderRadius: "8px" }}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3 mt-4">
              <Form.Group as={Col} controlId="formGridAddress">
                <Form.Label style={{ fontWeight: "bold", marginLeft: "6px" }}>
                  Address
                </Form.Label>
                <Form.Control
                  name="address"
                  style={{ borderRadius: "8px" }}
                  type="text"
                  placeholder="Enter address"
                  value={formData.address}
                  onChange={(e)=>setFormData({...formData,address:e.target.value})}
                 
                 
                />
              </Form.Group>
            </Row>

            <Row className="mb-3 mt-4">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label style={{ fontWeight: "bold", marginLeft: "6px" }}>
                  City
                </Form.Label>
                <Form.Control
                  name="city"
                  style={{ borderRadius: "8px" }}
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={(e)=>setFormData({...formData,city:e.target.value})}
                 
     
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label style={{ fontWeight: "bold", marginLeft: "6px" }}>
                  State
                </Form.Label>
                <Form.Control
                  name="state"
                  style={{ borderRadius: "8px" }}
                  placeholder="Enter state"
                  value={formData.state}
                  onChange={(e)=>setFormData({...formData,state:e.target.value})}
                 
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label style={{ fontWeight: "bold", marginLeft: "6px" }}>
                  PinCode
                </Form.Label>
                <Form.Control
                  name="pincode"
                  style={{ borderRadius: "8px" }}
                  placeholder="Enter pincode"
                 value={formData.pincode}
                 onChange={(e)=>setFormData({...formData,pincode:e.target.value})}
                 
                />
              </Form.Group>
            </Row>

            <Button
              variant="success"
              
              type="submit"
              style={{
                marginLeft: "45%",
                borderRadius: "3px",
                padding: "5px 10px",
                marginTop: "30px",
              }}
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Register;
