import { Component, signal } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';
import { Toasts } from "./components/toasts/toasts";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Navbar,
    RouterOutlet,
    Footer,
    Toasts
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('vasko-site');
}
