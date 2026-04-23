import React, { useState, useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Table
} from "react-bootstrap";
import { useProvider } from "./useProvider";



const Index = () => {
    const { user, todo } = useProvider();

    const [selectedUsers, setSelectedUsers] = useState(() => {
        const saved = localStorage.getItem("selectedUsers");
        return saved ? JSON.parse(saved) : [];
    });
    const [sortOrder, setSortOrder] = useState(() => {
        return localStorage.getItem("sortOrder") || "asc";
    });
    const [status, setStatus] = useState(() => {
        return localStorage.getItem("status") || "";
    });

    // Lưu states vào localStorage khi thay đổi
    useEffect(() => {
        localStorage.setItem("sortOrder", sortOrder);
    }, [sortOrder]);

    useEffect(() => {
        localStorage.setItem("selectedUsers", JSON.stringify(selectedUsers));
    }, [selectedUsers]);

    useEffect(() => {
        localStorage.setItem("status", status);
    }, [status]);

    const handleUserChange = (userName) => {
        setSelectedUsers(prev =>
            prev.includes(userName)
                ? prev.filter(u => u !== userName)
                : [...prev, userName]
        );
    };

    const handleChangeStatus = async (todoId, currentStatus) => {
        try {
            const response = await fetch(`http://localhost:9999/todo/${todoId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ completed: !currentStatus })
            });

            if (response.ok) {
                // Reload page hoặc refresh data
                window.location.reload();
            }
        } catch (error) {
            console.error("Error updating todo:", error);
            alert("Lỗi khi cập nhật todo");
        }
    };

    const filteredTodo = todo?.filter((t) => {
        // Filter by user
        const userMatch = selectedUsers.length === 0 || selectedUsers.includes(user?.find((u) => u.id === t.userId)?.name);

        // Filter by status
        const statusMatch = status === "all" || status === "" ||
            (status === "finished" && t.completed) ||
            (status === "unfinished" && !t.completed);

        return userMatch && statusMatch;
    });

    const sortedTodo = [...(filteredTodo || [])].sort((a, b) => {
        if (sortOrder === "asc") {
            return a.title.localeCompare(b.title);
        } else {
            return a.id - b.id;
        }
    });


    return (
        <Container>
            <Row>
                <Col xs={8}>
                    <h1 style={{ display: "flex", justifyContent: "center" }}>
                        Todo List
                    </h1>


                    <p>Sort: <Button onClick={() => {
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                    }}>
                        Ascending by title
                    </Button>
                    </p>


                    <Table>

                        <thead>
                            <tr>
                                <td>No</td>
                                <td>Tiltle</td>
                                <td>User</td>
                                <td>Completed</td>
                                <td>Change Status</td>
                            </tr>
                        </thead>

                        <tbody>
                            {sortedTodo?.map((t) => (
                                <tr key={t.id}>
                                    <td>{t.id}</td>
                                    <td>{t.title}</td>
                                    <td>
                                        {user?.find((u) => u.id === t.userId)?.name}
                                    </td>

                                    <td>
                                        {t.completed ? <p style={{ color: "blue" }}>Finished</p> : <p style={{ color: "red" }}>Unfinished</p>}
                                    </td>

                                    <td>
                                        <Button variant="success" onClick={() => handleChangeStatus(t.id, t.completed)}>
                                            Change
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>



                    </Table>
                </Col>

                <Col xs={4}>
                    <Row>
                        <h2>
                            Users
                        </h2>


                        {user?.map((g) => (
                            <Form.Check
                                type="checkbox"
                                key={g.id}
                                label={g.name}
                                checked={selectedUsers.includes(g.name)}
                                onChange={() => handleUserChange(g.name)}
                            />
                        ))}

                    </Row>

                    <Row>
                        <h2>
                            Completed
                        </h2>

                        <Form.Check type="radio" value="finished" name="status" label="Finished" checked={status === "finished"} onChange={() => setStatus("finished")} />

                        <Form.Check type="radio" value="unfinished" name="status" label="Unfinished" checked={status === "unfinished"} onChange={() => setStatus("unfinished")} />

                        <Form.Check type="radio" value="all" name="status" label="All" checked={status === "all" || status === ""} onChange={() => setStatus("all")} />

                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Index
