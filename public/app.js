/* ==========================================
   Full Stack Portfolio - Reactive SPA Client Logic
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Theme & Layout Trackers
  initTheme();
  initSPA();
  initCustomGlow();
  initTypewriter();
  
  // Data Loaders
  renderExperience();
  renderSkills();
  renderCertificates();
  fetchProjects();

  // Contact Form Handlers
  initContactForm();

  // Copyright dynamic year update
  const copyEl = document.getElementById('copyrightYear');
  if (copyEl) copyEl.textContent = new Date().getFullYear();
});

/* ==========================================
   THEME MANAGER
   ========================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  
  // Load saved theme
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.body.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (theme === 'dark') {
      themeIcon.className = 'fas fa-sun';
    } else {
      themeIcon.className = 'fas fa-moon';
    }
  }
}

/* ==========================================
   SPA ROUTER (HASH ROUTING)
   ========================================== */
function initSPA() {
  const links = document.querySelectorAll('.nav-link, .drawer-link');
  const pages = document.querySelectorAll('.spa-page');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const hamburgerIcon = document.getElementById('hamburgerIcon');
  
  // Handle Hamburger Click
  hamburgerBtn.addEventListener('click', () => {
    mobileDrawer.classList.toggle('open');
    if (mobileDrawer.classList.contains('open')) {
      hamburgerIcon.className = 'fas fa-times';
    } else {
      hamburgerIcon.className = 'fas fa-bars';
    }
  });

  // Navigation Links Click Trigger
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('data-target');
      navigateToPage(targetId);
      
      // Close drawer on click
      mobileDrawer.classList.remove('open');
      hamburgerIcon.className = 'fas fa-bars';
    });
  });

  // Track Hash changes on load
  function handleHash() {
    const hash = window.location.hash.replace('#', '') || 'home';
    const validPages = ['home', 'about', 'skills', 'portfolio', 'contact'];
    const target = validPages.includes(hash) ? hash : 'home';
    
    const targetEl = document.getElementById(`${target}-page`);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  }

  window.addEventListener('hashchange', handleHash);
  setTimeout(handleHash, 400);

  function navigateToPage(pageId) {
    if (window.location.hash !== `#${pageId}`) {
      window.history.pushState(null, '', `#${pageId}`);
    }

    const targetEl = document.getElementById(`${pageId}-page`);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Set up scroll reveal & active nav tracker inside public SPA
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id.replace('-page', '');
        
        links.forEach(l => {
          if (l.getAttribute('data-target') === id) {
            l.classList.add('active');
          } else {
            l.classList.remove('active');
          }
        });
      }
    });
  }, {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
      }
    });
  }, { threshold: 0.1 });

  pages.forEach(p => {
    scrollObserver.observe(p);
    if (p.id !== 'home-page') {
      revealObserver.observe(p);
    }
  });

  // Top Progress bar scroll tracker
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = scrollHeight > 0 ? (scrollPos / scrollHeight) * 100 : 0;
    
    const progressEl = document.getElementById('topScrollProgress');
    if (progressEl) {
      progressEl.style.width = scrollPercentage + '%';
    }
  });

  // Bind homepage buttons
  document.getElementById('btnHomeContact').addEventListener('click', (e) => {
    e.preventDefault();
    navigateToPage('contact');
  });
}

/* ==========================================
   CUSTOM MOUSE GLOW
   ========================================== */
function initCustomGlow() {
  const glow = document.getElementById('customCursorGlow');
  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

/* ==========================================
   TYPEWRITER HERO Headline
   ========================================== */
function initTypewriter() {
  const el = document.getElementById('typewriterText');
  if (!el) return; // Silent return for refined human header layout
  const titles = [
    'Front-End Developer',
    'Angular Specialist',
    'Full-Stack Developer (MERN)',
    'UI/UX Enthusiast'
  ];
  
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
      el.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      el.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      isDeleting = true;
      typeSpeed = 1800;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }
  
  type();
}


/* ==========================================
   TIMELINE RENDERER (Resume Data)
   ========================================== */
