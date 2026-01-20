import { useCallback, useEffect, useState } from "react";
import type { School } from "../types/school";
import { useNavigate } from "react-router-dom";


function SchoolList() {
    const [schools, setSchools] = useState<School[]>([]);

    const navigate = useNavigate();
    const fetchSchools = useCallback(async () => {
        try {
            const response = await fetch("/api/school");
            if (response.ok) {
                const data = await response.json();
                setSchools(data);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }, []);

    useEffect(() => {

        (async () => {
            await fetchSchools();
        })();
    }, [fetchSchools]);


    return (
        <div className="container">
            <h1>School List</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Student Count</th>
                    </tr>
                </thead>
                <tbody>
                    {schools.length > 0 ? (
                        schools.map((school) => (
                            <tr key={school.id}>
                                <td>{school.id}</td>
                                <td>{school.name}</td>
                                <td>{school.address}</td>
                                <td>{school.studentCount}</td>
                                <td>
                                    <button onClick={() => navigate(`/details/${school.id}`)}>
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4}>Loading schools or no data found...</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default SchoolList;