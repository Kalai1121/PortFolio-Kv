import { Component, OnInit, HostListener } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Theme state
  isDarkMode = true;
  scrollPercentage = 0;

  // Custom Cursor variables
  cursorX = 0;
  cursorY = 0;

  ngOnInit() {
    // 1. Initialise dark mode theme from local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      this.isDarkMode = false;
      document.body.setAttribute('data-theme', 'light');
    } else {
      document.body.setAttribute('data-theme', 'dark');
    }

    // 2. Custom cursor tracking on desktop
    document.addEventListener('mousemove', (e: MouseEvent) => {
      const glow = document.getElementById('customCursorGlow');
      if (glow) {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
      }
    });

    // 3. Scroll Reveal & Navbar Active Tab Tracking
    setTimeout(() => {
      const sections = ['home-top', 'about', 'skills', 'portfolio', 'contact'];
      
      const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
      };

      const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            
            sections.forEach(sec => {
              const navLink = document.getElementById(`nav-${sec === 'home-top' ? 'home' : sec}`);
              const mobLink = document.getElementById(`mob-nav-${sec === 'home-top' ? 'home' : sec}`);
              
              if (sec === id) {
                if (navLink) navLink.classList.add('active');
                if (mobLink) mobLink.classList.add('active');
              } else {
                if (navLink) navLink.classList.remove('active');
                if (mobLink) mobLink.classList.remove('active');
              }
            });
          }
        });
      }, observerOptions);

      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
          }
        });
      }, { threshold: 0.1 });

      const heroEl = document.getElementById('home-top');
      if (heroEl) scrollObserver.observe(heroEl);

      const targets = document.querySelectorAll('.scroll-reveal-section');
      targets.forEach(t => {
        scrollObserver.observe(t);
        revealObserver.observe(t);
      });
    }, 800);
  }

  // Track window scroll to update top progress bar
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPos = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    this.scrollPercentage = scrollHeight > 0 ? (scrollPos / scrollHeight) * 100 : 0;
  }

  // Toggle layout theme
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }
}
