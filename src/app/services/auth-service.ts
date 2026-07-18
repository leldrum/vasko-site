import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { User, Userlogin } from '../models/user-model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/users`;
  private tokenKey = 'token';


  constructor(private http: HttpClient) {}

  /**
   * Connexion avec email et mot de passe
   */
  public login(credentials: Userlogin): Observable<any> {
    console.log(credentials)
    return this.http.post<any>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
            console.log('Réponse login complète:', response); // ← ajoutez ça
          if (response.token) {
            this.setToken(response.token);
            localStorage.setItem('currentUser', JSON.stringify(response.user));
          }
        })
      );
  }

  public getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`);
  }

  /**
   * Déconnexion
   */
  public logout(): void {
    localStorage.removeItem(this.tokenKey);
  }


  /**
   * Récupère le token stocké
   */
  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Vérifie si l'utilisateur est authentifié
   */
  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Stocke le token
   */
  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

}
