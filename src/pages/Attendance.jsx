import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { useSchool } from "../context/useSchool";

function todayKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

export default function Attendance() {
  const { data, setData } = useSchool();
  const [date, setDate] = useState(todayKey());
  const records = data.attendance[date] || {};
  const present = Object.values(records).filter((value) => value === "Present").length;

  function updateAttendance(studentId, value) {
    setData((current) => ({
      ...current,
      attendance: { ...current.attendance, [date]: { ...(current.attendance[date] || {}), [studentId]: value } },
    }));
  }

  function markAll(value) {
    const allRecords = Object.fromEntries(data.students.map((student) => [student.id, value]));
    setData((current) => ({ ...current, attendance: { ...current.attendance, [date]: allRecords } }));
  }

  return (
    <>
      <PageHeader eyebrow="DAILY REGISTER" title="Attendance" description="Record and review attendance by date." />
      <section className="attendance-summary">
        <article className="panel attendance-date"><label htmlFor="attendance-date">Attendance date</label><input id="attendance-date" type="date" value={date} onChange={(event) => setDate(event.target.value)} /></article>
        <article className="panel attendance-metric"><span className="stat-icon green">✓</span><div><small>Present</small><strong>{present} <em>/ {data.students.length}</em></strong></div></article>
        <article className="panel attendance-metric"><span className="stat-icon orange">!</span><div><small>Not marked</small><strong>{data.students.length - Object.keys(records).length}</strong></div></article>
      </section>
      <section className="panel">
        <div className="panel-heading table-panel-heading"><div><h2>Class register</h2><p>Choose a status for each student. Your changes save automatically.</p></div><div className="button-group"><button className="button button-secondary" onClick={() => markAll("Present")}>Mark all present</button><button className="button button-secondary" onClick={() => markAll("Absent")}>Mark all absent</button></div></div>
        <div className="table-wrap"><table><thead><tr><th>Student</th><th>Course</th><th>Attendance status</th></tr></thead><tbody>
          {data.students.map((student) => <tr key={student.id}><td><div className="person-cell"><span className="avatar">{student.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span><div><strong>{student.name}</strong><small>{student.email}</small></div></div></td><td>{student.course}</td><td><select className={`attendance-select ${records[student.id] || "unmarked"}`} aria-label={`Attendance for ${student.name}`} value={records[student.id] || ""} onChange={(event) => updateAttendance(student.id, event.target.value)}><option value="">Not marked</option><option>Present</option><option>Absent</option><option>Late</option></select></td></tr>)}
          {!data.students.length && <tr><td className="empty-cell" colSpan="3">Add students before taking attendance.</td></tr>}
        </tbody></table></div>
      </section>
    </>
  );
}
