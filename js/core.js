/* ═══════════════════════════════════════════════
   EduSoft — Core Utilities (core.js)
   Uniitechs | Load this on EVERY page
   ═══════════════════════════════════════════════ */

'use strict';

// ──────────────────────────────────────────────
// DATABASE — localStorage wrapper
// ──────────────────────────────────────────────
const DB = {
  _key: (k) => `edusoft_${k}`,

  get(k) {
    try {
      return JSON.parse(localStorage.getItem(this._key(k)));
    } catch {
      return null;
    }
  },

  set(k, v) {
    try {
      localStorage.setItem(this._key(k), JSON.stringify(v));
      return true;
    } catch {
      return false;
    }
  },

  remove(k) {
    localStorage.removeItem(this._key(k));
  },

  push(k, item) {
    const arr = this.get(k) || [];
    arr.push(item);
    return this.set(k, arr);
  },

  update(k, id, changes) {
    const arr = this.get(k) || [];
    const idx = arr.findIndex(x => x.id === id);
    if (idx === -1) return false;
    arr[idx] = { ...arr[idx], ...changes };
    return this.set(k, arr);
  },

  delete(k, id) {
    const arr = this.get(k) || [];
    return this.set(k, arr.filter(x => x.id !== id));
  },

  find(k, id) {
    return (this.get(k) || []).find(x => x.id === id) || null;
  },

  nextId(k, prefix = '') {
    const arr = this.get(k) || [];
    const num = arr.length + 1;
    return prefix + String(num).padStart(3, '0');
  },
};

