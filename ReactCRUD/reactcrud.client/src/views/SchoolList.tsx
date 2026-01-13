import React, { useCallback, useEffect, useState } from "react";
import type { JSX } from "react/jsx-dev-runtime";

interface School {
  id: number;
  name: string;
  address?: string;
  phone?: string;
}

export default function SchoolList(): JSX.Element {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [creating, setCreating] = useState<boolean>(false);
  const [newSchool, setNewSchool] = useState<Partial<School>>({
    name: "",
    address: "",
    phone: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingValues, setEditingValues] = useState<Partial<School>>({});

  const apiRoot = "/api/schools";

  const fetchSchools = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(apiRoot);
      if (!res.ok) throw new Error(`Failed to fetch schools: ${res.status}`);
      const data = (await res.json()) as School[];
      setSchools(data);
    } catch (err: any) {
      setError(err?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchSchools();
  }, [fetchSchools]);

  // Create
  const handleCreate = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!newSchool.name || newSchool.name.trim() === "") {
      setError("Name is required");
      return;
    }
    try {
      setError(null);
      const res = await fetch(apiRoot, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSchool),
      });
      if (!res.ok) throw new Error(`Create failed: ${res.status}`);
      const created = (await res.json()) as School;
      setSchools((s) => [created, ...s]);
      setNewSchool({ name: "", address: "", phone: "" });
      setCreating(false);
    } catch (err: any) {
      setError(err?.message ?? "Unknown error");
    }
  };

  // Delete
  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Delete this school?");
    if (!confirmed) return;
    try {
      setError(null);
      const res = await fetch(`${apiRoot}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
      setSchools((s) => s.filter((x) => x.id !== id));
    } catch (err: any) {
      setError(err?.message ?? "Unknown error");
    }
  };

  // Start edit
  const startEdit = (school: School) => {
    setEditingId(school.id);
    setEditingValues({ name: school.name, address: school.address, phone: school.phone });
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditingValues({});
  };

  // Save edit
  const saveEdit = async (id: number) => {
    if (!editingValues.name || editingValues.name.trim() === "") {
      setError("Name is required");
      return;
    }
    try {
      setError(null);
      const res = await fetch(`${apiRoot}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingValues),
      });
      if (!res.ok) throw new Error(`Update failed: ${res.status}`);
      const updated = (await res.json()) as School;
      setSchools((s) => s.map((x) => (x.id === id ? updated : x)));
      cancelEdit();
    } catch (err: any) {
      setError(err?.message ?? "Unknown error");
    }
  };

  return (
    <div style={{ padding: 16, fontFamily: "Segoe UI, Roboto, sans-serif" }}>
      <h2>Schools</h2>

      {error && (
        <div style={{ marginBottom: 8, color: "white", background: "#b71c1c", padding: 8 }}>
          {error}
        </div>
      )}

      <div style={{ marginBottom: 12 }}>
        {!creating ? (
          <button onClick={() => setCreating(true)}>Add new school</button>
        ) : (
          <form
            onSubmit={handleCreate}
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              flexWrap: "wrap",
              marginTop: 8,
            }}
          >
            <input
              placeholder="Name"
              value={newSchool.name}
              onChange={(e) => setNewSchool((s) => ({ ...s, name: e.target.value }))}
              required
            />
            <input
              placeholder="Address"
              value={newSchool.address}
              onChange={(e) => setNewSchool((s) => ({ ...s, address: e.target.value }))}
            />
            <input
              placeholder="Phone"
              value={newSchool.phone}
              onChange={(e) => setNewSchool((s) => ({ ...s, phone: e.target.value }))}
            />
            <button type="submit">Create</button>
            <button
              type="button"
              onClick={() => {
                setCreating(false);
                setNewSchool({ name: "", address: "", phone: "" });
                setError(null);
              }}
            >
              Cancel
            </button>
          </form>
        )}
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : schools.length === 0 ? (
        <div>No schools found.</div>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: 8,
            minWidth: 600,
          }}
        >
          <thead>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>
                Name
              </th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>
                Address
              </th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>
                Phone
              </th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {schools.map((school) => (
              <tr key={school.id}>
                <td style={{ padding: 8, borderBottom: "1px solid #f0f0f0" }}>
                  {editingId === school.id ? (
                    <input
                      value={editingValues.name ?? ""}
                      onChange={(e) =>
                        setEditingValues((v) => ({ ...v, name: e.target.value }))
                      }
                    />
                  ) : (
                    school.name
                  )}
                </td>
                <td style={{ padding: 8, borderBottom: "1px solid #f0f0f0" }}>
                  {editingId === school.id ? (
                    <input
                      value={editingValues.address ?? ""}
                      onChange={(e) =>
                        setEditingValues((v) => ({ ...v, address: e.target.value }))
                      }
                    />
                  ) : (
                    school.address ?? ""
                  )}
                </td>
                <td style={{ padding: 8, borderBottom: "1px solid #f0f0f0" }}>
                  {editingId === school.id ? (
                    <input
                      value={editingValues.phone ?? ""}
                      onChange={(e) =>
                        setEditingValues((v) => ({ ...v, phone: e.target.value }))
                      }
                    />
                  ) : (
                    school.phone ?? ""
                  )}
                </td>
                <td style={{ padding: 8, borderBottom: "1px solid #f0f0f0" }}>
                  {editingId === school.id ? (
                    <>
                      <button onClick={() => saveEdit(school.id)}>Save</button>{" "}
                      <button onClick={cancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEdit(school)}>Edit</button>{" "}
                      <button onClick={() => handleDelete(school.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}