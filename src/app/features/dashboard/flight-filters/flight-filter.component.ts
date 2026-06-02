import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';

import { startWith } from 'rxjs';

import { Flight } from '../../../core/models/flight.model';

@Component({
  selector: 'app-flight-filters',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './flight-filter.component.html',
  styleUrls: ['./flight-filter.component.scss']
})
export class FlightFiltersComponent
implements OnInit {

  @Input()
  flights: Flight[] = [];

  @Output()
  filtersChanged =
  new EventEmitter<Flight[]>();

  filterForm!: FormGroup;

  originList: string[] = [];
  destinationList: string[] = [];

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {

    this.filterForm = this.fb.group({
      callsign: [''],
      status: [''],
      origin: [''],
      destination: ['']
    });

    this.filterForm.valueChanges
      .pipe(
        startWith(this.filterForm.value)
      )
      .subscribe(() => {
        this.filterFlights();
      });
  }

  ngOnChanges(): void {

    this.originList =
      [...new Set(
        this.flights.map(
          flight => flight.origin
        )
      )];

    this.destinationList =
      [...new Set(
        this.flights.map(
          flight => flight.destination
        )
      )];
  }

  filterFlights(): void {

    const value =
      this.filterForm.value;

    const filtered =
      this.flights.filter(flight => {

        const callsignMatch =
          !value.callsign ||
          flight.callsign
            .toLowerCase()
            .includes(
              value.callsign
                .toLowerCase()
            );

        const statusMatch =
          !value.status ||
          flight.status === value.status;

        const originMatch =
          !value.origin ||
          flight.origin === value.origin;

        const destinationMatch =
          !value.destination ||
          flight.destination === value.destination;

        return (
          callsignMatch &&
          statusMatch &&
          originMatch &&
          destinationMatch
        );
      });

    this.filtersChanged.emit(filtered);
  }

  resetFilters(): void {

    this.filterForm.reset({
      callsign: '',
      status: '',
      origin: '',
      destination: ''
    });
  }
}