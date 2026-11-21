import { Link } from "react-router";
import PageHeader from "../components/PageHeader";
import { useSchool } from "../context/useSchool";

function todayKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

export default function Dashboard() {
  const { data } = useSchool();
  const todayAttendance = Object.values(data.attendance[todayKey()] || {});
  const presentToday = todayAttendance.filter((status) => status === "Present").length;
  const attendanceRate = todayAttendance.length
    ? `${Math.round((presentToday / todayAttendance.length) * 100)}%`
    : "—";
  const feeDue = data.students.filter((student) => student.feeStatus === "Due").length;
  const stats = [
    { label: "Total students", value: data.students.length, note: "Enrolled learners", icon: "ST", tone: "blue" },
    { label: "Active courses", value: data.courses.length, note: "Across all programs", icon: "CO", tone: "purple" },
    { label: "Attendance today", value: attendanceRate, note: todayAttendance.length ? `${presentToday} marked present` : "No attendance recorded", icon: "AT", tone: "green" },
    { label: "Fees to follow up", value: feeDue, note: "Students with a balance", icon: "FE", tone: "orange" },
  ];

  return (
    <>
      <PageHeader
        eyebrow="OVERVIEW"
        title={`Good morning, Admin`}
        description={`Here is what's happening at ${data.school.name} today.`}
        action={<Link className="button button-primary" to="/students/new">＋ Add student</Link>}
      />
      <section className="stat-grid" aria-label="School statistics">
        {stats.map((stat) => (
          <article className="stat-card" key={stat.label}>
            <div className={`stat-icon ${stat.tone}`}>{stat.icon}</div>
            <p>{stat.label}</p>
            <strong>{stat.value}</strong>
            <span>{stat.note}</span>
          </article>
        ))}
      </section>
      <section className="dashboard-grid">
        <article className="panel recent-panel">
          <div className="panel-heading">
            <div><h2>Recent students</h2><p>Your latest enrolled learners</p></div>
            <Link to="/students" className="text-link">View all →</Link>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Student</th><th>Course</th><th>Year</th><th>Status</th></tr></thead>
              <tbody>
                {data.students.slice(0, 5).map((student) => (
                  <tr key={student.id}>
                    <td><div className="person-cell"><span className="avatar">{student.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span><div><strong>{student.name}</strong><small>{student.email}</small></div></div></td>
                    <td>{student.course}</td>
                    <td>{student.year}</td>
                    <td><span className={`badge ${student.status === "Active" ? "badge-green" : "badge-gray"}`}>{student.status}</span></td>
                  </tr>
                ))}
                {!data.students.length && <tr><td className="empty-cell" colSpan="4">No students yet. Add your first student to get started.</td></tr>}
              </tbody>
            </table>
          </div>
        </article>
        <article className="panel quick-panel">
          <div className="panel-heading"><div><h2>Quick actions</h2><p>Common tasks, one click away</p></div></div>
          <div className="quick-links">
            <Link to="/students/new"><span className="quick-icon blue">＋</span><div><strong>Enroll a student</strong><small>Add a learner to your records</small></div><span className="arrow">→</span></Link>
            <Link to="/attendance"><span className="quick-icon green">✓</span><div><strong>Take attendance</strong><small>Record today's attendance</small></div><span className="arrow">→</span></Link>
            <Link to="/fees"><span className="quick-icon orange">$</span><div><strong>Review fees</strong><small>Check outstanding balances</small></div><span className="arrow">→</span></Link>
            <Link to="/reports"><span className="quick-icon purple">↗</span><div><strong>View reports</strong><small>Explore your school overview</small></div><span className="arrow">→</span></Link>
          </div>
        </article>
      </section>
    </>
  );
}
