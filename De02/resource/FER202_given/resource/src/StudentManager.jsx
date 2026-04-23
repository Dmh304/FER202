import React, { useState, useMemo, useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Form,
    Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useProvider } from "./useProvider";



const StudentManager = () => {
    const { students, studentDetails, subjects, studentsSubjects } = useProvider();

    // const [name, setName] = useState("");
    const [search, setSearch] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const subject = params.get("subjectId");
        setSelectedSubject(subject || "");
    }, []);

    const filterStudents = useMemo(() => {
        return students?.filter((s) => {
            const matchSearch =
                search.length > 0
                    ? s.name.toLowerCase().startsWith(search.toLowerCase())
                    : true;
            const subjectMatch = !selectedSubject
                ? true
                : studentsSubjects?.some(
                    (ss) => ss.studentId === s.studentId && ss.subjectId === selectedSubject
                );

            return matchSearch && subjectMatch;
        });
    }, [search, students, selectedSubject, studentsSubjects]);
    return (
        <Container>
            <h1 style={{ display: "flex", justifyContent: "center" }}>Student Management</h1>
            <Row>
                <Form.Control onChange={(e) => setSearch(e.target.value)}
                    placeholder="Enter student name to search" style={{ width: "70%", margin: "auto", marginBottom: "30px" }} />
            </Row>

            <Row>
                <Col xs={3}>
                    <h3>Subjects</h3>

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
                    <h3>List of Students</h3>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <td>StudentId</td>
                                <td>Name</td>
                                <td>Age</td>
                                <td>Street</td>
                                <td>City</td>
                                <td>IsRegularStudent</td>
                                <td>View grades</td>
                            </tr>
                        </thead>

                        <tbody>
                            {filterStudents?.map((s) => (
                                <tr>
                                    <td>{s.studentId}</td>
                                    <td>{s.name}</td>
                                    <td>{s.age}</td>
                                    <td>{studentDetails?.find((d) => d.id === s.id)?.address.street}</td>
                                    <td>{studentDetails?.find((d) => d.id === s.id)?.address.city}</td>
                                    <td>{(s.isRegularStudent === true) ? <p>Fulltime</p> : <p>Applicant</p>}</td>
                                    <td>
                                        <td>
                                            <Link to={`/student/${s.studentId}`}>
                                                Grades
                                            </Link>
                                        </td>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default StudentManager
