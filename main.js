import './style.css'

/* Enable reveal animation only when JS is confirmed running; content stays
   visible by default so it never gets trapped invisible if JS fails. */
document.documentElement.classList.add('js-ready')

/* ===== Reveal on scroll (declared early so any render code can call it) ===== */
let revealIO = null
function observeReveal() {
  if (!revealIO) {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'))
      return
    }
    revealIO = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('in'); revealIO.unobserve(en.target) }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
  }
  document.querySelectorAll('.reveal:not(.in)').forEach(el => revealIO.observe(el))
}

/* ===== Icons (inline SVG, no dependency) ===== */
const I = {
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  arrowUpRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>',
  compass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>',
  brain: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>',
  code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><rect x="7" y="11" width="3" height="7"/><rect x="13" y="6" width="3" height="12"/></svg>',
  cloud: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.5-1A4 4 0 0 0 6 19h11.5z"/></svg>',
  python: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c-2 0-5 .5-5 4v3h5v1H5c-2 0-3 2-3 4s1 4 3 4h2v-3c0-2 1-3 3-3h5c1.5 0 2-1 2-2V6c0-2-1.5-4-4-4h-1z"/><circle cx="9" cy="6" r="0.6" fill="currentColor"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  bookOpen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7v14"/><path d="M3 18V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14"/><path d="M21 18V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v14"/></svg>',
  rocket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>',
  target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  sparkles: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z"/><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16z"/></svg>',
  filter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/></svg>',
  mapPin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.7 2.34a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.74-1.27a2 2 0 0 1 2.11-.45c.74.34 1.53.57 2.34.7A2 2 0 0 1 22 16.92z"/></svg>',
  send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
  github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z"/></svg>',
  twitter: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>',
  trending: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
  flag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',
  layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
  folder: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
  lightbulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5"/></svg>',
  trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>',
}

