import { SearchPayload } from 'src/app/types/search-payload';
import { UserService } from 'src/app/services/user.service';
import { SearchService } from 'src/app/services/search.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { SearchFormData } from 'src/app/types/search-form-data';
import { switchMap, take, withLatestFrom } from 'rxjs/operators';
import { User } from 'src/app/types/user';
import { Flight } from 'src/app/types/flight';
import { SearchFilters } from 'src/app/types/search-filters';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {

  user$ = this.getUser();
  searchFormData$ = new BehaviorSubject<SearchFormData | null>(null);
  filters$ = new BehaviorSubject<SearchFilters | null>(null);
  searchResults$ = this.getSearchResults();
  refreshSelectedOptions$ = new BehaviorSubject(null);
  selectedOptions$ = this.getSelectedOptions();

  constructor(
    private userService: UserService,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
  }

  selectOption(option: Flight) {
    this.searchService.addOption(option).pipe(
      take(1)
    ).subscribe(() => this.refreshSelectedOptions$.next(null));
  }

  removeOption(optionId: string) {
    this.searchService.removeOption(optionId).pipe(
      take(1)
    ).subscribe(() => this.refreshSelectedOptions$.next(null));
  }

  private getUser(): Observable<User> {
    return this.userService.getUser();
  }

  private getSearchResults(): Observable<Flight[]> {
    return combineLatest([
      this.searchFormData$,
      this.filters$
    ]).pipe(
      withLatestFrom(this.user$),
      switchMap(([[searchFormData, filters], user]) => {
        if (!searchFormData || !filters || !user) {
          return of([]);
        }
        const payload = this.getPayload(searchFormData, filters, user);
        return this.searchService.getResults(payload);
      })
    );
  }

  private getSelectedOptions(): Observable<Flight[]> {
    return this.refreshSelectedOptions$.pipe(
      switchMap(() => this.searchService.getSelectedOptions())
    );
  }

  private getPayload(searchFormData: SearchFormData, filters: SearchFilters, user: User): SearchPayload {
    return {
      userEmail: user.email,
      fromDate: searchFormData.fromDate,
      filters
    };
  }

}
