import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  OnDestroy
} from '@angular/core';

import { CommonModule } from '@angular/common';

import * as L from 'leaflet';
import 'leaflet.markercluster';

import { Flight } from '../../../core/models/flight.model';
import { Airport } from '../../../core/models/airport.model';

import { AirportService } from '../../../core/services/airport.service';
import { FlightStateService } from '../../../core/services/flight-state.service';

@Component({
  selector: 'app-flight-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flight-map.component.html',
  styleUrls: ['./flight-map.component.scss']
})
export class FlightMapComponent
  implements AfterViewInit, OnChanges, OnDestroy {

  @Input()
  flights: Flight[] = [];

  private map!: L.Map;

  private markerClusterGroup!: L.MarkerClusterGroup;

  private routeLayer?: L.Polyline;

  private airports: Airport[] = [];

  constructor(
    private airportService: AirportService,
    private flightStateService: FlightStateService
  ) {}

  ngAfterViewInit(): void {

    this.initializeMap();

    this.loadAirports();

    this.subscribeToFlightSelection();
  }

  ngOnChanges(
    changes: SimpleChanges
  ): void {

    if (
      changes['flights'] &&
      this.map
    ) {

      this.renderFlightMarkers();
    }
  }

  ngOnDestroy(): void {

    if (this.map) {
      this.map.remove();
    }
  }

  private initializeMap(): void {

    this.map = L.map(
      'flight-map'
    ).setView(
      [20.5937, 78.9629],
      5
    );

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; OpenStreetMap contributors'
      }
    ).addTo(this.map);

    this.markerClusterGroup =
      L.markerClusterGroup();

    this.map.addLayer(
      this.markerClusterGroup
    );
  }

  private loadAirports(): void {

    this.airportService
      .getAirports()
      .subscribe((airports) => {

        this.airports = airports;

        this.renderAirportMarkers();
      });
  }

  private renderAirportMarkers(): void {

    this.airports.forEach(
      (airport) => {

        const marker =
          L.circleMarker(
            [
              airport.lat,
              airport.lng
            ],
            {
              radius: 7,
              weight: 2,
              fillOpacity: 0.8
            }
          );

        marker.bindPopup(`
          <strong>${airport.code}</strong>
          <br>
          ${airport.name}
          <br>
          ${airport.city}
        `);

        marker.addTo(this.map);
      }
    );
  }

  private renderFlightMarkers(): void {

    this.markerClusterGroup.clearLayers();

    this.flights.forEach(
      (flight) => {

        const marker =
          L.marker([
            flight.currentLat,
            flight.currentLng
          ]);

        marker.bindPopup(`
          <div>
            <strong>
              ${flight.flightNumber}
            </strong>
            <br>
            Callsign:
            ${flight.callsign}
            <br>
            ${flight.origin}
            →
            ${flight.destination}
            <br>
            Status:
            ${flight.status}
          </div>
        `);

        marker.on(
          'click',
          () => {

            this.flightStateService
              .selectFlight(
                flight
              );
          }
        );

        this.markerClusterGroup
          .addLayer(
            marker
          );
      }
    );
  }

  private subscribeToFlightSelection(): void {

    this.flightStateService
      .selectedFlight$
      .subscribe((flight) => {

        if (!flight) {
          return;
        }

        this.drawRoute(
          flight
        );
      });
  }

  private drawRoute(
    flight: Flight
  ): void {

    if (
      this.routeLayer
    ) {

      this.map.removeLayer(
        this.routeLayer
      );
    }

    this.routeLayer =
      L.polyline(
        [
          [
            flight.originLat,
            flight.originLng
          ],
          [
            flight.destinationLat,
            flight.destinationLng
          ]
        ],
        {
          weight: 5
        }
      );

    this.routeLayer
      .addTo(this.map);

    this.map.fitBounds(
      this.routeLayer.getBounds(),
      {
        padding: [50, 50]
      }
    );
  }
}