/* ===== Data ===== */
const domains = [
  { id: 'ai', cls: 'dc-ai', icon: I.brain, name: 'Artificial Intelligence', img: 'https://images.pexels.com/photos/17483867/pexels-photo-17483867.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    desc: 'Train models that recognize images, understand language, and make predictions — the foundation of modern AI systems.', tags: ['Machine Learning', 'Neural Networks', 'NLP'] },
  { id: 'web', cls: 'dc-web', icon: I.code, name: 'Web Development', img: 'https://images.pexels.com/photos/6424585/pexels-photo-6424585.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    desc: 'Build interactive websites and web apps using HTML, CSS, JavaScript, and modern frameworks that run in any browser.', tags: ['HTML/CSS', 'JavaScript', 'React'] },
  { id: 'sec', cls: 'dc-sec', icon: I.shield, name: 'Cybersecurity', img: 'https://images.pexels.com/photos/4973899/pexels-photo-4973899.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    desc: 'Learn how attackers think and how defenders protect systems, networks, and data from real-world threats.', tags: ['Network Security', 'Ethical Hacking', 'Cryptography'] },
  { id: 'data', cls: 'dc-data', icon: I.chart, name: 'Data Science', img: 'https://images.pexels.com/photos/97080/pexels-photo-97080.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    desc: 'Turn raw data into insights using statistics, visualization, and storytelling that drive real decisions.', tags: ['Statistics', 'Visualization', 'Pandas'] },
  { id: 'cloud', cls: 'dc-cloud', icon: I.cloud, name: 'Cloud Computing', img: 'https://images.pexels.com/photos/37730212/pexels-photo-37730212.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    desc: 'Deploy and scale applications on cloud platforms like AWS, Azure, and GCP without managing physical servers.', tags: ['AWS', 'Containers', 'DevOps'] },
  { id: 'py', cls: 'dc-py', icon: I.python, name: 'Python Programming', img: 'https://images.pexels.com/photos/6424591/pexels-photo-6424591.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    desc: 'Master the most versatile language in tech — used everywhere from web apps and automation to AI and data analysis.', tags: ['Syntax', 'Automation', 'Libraries'] },
]

const challenges = [
  { domain: 'ai', name: 'Image Classifier', desc: 'Build a model that sorts photos of cats vs. dogs using a pre-labeled dataset.', diff: 'medium', time: '2 hrs' },
  { domain: 'ai', name: 'Sentiment Detector', desc: 'Analyze short movie reviews and label them as positive or negative.', diff: 'easy', time: '1 hr' },
  { domain: 'ai', name: 'Chatbot with NLP', desc: 'Create a rule-based chatbot that answers common student questions.', diff: 'hard', time: '3 hrs' },
  { domain: 'web', name: 'Personal Portfolio Page', desc: 'Code a single-page portfolio with your bio, skills, and project links.', diff: 'easy', time: '1.5 hrs' },
  { domain: 'web', name: 'To-Do App', desc: 'Build a task manager with add, complete, and delete using local storage.', diff: 'medium', time: '2 hrs' },
  { domain: 'web', name: 'Weather Dashboard', desc: 'Fetch live weather data from a public API and display it with charts.', diff: 'hard', time: '3 hrs' },
  { domain: 'sec', name: 'Password Strength Checker', desc: 'Write a script that scores password strength and suggests improvements.', diff: 'easy', time: '1 hr' },
  { domain: 'sec', name: 'Caesar Cipher Tool', desc: 'Encode and decode secret messages using a classic shift cipher.', diff: 'easy', time: '45 min' },
  { domain: 'sec', name: 'Network Port Scanner', desc: 'Scan localhost for open ports and log the results safely.', diff: 'hard', time: '2.5 hrs' },
  { domain: 'data', name: 'Survey Data Explorer', desc: 'Load a CSV of student survey responses and visualize the trends.', diff: 'easy', time: '1 hr' },
  { domain: 'data', name: 'Sales Dashboard', desc: 'Create an interactive dashboard showing monthly sales by category.', diff: 'medium', time: '2 hrs' },
  { domain: 'data', name: 'Iris Dataset Classifier', desc: 'Use a classic dataset to predict flower species from measurements.', diff: 'medium', time: '2 hrs' },
  { domain: 'cloud', name: 'Static Site on the Cloud', desc: 'Host a simple website on a free cloud storage bucket.', diff: 'easy', time: '1 hr' },
  { domain: 'cloud', name: 'Serverless API', desc: 'Write a small cloud function that returns JSON when called.', diff: 'medium', time: '2 hrs' },
  { domain: 'cloud', name: 'Containerize an App', desc: 'Package a web app in a container and run it locally.', diff: 'hard', time: '3 hrs' },
  { domain: 'py', name: 'Number Guessing Game', desc: 'Build an interactive game where the computer picks a number and you guess it.', diff: 'easy', time: '45 min' },
  { domain: 'py', name: 'File Organizer', desc: 'Write a script that sorts files in a folder by extension automatically.', diff: 'medium', time: '1.5 hrs' },
  { domain: 'py', name: 'Web Scraper', desc: 'Extract headlines from a news website and save them to a file.', diff: 'hard', time: '2.5 hrs' },
]

const projects = [
  { cls: 'pp-1', icon: I.brain, name: 'Handwritten Digit Recognizer', desc: 'Train a simple neural network on the MNIST dataset to recognize digits 0–9 drawn by hand.',
    outcomes: ['Train & evaluate a model', 'Understand image data', 'Build a prediction interface'] },
  { cls: 'pp-2', icon: I.trending, name: 'Personal Expense Tracker', desc: 'A web app to log daily spending, categorize it, and visualize monthly trends.',
    outcomes: ['Form handling & validation', 'Charting with JavaScript', 'Local data persistence'] },
  { cls: 'pp-3', icon: I.shield, name: 'Phishing Email Detector', desc: 'Analyze email text for common phishing patterns and flag suspicious messages.',
    outcomes: ['Pattern matching & rules', 'Text analysis basics', 'Security awareness'] },
  { cls: 'pp-4', icon: I.chart, name: 'Student Performance Analyzer', desc: 'Load exam scores, compute statistics, and generate a visual report of class trends.',
    outcomes: ['Statistical summaries', 'Data cleaning', 'Clear data visualization'] },
  { cls: 'pp-5', icon: I.cloud, name: 'Deploy a Portfolio to the Cloud', desc: 'Containerize a portfolio site and deploy it to a free cloud platform.',
    outcomes: ['Containerization basics', 'Cloud deployment', 'Live public URL'] },
  { cls: 'pp-6', icon: I.python, name: 'Automated Study Scheduler', desc: 'A Python script that builds a weekly study plan based on your subjects and free hours.',
    outcomes: ['Working with dates & time', 'File input/output', 'Practical automation'] },
]

/* ===== Render ===== */
const app = document.querySelector('#app')
app.innerHTML = `
  <nav class="nav" id="nav">
    <div class="container nav-inner">
      <a href="#home" class="brand">
        <span class="brand-mark">${I.compass}</span>
        <span class="brand-name">Tech<span>Explore</span></span>
      </a>
      <ul class="nav-links" id="navLinks">
        <li><a href="#domains" class="nav-link">Domains</a></li>
        <li><a href="#challenges" class="nav-link">Challenges</a></li>
        <li><a href="#projects" class="nav-link">Mini Projects</a></li>
        <li><a href="#why" class="nav-link">Why Us</a></li>
        <li><a href="#about" class="nav-link">About</a></li>
        <li><a href="#contact" class="nav-link">Contact</a></li>
        <li><a href="#domains" class="nav-link btn btn-primary nav-cta">Start Exploring</a></li>
      </ul>
      <button class="nav-toggle" id="navToggle" aria-label="Toggle menu"><span></span></button>
    </div>
  </nav>

  <header class="hero" id="home">
    <div class="hero-grid"></div>
    <div class="container hero-inner">
      <div class="hero-content">
        <span class="hero-badge"><span class="dot"></span> Built for curious college students</span>
        <h1>Explore Technology. <br/><span class="gradient-text">Discover Your Future.</span></h1>
        <p class="lead">TechExplore helps you try out different technology careers through hands-on challenges and mini-projects — so you can pick a specialization with confidence, not guesswork.</p>
        <div class="hero-actions">
          <a href="#domains" class="btn btn-primary">${I.compass} Start Exploring</a>
          <a href="#challenges" class="btn btn-ghost">${I.rocket} View Challenges</a>
        </div>
        <div class="hero-stats">
          <div class="hero-stat"><div class="num">6</div><div class="label">Tech Domains</div></div>
          <div class="hero-stat"><div class="num">18</div><div class="label">Hands-on Challenges</div></div>
          <div class="hero-stat"><div class="num">6</div><div class="label">Mini Projects</div></div>
        </div>
      </div>
      <div class="hero-visual">
        <img class="photo" src="https://images.pexels.com/photos/5212687/pexels-photo-5212687.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Students collaborating on laptops in a classroom" />
        <div class="hero-float hero-float-1">
          <div class="ico">${I.brain}</div>
          <div><div class="t">AI Basics</div><div class="s">Beginner track</div></div>
        </div>
        <div class="hero-float hero-float-2">
          <div class="ico">${I.check}</div>
          <div><div class="t">Challenge Done</div><div class="s">+50 XP earned</div></div>
        </div>
      </div>
    </div>
  </header>

  <section class="section" id="domains">
    <div class="container">
      <div class="section-head reveal">
        <span class="section-tag">Explore</span>
        <h2 class="section-title">Technology <span class="gradient-text">Domains</span></h2>
        <p class="section-sub">Six core areas of technology. Pick one that sparks your curiosity and start with beginner-friendly challenges tailored to each field.</p>
      </div>
      <div class="domain-grid" id="domainGrid"></div>
    </div>
  </section>

  <section class="section" id="challenges">
    <div class="container">
      <div class="section-head reveal">
        <span class="section-tag">Practice</span>
        <h2 class="section-title">Hands-on <span class="gradient-text">Challenges</span></h2>
        <p class="section-sub">Short, focused tasks that teach real skills. Filter by domain and jump in — every challenge includes a difficulty level and an estimated time.</p>
      </div>
      <div class="challenges-wrap">
        <aside class="filter-panel reveal">
          <div class="filter-title">${I.filter} Filter by domain</div>
          <div class="filter-list" id="filterList"></div>
        </aside>
        <div class="challenge-list" id="challengeList"></div>
      </div>
    </div>
  </section>

  <section class="section" id="projects">
    <div class="container">
      <div class="section-head reveal">
        <span class="section-tag">Build</span>
        <h2 class="section-title">Mini <span class="gradient-text">Projects</span></h2>
        <p class="section-sub">Slightly bigger than a challenge, smaller than a full app. Each project lists exactly what you'll learn by finishing it.</p>
      </div>
      <div class="projects-grid" id="projectsGrid"></div>
    </div>
  </section>

  <section class="section why" id="why">
    <div class="container">
      <div class="section-head reveal">
        <span class="section-tag">The Edge</span>
        <h2 class="section-title">Why <span class="gradient-text">TechExplore?</span></h2>
        <p class="section-sub">We believe you should try a career before committing to it. Here's what makes our approach different.</p>
      </div>
      <div class="why-grid">
        <div class="why-card reveal"><div class="why-ico wi-1">${I.rocket}</div><h4>Practical Learning</h4><p>Learn by doing real tasks, not just watching videos. Every concept comes with something you can build.</p></div>
        <div class="why-card reveal"><div class="why-ico wi-2">${I.compass}</div><h4>Career Exploration</h4><p>Sample six technology fields before you specialize, so your career choice is informed, not a gamble.</p></div>
        <div class="why-card reveal"><div class="why-ico wi-3">${I.lightbulb}</div><h4>Beginner-Friendly</h4><p>No prior experience needed. Challenges start easy and scale up only when you're ready for more.</p></div>
        <div class="why-card reveal"><div class="why-ico wi-4">${I.trophy}</div><h4>Progress Tracking</h4><p>Mark challenges complete, watch your XP grow, and see which domains you're naturally drawn to.</p></div>
      </div>
    </div>
  </section>

  <section class="section" id="about">
    <div class="container about-grid">
      <div class="about-text reveal">
        <span class="section-tag">About Us</span>
        <h2>Helping students make <span class="gradient-text">informed career choices.</span></h2>
        <p>TechExplore exists for a simple reason: too many students pick a technology specialization based on a name or a rumor, then discover it's not what they expected. We flip that around.</p>
        <p>Our mission is to give every student a low-risk way to try real work across six technology domains — building, debugging, and shipping small things — before they commit to a path. Exploration first, specialization second.</p>
        <div class="about-points">
          <div class="about-point"><div class="pi">${I.target}</div><div><div class="pt">Try before you specialize</div><div class="pd">Experience the day-to-day of each field, not just the job title.</div></div></div>
          <div class="about-point"><div class="pi">${I.layers}</div><div><div class="pt">Breadth, then depth</div><div class="pd">Sample all six domains, then go deeper where you're most engaged.</div></div></div>
          <div class="about-point"><div class="pi">${I.bookOpen}</div><div><div class="pt">No experience required</div><div class="pd">Everything starts at a true beginner level and builds gradually.</div></div></div>
        </div>
      </div>
      <div class="about-visual reveal">
        <img src="https://images.pexels.com/photos/4078342/pexels-photo-4078342.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Programmer typing code on a laptop" />
        <div class="about-badge">
          <div><div class="big gradient-text">100%</div><div class="lbl">Free for students</div></div>
          <div><div class="big gradient-text">6</div><div class="lbl">Domains to explore</div></div>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="contact">
    <div class="container contact-grid">
      <div class="contact-info reveal">
        <span class="section-tag">Contact Us</span>
        <h2>Have a question? <br/><span class="gradient-text">Let's talk.</span></h2>
        <p>Whether you're a student with questions, an educator interested in bringing TechExplore to your class, or just curious — we'd love to hear from you.</p>
        <div class="contact-detail"><div class="ci">${I.mail}</div><div><div class="ct">Email us</div><div class="cv">hello@techexplore.example</div></div></div>
        <div class="contact-detail"><div class="ci">${I.phone}</div><div><div class="ct">Call us</div><div class="cv">+1 (555) 012-3456</div></div></div>
        <div class="contact-detail"><div class="ci">${I.mapPin}</div><div><div class="ct">Visit us</div><div class="cv">Innovation Campus, Building 3</div></div></div>
      </div>
      <form class="contact-form reveal" id="contactForm" novalidate>
        <div class="form-success" id="formSuccess">${I.check} Your message has been sent. We'll get back to you soon!</div>
        <div class="form-row" id="row-name">
          <label for="cf-name">Name</label>
          <input type="text" id="cf-name" name="name" placeholder="Your full name" />
          <div class="form-err">Please enter your name.</div>
        </div>
        <div class="form-row" id="row-email">
          <label for="cf-email">Email</label>
          <input type="email" id="cf-email" name="email" placeholder="you@example.com" />
          <div class="form-err">Please enter a valid email address.</div>
        </div>
        <div class="form-row" id="row-message">
          <label for="cf-message">Message</label>
          <textarea id="cf-message" name="message" placeholder="Tell us what's on your mind..."></textarea>
          <div class="form-err">Please enter a message.</div>
        </div>
        <button type="submit" class="btn btn-primary form-submit" id="submitBtn">${I.send} Send Message</button>
      </form>
    </div>
  </section>

  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="#home" class="brand"><span class="brand-mark">${I.compass}</span><span class="brand-name">Tech<span>Explore</span></span></a>
          <p>Helping college students explore technology careers through practical, beginner-friendly challenges and projects.</p>
        </div>
        <div class="footer-col">
          <h5>Explore</h5>
          <a href="#domains">Domains</a><a href="#challenges">Challenges</a><a href="#projects">Mini Projects</a>
        </div>
        <div class="footer-col">
          <h5>Company</h5>
          <a href="#about">About Us</a><a href="#why">Why TechExplore</a><a href="#contact">Contact</a>
        </div>
        <div class="footer-col">
          <h5>Resources</h5>
          <a href="#challenges">Start a Challenge</a><a href="#projects">Browse Projects</a><a href="#home">Get Started</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 TechExplore. Built for curious students.</p>
        <div class="footer-socials">
          <a href="#" aria-label="GitHub">${I.github}</a>
          <a href="#" aria-label="Twitter">${I.twitter}</a>
          <a href="#" aria-label="LinkedIn">${I.linkedin}</a>
        </div>
      </div>
    </div>
  </footer>
`

/* ===== Domains ===== */
const domainGrid = document.getElementById('domainGrid')
domainGrid.innerHTML = domains.map(d => `
  <article class="domain-card ${d.cls} reveal" data-domain="${d.id}">
    <img class="domain-img" src="${d.img}" alt="${d.name}" loading="lazy" />
    <div class="domain-body">
      <div class="domain-top">
        <div class="domain-ico">${d.icon}</div>
        <h3>${d.name}</h3>
      </div>
      <p>${d.desc}</p>
      <div class="domain-meta">
        ${d.tags.map(t => `<span class="chip">${t}</span>`).join('')}
        <a href="#challenges" class="domain-link" data-go="${d.id}">Explore ${I.arrowUpRight}</a>
      </div>
    </div>
  </article>
`).join('')

/* ===== Challenge filter + list ===== */
const filterList = document.getElementById('filterList')
const challengeList = document.getElementById('challengeList')
let activeFilter = 'all'

const filterItems = [{ id: 'all', name: 'All Domains', icon: I.layers }, ...domains]
filterList.innerHTML = filterItems.map(f => {
  const count = f.id === 'all' ? challenges.length : challenges.filter(c => c.domain === f.id).length
  return `<button class="filter-btn ${f.id === 'all' ? 'active' : ''}" data-filter="${f.id}"><span>${f.name}</span><span class="count">${count}</span></button>`
}).join('')

function renderChallenges() {
  const list = activeFilter === 'all' ? challenges : challenges.filter(c => c.domain === activeFilter)
  if (!list.length) { challengeList.innerHTML = '<div class="empty-state">No challenges in this domain yet.</div>'; return }
  const domainName = (id) => domains.find(d => d.id === id)?.name || ''
  challengeList.innerHTML = list.map(c => `
    <article class="challenge-card">
      <div class="challenge-top">
        <span class="chip">${domainName(c.domain)}</span>
        <span class="challenge-tag diff-${c.diff}">${c.diff.charAt(0).toUpperCase() + c.diff.slice(1)}</span>
      </div>
      <h4>${c.name}</h4>
      <p>${c.desc}</p>
      <div class="challenge-foot">${I.clock} ~${c.time}</div>
    </article>
  `).join('')
  observeReveal()
}
renderChallenges()

filterList.addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn')
  if (!btn) return
  activeFilter = btn.dataset.filter
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b.dataset.filter === activeFilter))
  renderChallenges()
})

/* domain "Explore" links set the filter */
document.addEventListener('click', (e) => {
  const go = e.target.closest('[data-go]')
  if (!go) return
  activeFilter = go.dataset.go
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b.dataset.filter === activeFilter))
  renderChallenges()
})

