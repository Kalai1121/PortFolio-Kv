const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Dynamically load nodemailer to prevent boot crashes if not installed
let nodemailer;
try {
  nodemailer = require('nodemailer');
} catch (e) {
  console.log('[Mail Warning] Nodemailer is not installed. Run "npm install nodemailer" to enable email notifications.');
}

// Auto-copy generated profile image to target folders
try {
  const srcFileHome = 'C:\\Users\\kalai\\.gemini\\antigravity\\brain\\e93fe0d5-650d-49a5-b8ee-dec0490dd4e0\\media__1779189307475.jpg';
  const srcFileAbout = 'C:\\Users\\kalai\\.gemini\\antigravity\\brain\\e93fe0d5-650d-49a5-b8ee-dec0490dd4e0\\media__1779189307451.jpg';
  
  const publicDestHome = path.join(__dirname, 'public', 'profile.jpg');
  const publicDestAbout = path.join(__dirname, 'public', 'about_profile.jpg');
  const assetsDir = path.join(__dirname, 'src', 'assets');
  const assetsDestHome = path.join(assetsDir, 'profile.jpg');
  const assetsDestAbout = path.join(assetsDir, 'about_profile.jpg');

  // Ensure assets dir exists
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  // Copy Home Photo
  if (fs.existsSync(srcFileHome)) {
    fs.copyFileSync(srcFileHome, publicDestHome);
    fs.copyFileSync(srcFileHome, assetsDestHome);
    console.log('[Autocopy] Real Home profile photo copied successfully.');
  }

  // Copy About Photo
  if (fs.existsSync(srcFileAbout)) {
    fs.copyFileSync(srcFileAbout, publicDestAbout);
    fs.copyFileSync(srcFileAbout, assetsDestAbout);
    console.log('[Autocopy] Real About profile photo copied successfully.');
  }
} catch (e) {
  console.log('[Autocopy Warning] could not copy profile photos:', e.message);
}

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio_db';

// Admin Access Keys for RBAC API validation
const ADMIN_ACCESS_KEY = process.env.ADMIN_ACCESS_KEY || 'admin_secret_key_127_986';
const SUPER_ADMIN_ACCESS_KEY = process.env.SUPER_ADMIN_ACCESS_KEY || 'super_admin_secret_key_999_888';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist', 'kalai-portfolio')));

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully.');
    seedProjects(); // Seed database on connection
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    console.log('Ensure MongoDB is running locally at 127.0.0.1:27017 or check MONGODB_URI in .env');
  });

// --- MongoDB Schemas & Models ---

// Inquiry Schema (Contact Form Submissions)
const InquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, default: 'General Inquiry' },
  message: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Responded', 'Archived'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});
const Inquiry = mongoose.model('Inquiry', InquirySchema);

// Project Schema
const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['Enterprise', 'Full-Stack', 'Frontend', 'UI-UX'], required: true },
  technologies: { type: [String], required: true },
  demoLink: { type: String, default: '' },
  githubLink: { type: String, default: '' },
  imageUrl: { type: String, default: '' },
  featured: { type: Boolean, default: false }
});
const Project = mongoose.model('Project', ProjectSchema);

