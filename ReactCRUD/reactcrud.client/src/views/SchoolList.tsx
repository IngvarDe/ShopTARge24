import React, { useCallback, useEffect, useState } from "react";
//import type { JSX } from "react/jsx-dev-runtime";

interface School {
    id: string;
    name: string;
    address: string;
    studentCount: number;
}

function SchoolList() {
    const [schools, setSchools] = useState<School[]>([]);

    //const fetchSchools = useCallback(async () => {
    //    const response = await fetch("/api/schools");
    //    const data = await response.json();
    //    setSchools(data);
    //}, []);

    useEffect(() => {
        populateSchoolData();
    }, []);

    return (
        <table>
            <div>
                <h1>School List</h1>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Student Count</th>
                    </tr>
            </thead>
            <tbody>
                {schools.map((school) => (
                    <tr key={school.id}>
                        <td>{school.id}</td>
                        <td>{school.name}</td>
                        <td>{school.address}</td>
                        <td>{school.studentCount}</td>
                    </tr>
                ))}
            </tbody>
        </div>
    </table>);


    async function populateSchoolData() {
        const response = await fetch("schoolList");
        if (response.ok) {
            const data = await response.json();
            setSchools(data);
        }
    }
}

export default SchoolList;