# Flight Tracking Dashboard

## Overview

A responsive Flight Tracking Dashboard built with Angular 21 and Leaflet Maps for aviation operations monitoring.

The application enables users to:

* View live flight positions on a map
* Visualize flight routes
* Monitor operational KPIs
* Search and filter flights
* View detailed flight information
* Toggle dark mode
* Display airport markers
* Use marker clustering for better map performance

---

## Tech Stack

* Angular 21
* TypeScript
* RxJS
* Reactive Forms
* Leaflet Maps
* Leaflet Marker Cluster
* SCSS

---

## Features

### Flight Map

* Interactive Leaflet map
* Flight markers
* Airport markers
* Marker clustering
* Flight route visualization

### Operations Dashboard

* Total Flights
* Active Flights
* Delayed Flights
* Arrived Flights

### Search & Filters

* Search by Callsign
* Filter by Status
* Filter by Origin
* Filter by Destination

### Flight Details

* Flight Number
* Callsign
* Aircraft Type
* Origin
* Destination
* Status
* ETD
* ETA

### Additional Features

* RxJS State Management
* Dark Mode
* Unit Tests
* Responsive Layout

---

## Installation

Install dependencies

npm install

Install Leaflet

npm install leaflet leaflet.markercluster

npm install --save-dev @types/leaflet

npm install --save-dev @types/leaflet.markercluster

Run Application

ng serve

Open

http://localhost:4200

---

## Folder Structure

src/

app/

core/

models/

services/

features/

dashboard/

shared/

assets/

mock-data/

---

## Unit Tests

Run tests

ng test

---

## Future Enhancements

* Flight Animation
* Weather Layers
* Real-time APIs
* Flight Playback
* Lazy Loaded Modules
* NgRx State Management
