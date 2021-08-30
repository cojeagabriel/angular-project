import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as faker from 'faker';
import { map } from 'rxjs/operators';
import { Flight } from '../types/flight';
import { SearchPayload } from '../types/search-payload';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private selectedOptions: Flight[] = [];

  mockResults: Flight[] = new Array(50).fill(null).map(item => {
    const future = new Date();
    future.setDate(future.getDate() + 30);

    return {
      id: faker.datatype.uuid(),
      date: faker.date.between(new Date(), future),
      city: faker.address.city(),
      stops: faker.datatype.number(2),
      price: Number(faker.commerce.price(100, 350))
    };
  }).sort((a, b) => {
    return a.date > b.date ? 1 : -1;
  });

  constructor() { }

  getResults(payload: SearchPayload): Observable<Flight[]> {
    const future = new Date();
    future.setDate(future.getDate() + 25);

    return of(this.mockResults).pipe(
      map(results => {
        return results.filter(result => {
          return result.date >= payload.fromDate && (!payload.filters.nonStop || payload.filters.nonStop && result.stops === 0);
        });
      })
    );
  }

  getSelectedOptions(): Observable<Flight[]> {
    return of([...this.selectedOptions]);
  }

  addOption(option: Flight): Observable<Flight> {
    this.selectedOptions.push(option);
    return of(option);
  }

  removeOption(id: string): Observable<Flight> {
    const removedOption = this.selectedOptions.find(selectedOption => selectedOption.id === id);
    this.selectedOptions = this.selectedOptions.filter(selectedOption => selectedOption.id !== id);
    return of(removedOption);
  }
}