// ──────────────────────────────────────────────
// SEED DATA — runs once on first ever load
// ──────────────────────────────────────────────
function seedDatabase() {
  if (DB.get('_seeded')) return;

  DB.set('courses', [
    { id: 'C001', code: 'CS101',  name: 'Computer Science',    duration: '1 Year',  seats: 60, fee: 25000, status: 'Active',   subjects: ['Mathematics','Physics','CS Theory','Practical'] },
    { id: 'C002', code: 'COM201', name: 'Commerce (11–12)',    duration: '2 Years', seats: 80, fee: 18000, status: 'Active',   subjects: ['Accounts','Economics','Business Studies','English'] },
    { id: 'C003', code: 'SCI301', name: 'Science (PCM)',       duration: '2 Years', seats: 60, fee: 22000, status: 'Active',   subjects: ['Physics','Chemistry','Maths','English'] },
    { id: 'C004', code: 'BCA01',  name: 'BCA',                 duration: '3 Years', seats: 40, fee: 32000, status: 'Active',   subjects: ['C Programming','DBMS','Web Dev','Maths'] },
    { id: 'C005', code: 'ARTS01', name: 'Arts (11–12)',        duration: '2 Years', seats: 50, fee: 14000, status: 'Active',   subjects: ['History','Geography','Political Science','English'] },
  ]);

  DB.set('students', [
    { id: 'S001', firstName: 'Arjun',   lastName: 'Patel',  email: 'arjun@email.com',  phone: '9876543210', course: 'C001', batch: '2024-25', gender: 'Male',   dob: '2006-04-12', address: 'Ahmedabad', status: 'Active',  feesStatus: 'Paid',    admissionDate: '2024-06-01', rollNo: 'CS-001', parentName: 'Rajesh Patel',  parentPhone: '9876543211' },
    { id: 'S002', firstName: 'Priya',   lastName: 'Shah',   email: 'priya@email.com',  phone: '9123456789', course: 'C002', batch: '2024-25', gender: 'Female', dob: '2006-08-22', address: 'Surat',     status: 'Active',  feesStatus: 'Pending', admissionDate: '2024-06-03', rollNo: 'COM-001', parentName: 'Suresh Shah',   parentPhone: '9123456780' },
    { id: 'S003', firstName: 'Rohit',   lastName: 'Mehta',  email: 'rohit@email.com',  phone: '9988776655', course: 'C003', batch: '2024-25', gender: 'Male',   dob: '2006-01-15', address: 'Vadodara',  status: 'Active',  feesStatus: 'Paid',    admissionDate: '2024-06-05', rollNo: 'SCI-001', parentName: 'Ketan Mehta',   parentPhone: '9988776644' },
    { id: 'S004', firstName: 'Neha',    lastName: 'Gupta',  email: 'neha@email.com',   phone: '9011223344', course: 'C004', batch: '2024-25', gender: 'Female', dob: '2003-11-30', address: 'Rajkot',    status: 'Pending', feesStatus: 'Pending', admissionDate: '2024-06-08', rollNo: 'BCA-001', parentName: 'Anil Gupta',    parentPhone: '9011223355' },
    { id: 'S005', firstName: 'Karan',   lastName: 'Joshi',  email: 'karan@email.com',  phone: '9555666777', course: 'C001', batch: '2024-25', gender: 'Male',   dob: '2006-03-18', address: 'Gandhinagar',status: 'Active',  feesStatus: 'Paid',    admissionDate: '2024-06-02', rollNo: 'CS-002', parentName: 'Dinesh Joshi',  parentPhone: '9555666788' },
    { id: 'S006', firstName: 'Aisha',   lastName: 'Khan',   email: 'aisha@email.com',  phone: '9444333222', course: 'C005', batch: '2024-25', gender: 'Female', dob: '2006-07-09', address: 'Bharuch',   status: 'Active',  feesStatus: 'Paid',    admissionDate: '2024-06-04', rollNo: 'ART-001', parentName: 'Imran Khan',    parentPhone: '9444333211' },
    { id: 'S007', firstName: 'Vivek',   lastName: 'Tiwari', email: 'vivek@email.com',  phone: '9777888999', course: 'C003', batch: '2024-25', gender: 'Male',   dob: '2005-12-20', address: 'Anand',     status: 'Active',  feesStatus: 'Partial', admissionDate: '2024-06-06', rollNo: 'SCI-002', parentName: 'Rakesh Tiwari', parentPhone: '9777888000' },
  ]);

  DB.set('faculty', [
    { id: 'F001', name: 'Prof. Meera Shah',    subject: 'Mathematics',   qualification: 'M.Sc., B.Ed.', experience: 8,  phone: '9800100200', email: 'meera@edusoft.in',   status: 'Active',  joinDate: '2019-07-01', salary: 35000 },
    { id: 'F002', name: 'Mr. Vivek Sharma',    subject: 'Physics',       qualification: 'M.Sc.',        experience: 5,  phone: '9800100201', email: 'vivek@edusoft.in',   status: 'Active',  joinDate: '2021-06-15', salary: 28000 },
    { id: 'F003', name: 'Ms. Pooja Desai',     subject: 'CS & Web Dev',  qualification: 'MCA, B.Ed.',   experience: 6,  phone: '9800100202', email: 'pooja@edusoft.in',   status: 'Active',  joinDate: '2020-06-01', salary: 30000 },
    { id: 'F004', name: 'Mr. Ajay Verma',      subject: 'Accounts',      qualification: 'M.Com, B.Ed.', experience: 10, phone: '9800100203', email: 'ajay@edusoft.in',    status: 'Active',  joinDate: '2015-07-01', salary: 38000 },
    { id: 'F005', name: 'Ms. Reena Pandey',    subject: 'English',       qualification: 'M.A., B.Ed.',  experience: 7,  phone: '9800100204', email: 'reena@edusoft.in',   status: 'On Leave',joinDate: '2018-06-20', salary: 27000 },
  ]);

  DB.set('feeTransactions', [
    { id: 'T001', receiptNo: 'RCP-001', studentId: 'S001', studentName: 'Arjun Patel',   amount: 25000, date: '2024-06-10', mode: 'UPI',           remarks: 'Full year fees',    status: 'Paid' },
    { id: 'T002', receiptNo: 'RCP-002', studentId: 'S003', studentName: 'Rohit Mehta',   amount: 11000, date: '2024-06-15', mode: 'Cash',          remarks: 'Term 1 fees',       status: 'Paid' },
    { id: 'T003', receiptNo: 'RCP-003', studentId: 'S005', studentName: 'Karan Joshi',   amount: 25000, date: '2024-06-18', mode: 'Bank Transfer', remarks: 'Full year fees',    status: 'Paid' },
    { id: 'T004', receiptNo: 'RCP-004', studentId: 'S006', studentName: 'Aisha Khan',    amount: 14000, date: '2024-06-20', mode: 'UPI',           remarks: 'Full year fees',    status: 'Paid' },
    { id: 'T005', receiptNo: 'RCP-005', studentId: 'S007', studentName: 'Vivek Tiwari',  amount: 11000, date: '2024-06-22', mode: 'Cheque',        remarks: 'First installment', status: 'Paid' },
  ]);

  DB.set('exams', [
    { id: 'E001', name: 'Unit Test 1',    courseId: 'C001', date: '2024-08-15', duration: '2 Hours', maxMarks: 100, status: 'Completed' },
    { id: 'E002', name: 'Mid Term Exam',  courseId: 'C002', date: '2024-09-01', duration: '3 Hours', maxMarks: 100, status: 'Upcoming' },
    { id: 'E003', name: 'Practical Exam', courseId: 'C001', date: '2024-09-10', duration: '3 Hours', maxMarks: 50,  status: 'Upcoming' },
    { id: 'E004', name: 'Unit Test 1',    courseId: 'C003', date: '2024-08-20', duration: '2 Hours', maxMarks: 100, status: 'Completed' },
  ]);

  DB.set('results', [
    { id: 'R001', studentId: 'S001', examId: 'E001', marksObtained: 78, grade: 'B+', result: 'Pass' },
    { id: 'R002', studentId: 'S003', examId: 'E004', marksObtained: 91, grade: 'A+', result: 'Pass' },
    { id: 'R003', studentId: 'S005', examId: 'E001', marksObtained: 65, grade: 'C+', result: 'Pass' },
    { id: 'R004', studentId: 'S007', examId: 'E004', marksObtained: 55, grade: 'C',  result: 'Pass' },
  ]);

  DB.set('notices', [
    { id: 'N001', title: 'Fee Submission Deadline',  message: 'Last date for fee submission is 30th July 2024. Late fee of ₹100/day applicable after that.', priority: 'Important', audience: 'All', date: '2024-06-20', postedBy: 'Admin' },
    { id: 'N002', title: 'Annual Day — 15 Aug',      message: 'Annual Day celebrations on 15th August. All students must be present in school uniform by 9 AM.', priority: 'Normal',    audience: 'Students', date: '2024-07-01', postedBy: 'Admin' },
    { id: 'N003', title: 'Faculty Meeting',          message: 'Mandatory faculty meeting on 10th July at 10 AM in the conference hall.', priority: 'Urgent',    audience: 'Faculty', date: '2024-07-05', postedBy: 'Principal' },
  ]);

  DB.set('books', [
    { id: 'B001', title: 'Mathematics Vol. I',     author: 'R.D. Sharma',      category: 'Science',   total: 10, available: 3 },
    { id: 'B002', title: 'English Grammar',        author: 'Wren & Martin',    category: 'Language',  total: 8,  available: 0 },
    { id: 'B003', title: 'Physics Concepts',       author: 'H.C. Verma',       category: 'Science',   total: 12, available: 5 },
    { id: 'B004', title: 'Computer Fundamentals',  author: 'P.K. Sinha',       category: 'Tech',      total: 6,  available: 2 },
    { id: 'B005', title: 'Accountancy Vol. I',     author: 'T.S. Grewal',      category: 'Commerce',  total: 8,  available: 4 },
  ]);

  DB.set('attendanceLog', []);

  DB.set('_seeded', true);
  console.log('%c[EduSoft] Database seeded ✓', 'color:#0ea5e9;font-weight:600');
}

