import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { BASE_URL } from '../baseurl';

function Review() {
    const { id } = useParams();  // Extracting the testId from the URL
    const userId = sessionStorage.getItem('Userid');
    const token = sessionStorage.getItem('access_token');
   

    const [reviewData, setReviewData] = useState({
        test: id,
        description: "",
        user: userId
    });

    const [reviews, setReviews] = useState([]); 
    const [showModal, setShowModal] = useState(false);
    console.log(reviewData)

    // Fetch reviews when the component mounts
    useEffect(() => {
        sessionStorage.setItem('testId', id); // Store the testId in sessionStorage
        fetchReviews(); // Fetch reviews on component mount
    }, [id]);

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/user/all-testreview/${id}/`);
            console.log(response.data);
            setReviews(response.data);
            const fetchedReviews = response.data;
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

                    // Use the user ID from the review to fetch the username
                   
                  
            
         } catch (error) {
            console.error("An error occurred while fetching the reviews:", error);
        }
    };

    const handleInputChange = (e) => {
        setReviewData({
            ...reviewData,
            description: e.target.value  // Update the description based on user input
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${BASE_URL}/user/test_review/`, reviewData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201) {  // Assuming a 201 status for successful creation
                setShowModal(true);
                fetchReviews(); // Fetch the updated list of reviews after submission

                console.log("Review successfully posted!");
                console.log("Test ID:", reviewData.test);
                console.log("Response Data:", response.data);  // Log the full response data
            }
        } catch (error) {
            console.error("An error occurred while posting the review:", error);
        }
    };

    const handleClose = () => setShowModal(false);
    const handleRedirect = () => {
        setShowModal(false);
        // Add navigation or other actions after closing the modal
    };

    return (
        <div style={{ maxWidth: '690px', margin: '2% auto' }}>
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
                    ADDING REVIEW
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
                        {/* Review input field */}
                        <label htmlFor="reviewText">Add your review </label>
                        <textarea
                            id="reviewText"
                            name="description"
                            value={reviewData.description}
                            onChange={handleInputChange}
                            placeholder="Write your review here..."
                            rows="4"
                            style={{
                                width: '100%',
                                border: '1px solid #ccc',
                                padding: '10px',
                                borderRadius: '6px',
                                backgroundColor: '#f9f9f9',
                                fontFamily: 'inherit',
                                fontSize: '16px',
                            }}
                        />
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
                            POST REVIEW
                        </button>
                    </div>
                </form>
            </div>
            <div style={{ marginTop: '40px' }}>
                <h3 style={{ textAlign: 'center', fontFamily: 'inherit' }}>Reviews</h3>
                <div
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        borderRadius: '18px',
                        padding: '20px',
                    }}
                >
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <div
                                key={index}
                                style={{
                                    borderBottom: '1px solid #ccc',
                                    padding: '10px 0',
                                    fontFamily: 'inherit',
                                }}
                            >
                                <p style={{ margin: 0, fontWeight: 'bold' }}>
                                {review.email} 
                                </p>
                                <p style={{ margin: '5px 0' }}>{review.description}</p>
                            </div>
                        ))
                    ) : (
                        <p style={{ textAlign: 'center', fontFamily: 'inherit' }}>
                            No reviews yet. Be the first to review!
                        </p>
                    )}
                </div>
            </div>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your review has been posted successfully!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleRedirect}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Review;