// --- Database Auto-Seeding ---
// --- Database Auto-Seeding ---
async function seedProjects() {
  try {
    // Clear collection to ensure updated human-like descriptions are seeded
    await Project.deleteMany({});
    console.log('Cleared existing projects collection for fresh seeding.');

    const projectsData = [
      {
        title: "Guestezee Hotel Admin Portal",
        description: "Worked on the admin interface of an enterprise hotel management system. Designed dashboard screens to manage reservations, check-ins, room statuses, and daily audits.",
        category: "Enterprise",
        technologies: ["Angular", "TypeScript", "RxJS", "REST APIs", "MongoDB"],
        demoLink: "",
        githubLink: "",
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&auto=format&fit=crop&q=60",
        featured: true
      },
      {
        title: "Guestezee Super Admin",
        description: "Developed the multi-tenant control panel for Guestezee, allowing super admins to manage multiple hotel branches, audit staff activity logs, and view consolidated revenue reports.",
        category: "Enterprise",
        technologies: ["Angular", "TypeScript", "REST APIs", "MongoDB", "Bootstrap"],
        demoLink: "",
        githubLink: "",
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&auto=format&fit=crop&q=60",
        featured: true
      },
      {
        title: "AMS (Attendance Management System)",
        description: "Built an internal attendance tracking app using Angular 16 SSR. Implemented modules for shifts scheduling, leave requests, overtime logs, and visitor check-ins.",
        category: "Enterprise",
        technologies: ["Angular 16", "SSR", "TypeScript", "RxJS", "HTTP Interceptors"],
        demoLink: "",
        githubLink: "",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop&q=60",
        featured: true
      },
      {
        title: "eProov Evaluation Dashboard",
        description: "Integrated frontend panels for a server-side rendered evaluation platform, rendering real-time candidate workflows, grading scorecards, and reporting metrics.",
        category: "Enterprise",
        technologies: ["Angular", "TypeScript", "Bootstrap", "RxJS", "SSR"],
        demoLink: "",
        githubLink: "",
        imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&auto=format&fit=crop&q=60",
        featured: true
      },
      {
        title: "House of Talent Platform",
        description: "Collaborated on debugging, refactoring, and optimizing the user interface of an enterprise candidate talent pool directory.",
        category: "Enterprise",
        technologies: ["Angular", "TypeScript", "Bootstrap", "UI Optimization"],
        demoLink: "",
        githubLink: "",
        imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=60",
        featured: false
      },
      {
        title: "Vigha Operations Interface",
        description: "Resolved responsive display layout bugs and improved overall usability of a multi-tenant operational control panel.",
        category: "Enterprise",
        technologies: ["Angular", "TypeScript", "CSS3", "Responsive Layouts"],
        demoLink: "",
        githubLink: "",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60",
        featured: false
      },
      {
        title: "Student Data Manager",
        description: "A full-stack portal created to manage student records. Built MongoDB schemas, Express APIs, and designed a dashboard with React.",
        category: "Full-Stack",
        technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "Postman", "Bootstrap"],
        demoLink: "https://student-data-management-575o.onrender.com",
        githubLink: "https://github.com/kalai1121/Student-Data-Management",
        imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=500&auto=format&fit=crop&q=60",
        featured: true
      },
      {
        title: "MERN Task Manager",
        description: "A responsive to-do application that syncs with a MongoDB backend. Allows adding, editing, archiving, and prioritizing daily tasks.",
        category: "Full-Stack",
        technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "Bootstrap", "jQuery"],
        demoLink: "https://todo-list-i5df.onrender.com",
        githubLink: "https://github.com/kalai1121/Todo-list-backend",
        imageUrl: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=500&auto=format&fit=crop&q=60",
        featured: true
      },
      {
        title: "Dynamic Weather App",
        description: "A clean dashboard querying global climates. Fetches real-time temperature ranges, wind speeds, and predictions using the OpenWeatherMap API.",
        category: "Frontend",
        technologies: ["React.js", "JavaScript (ES6)", "OpenWeatherMap API", "Vite", "React Hooks"],
        demoLink: "https://kalai1121.github.io/Weather-app/",
        githubLink: "https://github.com/kalai1121/Weather-app",
        imageUrl: "https://images.unsplash.com/photo-1504253163759-c23fcca5e464?w=500&auto=format&fit=crop&q=60",
        featured: true
      },
      {
        title: "Personal Portfolio v1",
        description: "First version of my custom portfolio website built to showcase my transition into front-end and full-stack engineering.",
        category: "Frontend",
        technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
        demoLink: "https://kalai1121.github.io/Personal-Portfolio/",
        githubLink: "https://github.com/kalai1121/Personal-Portfolio",
        imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500&auto=format&fit=crop&q=60",
        featured: false
      },
      {
        title: "ParkNow - Google UX Case Study",
        description: "A comprehensive UX research study and interactive Figma prototype designed to simplify the ticket dispute process for city parking systems.",
        category: "UI-UX",
        technologies: ["Google UX Design", "Figma", "Photoshop", "User Research", "Wireframing"],
        demoLink: "https://kalai1121.github.io/Portfolio-Kalai/uploads/Google%20UX%20Design%20Certificate%20-%20Portfolio%20Project%202%20-%20Case%20study%20slide%20deck%20%5BTemplate%5D.pdf",
        githubLink: "https://www.figma.com/design/EC6E2rSQt7v2PFOlJCXRYk/ParkNow",
        imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=500&auto=format&fit=crop&q=60",
        featured: true
      },
      {
        title: "Product Card Component",
        description: "A clean, modern product preview card UI designed with Tailwind CSS to test hover transformations and responsive padding rules.",
        category: "Frontend",
        technologies: ["HTML5", "Tailwind CSS", "Responsive Design"],
        demoLink: "https://kalai1121.github.io/Product-Card-with-tailwind-css/",
        githubLink: "https://github.com/kalai1121/Product-Card-with-tailwind-css",
        imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&auto=format&fit=crop&q=60",
        featured: false
      },
      {
        title: "E-Commerce Survey Form",
        description: "A structured, user-friendly customer feedback form built with active input highlights and regular expression email checks.",
        category: "Frontend",
        technologies: ["HTML5", "CSS3", "Flexbox", "Form Validation"],
        demoLink: "https://kalai1121.github.io/Survey-Form/",
        githubLink: "https://github.com/kalai1121/Survey-Form",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60",
        featured: false
      },
      {
        title: "Technical Documentation Page",
        description: "A clean web page template featuring a scroll-locked side nav and structured sections for developer API documents.",
        category: "Frontend",
        technologies: ["HTML5", "CSS3", "Responsive Layout"],
        demoLink: "https://kalai1121.github.io/Technical-Documentation-Page/",
        githubLink: "https://github.com/kalai1121/Technical-Documentation-Page",
        imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=60",
        featured: false
      }
    ];

    await Project.insertMany(projectsData);
    console.log(`Successfully seeded ${projectsData.length} projects into MongoDB.`);
  } catch (err) {
    console.error('Error seeding projects database:', err.message);
  }
}


