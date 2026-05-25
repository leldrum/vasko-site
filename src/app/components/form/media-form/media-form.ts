import { Component, inject, OnInit, signal } from '@angular/core';
import { MediaService } from '../../../services/media-service';
import { NotificationService } from '../../toasts/notification-service';
import { MediaFormService } from '../services/media-form-service';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { mediaType } from '../../../models/enum/mediaType';
import { AuthService } from '../../../services/auth-service';
import { ConcertStore } from '../../../stores/concert-store';
import { RehearsalStore } from '../../../stores/rehearsal-store';


@Component({
  selector: 'app-media-form',
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
    FileUploadModule,
    InputNumberModule
  ],
  templateUrl: './media-form.html',
  styleUrl: './media-form.css',
})
export class MediaForm implements OnInit {

  private mediaService = inject(MediaService);
  private notification = inject(NotificationService);
  private mediaFormService = inject(MediaFormService);

  private authService = inject(AuthService);

  concertStore = inject(ConcertStore);
  rehearsalStore = inject(RehearsalStore);
  

  selectedFile: File | null = null;
  currentUser: any = null;

  public mediaTypeOptions = Object.entries(mediaType)
    .map(([key, value]) => ({
      value: key,
      label: value

    }));

  form !: FormGroup
  isLoading = signal(false);

  ngOnInit(): void {
    this.form = this.mediaFormService.createForm({} as any)
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
    this.concertStore.getAllConcerts();
    this.rehearsalStore.getAllRehearsals();

  }


  onUpload(event: FileSelectEvent){
    this.selectedFile = event.files[0];
  }


  public onSubmit(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      this.notification.error('Veuillez corriger les erreurs du formulaire.');
      return;
    }
    if (!this.selectedFile) {
      this.notification.error('Veuillez sélectionner un fichier.');
      return;
    }

  
    const mediaData: any = {
      ...this.form.getRawValue(),
      user: { id: this.currentUser.id }, 
    };

    if(this.form.value.concert_id){
      mediaData.concert =  { id: this.form.value.concert_id }
    }

    if(this.form.value.rehearsal_id) {
      mediaData.rehearsal = { id: this.form.value.rehearsal_id };
    }

    this.isLoading.set(true)

    this.mediaService.create(mediaData, this.selectedFile!).subscribe({
      next: () => {
        this.notification.success("Média créée avec succès !")
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
