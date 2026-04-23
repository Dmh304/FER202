import React, { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import axios from "axios";

const AppProvider = ({ children }) => {
    const [students, setStudents] = useState([]);
    const [studentDetails, setStudentDetails] = useState([]);
    const [evaluations, setEvaluations] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [studentsSubjects, setStudentsSubjects] = useState([]);



    useEffect(() => {
        axios
            .get("http://localhost:9999/students")
            .then((res) => setStudents(res.data));

        axios.get("http://localhost:9999/student_details").then((res) => setStudentDetails(res.data));

        axios
            .get("http://localhost:9999/evaluations")
            .then((res) => setEvaluations(res.data));

        axios
            .get("http://localhost:9999/subjects")
            .then((res) => setSubjects(res.data));

        axios
            .get("http://localhost:9999/students_subjetcs")
            .then((res) => setStudentsSubjects(res.data));
    }, []);

    return (
        <AppContext.Provider value={{ students, studentDetails, evaluations, subjects, studentsSubjects }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