function renderExperience() {
  const container = document.getElementById('experienceTimeline');
  const experiences = [
    {
      year: 'Jan 2026 - Present',
      role: 'Software Developer (Intern → Trainee)',
      organization: 'ECBEE Innovations Pvt Ltd',
      description: 'Worked on 5+ live production apps using Angular, TypeScript, and MongoDB. Implemented JSON-driven product listings, custom RBAC administration dashboards, SSR evaluation platforms (AMS, eProov), and resolved production-level bugs.',
      tech: ['Angular', 'TypeScript', 'RxJS', 'REST APIs', 'MongoDB', 'SSR']
    },
    {
      year: 'Jan 2025 - May 2025',
      role: 'Developer Intern',
      organization: 'Letzbizz',
      description: 'Gained hands-on experience in MERN stack development. Designed responsive web layouts with Tailwind, integrated React Hooks, established Node/Express router endpoints, and structured MongoDB CRUD collections.',
      tech: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS']
    },
    {
      year: 'Aug 2024 - Nov 2024',
      role: 'Software Development Intern',
      organization: 'TEMS Tech Solutions',
      description: 'Assisted in desktop development using C# and SQL server database queries. Conducted system debugging and documented tech guides.',
      tech: ['C#', 'SQL', 'Documentation', 'Debugging']
    },
    {
      year: 'Mar 2024 - Jun 2024',
      role: 'Web Development Intern',
      organization: 'VeriTech Software Services',
      description: 'Developed responsive user forms and registration cards with MySQL database saves. Collaborated on Figma design wireframes.',
      tech: ['HTML5', 'CSS3', 'Bootstrap', 'MySQL', 'Figma']
    }
  ];

  container.innerHTML = experiences.map(exp => `
    <div class="vertical-timeline-item">
      <div class="timeline-dot dot-secondary"></div>
      <div class="glass-card timeline-card">
        <span class="timeline-tag tag-secondary">${exp.year}</span>
        <h4 class="event-role">${exp.role}</h4>
        <p class="event-org">${exp.organization}</p>
        <p class="event-desc">${exp.description}</p>
        <div class="timeline-tech">
          ${exp.tech.map(t => `<span class="tech-pill">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

/* ==========================================
   SKILLS PROGRESS CIRCLES RENDERER
   ========================================== */
function renderSkills() {
  const container = document.getElementById('skillsGrid');
  const skillCategories = [
    {
      title: 'Front-End Development',
      skills: [
        { name: 'Angular (12-16)', percentage: 90, icon: 'devicon-angularjs-plain colored' },
        { name: 'React.js', percentage: 85, icon: 'devicon-react-original colored' },
        { name: 'TypeScript', percentage: 88, icon: 'devicon-typescript-plain colored' },
        { name: 'JavaScript (ES6+)', percentage: 90, icon: 'devicon-javascript-plain colored' },
        { name: 'HTML5 / CSS3', percentage: 95, icon: 'devicon-html5-plain colored' },
        { name: 'Tailwind CSS', percentage: 88, icon: 'devicon-tailwindcss-original colored' },
        { name: 'Bootstrap', percentage: 90, icon: 'devicon-bootstrap-plain colored' }
      ]
    },
    {
      title: 'Back-End & Databases',
      skills: [
        { name: 'Node.js', percentage: 80, icon: 'devicon-nodejs-plain colored' },
        { name: 'Express.js', percentage: 82, icon: 'devicon-express-original' },
        { name: 'MongoDB', percentage: 85, icon: 'devicon-mongodb-plain colored' },
        { name: 'SQL / MySQL', percentage: 75, icon: 'devicon-mysql-plain colored' },
        { name: 'C#', percentage: 70, icon: 'devicon-csharp-plain colored' }
      ]
    },
    {
      title: 'Design, QA & DevOps',
      skills: [
        { name: 'Google UX / Figma', percentage: 85, icon: 'devicon-figma-plain colored' },
        { name: 'API Testing (Postman)', percentage: 88, icon: 'fas fa-vial' },
        { name: 'Playwright (Automation)', percentage: 75, icon: 'fas fa-robot' },
        { name: 'Git & GitHub', percentage: 90, icon: 'devicon-github-original' },
        { name: 'Vercel / Netlify / Render', percentage: 85, icon: 'fas fa-cloud-upload-alt' }
      ]
    }
  ];

  container.innerHTML = skillCategories.map(cat => {
    const isFront = cat.title.includes('Front-End');
    const isBack = cat.title.includes('Back-End');
    const strokeColor = isFront ? 'var(--primary)' : isBack ? 'var(--secondary)' : 'var(--accent)';
    
    return `
      <div class="glass-card category-card">
        <h3 class="category-title">${cat.title}</h3>
        <div class="skills-list">
          ${cat.skills.map(s => {
            const radius = 20;
            const circ = 2 * Math.PI * radius; // ~125.6
            const strokeOffset = circ - (s.percentage / 100) * circ;
            
            return `
              <div class="skill-item">
                <div class="skill-identity">
                  <span class="skill-logo"><i class="${s.icon}"></i></span>
                  <span class="skill-name">${s.name}</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }).join('');
}

/* ==========================================
   CERTIFICATES CREDENTIALS RENDERER
   ========================================== */
function renderCertificates() {
  const container = document.getElementById('certsGrid');
  const certificates = [
    {
      title: 'Google UX Design Professional Certificate',
      issuer: 'Coursera (Google)',
      credentialUrl: 'https://www.coursera.org/account/accomplishments/specialization/DBN07XRBR40X',
      icon: 'fab fa-google'
    },
    {
      title: 'Responsive Web Design Certification',
      issuer: 'freeCodeCamp',
      credentialUrl: 'https://freecodecamp.org/certification/fccbb8da542-1bdf-4543-b0b7-3f3067f53f51/responsive-web-design',
      icon: 'fab fa-free-code-camp'
    },
    {
      title: 'Foundational C# Certification',
      issuer: 'freeCodeCamp & Microsoft',
      credentialUrl: 'https://www.freecodecamp.org/certification/fccbb8da542-1bdf-4543-b0b7-3f3067f53f51/foundational-c-sharp-with-microsoft',
      icon: 'fab fa-microsoft'
    },
    {
      title: 'Web Development Certificate',
      issuer: 'IBM',
      credentialUrl: 'https://www.credly.com/badges/dcfea366-8b2a-484f-9375-68096427fbc8/linked_in_profile',
      icon: 'fas fa-server'
    },
    {
      title: 'Python Programming Specialization',
      issuer: 'Guvi Geek Networks, IITM Research Park',
      credentialUrl: 'https://kalai1121.github.io/Portfolio-Kalai/uploads/Kalaivani%20S%20CPDA%20Certificate.pdf',
      icon: 'fab fa-python'
    }
  ];

  container.innerHTML = certificates.map(cert => `
    <div class="glass-card cert-card">
      <div class="cert-icon-wrapper">
        <i class="${cert.icon}"></i>
      </div>
      <div class="cert-info">
        <h4>${cert.title}</h4>
        <p class="cert-issuer">${cert.issuer}</p>
        <a href="${cert.credentialUrl}" target="_blank" class="cert-link">
          Verify Credential <i class="fas fa-external-link-alt"></i>
        </a>
      </div>
    </div>
  `).join('');
}

/* ==========================================
   PORTFOLIO DYNAMIC PROJECTS FETCH (MONGODB CRUD)
   ========================================== */
let allProjectsData = [];

function fetchProjects() {
  const loader = document.getElementById('portfolioLoader');
  const errorBox = document.getElementById('portfolioError');
  const errorText = document.getElementById('portfolioErrorText');
  const grid = document.getElementById('projectsGrid');
  const retryBtn = document.getElementById('btnRetryProjects');

  loader.style.display = 'flex';
  errorBox.style.display = 'none';
  grid.style.display = 'none';

  fetch('/api/projects')
    .then(res => {
      if (!res.ok) throw new Error('API request failed');
      return res.json();
    })
    .then(data => {
      allProjectsData = data;
      renderProjects('All');
      loader.style.display = 'none';
      grid.style.display = 'grid';
    })
    .catch(err => {
      console.error('Error fetching database projects:', err);
      loader.style.display = 'none';
      errorText.textContent = 'Failed to connect to the portfolio API. Ensure the Node server is running with MongoDB.';
      errorBox.style.display = 'flex';
    });

  // Bind Retry
  retryBtn.onclick = fetchProjects;

  // Bind category filters
  const filterBtns = document.querySelectorAll('#portfolioFilters .filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderProjects(filter);
    });
  });
}

