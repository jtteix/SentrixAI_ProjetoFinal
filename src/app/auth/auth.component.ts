import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { LucideAngularModule, Shield, Eye, EyeOff, Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-angular';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LucideAngularModule],
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  readonly Shield = Shield;
  readonly Eye = Eye;
  readonly EyeOff = EyeOff;
  readonly Mail = Mail;
  readonly Lock = Lock;
  readonly User = User;
  readonly ArrowRight = ArrowRight;
  readonly AlertCircle = AlertCircle;

  mode: 'login' | 'register' = 'login';
  showPassword = false;
  showConfirm = false;
  loading = false;
  error = '';

  // login fields
  loginEmail = '';
  loginPassword = '';

  // register fields
  registerName = '';
  registerEmail = '';
  registerPassword = '';
  registerConfirm = '';
  registerTerms = false; // Controla se o termo foi aceito

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
      return;
    }
    this.route.queryParams.subscribe(p => {
      if (p['mode'] === 'register') this.mode = 'register';
    });
  }

  switchMode(m: 'login' | 'register'): void {
    this.mode = m;
    this.error = '';
  }

  onLogin(): void {
    this.error = '';
    if (!this.loginEmail || !this.loginPassword) {
      this.error = 'Preencha todos os campos.';
      return;
    }
    this.loading = true;
    setTimeout(() => {
      const ok = this.auth.login(this.loginEmail, this.loginPassword);
      this.loading = false;
      if (ok) this.router.navigate(['/dashboard']);
      else this.error = 'Credenciais inválidas.';
    }, 900);
  }

  onRegister(): void {
    this.error = '';
    if (!this.registerName || !this.registerEmail || !this.registerPassword || !this.registerConfirm) {
      this.error = 'Preencha todos os campos.';
      return;
    }
    if (!this.registerTerms) {
      this.error = 'Você precisa aceitar os Termos de Privacidade para continuar.';
      return;
    }
    if (this.registerPassword !== this.registerConfirm) {
      this.error = 'As senhas não coincidem.';
      return;
    }
    if (this.registerPassword.length < 6) {
      this.error = 'A senha deve ter pelo menos 6 caracteres.';
      return;
    }
    this.loading = true;
    setTimeout(() => {
      const ok = this.auth.register(this.registerName, this.registerEmail, this.registerPassword);
      this.loading = false;
      if (ok) this.router.navigate(['/dashboard']);
      else this.error = 'Erro ao criar conta.';
    }, 900);
  }
}