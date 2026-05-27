import { Component, inject, OnInit, signal } from '@angular/core';
import { ConcertFormService } from '../services/concert-form-service';
import { NotificationService } from '../../toasts/notification-service';
import { ConcertService } from '../../../services/concert-service';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { concertType } from '../../../models/enum/concertType';

@Component({
  selector: 'app-concert-form',
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
    SelectModule
  ],
  standalone: true,
  templateUrl: './concert-form.html',
  styleUrl: './concert-form.css',
})
export class ConcertForm implements OnInit {
 
  private concertFormService = inject(ConcertFormService);
  private notification = inject(NotificationService);
  private concertService = inject(ConcertService);

  public form!: FormGroup;
  public isLoading = signal(false);

  public concertTypeOptions = Object.entries(concertType)
    .map(([key, value]) => ({
      value: key,
      label: value
    }));

  ngOnInit(): void {
    this.form = this.concertFormService.createForm({} as any);
  }


  public get descriptions(): FormArray {
      return this.form.get('description') as FormArray;
  }

  public addDescription(): void {
      this.descriptions.push(this.concertFormService.createDescriptionControl());
  }

  public removeDescription(index: number): void {
      this.descriptions.removeAt(index);
  }
  public getDescriptionControl(index: number): FormControl<string> {
    return this.descriptions.at(index) as FormControl<string>;
  }

  public onSubmit(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      this.notification.error("Veuillez remplir les champs correctement")
    }

    this.isLoading.set(true);

    this.concertService.create(this.form.getRawValue()).subscribe({
      next: () => {
        this.notification.success("concert créé avec succès !");
        this.form.reset();
        this.isLoading.set(false);
      },
      error: (err) => {
          this.notification.error(err.error?.message || 'Erreur lors de la création')
          this.isLoading.set(false);
      }
    })
  }


}
