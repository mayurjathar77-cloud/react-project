import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { createId, useSchool } from "../context/useSchool";

export default function Courses() {
  const { data, setData } = useSchool();
  const [form, setForm] = useState({ name: "", instructor: "", duration: "2 years" });
  const [message, setMessage] = useState("");

  function addCourse(event) {
    event.preventDefault();
    if (!form.name.trim() || !form.instructor.trim()) return;
    if (data.courses.some((course) => course.name.toLowerCase() === form.name.trim().toLowerCase())) {
      setMessage("A course with that name already exists.");
      return;
    }
    setData((current) => ({ ...current, courses: [...current.courses, { ...form, name: form.name.trim(), instructor: form.instructor.trim(), id: createId() }] }));
    setForm({ name: "", instructor: "", duration: "2 years" });
    setMessage("Course added successfully.");
  }

  return (
    <>
      <PageHeader eyebrow="ACADEMIC PROGRAMS" title="Courses" description="Organize programs and see how many learners are enrolled." />
      <section className="course-grid">
        {data.courses.map((course, index) => {
          const enrolled = data.students.filter((student) => student.course === course.name).length;
          return <article className="panel course-card" key={course.id}>
            <div className={`course-art course-art-${index % 4}`}><span>{course.name.split(" ").map((word) => word[0]).slice(0, 2).join("")}</span><small>{course.duration}</small></div>
            <div className="course-info"><span className="eyebrow">PROGRAM</span><h2>{course.name}</h2><p>Instructor: <strong>{course.instructor}</strong></p><div className="course-footer"><span>{enrolled} enrolled</span><span className="badge badge-blue">{course.duration}</span></div></div>
          </article>;
        })}
        {!data.courses.length && <div className="panel empty-state"><h2>No courses yet</h2><p>Add your first academic program below.</p></div>}
      </section>
      <section className="panel form-panel compact-form">
        <div className="panel-heading"><div><h2>Add a course</h2><p>Create a new program for student enrollment.</p></div></div>
        {message && <p className={message.startsWith("A course") ? "form-error" : "form-success"} role="status">{message}</p>}
        <form className="inline-form" onSubmit={addCourse}>
          <label>Course name<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="e.g. Psychology" required /></label>
          <label>Instructor<input value={form.instructor} onChange={(event) => setForm({ ...form, instructor: event.target.value })} placeholder="Instructor name" required /></label>
          <label>Duration<select value={form.duration} onChange={(event) => setForm({ ...form, duration: event.target.value })}><option>1 year</option><option>2 years</option><option>3 years</option><option>4 years</option></select></label>
          <button className="button button-primary" type="submit">Add course</button>
        </form>
      </section>
    </>
  );
}
