import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Flight } from '../../../core/models/flight.model';

@Component({
  selector: 'app-kpi-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kpi-cards.component.html',
  styleUrls: ['./kpi-cards.component.scss']
})
export class KpiCardsComponent {

  @Input()
  flights: Flight[] = [];

  get totalFlights(): number {
    return this.flights.length;
  }

  get activeFlights(): number {
    return this.flights.filter(
      flight => flight.status === 'Active'
    ).length;
  }

  get delayedFlights(): number {
    return this.flights.filter(
      flight => flight.status === 'Delayed'
    ).length;
  }

  get arrivedFlights(): number {
    return this.flights.filter(
      flight => flight.status === 'Arrived'
    ).length;
  }
}