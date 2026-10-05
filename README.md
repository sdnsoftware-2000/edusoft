# EduSoft — Institute Management System
### by Uniitechs | v1.0 | Built with Vanilla HTML/CSS/JS

---

## 📁 PROJECT FOLDER STRUCTURE

```
edusoft/
│
├── index.html               ← LOGIN PAGE (start here)
│
├── css/
│   └── global.css           ← ALL shared styles (design tokens, glass, buttons, tables, modals...)
│
├── js/
│   └── core.js              ← ALL shared logic (DB, Auth, Toast, Modal, Utils, Seed data)
│
├── pages/
│   ├── dashboard.html       ✅ DONE
│   ├── students.html        ← BUILD NEXT (Day 6-10)
│   ├── courses.html         ← Day 11-12
│   ├── fees.html            ← Day 13-16
│   ├── attendance.html      ← Day 17-19
│   ├── exams.html           ← Day 20-21
│   ├── faculty.html         ← Day 22
│   ├── timetable.html       ← Day 23
│   ├── reports.html         ← Day 24
│   ├── library.html         ← Day 25
│   ├── communication.html   ← Day 25
│   ├── accounts.html        ← Day 26
│   ├── users.html           ← Day 27
│   └── settings.html        ← Day 27
│
└── assets/
    └── sidebar.html         ← Sidebar HTML reference snippet
```

---

## 🚀 HOW TO RUN

1. Open folder in VS Code
2. Right-click `index.html` → **Open with Live Server**
3. Login: `admin` / `admin123`

---

## 🔑 DEMO CREDENTIALS

| Role    | Username | Password    | OTP  |
|---------|----------|-------------|------|
| Admin   | admin    | admin123    | 1234 |
| Student | student  | student123  | 2345 |
| Faculty | faculty  | faculty123  | 3456 |
| Parent  | parent   | parent123   | 4567 |

---

## 📐 HOW TO BUILD A NEW PAGE (template)

Copy this boilerplate for any new page (e.g. students.html):

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Students — EduSoft</title>
  <link rel="stylesheet" href="../css/global.css">
</head>
<body>

<!-- Mobile topbar -->
<div class="topbar glass" id="topbar">
  <div style="display:flex;align-items:center;gap:10px">
    <button id="hamburger" class="btn-icon">☰</button>
    <span style="font-family:var(--font-display);font-size:20px;background:linear-gradient(135deg,var(--primary),var(--teal));-webkit-background-clip:text;-webkit-text-fill-color:transparent">EduSoft</span>
  </div>
  <div class="avatar" data-user-avatar>A</div>
</div>

<!-- Sidebar overlay + nav — COPY FROM dashboard.html -->
<div id="sidebarOverlay" ...></div>
<nav class="sidebar glass"> ... </nav>

<!-- MAIN CONTENT -->
<main class="main-content page-enter">

  <div class="page-header">
    <div class="page-title-wrap">
      <div class="page-title">Students</div>
      <div class="page-sub">Manage all student admissions and profiles</div>
    </div>
    <div class="page-actions">
      <button class="btn btn-primary" onclick="Modal.open('addModal')">+ Add Student</button>
    </div>
  </div>

  <div class="card glass">
    <!-- your content here -->
  </div>

</main>

<!-- Modal -->
<div class="modal-overlay" id="addModal">
  <div class="modal glass">
    <div class="modal-header">
      <div>
        <div class="modal-title">Add Student</div>
      </div>
      <button class="modal-close" onclick="Modal.close('addModal')">✕</button>
    </div>
    <!-- form fields here -->
    <div class="modal-footer">
      <button class="btn btn-primary" onclick="saveStudent()">Save</button>
      <button class="btn btn-outline" onclick="Modal.close('addModal')">Cancel</button>
    </div>
  </div>
</div>

<script src="../js/core.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    initSidebar('students');  // marks this page active in sidebar
    loadStudents();
  });

  function loadStudents() {
    const students = DB.get('students') || [];
    // render table...
  }
