import React, { useState, useMemo } from 'react'
import { Container, Row, Col, Table, Form } from 'react-bootstrap';
import { useProvider } from './useProvider';


const ProductList = () => {
    const { products } = useProvider();
    const [search, setSearch] = useState("");
    const [view, setView] = useState({});

    // Thêm state này vào đầu component
    const [reviewerName, setReviewerName] = useState("");
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(1);
    const [errors, setErrors] = useState({});

    const handleSubmit = () => {
        const newErrors = {};
        if (!reviewerName.trim()) newErrors.reviewerName = "Reviewer Name is required";
        if (!comment.trim()) newErrors.comment = "Comment is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const newReview = {
            reviewerName,
            comment,
            rating,
            date: new Date().toISOString(),
        };

        // Cập nhật reviews vào view
        setView((prev) => ({
            ...prev,
            reviews: [...(prev.reviews || []), newReview],
        }));

        alert("Add Review successfully!");
        setReviewerName("");
        setComment("");
        setRating(1);
        setErrors({});
    };

    const handleClearReviews = () => {
        setView((prev) => ({ ...prev, reviews: [] }));
    };

    const filterProduct = useMemo(() => {
        return products?.filter((p) => {
            const matchSearch =
                search.length > 0
                    ? p.title.toLowerCase().startsWith(search.toLowerCase())
                    : true;
            return matchSearch;
        });
    }, [search, products]);
    return (
        <Container>
            <h1>Product List</h1>
            <Row>

                <Col xs={6} >
                    <Form.Control
                        placeholder='Enter title search...'
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Table striped bordered hover style={{ marginTop: "20px" }}>
                        <thead>
                            <tr>
                                <td>Id</td>
                                <td>Title</td>
                                <td>Category</td>
                                <td>Price</td>
                                <td>Fuctions</td>
                            </tr>
                        </thead>

                        <tbody>
                            {filterProduct?.map((p) => (
                                <tr>
                                    <td>{p.id}</td>
                                    <td>{p.title}</td>
                                    <td>{p.category}</td>
                                    <td>{p.price}</td>
                                    <td><button onClick={() => { setView(p) }}>View Details</button></td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>
                </Col>

                <Col xs={6} >
                    <h4>Reviews details:</h4>
                    {view && view.id ? (
                        <Container>
                            <p><strong>Product ID:</strong> {view.id}</p>
                            <p><strong>Title:</strong> {view.title}</p>
                            <p><strong>Category:</strong> {view.category}</p>
                            <p><strong>Price:</strong> ${view.price}</p>

                            <hr />
                            <strong>Add a new Review</strong>

                            <Form.Group className="mt-2">
                                <Form.Label>Reviewer Name</Form.Label>
                                <Form.Control
                                    placeholder="Enter Reviewer's name"
                                    value={reviewerName}
                                    onChange={(e) => setReviewerName(e.target.value)}
                                />
                                {errors.reviewerName && (
                                    <span style={{ color: "red" }}>{errors.reviewerName}</span>
                                )}
                            </Form.Group>

                            <Form.Group className="mt-2">
                                <Form.Label>Comment</Form.Label>
                                <Form.Control
                                    placeholder="Enter comment"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                {errors.comment && (
                                    <span style={{ color: "red" }}>{errors.comment}</span>
                                )}
                            </Form.Group>

                            <Form.Group className="mt-2 d-flex align-items-center gap-3">
                                <Form.Label className="mb-0">Rating</Form.Label>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Form.Check
                                        key={star}
                                        inline
                                        type="radio"
                                        label={star}
                                        name="rating"
                                        checked={rating === star}
                                        onChange={() => setRating(star)}
                                    />
                                ))}
                            </Form.Group>

                            <button className="mt-2" onClick={handleSubmit}>Send Review</button>
                            <hr />


                            <Table bordered>
                                <thead>
                                    <tr>
                                        <th>ReviewerName</th>
                                        <th>Comment</th>
                                        <th>Date</th>
                                        <th>Rating</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {view.reviews?.map((review, index) => (
                                        <tr key={index}>
                                            <td>{review.reviewerName}</td>
                                            <td>{review.comment}</td>
                                            <td>{new Date(review.date).toLocaleDateString()}</td>
                                            <td>{review.rating}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>


                            <div className="d-flex justify-content-end">
                                <button onClick={handleClearReviews}>Clear Reviews</button>
                            </div>
                        </Container>
                    ) : (
                        <p>Please select a product!</p>
                    )}
                </Col>
            </Row>

        </Container >
    )
}

export default ProductList
