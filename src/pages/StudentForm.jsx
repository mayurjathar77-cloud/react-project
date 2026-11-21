import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import PageHeader from "../components/PageHeader";
import { createId, useSchool } from "../context/useSchool";

const emptyStudent = {
  name: "", email: "", phone: "", course: "", year: "Year 1", status: "Active", feeStatus: "Due",
};

export default function StudentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, setData } = useSchool();
  const existing = data.students.find((student) => student.id === id);
  const [form, setForm] = useState(existing || { ...emptyStudent, course: data.courses[0]?.name || "" });
  const [error, setError] = useState("");

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function saveStudent(event) {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.course) {
      setError("Name, email, and course are required.");
      return;
    }
    const student = { ...form, name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim() };
    setData((current) => ({
      ...current,
      students: id
        ? current.students.map((item) => item.id === id ? { ...item, ...student } : item)
        : [{ ...student, id: createId() }, ...current.students],
    }));
    navigate("/students");
  }

  if (id && !existing) {
    return <section className="panel empty-state"><h2>Student not found</h2><p>This student may have been removed.</p><Link className="button button-primary" to="/students">Back to students</Link></section>;
  }

  return (
    <>
      <PageHeader eyebrow="STUDENT RECORD" title={id ? "Edit student" : "Add a student"} description="Keep student contact and enrollment details up to date." />
      <form className="panel form-panel" onSubmit={saveStudent}>
        {error && <p className="form-error" role="alert">{error}</p>}
        <div className="form-grid">
          <label>Full name <span>*</span><input name="name" value={form.name} onChange={updateField} placeholder="e.g. Alex Morgan" required /></label>
          <label>Email address <span>*</span><input name="email" type="email" value={form.email} onChange={updateField} placeholder="alex@example.com" required /></label>
          <label>Phone number<input name="phone" type="tel" value={form.phone} onChange={updateField} placeholder="(555) 010-0000" /></label>
          <label>Course <span>*</span><select name="course" value={form.course} onChange={updateField} required><option value="">Select a course</option>{data.courses.map((course) => <option key={course.id}>{course.name}</option>)}</select></label>
          <label>Academic year<select name="year" value={form.year} onChange={updateField}><option>Year 1</option><option>Year 2</option><option>Year 3</option><option>Year 4</option></select></label>
          <label>Enrollment status<select name="status" value={form.status} onChange={updateField}><option>Active</option><option>Inactive</option></select></label>
          <label>Fee status<select name="feeStatus" value={form.feeStatus} onChange={updateField}><option>Due</option><option>Paid</option></select></label>
        </div>
        {!data.courses.length && <p className="form-error">Add a course before enrolling a student.</p>}
        <div className="form-actions"><Link className="button button-secondary" to="/students">Cancel</Link><button className="button button-primary" type="submit">{id ? "Save changes" : "Add student"}</button></div>
      </form>
    </>
  );
}
