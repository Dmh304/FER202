import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useProvider } from "./useProvider";
import axios from "axios";

const Booking = () => {
  const { user, movies } = useProvider();

  const [form, setForm] = useState({
    userId: "",
    movieId: "",
    showTime: "",
    seats: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  // 🔥 Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // 🔥 VALIDATE
  const validate = () => {
    if (
      !form.userId ||
      !form.movieId ||
      !form.showTime ||
      !form.seats ||
      Number(form.seats) <= 0
    ) {
      return "All fields are required and seats must be at least 1.";
    }
    return "";
  };

  // 🔥 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    try {
      // 1. Save booking
      await axios.post("http://localhost:9999/bookings", {
        userId: form.userId,
        movieId: form.movieId,
        showTime: form.showTime,
        seats: Number(form.seats),
      });

      // 2. Update booked count
      const movie = movies.find((m) => m.id === form.movieId);

      await axios.patch(`http://localhost:9999/movies/${form.movieId}`, {
        booked: (movie.booked || 0) + Number(form.seats),
      });

      alert("Booking successful!");
      navigate("/movies");
    } catch (err) {
      console.error(err);
      setError("Something went wrong!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <h1 style={{ textAlign: "center" }}>Create Booking</h1>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <Row>
          {/* USER */}
          <Col>
            <Form.Select
              name="userId"
              value={form.userId}
              onChange={handleChange}
            >
              <option value="">Select User</option>
              {user?.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </Form.Select>
          </Col>

          {/* MOVIE */}
          <Col>
            <Form.Select
              name="movieId"
              value={form.movieId}
              onChange={handleChange}
            >
              <option value="">Select Movie</option>
              {movies?.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title}
                </option>
              ))}
            </Form.Select>
          </Col>

          {/* SHOWTIME */}
          <Col>
            <Form.Control
              type="datetime-local"
              name="showTime"
              value={form.showTime}
              onChange={handleChange}
            />
          </Col>

          {/* SEATS */}
          <Col>
            <Form.Control
              type="number"
              name="seats"
              placeholder="Seats"
              min={1}
              value={form.seats}
              onChange={handleChange}
            />
          </Col>

          {/* BUTTON */}
          <Col>
            <Button type="submit" variant="success" style={{ width: "100%" }}>
              Submit
            </Button>
          </Col>
        </Row>
      </Container>
    </form>
  );
};

export default Booking;
