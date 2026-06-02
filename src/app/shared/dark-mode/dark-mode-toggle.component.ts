import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeService }
from '../../core/services/theme.service';

@Component({
  selector: 'app-dark-mode-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl:
    './dark-mode-toggle.component.html',
  styleUrls: [
    './dark-mode-toggle.component.scss'
  ]
})
export class DarkModeToggleComponent {

  constructor(
    private themeService: ThemeService
  ) {}

  toggleTheme(): void {

    this.themeService
      .toggleTheme();
  }
}