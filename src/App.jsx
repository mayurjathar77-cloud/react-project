import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import { SchoolProvider } from "./context/SchoolContext";
import Attendance from "./pages/Attendance";
import Courses from "./pages/Courses";
import Dashboard from "./pages/Dashboard";
import Fees from "./pages/Fees";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import StudentForm from "./pages/StudentForm";
import Students from "./pages/Students";

export default function App() {
  return (
    <SchoolProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="students/new" element={<StudentForm />} />
          <Route path="students/:id/edit" element={<StudentForm />} />
          <Route path="courses" element={<Courses />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="fees" element={<Fees />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Dashboard />} />
        </Route>
      </Routes>
    </SchoolProvider>
  );
}
