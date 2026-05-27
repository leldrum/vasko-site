import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { RehearsalFormService } from '../services/rehearsal-form-service';
import { RehearsalService } from '../../../services/rehearsal-service';
import { NotificationService } from '../../toasts/notification-service';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-reahearsal-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    DatePickerModule,
    TextareaModule,
    ButtonModule,
    FloatLabelModule    
  ],
  templateUrl: './reahearsal-form.html',
  styleUrl: './reahearsal-form.css'
})
export class ReahearsalForm implements OnInit{

  private rehearsalFormService = inject(RehearsalFormService);
  private rehearsalService = inject(RehearsalService);
  private notification = inject(NotificationService);

  public form!: FormGroup;
  public isLoading = signal(false);


  ngOnInit(): void {
    this.form = this.rehearsalFormService.createForm({} as any);
  }

  isInvalid(field: keyof typeof this.form.controls): boolean {
    const ctrl = this.form.controls[field];
    return ctrl.invalid && ctrl.touched;
  }

  public onSubmit(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading.set(true)

    this.rehearsalService.create(this.form.getRawValue()).subscribe({
      next: () => {
        this.notification.success("Repette créée avec succès !")
        this.form.reset();
        this.isLoading.set(false);
      },
      error: (err) => {
        this.notification.error(err.error?.message || 'Erreur lors de la création');
        this.isLoading.set(false);
      }
    })
  }


}
