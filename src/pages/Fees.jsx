import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import { useSchool } from "../context/useSchool";

export default function Fees() {
  const { data, setData } = useSchool();
  const [filter, setFilter] = useState("All");
  const students = useMemo(() => data.students.filter((student) => filter === "All" || student.feeStatus === filter), [data.students, filter]);
  const dueCount = data.students.filter((student) => student.feeStatus === "Due").length;

  function togglePayment(id) {
    setData((current) => ({ ...current, students: current.students.map((student) => student.id === id ? { ...student, feeStatus: student.feeStatus === "Paid" ? "Due" : "Paid" } : student) }));
  }

  return (
    <>
      <PageHeader eyebrow="PAYMENTS" title="Fees & billing" description="Track payment status and follow up on outstanding fees." />
      <section className="stat-grid fee-stats">
        <article className="stat-card"><p>Total students</p><strong>{data.students.length}</strong><span>In the student register</span></article>
        <article className="stat-card"><p>Paid in full</p><strong>{data.students.length - dueCount}</strong><span>Payment status marked paid</span></article>
        <article className="stat-card"><p>Outstanding</p><strong>{dueCount}</strong><span>Needs payment follow-up</span></article>
      </section>
      <section className="panel">
        <div className="toolbar"><div><h2>Student payments</h2><p className="muted-copy">Update the payment status when a fee is received.</p></div><select aria-label="Filter payment status" value={filter} onChange={(event) => setFilter(event.target.value)}><option>All</option><option>Paid</option><option>Due</option></select></div>
        <div className="table-wrap"><table><thead><tr><th>Student</th><th>Course</th><th>Payment status</th><th>Action</th></tr></thead><tbody>
          {students.map((student) => <tr key={student.id}><td><div className="person-cell"><span className="avatar">{student.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span><div><strong>{student.name}</strong><small>{student.email}</small></div></div></td><td>{student.course}</td><td><span className={`badge ${student.feeStatus === "Paid" ? "badge-green" : "badge-orange"}`}>{student.feeStatus}</span></td><td><button className={`button ${student.feeStatus === "Paid" ? "button-secondary" : "button-primary"} button-small`} onClick={() => togglePayment(student.id)}>{student.feeStatus === "Paid" ? "Mark as due" : "Mark paid"}</button></td></tr>)}
          {!students.length && <tr><td className="empty-cell" colSpan="4">No students match this payment status.</td></tr>}
        </tbody></table></div>
      </section>
    </>
  );
}
