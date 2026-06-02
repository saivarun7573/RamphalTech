import {
  TestBed
} from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { FlightService } from './flight.service';

describe('FlightService', () => {

  let service: FlightService;
  let httpMock: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });

    service = TestBed.inject(
      FlightService
    );

    httpMock = TestBed.inject(
      HttpTestingController
    );
  });

  afterEach(() => {
    httpMock.verify();
  });

  it(
    'should load flights',
    () => {

      const mockFlights = [
        {
          id: 1,
          flightNumber: 'AI101'
        }
      ];

      service
        .getFlights()
        .subscribe(
          flights => {

            expect(
              flights.length
            ).toBe(1);

            expect(
              flights[0].flightNumber
            ).toBe('AI101');
          }
        );

      const request =
        httpMock.expectOne(
          'assets/mock-data/flights.json'
        );

      expect(
        request.request.method
      ).toBe('GET');

      request.flush(
        mockFlights
      );
    }
  );
});