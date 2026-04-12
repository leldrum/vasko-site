import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [HttpClientModule, PasswordModule, FormsModule],
  templateUrl: './connexion.html',
  styleUrls: ['./connexion.css']
})
export class Connexion implements OnInit {

    value!: string;


    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
 
}
