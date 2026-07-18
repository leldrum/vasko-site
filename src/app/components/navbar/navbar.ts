import { Component, OnInit } from '@angular/core';
import { RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule, MenubarModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {

  public itemNavbar: MenuItem[] = [];
  public authItems: MenuItem[] = [];
  private lastAuthState: boolean | null = null;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.updateMenuItems();
    // Mettre à jour quand l'état d'auth change
    
    const currentAuthState = this.authService.isAuthenticated();
    if (currentAuthState !== this.lastAuthState) {
      this.updateMenuItems();
    }

  }

  private updateMenuItems(): void {
    this.lastAuthState = this.authService.isAuthenticated();
    const baseItems: MenuItem[] = [
      {
        label: 'Le Groupe',
        items: [
            {
                label: 'Notre Histoire',
                routerLink: '/groupe/histoire'
            },
            {
                label: 'Les Membres',
                routerLink: '/groupe/membres'
            }
        ]
      },
      {
          label: 'Concerts',
          routerLink: "/concert"
      },
      {
          label: 'Galerie',
          routerLink: "/galerie"
      },
      {
          label: 'Contact',
          routerLink: "/contact"
      }
    ];

    this.itemNavbar = baseItems;

    // Construire les items d'authentification séparés
    if (this.authService.isAuthenticated()) {
      this.authItems = [
        {
          label: 'Gérer',
          routerLink: '/admin'
        },
        {
          label: 'Déconnexion',
          command: () => this.handleLogout()
        }
      ];
    } else {
      this.authItems = [
        {
          label: 'Se Connecter',
          routerLink: '/login'
        }
      ];
    }
  }

  private handleLogout(): void {
    this.authService.logout();
    this.updateMenuItems();
  }

}