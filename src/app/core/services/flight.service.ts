import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Flight } from '../models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private http: HttpClient) {}

  getFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(
      'assets/mock-data/flights.json'
    );
  }
}