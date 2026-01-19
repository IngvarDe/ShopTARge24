import React, { useCallback, useEffect, useState } from "react";
import type { School } from "../types/school";

function SchoolDetail() {
    const [school, setSchool] = useState<School | null>(null);
    const fetchSchool = useCallback(async () => {
        try {
            const response = await fetch("/api/school/1");
            if (response.ok) {
                const data = await response.json();
                setSchool(data);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }, []);
    useEffect(() => {
        (async () => {
            await fetchSchool();
        })();
    }, [fetchSchool]);
    if (!school) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h1>School Detail</h1>
            <p><strong>ID:</strong> {school.id}</p>
            <p><strong>Name:</strong> {school.name}</p>
            <p><strong>Address:</strong> {school.address}</p>
            <p><strong>Student Count:</strong> {school.studentCount}</p>
        </div>
    );
}

