import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  currentUser: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.currentUser = this.authService.currentUserValue;
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.toastr.success('Sesión cerrada correctamente');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.toastr.error('Error al cerrar sesión');
      }
    });
  }
}
