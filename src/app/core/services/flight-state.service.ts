import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Flight } from '../models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightStateService {

  private selectedFlightSubject =
    new BehaviorSubject<Flight | null>(null);

  selectedFlight$ =
    this.selectedFlightSubject.asObservable();

  selectFlight(flight: Flight): void {
    this.selectedFlightSubject.next(flight);
  }

  clearSelection(): void {
    this.selectedFlightSubject.next(null);
  }
}