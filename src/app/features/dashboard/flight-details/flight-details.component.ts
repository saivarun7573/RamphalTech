import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightStateService } from '../../../core/services/flight-state.service';
import { Flight } from '../../../core/models/flight.model';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-flight-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss']
})
export class FlightDetailsComponent {
  flight$!: Observable<Flight | null>;

  constructor(
    private flightStateService: FlightStateService
  ) {
    this.flight$ = this.flightStateService.selectedFlight$;
  }
}