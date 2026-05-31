import { Component, OnInit } from '@angular/core';
import { ApiService, Project } from '../../services/api.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  
  // Filtering and details state
  activeCategory = 'All';
  selectedProject: Project | null = null;
  
  // Loading indicators
  isLoading = true;
  errorMessage = '';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.fetchProjects();
  }

  // Retrieve projects dynamically from MongoDB API (JSON-driven rendering)
  fetchProjects() {
    this.isLoading = true;
    this.apiService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.filteredProjects = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching projects from server:', err);
        this.errorMessage = 'Could not load projects. Ensure the server and MongoDB are running.';
        this.isLoading = false;
      }
    });
  }

  // Filter projects list by category
  filterCategory(category: string) {
    this.activeCategory = category;
    if (category === 'All') {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter(p => p.category === category);
    }
  }

  // Modal display controllers
  openDetails(project: Project) {
    this.selectedProject = project;
  }

  closeDetails() {
    this.selectedProject = null;
  }
}
