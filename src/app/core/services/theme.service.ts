import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private darkModeSubject =
    new BehaviorSubject<boolean>(false);

  darkMode$ =
    this.darkModeSubject.asObservable();

  toggleTheme(): void {

    const current =
      this.darkModeSubject.value;

    const updated = !current;

    this.darkModeSubject.next(updated);

    document.body.classList.toggle(
      'dark-theme',
      updated
    );
  }
}