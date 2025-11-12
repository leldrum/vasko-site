import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient,  HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule,  HttpClientModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact implements OnInit{

  contactForm!: FormGroup;
  formSubmitted = false;
  isLoading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      request: ['', [Validators.required]],
      subject: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.formSubmitted = false;

      this.http.post('http://localhost:8080/api/contact', this.contactForm.value)
        .subscribe({
          next: (response) => {
            console.log('Succès:', response);
            this.formSubmitted = true;
            this.isLoading = false;
            this.contactForm.reset();
          },
          error: (error) => {
            console.error('Erreur:', error);
            this.errorMessage = 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.';
            this.isLoading = false;
          }
        });
    } else {
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }
}