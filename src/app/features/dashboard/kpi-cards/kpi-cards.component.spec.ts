import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  KpiCardsComponent
} from './kpi-cards.component';

describe(
  'KpiCardsComponent',
  () => {

    let component:
      KpiCardsComponent;

    let fixture:
      ComponentFixture<KpiCardsComponent>;

    beforeEach(
      async () => {

        await TestBed
          .configureTestingModule({
            imports: [
              KpiCardsComponent
            ]
          })
          .compileComponents();

        fixture =
          TestBed.createComponent(
            KpiCardsComponent
          );

        component =
          fixture.componentInstance;
      }
    );

    it(
      'should calculate total flights',
      () => {

        component.flights = [
          {
            id: 1,
            status: 'Active'
          } as any,
          {
            id: 2,
            status: 'Delayed'
          } as any,
          {
            id: 3,
            status: 'Arrived'
          } as any
        ];

        expect(
          component.totalFlights
        ).toBe(3);
      }
    );

    it(
      'should calculate active flights',
      () => {

        component.flights = [
          {
            status: 'Active'
          } as any,
          {
            status: 'Active'
          } as any,
          {
            status: 'Delayed'
          } as any
        ];

        expect(
          component.activeFlights
        ).toBe(2);
      }
    );

    it(
      'should calculate delayed flights',
      () => {

        component.flights = [
          {
            status: 'Delayed'
          } as any,
          {
            status: 'Delayed'
          } as any,
          {
            status: 'Active'
          } as any
        ];

        expect(
          component.delayedFlights
        ).toBe(2);
      }
    );

    it(
      'should calculate arrived flights',
      () => {

        component.flights = [
          {
            status: 'Arrived'
          } as any,
          {
            status: 'Arrived'
          } as any,
          {
            status: 'Active'
          } as any
        ];

        expect(
          component.arrivedFlights
        ).toBe(2);
      }
    );
  }
);