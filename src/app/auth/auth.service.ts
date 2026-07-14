import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly STORAGE_KEY = 'sentrix_user';

  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem(this.STORAGE_KEY);
  }

  login(email: string, password: string): boolean {
    // Simula autenticação — aceita qualquer email/senha preenchidos
    if (email && password) {
      sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify({ email }));
      return true;
    }
    return false;
  }

  register(name: string, email: string, password: string): boolean {
    if (name && email && password) {
      sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify({ name, email }));
      return true;
    }
    return false;
  }

  logout(): void {
    sessionStorage.removeItem(this.STORAGE_KEY);
    this.router.navigate(['/']);
  }

  getUser(): { name?: string; email: string } | null {
    const raw = sessionStorage.getItem(this.STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  }
}
