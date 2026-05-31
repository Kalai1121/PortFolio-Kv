import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavBarComponent {
  @Input() isDark = true;
  @Output() themeToggled = new EventEmitter<void>();

  // Mobile menu control state
  isMenuOpen = false;

  constructor(public router: Router) { }

  // Toggle responsive drawer
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Closes menu on link redirect
  closeMenu() {
    this.isMenuOpen = false;
  }

  // Trigger global theme switch
  onThemeClick() {
    this.themeToggled.emit();
  }
}
