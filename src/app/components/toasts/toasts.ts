import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-toasts',
  standalone: true,
  imports: [Toast],
  templateUrl: './toasts.html',
  styleUrl: './toasts.css',
})
export class Toasts {}
