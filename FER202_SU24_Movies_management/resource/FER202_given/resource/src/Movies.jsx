import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useProvider } from "./useProvider";

const Movies = () => {
  const { producers, movies, directors, stars } = useProvider();
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedProducerId, setSelectedProducerId] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const genre = params.get("genre");
    const producerId = params.get("producer-id");
    setSelectedGenre(genre);
    setSelectedProducerId(producerId ? parseInt(producerId) : null);
  }, []);

  const genres = [...new Set(movies?.flatMap((m) => m.genres || []))];

  const filteredMovies = movies?.filter((m) => {
    const genreMatch = !selectedGenre || m.genres?.includes(selectedGenre);
    const producerMatch =
      !selectedProducerId || m.producer === selectedProducerId;
    return genreMatch && producerMatch;
  });

  return (
    <Container>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        React Application
      </h1>

      <hr />
      <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
        {genres?.map((g) => (
          <a key={g} href={`?genre=${g}`}>
            {g}
          </a>
        ))}
      </div>
      <hr />
      <Row>
        <Col xs={2}>
          <h2>Producers</h2>

          {producers?.map((p) => (
            <li key={p.id} style={{ marginLeft: "40px" }}>
              <a href={`?producer-id=${p.id}`}>{p.name}</a>
            </li>
          ))}
        </Col>

        <Col xs={10}>
          <h2 style={{ display: "flex", justifyContent: "center" }}>
            List of Movies
          </h2>
          <div style={{ marginBottom: "15px", textAlign: "left" }}>
            <a href="/movie" style={{ fontSize: "14px", fontWeight: "500" }}>
              Show all movies
            </a>
          </div>
          <table
            style={{
              width: "100%",
              border: "1px solid #ddd",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    padding: "10px",
                    textAlign: "left",
                    fontWeight: "bold",
                    border: "1px solid #ddd",
                  }}
                >
                  ID
                </th>
                <th
                  style={{
                    padding: "10px",
                    textAlign: "left",
                    fontWeight: "bold",
                    border: "1px solid #ddd",
                  }}
                >
                  Title
                </th>
                <th
                  style={{
                    padding: "10px",
                    textAlign: "left",
                    fontWeight: "bold",
                    border: "1px solid #ddd",
                  }}
                >
                  Release
                </th>
                <th
                  style={{
                    padding: "10px",
                    textAlign: "left",
                    fontWeight: "bold",
                    border: "1px solid #ddd",
                  }}
                >
                  Description
                </th>
                <th
                  style={{
                    padding: "10px",
                    textAlign: "left",
                    fontWeight: "bold",
                    border: "1px solid #ddd",
                  }}
                >
                  Producer
                </th>
                <th
                  style={{
                    padding: "10px",
                    textAlign: "left",
                    fontWeight: "bold",
                    border: "1px solid #ddd",
                  }}
                >
                  Director
                </th>
                <th
                  style={{
                    padding: "10px",
                    textAlign: "left",
                    fontWeight: "bold",
                    border: "1px solid #ddd",
                  }}
                >
                  Genres
                </th>
                <th
                  style={{
                    padding: "10px",
                    textAlign: "left",
                    fontWeight: "bold",
                    border: "1px solid #ddd",
                  }}
                >
                  Stars
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredMovies?.map((movie, index) => (
                <tr
                  key={movie.id}
                  style={{
                    borderBottom: "1px solid #ddd",
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                  }}
                >
                  <td
                    style={{
                      padding: "10px",
                      verticalAlign: "top",
                      border: "1px solid #ddd",
                    }}
                  >
                    {index + 1}
                  </td>

                  <td
                    style={{
                      padding: "10px",
                      verticalAlign: "top",
                      border: "1px solid #ddd",
                    }}
                  >
                    {movie.title}
                  </td>

                  <td
                    style={{
                      padding: "10px",
                      verticalAlign: "top",
                      border: "1px solid #ddd",
                    }}
                  >
                    {new Date(movie.release).toLocaleDateString("en-US", {
                      month: "2-digit",
                      day: "2-digit",
                      year: "2-digit",
                    })}
                  </td>

                  <td
                    style={{
                      padding: "10px",
                      verticalAlign: "top",
                      border: "1px solid #ddd",
                    }}
                  >
                    {movie.description}
                  </td>

                  <td
                    style={{
                      padding: "10px",
                      verticalAlign: "top",
                      border: "1px solid #ddd",
                    }}
                  >
                    {producers?.find((p) => p.id === movie.producer)?.name}
                  </td>

                  <td
                    style={{
                      padding: "10px",
                      verticalAlign: "top",
                      border: "1px solid #ddd",
                    }}
                  >
                    {directors?.find((d) => d.id === movie.director)?.fullname}
                  </td>

                  <td
                    style={{
                      padding: "10px",
                      verticalAlign: "top",
                      border: "1px solid #ddd",
                    }}
                  >
                    {movie.genres?.map((g, i) => (
                      <div key={i}>{g}</div>
                    ))}
                  </td>

                  <td
                    style={{
                      padding: "10px",
                      verticalAlign: "top",
                      border: "1px solid #ddd",
                    }}
                  >
                    {movie.stars?.map((starId, i) => {
                      const star = stars?.find((s) => s.id === starId);
                      return (
                        <div key={starId}>
                          {i + 1} - {star?.fullname}
                        </div>
                      );
                    })}
                    <Link
                      to={`/movie/${movie.id}/add-stars`}
                      style={{ color: "#0066cc", fontSize: "12px" }}
                    >
                      Add stars
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </Container>
  );
};

export default Movies;
