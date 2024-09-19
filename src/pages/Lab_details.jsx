import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { BASE_URL } from '../baseurl';
import { useParams } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../App.css';



function Lab_details() {
    const userId = sessionStorage.getItem('Userid');
    const token = sessionStorage.getItem('access_token');
    const navigate = useNavigate();

    const [labdata, setLabdata] = useState({});
    const { labId: paramLabId} = useParams();
    const storedLabId = sessionStorage.getItem('labId') || paramLabId;

    const [doctorData, setDoctorData] = useState([]);
    const [pack, setPackageData] = useState([]);
    const [labtest, setLabtest] = useState([]);
    const [showModal,setShowModal]=useState(false);
    const[labreview,setLabreview]=useState({description:"",lab:storedLabId,user:userId});
    const [reviews, setReviews] = useState([]);
    const [showMessage,setShowMessage]=useState(false);
    console.log(labreview);





    //  const navigate = useNavigate();
    useEffect(() => {
        // const labId = sessionStorage.getItem('labId');
    
        if (storedLabId) {
            const fetchLabDetails = async () => {
                try {
                    const [labResponse, doctorResponse, packageResponse, testResponse] = await Promise.all([
                        axios.get(`${BASE_URL}/user/lab-detail/${storedLabId}/`),
                        axios.get(`${BASE_URL}/user/lab-doctor/${storedLabId}/`),
                        axios.get(`${BASE_URL}/user/lab-package/${storedLabId}/`),
                        axios.get(`${BASE_URL}/user/lab-tests/${storedLabId}/`),
                        // axios.get(`${BASE_URL}/user/lab-allreview/${storedLabId}/`)
                        
                    
                    ]);
                    setLabdata(labResponse.data);
                    console.log('Lab Response',labResponse.data);
                    setDoctorData(doctorResponse.data);
                    setPackageData(packageResponse.data.map(pkg => ({
                        ...pkg,
                        testCount: pkg.tests ? pkg.tests.length : 0,
                    })));
                    setLabtest(testResponse.data);
                    fetchLabReviewsWithUserEmails();

                  
                    
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchLabDetails();
            
        } else {
            console.error('No lab ID found in session storage');
        }
    }, [storedLabId]);
    const fetchLabReviewsWithUserEmails = async () => {
        try {
            // Fetch lab reviews
            const response = await axios.get(`${BASE_URL}/user/lab-allreview/${storedLabId}/`);
            console.log('Lab reviews:', response.data);
    
            // Extract reviews from the response
            const fetchedReviews = response.data;
    
            // Fetch user details for each review and include email
            const reviewsWithUserDetails = await Promise.all(
                fetchedReviews.map(async (review) => {
                    try {
                        // Fetch user data for the review's user ID
                        const userResponse = await axios.get(`${BASE_URL}/user/userdata/${review.user}/`);
    
                        // Log the user data response to the console
                        console.log(`User data for user ID ${review.user}:`, userResponse.data);
    
                        // Extract email from user data
                        const userEmail = userResponse.data.email;
    
                        return {
                            ...review,
                            email: userEmail || 'Unknown Email', // Assign the fetched email or 'Unknown Email' as a fallback
                        };
                    } catch (userError) {
                        console.error(`An error occurred while fetching data for user ID ${review.user}:`, userError);
                        return {
                            ...review,
                            email: 'Unknown Email', // Fallback email if there was an error
                        };
                    }
                })
            );
    
            // Set the reviews with user details to state
            setReviews(reviewsWithUserDetails);
    
        } catch (error) {
            console.error("An error occurred while fetching the lab reviews:", error);
        }
    };
    
    
                   
                  
            
                  

    const handleInputChange = (e) => {
        setLabreview({ ...labreview, description: e.target.value });
    }; 
    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (!token) {
            alert('Login required');
            navigate('/userlogin') ;// Show alert if token is missing
            return; // Prevent further execution
        }

        // Handle the review submission logic here (e.g., API call)
        // Assuming the review is successfully submitted
        setShowModal(false); // Close the review form modal
        setShowMessage(true); // Show the confirmation message modal
   
        
    
        try {
            const response = await axios.post(`${BASE_URL}/user/lab-review/`, labreview, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.status === 201) {  // Assuming a 201 status for successful creation
                // Append the new review to the existing reviews
                setReviews((prevReviews) => [...prevReviews, response.data]);
    
                // Reset the form and close the modal
                setLabreview({ description: "", lab: storedLabId, user: userId });
                setShowModal(false);
                setShowMessage(true); 
                fetchLabReviewsWithUserEmails();
                // fetchReviews();
             
                // console.log("Lab id:",labreview.lab);


    
                console.log('Review submitted successfully:', response.data);
            }
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };
                
  
            
        
            // Handle form submission for lab review
           

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseMessage = () => {
        setShowMessage(false);
        navigate('/login'); // Redirect to login page when OK is clicked
    };

                
               


                   




    return (
        <>

            {/* <!-- BREADCRUMB AREA START --> */}
            <div className="ltn__breadcrumb-area text-left bg-overlay-white-20 bg-image" data-bs-bg="img/photos/rare.png">
                <div className="container">
                    <div className="row">

                    </div>
                </div>
            </div>
            {/* <!-- BREADCRUMB AREA END --> */}

            {/* <!-- LAB IMAGE AREA START --> */}
            <div className="ltn__shop-details-area pb-85">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="ltn__shop-details-inner mb-60">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="ltn__shop-details-img-gallery">
                                            <div className="ltn__shop-details-large-img">
                                                <div className="single-large-img">
                                                    <a href="img/photos/labdetails4.webp" data-rel="lightcase:myCollection">
                                                        <img src={`${BASE_URL}/${labdata.profile_pic}`} alt="Image" />
                                                    </a>
                                                </div>
                                                {/* <div className="single-large-img">
                                                    <a href="img/photos/labdetails3.webp" data-rel="lightcase:myCollection">
                                                        <img src="img/photos/labs9.jpg" alt="Image" />
                                                    </a>
                                                </div>
                                                <div className="single-large-img">
                                                    <a href="img/photos/labdetails5.webp" data-rel="lightcase:myCollection">
                                                        <img src="img/photos/labdetails5.webp" alt="Image" />
                                                    </a>
                                                </div>
                                                <div className="single-large-img">
                                                    <a href="img/photos/labdetails6.jpg" data-rel="lightcase:myCollection">
                                                        <img src="img/photos/labdetails6.jpg" alt="Image" />
                                                    </a>
                                                </div>
                                                <div className="single-large-img">
                                                    <a href="img/photos/labdetails7.jpg" data-rel="lightcase:myCollection">
                                                        <img src="img/photos/labdetails7.jpg" alt="Image" />
                                                    </a>
                                                </div>
                                                <div className="single-large-img">
                                                    <a href="img/photos/labdetails8.webp" data-rel="lightcase:myCollection">
                                                        <img src="img/photos/labdetails8.webp" alt="Image" />
                                                    </a>
                                                </div>
                                                <div className="single-large-img">
                                                    <a href="img/photos/labdetails9.jpg" data-rel="lightcase:myCollection">
                                                        <img src="img/photos/labdetails9.jpg" alt="Image" />
                                                    </a>
                                                </div> */}
                                            </div>
                                            {/* <div className="ltn__shop-details-small-img slick-arrow-2">
                                        <div className="single-small-img">
                                            <img src="img/photos/labdetails4.webp" alt="Image"/>
                                        </div>
                                        <div className="single-small-img">
                                            <img src="img/photos/labdetails3.webp" alt="Image"/>
                                        </div>
                                        <div className="single-small-img">
                                            <img src="img/photos/labdetails5.webp" alt="Image"/>
                                        </div>
                                        <div className="single-small-img">
                                            <img src="img/photos/labdetails6.jpg" alt="Image"/>
                                        </div>
                                        <div className="single-small-img">
                                            <img src="img/photos/labdetails7.jpg" alt="Image"/>
                                        </div>
                                        <div className="single-small-img">
                                            <img src="img/photos/labdetails8.webp" alt="Image"/>
                                        </div>
                                        <div className="single-small-img">
                                            <img src="img/photos/labdetails9.jpg" alt="Image"/>
                                        </div>
                                    </div> */}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="modal-product-info shop-details-info pl-0">
                                            <div style={{ color: 'white' }} className="product-ratting">
                                                <ul >
                                                    <li><a style={{ color: 'seagreen' }} href="#"><i className="fas fa-star"></i></a></li>
                                                    <li><a style={{ color: 'seagreen' }} href="#"><i className="fas fa-star"></i></a></li>
                                                    <li><a style={{ color: 'seagreen' }} href="#"><i className="fas fa-star"></i></a></li>
                                                    <li><a style={{ color: 'seagreen' }} href="#"><i className="fas fa-star-half-alt"></i></a></li>
                                                    <li><a style={{ color: 'seagreen' }} href="#"><i className="far fa-star"></i></a></li>
                                                    <li className="review-total"> <a style={{ color: 'seagreen', fontSize: '15px', marginLeft: '10px' }} href="#"> ( 95 Reviews )</a></li>
                                                </ul>
                                            </div>
                                            <h1 style={{ fontSize: '45px', color: 'black', fontFamily: 'inherit', fontWeight: 'bold' }}>{labdata.labname}</h1>
                                            <div className="product-price">
                                                <p style={{ color: '#0a9a73', fontSize: '25px' }}>{labdata.city},{labdata.state}</p>
                                                <p style={{ fontWeight: 'bold', fontFamily: 'inherit', color: 'black', fontSize: '15px', marginTop: '-5px', letterSpacing: '1px', }}>Email:{labdata.email}</p>
                                                <p style={{ fontWeight: 'bold', fontFamily: 'inherit', color: 'black', fontSize: '15px', marginTop: '-5px', letterSpacing: '1px', lineHeight: '0.2' }}>Phone: {labdata.contact}</p>
                                                <div className="ltn__social-media" style={{ fontWeight: 'bold', fontFamily: 'inherit', color: 'black', fontSize: '15px', marginTop: '-5px', letterSpacing: '1px' }}>
                                                    <ul>
                                                        <li>Share:</li>
                                                        <li><a href="#" title="Facebook"><i className="fab fa-facebook-f"></i></a></li>
                                                        <li><a href="#" title="Twitter"><i className="fab fa-twitter"></i></a></li>
                                                        <li><a href="#" title="Linkedin"><i className="fab fa-linkedin"></i></a></li>
                                                        <li><a href="#" title="Instagram"><i className="fab fa-instagram"></i></a></li>

                                                    </ul>
                                                </div>
                                            </div>
                                            <div style={{ color: 'black' }} className="modal-product-meta ltn__product-details-menu-1">
                                                <ul>
                                                    <li>
                                                        <strong style={{ fontWeight: 'bold', fontFamily: 'inherit', color: 'black' }}>Open Hours:</strong>
                                                        <span style={{ fontWeight: 'bold', fontFamily: 'inherit', color: '#0a9a73' }}>
                                                            {/* <a href="#">face-mask</a> */}
                                                            10:00 AM - 6:00 PM
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                            {/* <div className="ltn__product-details-menu-2">
                                        <ul>
                                            <li>
                                                <div className="cart-plus-minus">
                                                    <input type="text" value="02" name="qtybutton" className="cart-plus-minus-box"/>
                                                </div>
                                            </li>
                                            <li>
                                                <a href="#" className="theme-btn-1 btn btn-effect-1" title="Add to Cart" data-bs-toggle="modal" data-bs-target="#add_to_cart_modal">
                                                    <i className="fas fa-shopping-cart"></i>
                                                    <span>ADD TO CART</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div> */}
                                            <div className="ltn__product-details-menu-3">
                                                <ul>
                                                    <li>
                                                        <a href="#" className="" title="Wishlist" data-bs-toggle="modal" data-bs-target="#liton_wishlist_modal">
                                                            <i style={{ color: 'black' }} className="far fa-heart"></i>
                                                            <span style={{ marginBottom: '2px', color: '#0a9a73' }}>Add to Wishlist</span>
                                                        </a>
                                                    </li>
                                                    {/* <li>
                                                <a href="#" className="" title="Compare" data-bs-toggle="modal" data-bs-target="#quick_view_modal">
                                                    <i className="fas fa-exchange-alt"></i>
                                                    <span>Compare</span>
                                                </a>
                                            </li> */}
                                                </ul>
                                            </div>
                                            <hr />
                                           
                                            <hr />

                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Shop Tab Start --> */}

                            {/* <!-- Shop Tab End --> */}
                        </div>
                        <div className="col-lg-4">
                            <aside className="sidebar ltn_shop-sidebar ltn_right-sidebar">
                                {/* <!-- Top Rated Product Widget --> */}
                                <div className="widget ltn__top-rated-product-widget">
                                    <h4 style={{ color: 'black', fontFamily: 'inherit', fontWeight: 'bold' }} className="ltn_widget-title ltn_widget-title-border">SPECIALISED DOCTORS</h4>
                                    <ul>
                                        {doctorData.map((doctor, index) => (

                                            <li key={index}>
                                                <div className="top-rated-product-item clearfix">
                                                    <div className="top-rated-product-img">
                                                        <a href="product-details.html"><img src={`${BASE_URL}/${doctor.doctorimage}`} alt="#" /></a>
                                                    </div>
                                                    <div className="top-rated-product-info">
                                               
                                                        <h6><a style={{ color: 'black', fontFamily: 'inherit', fontWeight: 'bold', fontSize: '18px', marginLeft: '6%' }} href="product-details.html">{doctor.doctorname}</a></h6>
                                                        <div className="product-price">
                                                            <img src='img/photos/medi.png' style={{ maxWidth: '12px', marginRight: '5px', marginBottom: '3px', fontFamily: 'inherit' }} />{doctor.specialiazation}
                                                            <p style={{ fontSize: '12px', color: 'teal', fontFamily: 'inherit', marginLeft: '4%' }}>{doctor.qualification}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}




                                    </ul>
                                </div>

                            </aside>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- DOCTOR DETAILS AREA END --> */}






            {/* <!-- DOCTOR DETAILS AREA END --> */}
            <div className="ltn__product-slider-area ltn__product-gutter pb-70">
    <div className="container">
        <div className="row">
            <div className="col-lg-12">
                <div className="section-title-area ltn__section-title-2">
                    <h1 className="title-2" style={{ fontSize: '35px', fontFamily: 'inherit', fontWeight: 'bold', color: 'black' }}>HEALTH PACKAGES</h1>
                </div>
            </div>
        </div>
        <div className="row ltn__related-product-slider-one-active slick-arrow-1" style={{ position: "relative", top: "5px" }}> {/* Adjust the top value to your liking */}
            {pack.map((pkg, index) => (
                <div key={index} className="col-lg-3 col-md-6 col-sm-12" style={{ marginBottom: "20px" }}>
                    <div className="ltn__product-item ltn__product-item-3 text-center" style={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #ddd', 
                        borderRadius: '0', 
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'space-between', 
                        height: '500px' // Increased height for consistency
                    }}>
                        <div className="product-img" style={{
                            overflow: 'hidden',
                            height: '60%', // Increased to 60% of the total height
                        }}>
                            <a href="product-details.html">
                                <img 
                                    src={`${BASE_URL}/${pkg.packageimage}`} 
                                    alt="#" 
                                    style={{
                                        width: '100%', 
                                        height: '100%', 
                                        objectFit: 'cover' // Ensure the image covers the container
                                    }} 
                                />
                            </a>
                        </div>
                        <div className="product-info" style={{
                            padding: '15px',
                            flex: '1', // Allows the info section to take up remaining space
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}>
                            <h2 className="product-title">
                                <a href="product-details.html">{pkg.packagename}</a>
                            </h2>
                            <div className="product-price" style={{ color: 'green' }}>
                                <span>{pkg.testCount} Tests included</span>
                            </div>
                            <div className="ltn__blog-meta-btn">
                                <div className="ltn__blog-meta">
                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                        <li className="ltn__blog-date">
                                            <i className="fas fa-rupee-sign" style={{ color: 'green' }}></i> {pkg.price}
                                        </li>
                                    </ul>
                                </div>
                                <div className="ltn__blog-btn">
                                    <a href="product-details.html">Book Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
</div>






            {/* <!-- PACKAG AREA END --> */}

            {/* ######## TESTS ###################### */}
            <div className="container">
    <div className="row">
        <div className="col-lg-12">
            <div className="section-title-area ltn__section-title-2">
                <h1 className="title-2" style={{ fontSize: '35px', fontFamily: 'inherit', fontWeight: 'bold', color: 'black' }}>SPECIAL TESTS</h1>
            </div>
        </div>
    </div>
    <div className="row">
        {/* Iterate over the labtest array */}
        {labtest.map((test, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-12 mb-4">
                <div className="ltn__small-product-item" style={{
                    backgroundColor: 'white', 
                    border: '1px solid #ddd', 
                    borderRadius: '0', 
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                    padding: '15px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    height: '100%'
                }}>
                    <div className="small-product-item-info">
                        <h2 className="product-title">
                            <a href="product-details.html">{test.testname}</a>
                        </h2>
                        <div>{test.description}</div>
                        <div className="ltn__blog-meta-btn" style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div className="ltn__blog-meta">
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    <li className="ltn__blog-date">
                                        <i className="fas fa-rupee-sign" style={{ color: 'green' }}></i> {test.testprice}
                                    </li>
                                </ul>
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <a href="/booking">
                                    <button type="button" className="btn-3 btn-success">BOOK NOW</button>
                                </a>
                                <a href={`/add-review/${test.id}`}>
                                    <button type="button" className="btn-3 btn-success">ADD REVIEW</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
    <div className="container">
    <div className="row ">
        <div className="col-lg-12">
        <div className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
    <h1 className="title-2" style={{ fontSize: '35px', fontFamily: 'inherit', fontWeight: 'bold', color: 'black', marginBottom: '0', marginRight: '10px' }}>
        REVIEWS
    </h1>
    <Button variant="primary" onClick={handleShowModal} style={{ marginLeft: '10px', height: 'fit-content' }}>
        Add Your Lab Review
    </Button>
</div>



            {/* Display existing reviews */}
            <div className="reviews-container p-3 mb-4" style={{ border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9', width: '90%', // Adjust the width as needed
        maxWidth: '800px',
        marginLeft: '0', 
        marginRight: 'auto', 
        padding: '15px', 
        boxSizing: 'border-box',  
        maxWidth: '800px', 
        margin: '0 ', 
        padding: '15px' }}>
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.id} className="review p-2 mb-2" style={{ backgroundColor: '#fff', borderRadius: '4px' }}>
                            <p style={{ color: 'black' }}><strong>{review.email}</strong>: {review.description}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet. Be the first to review!</p>
                )}
            </div>

            {/* Modal for submitting a review */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Submit Your Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmitReview}>
                        <div className="form-group">
                            <label htmlFor="description">Your Review:</label>
                            <textarea
                                id="description"
                                name="description"
                                className="form-control"
                                value={labreview.description}
                                onChange={handleInputChange}
                                required
                            ></textarea>
                        </div>
                        <div style={{ marginTop: '20px', textAlign: 'right' }}>
                            <Button
                                variant="primary"
                                type="submit"
                                style={{
                                    backgroundColor: 'grey',
                                    borderColor: 'grey',
                                }}
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            {/* Confirmation Message Box */}
            <Modal show={showMessage} onHide={handleCloseMessage}>
                <Modal.Body>
                    <p>Your review has been submitted successfully!</p>
                    <Button
                        variant="primary"
                        onClick={handleCloseMessage}
                        style={{
                            backgroundColor: 'grey',
                            borderColor: 'grey',
                        }}
                    >
                        OK
                    </Button>
                </Modal.Body>
            </Modal>
       

                    {/* Lab Review Form */}
                  
                </div>
            </div>
        </div>
</div>




          



            
        </>
    )

}
export default Lab_details;