// ──────────────────────────────────────────────
// AUTH
// ──────────────────────────────────────────────
const AUTH_USERS = {
  admin:   { password: 'admin123',   role: 'Admin',   name: 'Admin User',        otp: '1234' },
  student: { password: 'student123', role: 'Student', name: 'Arjun Patel',       otp: '2345' },
  faculty: { password: 'faculty123', role: 'Faculty', name: 'Prof. Meera Shah',  otp: '3456' },
  parent:  { password: 'parent123',  role: 'Parent',  name: 'Rajesh Patel',      otp: '4567' },
};

const Auth = {
  login(username, password) {
    const u = AUTH_USERS[username.toLowerCase()];
    if (!u || u.password !== password) return null;
    const session = { username, role: u.role, name: u.name, loginTime: Date.now() };
    DB.set('session', session);
    return session;
  },

  getSession() {
    return DB.get('session');
  },

  isLoggedIn() {
    const s = DB.get('session');
    if (!s) return false;
    // 8-hour session
    return (Date.now() - s.loginTime) < 8 * 60 * 60 * 1000;
  },

  logout() {
    DB.remove('session');
    window.location.href = '../index.html';
  },

  require() {
    if (!this.isLoggedIn()) {
      window.location.href = '../index.html';
      return null;
    }
    return this.getSession();
  },

  getOtp(username) {
    return AUTH_USERS[username.toLowerCase()]?.otp || null;
  },
};

