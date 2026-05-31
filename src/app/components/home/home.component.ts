import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Professional titles to cycle
  titles: string[] = [
    'Front-End Developer',
    'Angular Specialist',
    'Full-Stack Developer (MERN)',
    'UI/UX Enthusiast'
  ];
  
  activeTitle = '';
  private titleIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private typeSpeed = 100;

  ngOnInit() {
    this.handleTypewriter();
  }

  // Self-contained typing text logic
  private handleTypewriter() {
    const currentTitle = this.titles[this.titleIndex];
    
    if (this.isDeleting) {
      this.activeTitle = currentTitle.substring(0, this.charIndex - 1);
      this.charIndex--;
      this.typeSpeed = 50; // Deletes faster
    } else {
      this.activeTitle = currentTitle.substring(0, this.charIndex + 1);
      this.charIndex++;
      this.typeSpeed = 100; // Normal writing speed
    }

    // Title state mutations
    if (!this.isDeleting && this.charIndex === currentTitle.length) {
      this.isDeleting = true;
      this.typeSpeed = 1800; // Pause at end of text
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.titleIndex = (this.titleIndex + 1) % this.titles.length;
      this.typeSpeed = 500; // Pause before starting next title
    }

    setTimeout(() => this.handleTypewriter(), this.typeSpeed);
  }
}
