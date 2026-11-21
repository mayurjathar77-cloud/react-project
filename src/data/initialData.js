export const initialData = {
  school: {
    name: "Northstar Academy",
    academicYear: "2025-2026",
  },
  courses: [
    { id: "c1", name: "Computer Science", instructor: "Olivia Carter", duration: "3 years" },
    { id: "c2", name: "Business Administration", instructor: "Noah Wilson", duration: "3 years" },
    { id: "c3", name: "Graphic Design", instructor: "Ava Martinez", duration: "2 years" },
    { id: "c4", name: "Data Analytics", instructor: "Ethan Brown", duration: "2 years" },
  ],
  students: [
    { id: "s1", name: "Sophia Johnson", email: "sophia.j@example.com", phone: "(555) 010-1201", course: "Computer Science", year: "Year 2", status: "Active", feeStatus: "Paid" },
    { id: "s2", name: "Liam Williams", email: "liam.w@example.com", phone: "(555) 010-1202", course: "Business Administration", year: "Year 1", status: "Active", feeStatus: "Due" },
    { id: "s3", name: "Isabella Brown", email: "isabella.b@example.com", phone: "(555) 010-1203", course: "Graphic Design", year: "Year 3", status: "Active", feeStatus: "Paid" },
    { id: "s4", name: "Noah Davis", email: "noah.d@example.com", phone: "(555) 010-1204", course: "Data Analytics", year: "Year 2", status: "Inactive", feeStatus: "Due" },
    { id: "s5", name: "Mia Garcia", email: "mia.g@example.com", phone: "(555) 010-1205", course: "Computer Science", year: "Year 1", status: "Active", feeStatus: "Paid" },
    { id: "s6", name: "Ethan Miller", email: "ethan.m@example.com", phone: "(555) 010-1206", course: "Business Administration", year: "Year 3", status: "Active", feeStatus: "Due" },
  ],
  attendance: {},
};
