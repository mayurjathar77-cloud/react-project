# ScholarDesk Student Management

A responsive student management app built with React and Vite. It includes a sample school dataset so the project is ready to run immediately.

## Run locally

1. Install Node.js (version 22 or newer).
2. In the project folder, install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the local URL printed by Vite.

To create and preview a production build:

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

The `main` branch is built with Vite and deployed from the `dist` artifact by the
GitHub Actions workflow. In **Settings → Pages**, set **Build and deployment** →
**Source** to **GitHub Actions**. Each push to `main` then triggers a deployment.

## Pages

- **Dashboard** — enrollment, course, attendance, and fee summaries.
- **Students** — search, filter, add, edit, and remove student records.
- **Courses** — view programs and add courses.
- **Attendance** — mark attendance by date and update the full register.
- **Fees & billing** — filter payment status and mark fees paid or due.
- **Reports** — review enrollment by course and school totals.
- **Settings** — edit school details or restore the sample dataset.

Student, course, attendance, fee, and school settings data are stored in the browser's local storage. No server or account is required. Use **Settings → Restore demo data** to restore the starter records.
