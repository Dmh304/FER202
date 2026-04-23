import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Table, Button } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useProvider } from "./useProvider";
import axios from "axios";

const Grade = () => {
    const { students, subjects } = useProvider();
    const navigate = useNavigate();
    const { id } = useParams(); // "HE1710003"

    const [search, setSearch] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [grades, setGrades] = useState([]);
    const [grade, setGrade] = useState("");
    const [explanation, setExplanation] = useState("");

    const currentStudent = students?.find((s) => s.studentId === id);

    const fetchGrades = () => {
        if (id) {
            axios.get(`http://localhost:9999/evaluations?studentId=${id}`)
                .then((res) => setGrades(res.data))
                .catch((err) => console.error(err));
        }
    };

    useEffect(() => {
        fetchGrades();
    }, [id]);

    const handleAddGrade = () => {
        if (!grade.trim() || !explanation.trim()) {
            alert("Grade and additional explanation are required");
            return;
        }

        const newGrade = {
            studentId: id,
            grade: grade,
            additionalExplanation: explanation, // đúng field trong DB
        };

        axios.post("http://localhost:9999/evaluations", newGrade)
            .then(() => {
                alert("Add a new grade success");
                fetchGrades(); // reload lại bảng từ server
                setGrade("");
                setExplanation("");
            })
            .catch((err) => console.error(err));
    };

    return (
        <Container>
            <h1 style={{ display: "flex", justifyContent: "center" }}>Student Management</h1>
            <Row>
                <Form.Control
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Enter student name to search"
                    style={{ width: "70%", margin: "auto", marginBottom: "30px" }}
                />
            </Row>

            <Row>
                <Col xs={3}>
                    <h5>Subjects</h5>
                    {subjects?.map((p) => (
                        <li key={p.id} style={{ marginLeft: "20px", listStyle: "none" }}>
                            <Link
                                to={`/student?subjectId=${p.subjectId}`}
                                onClick={() => setSelectedSubject(p.subjectId)}
                            >
                                {p.name}
                            </Link>
                        </li>
                    ))}
                </Col>

                <Col xs={9}>
                    <Button
                        variant="success"
                        style={{ marginBottom: "10px" }}
                        onClick={() => navigate("/")}
                    >
                        Back to Home
                    </Button>

                    <h4 style={{ textAlign: "center" }}>
                        {currentStudent?.name}'s Grade Details:
                    </h4>

                    <div style={{ marginBottom: "5px" }}>
                        <span>Add a new grade</span>
                    </div>
                    <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
                        <Form.Control
                            placeholder="Enter grade"
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                        />
                        <Form.Control
                            placeholder="Enter additional explanation"
                            value={explanation}
                            onChange={(e) => setExplanation(e.target.value)}
                        />
                        <Button variant="primary" onClick={handleAddGrade}>
                            Add new
                        </Button>
                    </div>

                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>Grade</th>
                                <th>Explanation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {grades.map((g, index) => (
                                <tr key={index}>
                                    <td>{g.grade}</td>
                                    <td>{g.additionalExplanation}</td>  {/* đúng field */}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default Grade;