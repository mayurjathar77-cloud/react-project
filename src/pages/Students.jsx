import { useMemo, useState } from "react";
import { Link } from "react-router";
import PageHeader from "../components/PageHeader";
import { useSchool } from "../context/useSchool";

export default function Students() {
  const { data, setData } = useSchool();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All statuses");
  const students = useMemo(() => data.students.filter((student) => {
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || [student.name, student.email, student.course].some((value) => value.toLowerCase().includes(query));
    return matchesSearch && (status === "All statuses" || student.status === status);
  }), [data.students, search, status]);

  function removeStudent(id, name) {
    if (!window.confirm(`Remove ${name} from the student records?`)) return;
    setData((current) => ({
      ...current,
      students: current.students.filter((student) => student.id !== id),
      attendance: Object.fromEntries(Object.entries(current.attendance).map(([date, records]) => [
        date,
        Object.fromEntries(Object.entries(records).filter(([studentId]) => studentId !== id)),
      ])),
    }));
  }

  return (
    <>
      <PageHeader eyebrow="DIRECTORY" title="Students" description="Manage student profiles, enrollment, and academic status." action={<Link className="button button-primary" to="/students/new">＋ Add student</Link>} />
      <section className="panel">
        <div className="toolbar">
          <label className="search-box"><span>⌕</span><input aria-label="Search students" placeholder="Search name, email or course..." value={search} onChange={(event) => setSearch(event.target.value)} /></label>
          <select aria-label="Filter by status" value={status} onChange={(event) => setStatus(event.target.value)}>
            <option>All statuses</option><option>Active</option><option>Inactive</option>
          </select>
          <span className="result-count">{students.length} students</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Student</th><th>Phone</th><th>Course</th><th>Year</th><th>Status</th><th aria-label="Actions" /></tr></thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td><div className="person-cell"><span className="avatar">{student.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span><div><strong>{student.name}</strong><small>{student.email}</small></div></div></td>
                  <td>{student.phone || "—"}</td><td>{student.course}</td><td>{student.year}</td>
                  <td><span className={`badge ${student.status === "Active" ? "badge-green" : "badge-gray"}`}>{student.status}</span></td>
                  <td><div className="row-actions"><Link to={`/students/${student.id}/edit`} className="text-link">Edit</Link><button className="link-button danger-text" onClick={() => removeStudent(student.id, student.name)}>Remove</button></div></td>
                </tr>
              ))}
              {!students.length && <tr><td className="empty-cell" colSpan="6">No matching students. Try a different search or add a student.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