// --- API Endpoints ---

// 1. Projects REST API
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find({});
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Server error retrieving projects.' });
  }
});

// Helper to send email notification using nodemailer
async function sendNotificationEmail(inquiry) {
  if (!nodemailer) {
    console.log('[Mail] Skipping email dispatch: nodemailer not installed.');
    return;
  }

  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass || emailUser === 'your_email@gmail.com') {
    console.log('[Mail Warning] Please configure EMAIL_USER and EMAIL_PASS in your .env file to enable email forwarding to kalaivanibadhri@gmail.com.');
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass
      }
    });

    const mailOptions = {
      from: `"Kalai Portfolio" <${emailUser}>`,
      to: 'kalaivanibadhri@gmail.com',
      subject: `New Portfolio Message: ${inquiry.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 25px; color: #1f2937; max-width: 600px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
          <h2 style="color: #6366f1; border-bottom: 2px solid #e5e7eb; padding-bottom: 12px; margin-top: 0; font-family: 'Outfit', sans-serif;">New Contact Inquiry Received</h2>
          <p style="margin: 10px 0;"><strong style="color: #4b5563;">From Name:</strong> ${inquiry.name}</p>
          <p style="margin: 10px 0;"><strong style="color: #4b5563;">Email Address:</strong> <a href="mailto:${inquiry.email}" style="color: #6366f1; text-decoration: none;">${inquiry.email}</a></p>
          <p style="margin: 10px 0;"><strong style="color: #4b5563;">Subject Title:</strong> ${inquiry.subject}</p>
          <p style="margin: 15px 0 10px 0;"><strong style="color: #4b5563;">Message Body:</strong></p>
          <div style="background-color: #f9fafb; padding: 18px; border-left: 4px solid #6366f1; border-radius: 4px; font-style: italic; white-space: pre-wrap; color: #374151; font-size: 0.95rem;">"${inquiry.message}"</div>
          <hr style="border: 0; border-top: 1px solid #f3f4f6; margin: 25px 0;" />
          <p style="font-size: 0.75rem; color: #9ca3af; text-align: center; margin: 0;">This is an automated notification from your Full-Stack Portfolio App served on port 3000.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('[Mail] Notification email forwarded to kalaivanibadhri@gmail.com successfully.');
  } catch (err) {
    console.error('[Mail Error] Failed to send notification email:', err.message);
  }
}

// 2. Submit Contact Inquiry API
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, Email, and Message are required fields.' });
  }
  
  try {
    const newInquiry = new Inquiry({ name, email, subject, message });
    await newInquiry.save();

    // Trigger email dispatch asynchronously
    sendNotificationEmail(newInquiry).catch(err => {
      console.error('[Mail Dispatch Error]', err.message);
    });

    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save inquiry to database.' });
  }
});

// Helper Auth Middleware for RBAC Dashboards
const checkAuth = (requiredRole) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'No authorization credentials supplied.' });
    }

    if (requiredRole === 'SuperAdmin') {
      if (authHeader === SUPER_ADMIN_ACCESS_KEY) {
        return next();
      }
      return res.status(403).json({ error: 'Access forbidden. Super Admin rights required.' });
    }

    if (requiredRole === 'Admin') {
      if (authHeader === ADMIN_ACCESS_KEY || authHeader === SUPER_ADMIN_ACCESS_KEY) {
        return next();
      }
      return res.status(403).json({ error: 'Access forbidden. Administrative rights required.' });
    }

    next();
  };
};

// 3. Admin: Retrieve Contact Inquiries API
app.get('/api/contact', checkAuth('Admin'), async (req, res) => {
  try {
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
    res.status(200).json(inquiries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve inquiries.' });
  }
});

// 4. Admin: Update Contact Inquiry Status API
app.put('/api/contact/:id', checkAuth('Admin'), async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  if (!['Pending', 'Responded', 'Archived'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status state supplied.' });
  }

  try {
    const inquiry = await Inquiry.findByIdAndUpdate(id, { status }, { new: true });
    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry message not found.' });
    }
    res.status(200).json({ success: true, inquiry });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status.' });
  }
});

// 5. Super Admin: Delete Contact Inquiry API (Demoing Full CRUD)
app.delete('/api/contact/:id', checkAuth('SuperAdmin'), async (req, res) => {
  const { id } = req.params;
  try {
    const inquiry = await Inquiry.findByIdAndDelete(id);
    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry message not found.' });
    }
    res.status(200).json({ success: true, message: 'Message permanently removed from database (CRUD Success).' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete message.' });
  }
});

// SPA routing callback: Serves frontend layout for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'kalai-portfolio', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