// ──────────────────────────────────────────────
// TOAST
// ──────────────────────────────────────────────
const Toast = {
  _container: null,

  _getContainer() {
    if (!this._container) {
      this._container = document.createElement('div');
      this._container.className = 'toast-container';
      document.body.appendChild(this._container);
    }
    return this._container;
  },

  show(message, type = 'info', duration = 3500) {
    const icons = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' };
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'error' : type}`;
    toast.innerHTML = `<span class="toast-icon">${icons[type] || icons.info}</span><span>${message}</span>`;
    this._getContainer().appendChild(toast);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => toast.classList.add('show'));
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, duration);
  },

  success: (msg, d) => Toast.show(msg, 'success', d),
  error:   (msg, d) => Toast.show(msg, 'error',   d),
  warning: (msg, d) => Toast.show(msg, 'warning', d),
  info:    (msg, d) => Toast.show(msg, 'info',    d),
};

// ──────────────────────────────────────────────
// MODAL
// ──────────────────────────────────────────────
const Modal = {
  open(id) {
    const el = document.getElementById(id);
    if (el) {
      el.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  },

  close(id) {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove('open');
      document.body.style.overflow = '';
    }
  },

  closeAll() {
    document.querySelectorAll('.modal-overlay.open').forEach(m => {
      m.classList.remove('open');
    });
    document.body.style.overflow = '';
  },
};

// Close modal on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    Modal.close(e.target.id);
  }
});

// Close modal on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') Modal.closeAll();
});

// ──────────────────────────────────────────────
// SIDEBAR — init & active state
// ──────────────────────────────────────────────
function initSidebar(activePage) {
  const session = Auth.require();
  if (!session) return;

  // fill user info
  const name = session.name;
  const role = session.role;
  const initial = name[0].toUpperCase();

  document.querySelectorAll('[data-user-avatar]').forEach(el => el.textContent = initial);
  document.querySelectorAll('[data-user-name]').forEach(el => el.textContent = name);
  document.querySelectorAll('[data-user-role]').forEach(el => el.textContent = role);

  // set active nav
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
    if (item.dataset.page === activePage) item.classList.add('active');
  });

  // mobile hamburger
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.getElementById('sidebarOverlay');

  if (hamburger && sidebar) {
    hamburger.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      if (overlay) overlay.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
    });
  }
  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.style.display = 'none';
    });
  }
}

// ──────────────────────────────────────────────
// UTILITIES
// ──────────────────────────────────────────────
const Utils = {
  formatCurrency(amount) {
    return '₹' + Number(amount).toLocaleString('en-IN');
  },

  formatDate(dateStr) {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  },

  today() {
    return new Date().toISOString().split('T')[0];
  },

  greet() {
    const h = new Date().getHours();
    return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  },

  fullDate() {
    return new Date().toLocaleDateString('en-IN', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  },

  initials(name) {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  },

  debounce(fn, delay = 300) {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
  },

  getGrade(marks, max) {
    const pct = (marks / max) * 100;
    if (pct >= 90) return 'A+';
    if (pct >= 80) return 'A';
    if (pct >= 70) return 'B+';
    if (pct >= 60) return 'B';
    if (pct >= 50) return 'C+';
    if (pct >= 40) return 'C';
    return 'F';
  },

  statusBadge(status) {
    const map = {
      'Active':    'badge-green',
      'Inactive':  'badge-gray',
      'Pending':   'badge-yellow',
      'Paid':      'badge-green',
      'Unpaid':    'badge-red',
      'Partial':   'badge-yellow',
      'Completed': 'badge-teal',
      'Upcoming':  'badge-blue',
      'Pass':      'badge-green',
      'Fail':      'badge-red',
      'On Leave':  'badge-yellow',
      'Urgent':    'badge-red',
      'Important': 'badge-yellow',
      'Normal':    'badge-blue',
    };
    const cls = map[status] || 'badge-gray';
    return `<span class="badge ${cls}">${status}</span>`;
  },

  confirmDelete(message = 'Are you sure you want to delete this record? This cannot be undone.') {
    return confirm(message);
  },

  // Validate a simple form — returns { valid, errors }
  validate(rules) {
    const errors = [];
    for (const [fieldId, label, type] of rules) {
      const el = document.getElementById(fieldId);
      const val = el?.value?.trim() || '';
      if (!val) {
        errors.push(`${label} is required.`);
        el?.closest('.field')?.classList.add('has-error');
      } else {
        el?.closest('.field')?.classList.remove('has-error');
        if (type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          errors.push(`${label} must be a valid email.`);
          el?.closest('.field')?.classList.add('has-error');
        }
        if (type === 'phone' && !/^[6-9]\d{9}$/.test(val)) {
          errors.push(`${label} must be a valid 10-digit mobile number.`);
          el?.closest('.field')?.classList.add('has-error');
        }
      }
    }
    return { valid: errors.length === 0, errors };
  },

  // Generate next receipt number
  nextReceipt() {
    const txns = DB.get('feeTransactions') || [];
    const num = txns.length + 1;
    return 'RCP-' + String(num).padStart(4, '0');
  },
};

// ──────────────────────────────────────────────
// COURSE HELPER
// ──────────────────────────────────────────────
function getCourse(id) {
  return DB.find('courses', id);
}

function getCourseName(id) {
  return getCourse(id)?.name || id;
}

function populateCourseSelect(selectId, includeBlank = true) {
  const el = document.getElementById(selectId);
  if (!el) return;
  const courses = DB.get('courses') || [];
  el.innerHTML = (includeBlank ? '<option value="">— Select Course —</option>' : '') +
    courses.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
}

function populateStudentSelect(selectId, includeBlank = true) {
  const el = document.getElementById(selectId);
  if (!el) return;
  const students = DB.get('students') || [];
  el.innerHTML = (includeBlank ? '<option value="">— Select Student —</option>' : '') +
    students.map(s => `<option value="${s.id}">${s.firstName} ${s.lastName} (${s.rollNo || s.id})</option>`).join('');
}

// ──────────────────────────────────────────────
// PRINT HELPER
// ──────────────────────────────────────────────
function printElement(elementId, title = 'EduSoft — Print') {
  const el = document.getElementById(elementId);
  if (!el) return;
  const w = window.open('', '_blank', 'width=800,height=600');
  w.document.write(`<!DOCTYPE html>
<html>
<head>
  <title>${title}</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Plus Jakarta Sans', sans-serif; color: #0f172a; padding: 32px; font-size: 13px; line-height: 1.6; }
    .receipt-box { border: 1.5px dashed #93c5fd; border-radius: 14px; padding: 24px; }
    .receipt-head { display: flex; justify-content: space-between; padding-bottom: 14px; border-bottom: 1px solid #e2e8f0; margin-bottom: 14px; }
    .brand { font-family: 'DM Serif Display', serif; font-size: 24px; color: #0284c7; }
    .brand-sub { font-size: 10px; color: #94a3b8; letter-spacing: 1px; text-transform: uppercase; }
    .receipt-row { display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid #f1f5f9; }
    .receipt-total { display: flex; justify-content: space-between; font-size: 17px; font-weight: 700; padding-top: 12px; margin-top: 8px; border-top: 1.5px solid #93c5fd; }
    .badge { padding: 2px 10px; border-radius: 99px; font-size: 11px; font-weight: 600; }
    .badge-green { background: #dcfce7; color: #15803d; }
    .footer-note { text-align: center; font-size: 11px; color: #94a3b8; margin-top: 20px; }
    @media print { body { padding: 0; } }
  </style>
</head>
<body>${el.innerHTML}</body>
</html>`);
  w.document.close();
  w.focus();
  setTimeout(() => { w.print(); w.close(); }, 400);
}

// ──────────────────────────────────────────────
// BOOT
// ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  seedDatabase();
});
