import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type UserRole = 'Guest' | 'Admin' | 'SuperAdmin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Session variables
  private activeRoleSubject = new BehaviorSubject<UserRole>('Guest');
  private activeKeySubject = new BehaviorSubject<string>('');

  activeRole$: Observable<UserRole> = this.activeRoleSubject.asObservable();
  activeKey$: Observable<string> = this.activeKeySubject.asObservable();

  constructor() {
    // Check if session role is persisted in sessionStorage
    const savedRole = sessionStorage.getItem('rbac_role') as UserRole;
    const savedKey = sessionStorage.getItem('rbac_key') || '';
    if (savedRole) {
      this.activeRoleSubject.next(savedRole);
      this.activeKeySubject.next(savedKey);
    }
  }

  // Switch role dynamically
  changeRole(role: UserRole, key: string = '') {
    sessionStorage.setItem('rbac_role', role);
    sessionStorage.setItem('rbac_key', key);
    this.activeRoleSubject.next(role);
    this.activeKeySubject.next(key);
  }

  // Log out/Reset role
  logout() {
    sessionStorage.removeItem('rbac_role');
    sessionStorage.removeItem('rbac_key');
    this.activeRoleSubject.next('Guest');
    this.activeKeySubject.next('');
  }

  // Permission checkers
  isSuperAdmin(): boolean {
    return this.activeRoleSubject.value === 'SuperAdmin';
  }

  isAdmin(): boolean {
    return this.activeRoleSubject.value === 'Admin' || this.activeRoleSubject.value === 'SuperAdmin';
  }

  getCurrentRole(): UserRole {
    return this.activeRoleSubject.value;
  }

  getCurrentKey(): string {
    return this.activeKeySubject.value;
  }
}
