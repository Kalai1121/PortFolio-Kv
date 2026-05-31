import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  // Form model fields
  name = '';
  email = '';
  subject = '';
  message = '';

  // API Call States
  isSubmitting = false;
  submitSuccess = false;
  submitError = '';

  constructor(private apiService: ApiService) { }

  // Submit contact inquiry to MongoDB Express API
  onSubmit() {
    if (!this.name || !this.email || !this.message) {
      this.submitError = 'Please fill in all required fields (Name, Email, Message).';
      return;
    }

    this.isSubmitting = true;
    this.submitError = '';
    this.submitSuccess = false;

    const payload = {
      name: this.name,
      email: this.email,
      subject: this.subject || 'General Inquiry',
      message: this.message
    };

    this.apiService.submitContact(payload).subscribe({
      next: (res) => {
        if (res.success) {
          this.submitSuccess = true;
          this.resetForm();
        } else {
          this.submitError = 'Failed to send message. Please try again.';
        }
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error('Inquiry submission error:', err);
        this.submitError = 'Server error. Ensure the server and MongoDB are running locally.';
        this.isSubmitting = false;
      }
    });
  }

  // Reset form inputs after successful submit
  private resetForm() {
    this.name = '';
    this.email = '';
    this.subject = '';
    this.message = '';
  }
}
