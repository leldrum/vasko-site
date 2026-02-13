import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-picture-card',
  imports: [],
  templateUrl: './picture-card.html',
  styleUrl: './picture-card.css'
})
export class PictureCard {
  @Input() imageSrc: string = '';
  @Input() imageAlt: string = '';
  @Input() label: string = '';
  @Input() description: string = '';
  @Input() date: string = '';
  @Output() cardClick = new EventEmitter<void>();
}