</script>
</body>
</html>
```

---

## 🧰 CORE UTILITIES CHEAT SHEET (core.js)

### Database (localStorage)
```js
DB.get('students')              // get all students
DB.set('students', arr)         // save students array
DB.push('students', newStudent) // add one student
DB.update('students', 'S001', { status: 'Inactive' }) // update by id
DB.delete('students', 'S001')   // delete by id
DB.find('students', 'S001')     // find one by id
DB.nextId('students', 'S')      // → 'S008' (auto increment)
```

### Auth
```js
Auth.isLoggedIn()     // true/false
Auth.getSession()     // { username, role, name }
Auth.require()        // redirects to login if not logged in
Auth.logout()         // clears session, goes to login
```

### Toast Notifications
```js
Toast.success('Student added!')
Toast.error('Something went wrong')
Toast.warning('Fees are pending')
Toast.info('3 notices waiting')
```

### Modal
```js
Modal.open('addStudentModal')
Modal.close('addStudentModal')
Modal.closeAll()
```

### Utils
```js
Utils.formatCurrency(25000)   // → '₹25,000'
Utils.formatDate('2024-06-01') // → '1 Jun 2024'
Utils.today()                  // → '2024-06-01'
Utils.statusBadge('Active')    // → '<span class="badge badge-green">Active</span>'
Utils.getGrade(78, 100)        // → 'B+'
Utils.validate([               // form validation
  ['fieldId', 'Field Label', 'text'],
  ['email',   'Email',       'email'],
  ['phone',   'Phone',       'phone'],
])
```

### Helpers
```js
populateCourseSelect('selectId')    // fills a <select> with courses
populateStudentSelect('selectId')   // fills a <select> with students
printElement('receiptBox', 'Receipt') // opens print dialog for element
getCourseName('C001')               // → 'Computer Science'
```

---

## 🎨 DESIGN TOKENS (quick reference)

```css
/* Colors */
var(--primary)       /* sky blue  #0ea5e9 */
var(--teal)          /* teal      #14b8a6 */
var(--accent)        /* indigo    #6366f1 */
var(--success)       /* green     #22c55e */
var(--warning)       /* amber     #f59e0b */
var(--danger)        /* red       #ef4444 */

/* Text */
var(--text)          /* dark navy  #0f172a */
var(--text-2)        /* slate      #475569 */
var(--text-3)        /* muted      #94a3b8 */

/* Glassmorphism */
.glass               /* standard glass card */
.glass-strong        /* stronger glass (login card) */

/* Buttons */
.btn.btn-primary     /* gradient blue→teal */
.btn.btn-outline     /* bordered */
.btn.btn-ghost       /* transparent */
.btn.btn-danger      /* red gradient */
.btn.btn-sm / .btn-lg / .btn-xl / .btn-full

/* Badges */
.badge.badge-green / badge-blue / badge-red / badge-yellow / badge-gray / badge-teal

/* Sizing */
var(--radius-sm)  10px
var(--radius)     14px
var(--radius-lg)  20px
var(--sidebar-w)  238px
```

---

## 📅 30-DAY BUILD PLAN (Revised)

| Days  | Task |
|-------|------|
| 1–2   | ✅ Setup, global.css, core.js, Login with OTP |
| 3–5   | ✅ Dashboard with charts, stats, modules |
| 6–10  | Students module (list, add, edit, delete, filter, profile) |
| 11–12 | Courses module (CRUD, fee structure) |
| 13–16 | Fees module (collect, receipts, calculator, print) |
| 17–19 | Attendance (mark daily, monthly summary) |
| 20–21 | Exams & Results (schedule, marks entry, grades) |
| 22    | Faculty module (CRUD, subject mapping) |
| 23    | Timetable (manual grid builder) |
| 24    | Reports page (PDF export via html2pdf.js) |
| 25    | Library + Communication/Notices |
| 26    | Accounts (income/expense tracking) |
| 27    | Users & Access + Settings |
| 28    | Mobile responsiveness polish |
| 29    | Bug fixes, edge cases, empty states |
| 30    | GitHub Pages deploy, README, video demo |

---

## 💡 PRO TIPS

- Every page gets `initSidebar('pagename')` — this auto marks the nav active
- Seed data loads ONCE automatically via `seedDatabase()` in core.js
- To reset all data: `localStorage.clear()` in browser console
- To add a new module to sidebar: add nav-item in all HTML files
- Print receipts: wrap content in `<div id="receiptPrint">`, call `printElement('receiptPrint')`
- 

- Admin icon and user at right up corner with drop down thing
Server- mongodb
node.js
tailwind css
react js
frontend - react vite tailwind
backend - node.js mongo
frontend deploy - vercel
backend server - laptop
