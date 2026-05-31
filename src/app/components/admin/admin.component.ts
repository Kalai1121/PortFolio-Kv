import { Component, OnInit } from '@angular/core';
import { ApiService, Inquiry } from '../../services/api.service';
import { AuthService, UserRole } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  inquiries: Inquiry[] = [];
  
  // Credentials model
  passkey = '';
  authError = '';
  
  // Dashboard Metrics
  totalInquiries = 0;
  pendingCount = 0;
  respondedCount = 0;
  archivedCount = 0;

  // Active Role Session bindings
  activeRole: UserRole = 'Guest';
  activeKey = '';
  
  isLoading = false;
  inboxError = '';

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    // 1. Subscribe to active role changes
    this.authService.activeRole$.subscribe(role => {
      this.activeRole = role;
      this.inboxError = '';
      
      // Load data if role is allowed
      if (role === 'Admin' || role === 'SuperAdmin') {
        this.activeKey = this.authService.getCurrentKey();
        this.fetchInquiries();
      } else {
        this.inquiries = [];
        this.calculateMetricsMock();
      }
    });
  }

  // Visual Simulation Role Switcher (No Password required)
  simulateRole(role: UserRole) {
    if (role === 'SuperAdmin') {
      this.authService.changeRole('SuperAdmin', 'super_admin_secret_key_999_888');
    } else if (role === 'Admin') {
      this.authService.changeRole('Admin', 'admin_secret_key_127_986');
    } else {
      this.authService.logout();
    }
  }

  // Handle standard Passkey Form Authentication
  onLoginSubmit() {
    this.authError = '';
    const success = this.authService.authenticate(this.passkey);
    if (!success) {
      this.authError = 'Invalid authorization passkey entered.';
    }
    this.passkey = '';
  }

  onLogout() {
    this.authService.logout();
  }

  // Fetch inquiries from MongoDB REST API using credentials header
  fetchInquiries() {
    this.isLoading = true;
    this.inboxError = '';
    
    this.apiService.getInquiries(this.activeKey).subscribe({
      next: (data) => {
        this.inquiries = data;
        this.calculateMetricsReal();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching inbox inquiries:', err);
        this.inboxError = 'Access Forbidden. Your credentials header might be invalid or MongoDB is offline.';
        this.isLoading = false;
      }
    });
  }

  // Update Inquiry Status (Admin CRUD)
  updateStatus(id: string, newStatus: 'Pending' | 'Responded' | 'Archived') {
    this.apiService.updateInquiryStatus(id, newStatus, this.activeKey).subscribe({
      next: (res) => {
        if (res.success) {
          // Update item in local list
          const index = this.inquiries.findIndex(i => i._id === id);
          if (index !== -1) {
            this.inquiries[index] = res.inquiry;
            this.calculateMetricsReal();
          }
        }
      },
      error: (err) => {
        console.error('Error updating status:', err);
        alert('Failed to update status on server.');
      }
    });
  }

  // Delete message completely from MongoDB (Super Admin CRUD)
  deleteMessage(id: string) {
    if (!confirm('Are you sure you want to permanently delete this message from MongoDB? This represents a DELETE CRUD operation.')) {
      return;
    }

    this.apiService.deleteInquiry(id, this.activeKey).subscribe({
      next: (res) => {
        if (res.success) {
          this.inquiries = this.inquiries.filter(i => i._id !== id);
          this.calculateMetricsReal();
        }
      },
      error: (err) => {
        console.error('Error deleting message:', err);
        alert('Action failed. Super Admin permissions required.');
      }
    });
  }

  // Real-time calculation of statistics using DB entries
  private calculateMetricsReal() {
    this.totalInquiries = this.inquiries.length;
    this.pendingCount = this.inquiries.filter(i => i.status === 'Pending').length;
    this.respondedCount = this.inquiries.filter(i => i.status === 'Responded').length;
    this.archivedCount = this.inquiries.filter(i => i.status === 'Archived').length;
  }

  // Fallback mocks stats display for Guest preview
  private calculateMetricsMock() {
    this.totalInquiries = 12;
    this.pendingCount = 3;
    this.respondedCount = 7;
    this.archivedCount = 2;
  }
}
