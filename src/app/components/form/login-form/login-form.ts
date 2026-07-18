import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { LoginFormService } from '../services/login-form-service';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from '../../toasts/notification-service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { PasswordModule } from 'primeng/password';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    DatePickerModule,
    TextareaModule,
    ButtonModule,
    FloatLabelModule,
    InputTextModule, 
    FormsModule,
    SelectModule,
    PasswordModule
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm implements OnInit{

  private authService = inject(AuthService);
  private loginFormService = inject(LoginFormService);
  private notification = inject(NotificationService);
  private router = inject(Router);


  form!: FormGroup;
  isLoading = signal(false);


  ngOnInit(): void {
    this.form = this.loginFormService.createForm({} as any)
  }

  public onSubmit(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      this.notification.error("Veuillez remplir les champs correctement")
    }

    this.isLoading.set(true);

    this.authService.login(this.form.getRawValue()).subscribe({
      next: () => {
        this.notification.success("Vous êtes connecté !");
        this.router.navigate(["/"])
        this.isLoading.set(false);
      },
      error: (err) => {
          this.notification.error(err.error?.message || 'Erreur lors de la connexion')
          this.isLoading.set(false);
      }
    })
  }
  

}

