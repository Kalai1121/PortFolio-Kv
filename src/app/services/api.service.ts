import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Project {
  _id?: string;
  title: string;
  description: string;
  category: 'Enterprise' | 'Full-Stack' | 'Frontend' | 'UI-UX';
  technologies: string[];
  demoLink: string;
  githubLink: string;
  imageUrl: string;
  featured: boolean;
}

export interface Inquiry {
  _id?: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status: 'Pending' | 'Responded' | 'Archived';
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = '/api'; // Maps locally or to target host via Express serve

  constructor(private http: HttpClient) { }

  // 1. Projects API - GET all projects
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`);
  }

  // 2. Contact Form API - POST contact message
  submitContact(inquiry: Partial<Inquiry>): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.apiUrl}/contact`, inquiry);
  }

  // 3. Admin: GET all contact messages (Requires administrative key)
  getInquiries(authKey: string): Observable<Inquiry[]> {
    const headers = new HttpHeaders().set('Authorization', authKey);
    return this.http.get<Inquiry[]>(`${this.apiUrl}/contact`, { headers });
  }

  // 4. Admin: PUT update inquiry status (Requires administrative key)
  updateInquiryStatus(id: string, status: string, authKey: string): Observable<{ success: boolean; inquiry: Inquiry }> {
    const headers = new HttpHeaders().set('Authorization', authKey);
    return this.http.put<{ success: boolean; inquiry: Inquiry }>(
      `${this.apiUrl}/contact/${id}`, 
      { status }, 
      { headers }
    );
  }

  // 5. Super Admin: DELETE inquiry message (Requires super-administrative key)
  deleteInquiry(id: string, authKey: string): Observable<{ success: boolean; message: string }> {
    const headers = new HttpHeaders().set('Authorization', authKey);
    return this.http.delete<{ success: boolean; message: string }>(`${this.apiUrl}/contact/${id}`, { headers });
  }
}