/* ===== Projects ===== */
document.getElementById('projectsGrid').innerHTML = projects.map(p => `
  <article class="project-card reveal">
    <div class="project-pseudoimg ${p.cls}">${p.icon}</div>
    <div class="project-body">
      <h4>${p.name}</h4>
      <p class="desc">${p.desc}</p>
      <div class="project-outcomes">
        <span class="lbl">You'll learn</span>
        ${p.outcomes.map(o => `<div class="outcome">${I.check} <span>${o}</span></div>`).join('')}
      </div>
    </div>
  </article>
`).join('')

/* ===== Navigation behavior ===== */
const nav = document.getElementById('nav')
const navToggle = document.getElementById('navToggle')
const navLinks = document.getElementById('navLinks')

const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20)
onScroll()
window.addEventListener('scroll', onScroll, { passive: true })

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open')
  navToggle.classList.toggle('open')
})
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open')
  navToggle.classList.remove('open')
}))

/* ===== Contact form validation ===== */
const form = document.getElementById('contactForm')
const success = document.getElementById('formSuccess')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  let valid = true
  const fields = [
    { id: 'cf-name', row: 'row-name', test: (v) => v.trim().length >= 2 },
    { id: 'cf-email', row: 'row-email', test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
    { id: 'cf-message', row: 'row-message', test: (v) => v.trim().length >= 5 },
  ]
  fields.forEach(f => {
    const el = document.getElementById(f.id)
    const ok = f.test(el.value)
    document.getElementById(f.row).classList.toggle('error', !ok)
    if (!ok) valid = false
  })
  if (!valid) return

  success.classList.add('show')
  form.reset()
  setTimeout(() => success.classList.remove('show'), 5000)
})

/* ===== Safety nets so nothing ever stays hidden ===== */
observeReveal()
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.in)').forEach(el => {
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('in')
    })
  }, 200)
})
let caught = false
const catchAll = () => {
  if (caught) return
  document.querySelectorAll('.reveal:not(.in)').forEach(el => el.classList.add('in'))
  caught = true
}
window.addEventListener('scroll', () => { if (window.scrollY > 600) catchAll() }, { passive: true })
window.addEventListener('resize', catchAll)
