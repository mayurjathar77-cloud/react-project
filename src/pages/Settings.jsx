import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { initialData } from "../data/initialData";
import { useSchool } from "../context/useSchool";

export default function Settings() {
  const { data, setData } = useSchool();
  const [form, setForm] = useState(data.school);
  const [saved, setSaved] = useState(false);

  function saveSettings(event) {
    event.preventDefault();
    setData((current) => ({ ...current, school: { name: form.name.trim(), academicYear: form.academicYear } }));
    setSaved(true);
  }

  function resetDemoData() {
    if (!window.confirm("Restore the sample students and courses? Your current records will be replaced.")) return;
    setData(initialData);
    setForm(initialData.school);
    setSaved(false);
  }

  return (
    <>
      <PageHeader eyebrow="PREFERENCES" title="Settings" description="Customize your school details and manage local demo data." />
      <section className="settings-grid">
        <form className="panel form-panel" onSubmit={saveSettings}>
          <div className="panel-heading"><div><h2>School profile</h2><p>These details appear in your reports and dashboard.</p></div></div>
          {saved && <p className="form-success" role="status">Settings saved successfully.</p>}
          <div className="settings-fields">
            <label>School name<input value={form.name} onChange={(event) => { setForm({ ...form, name: event.target.value }); setSaved(false); }} required /></label>
            <label>Academic year<input value={form.academicYear} onChange={(event) => { setForm({ ...form, academicYear: event.target.value }); setSaved(false); }} placeholder="2025-2026" required /></label>
          </div>
          <div className="form-actions"><button className="button button-primary" type="submit">Save settings</button></div>
        </form>
        <article className="panel data-panel">
          <div className="panel-heading"><div><h2>Data & storage</h2><p>All information is saved in this browser.</p></div></div>
          <div className="storage-callout"><span className="stat-icon green">✓</span><div><strong>Local storage active</strong><p>Student, course, attendance, and fee records stay on this device. No account or server is required.</p></div></div>
          <div className="data-counts"><div><strong>{data.students.length}</strong><span>Students</span></div><div><strong>{data.courses.length}</strong><span>Courses</span></div><div><strong>{Object.keys(data.attendance).length}</strong><span>Attendance dates</span></div></div>
          <div className="danger-zone"><div><strong>Restore sample data</strong><p>Replace your records with the original demo students and courses.</p></div><button className="button button-danger" onClick={resetDemoData}>Restore demo data</button></div>
        </article>
      </section>
    </>
  );
}
