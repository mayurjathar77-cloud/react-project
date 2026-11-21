import PageHeader from "../components/PageHeader";
import { useSchool } from "../context/useSchool";

export default function Reports() {
  const { data } = useSchool();
  const active = data.students.filter((student) => student.status === "Active").length;
  const due = data.students.filter((student) => student.feeStatus === "Due").length;
  const courseRows = data.courses.map((course) => ({
    ...course,
    count: data.students.filter((student) => student.course === course.name).length,
  }));
  const maxCourseCount = Math.max(1, ...courseRows.map((course) => course.count));

  return (
    <>
      <PageHeader eyebrow="INSIGHTS" title="Reports" description="A clear snapshot of enrollment, programs, and payment status." />
      <section className="report-highlight">
        <div><p className="eyebrow">ACADEMIC YEAR {data.school.academicYear}</p><h2>{data.school.name}</h2><p>Use this overview to understand your current student records.</p></div>
        <div className="report-total"><strong>{data.students.length}</strong><span>Total learners</span></div>
      </section>
      <section className="stat-grid report-stats">
        <article className="stat-card"><div className="stat-icon blue">ST</div><p>Active students</p><strong>{active}</strong><span>{data.students.length - active} inactive</span></article>
        <article className="stat-card"><div className="stat-icon purple">CO</div><p>Available courses</p><strong>{data.courses.length}</strong><span>Programs offered</span></article>
        <article className="stat-card"><div className="stat-icon orange">FE</div><p>Fees outstanding</p><strong>{due}</strong><span>Students marked as due</span></article>
      </section>
      <section className="panel report-course-panel">
        <div className="panel-heading"><div><h2>Enrollment by course</h2><p>Student distribution across programs</p></div></div>
        <div className="report-bars">{courseRows.map((course) => <div className="report-bar-row" key={course.id}><div className="report-bar-label"><strong>{course.name}</strong><span>{course.count} {course.count === 1 ? "student" : "students"}</span></div><div className="bar-track"><span style={{ width: `${Math.max(4, (course.count / maxCourseCount) * 100)}%` }} /></div></div>)}
          {!courseRows.length && <p className="empty-cell">No courses have been created yet.</p>}
        </div>
      </section>
    </>
  );
}
