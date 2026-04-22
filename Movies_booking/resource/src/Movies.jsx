import React, { useState, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  ListGroup,
} from "react-bootstrap";
import { useProvider } from "./useProvider";

const Movies = () => {
  const { movies } = useProvider();
  const genre = [...new Set(movies?.map((m) => m.genre))];

  const releaseYear = [...new Set(movies?.map((m) => m.releaseYear))].sort(
    (a, b) => b - a,
  );

  const [selectGenre, setSelectGenre] = useState("");
  const [relYear, setRelYear] = useState(-1);
  const [search, setSearch] = useState("");

  const filterMovies = useMemo(() => {
    return movies?.filter((m) => {
      const matchSearch =
        search.length > 0
          ? m.title.toLowerCase().startsWith(search.toLowerCase())
          : true;
      const matchGenre =
        selectGenre.length > 0 ? m.genre === selectGenre : true;
      const matchYear = relYear > 0 ? m.releaseYear === Number(relYear) : true;

      return matchGenre && matchSearch && matchYear;
    });
  }, [selectGenre, relYear, search, movies]);

  return (
    <Container>
      <h1 style={{ display: "flex", justifyContent: "center" }}>Movies List</h1>
      <Row>
        <Col xs={3}>
          <Form.Select onChange={(e) => setSelectGenre(e.target.value)}>
            <option value="">All Genres</option>
            {genre?.map((g) => (
              <option value={g}>{g}</option>
            ))}
          </Form.Select>
        </Col>
        <Col xs={3}>
          <Form.Select onChange={(e) => setRelYear(e.target.value)}>
            <option value="">All Year</option>
            {releaseYear?.map((g) => (
              <option value={g}>{g}</option>
            ))}
          </Form.Select>
        </Col>
        <Col xs={6}>
          <Form.Control
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Enter tilte to search"
          />
        </Col>
      </Row>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          href="http://localhost:3000/booking/create"
          variant="success"
          style={{ margin: "20px 0" }}
        >
          Book Ticket
        </Button>
      </div>

      <Row>
        {filterMovies
          ?.sort((a, b) => b.rating - a.rating)
          .map((m) => (
            <Col xs={3}>
              <Card style={{ marginBottom: "20px" }}>
                <Card.Img
                  variant="top"
                  src={`/images/${m.poster}`}
                  height={180}
                />
                <ListGroup>
                  <ListGroup.Item>
                    <strong>{m.title}</strong>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Genre: </strong>
                    {m.genre}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Release year: </strong>
                    {m.releaseYear}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Duration: </strong>
                    {m.duration}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Rating: </strong>
                    {m.rating}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Booked: </strong>
                    {m.booked}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Movies;
