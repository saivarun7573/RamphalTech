import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Flight } from '../../core/models/flight.model';
import { FlightService } from '../../core/services/flight.service';

import { FlightMapComponent } from './flight-map/flight-map.component';
import { FlightDetailsComponent } from './flight-details/flight-details.component';
import { FlightFiltersComponent } from './flight-filters/flight-filter.component';
import { KpiCardsComponent } from './kpi-cards/kpi-cards.component';
import { DarkModeToggleComponent } from '../../shared/dark-mode/dark-mode-toggle.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FlightMapComponent,
    FlightDetailsComponent,
    FlightFiltersComponent,
    KpiCardsComponent,
    DarkModeToggleComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  flights: Flight[] = [];
  filteredFlights: Flight[] = [];

  constructor(
    private flightService: FlightService
  ) {}

  ngOnInit(): void {
    this.loadFlights();
  }

  loadFlights(): void {
    this.flightService
      .getFlights()
      .subscribe((data) => {
        this.flights = data;
        this.filteredFlights = data;
      });
  }

  applyFilters(filteredData: Flight[]): void {
    this.filteredFlights = filteredData;
  }
}