function renderProjects(category) {
  const grid = document.getElementById('projectsGrid');
  const filtered = category === 'All' 
    ? allProjectsData 
    : allProjectsData.filter(p => p.category === category);

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="glass-card no-messages-banner" style="grid-column: 1 / -1;">
        <i class="far fa-folder-open"></i>
        <p>No projects found in this category.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <div class="glass-card project-card" onclick="triggerProjectModal('${p._id}')">
      <div class="project-img-wrapper">
        <img src="${p.imageUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500'}" alt="${p.title}" class="project-img">
        <span class="project-cat-badge badge-${p.category.toLowerCase()}">${p.category}</span>
      </div>
      <div class="project-body">
        <h3 class="project-card-title">${p.title}</h3>
        <p class="project-card-desc">${p.description}</p>
        <div class="project-tech-badges">
          ${p.technologies.slice(0, 4).map(t => `<span class="tech-tag">${t}</span>`).join('')}
          ${p.technologies.length > 4 ? `<span class="tech-tag-hidden">+${p.technologies.length - 4}</span>` : ''}
        </div>
        <div class="project-card-actions" onclick="event.stopPropagation();">
          <div class="card-left-actions">
            ${p.demoLink ? `<a href="${p.demoLink}" target="_blank" class="action-btn-demo"><i class="fas fa-external-link-alt"></i> Demo</a>` : ''}
            ${p.githubLink ? `<a href="${p.githubLink}" target="_blank" class="action-btn-git"><i class="fab fa-github"></i> Code</a>` : ''}
          </div>
          <button class="action-btn-details" onclick="triggerProjectModal('${p._id}')">Details <i class="fas fa-arrow-right"></i></button>
        </div>
      </div>
    </div>
  `).join('');
}

// Modal popups for projects
window.triggerProjectModal = function(id) {
  const project = allProjectsData.find(p => p._id === id);
  if (!project) return;

  const modal = document.getElementById('projectDetailsModal');
  const img = document.getElementById('modalProjectImg');
  const cat = document.getElementById('modalProjectCat');
  const title = document.getElementById('modalProjectTitle');
  const desc = document.getElementById('modalProjectDesc');
  const techList = document.getElementById('modalProjectTech');
  const demoLink = document.getElementById('modalProjectDemoLink');
  const gitLink = document.getElementById('modalProjectGitLink');

  img.src = project.imageUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500';
  cat.textContent = project.category;
  cat.className = `badge badge-${project.category.toLowerCase()}`;
  title.textContent = project.title;
  desc.textContent = project.description;
  
  techList.innerHTML = project.technologies.map(t => `<span class="modal-tech-pill">${t}</span>`).join('');
  
  if (project.demoLink) {
    demoLink.href = project.demoLink;
    demoLink.style.display = 'inline-flex';
  } else {
    demoLink.style.display = 'none';
  }

  if (project.githubLink) {
    gitLink.href = project.githubLink;
    gitLink.style.display = 'inline-flex';
  } else {
    gitLink.style.display = 'none';
  }

  modal.style.display = 'flex';
  
  // Bind close buttons
  document.getElementById('btnModalClose').onclick = closeModal;
  modal.onclick = (e) => {
    if (e.target === modal) closeModal();
  };

  function closeModal() {
    modal.style.display = 'none';
  }
}

/* ==========================================
   CONTACT FORM HANDLER
   ========================================== */
function initContactForm() {
  const form = document.getElementById('contactFormEl');
  const successAlert = document.getElementById('contactSuccessAlert');
  const errorAlert = document.getElementById('contactErrorAlert');
  const errorText = document.getElementById('contactErrorText');
  const submitBtn = document.getElementById('btnSubmitContact');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('c_name').value.trim();
    const email = document.getElementById('c_email').value.trim();
    const subject = document.getElementById('c_subject').value.trim() || 'General Inquiry';
    const message = document.getElementById('c_message').value.trim();

    if (!name || !email || !message) {
      errorText.textContent = 'Please fill in all required fields.';
      errorAlert.style.display = 'flex';
      return;
    }

    errorAlert.style.display = 'none';
    successAlert.style.display = 'none';
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending message...';

    const payload = { name, email, subject, message };

    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) throw new Error('API submission failed');
        return res.json();
      })
      .then(res => {
        if (res.success) {
          successAlert.style.display = 'flex';
          form.reset();
        } else {
          throw new Error();
        }
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span><i class="far fa-paper-plane"></i> Send Message</span>';
      })
      .catch(err => {
        console.error('Contact submission error:', err);
        errorText.textContent = 'Server connection failed. Verify the backend and MongoDB are online.';
        errorAlert.style.display = 'flex';
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span><i class="far fa-paper-plane"></i> Send Message</span>';
      });
  });
}

