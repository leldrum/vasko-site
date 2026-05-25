// src/app/core/services/notification.service.ts
import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private messageService = inject(MessageService);

  success(detail: string, summary = 'Succès') {
    this.messageService.add({ severity: 'success', summary, detail, life: 4000 });
  }

  error(detail: string, summary = 'Erreur') {
    this.messageService.add({ severity: 'error', summary, detail, life: 5000 });
  }

  warn(detail: string, summary = 'Attention') {
    this.messageService.add({ severity: 'warn', summary, detail, life: 4000 });
  }

  info(detail: string, summary = 'Info') {
    this.messageService.add({ severity: 'info', summary, detail, life: 3000 });
  }
}