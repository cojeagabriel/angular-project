import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { SelectedOptionsComponent } from './../selected-options/selected-options.component';
import { SearchResultsComponent } from './../search-results/search-results.component';
import { SearchFormComponent } from './../search-form/search-form.component';
import { SearchFiltersComponent } from './../search-filters/search-filters.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchFilters } from 'src/app/types/search-filters';
import { Flight } from 'src/app/types/flight';
import { User } from 'src/app/types/user';
import { SearchFormData } from 'src/app/types/search-form-data';
import { SearchService } from 'src/app/services/search.service';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import * as faker from 'faker';
import { UserService } from 'src/app/services/user.service';

import { SearchComponent } from './search.component';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const mockOption: Flight = {
  id: faker.datatype.uuid(),
  date: faker.date.soon(),
  city: faker.address.city(),
  stops: faker.datatype.number(2),
  price: Number(faker.commerce.price(100, 350))
};

const mockUser: User = {
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email()
};

const mockFormData: SearchFormData = {
  fromDate: new Date()
};

const mockFilters: SearchFilters = {
  nonStop: false
};

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchComponent,
        SearchFiltersComponent,
        SearchFormComponent,
        SearchResultsComponent,
        SelectedOptionsComponent
      ],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSidenavModule,
        MatButtonModule,
        MatDividerModule
      ],
      providers: [
        UserService,
        SearchService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get results',
    inject(
      [UserService, SearchService],
      (userService: UserService, searchService: SearchService) => {
        spyOn(userService, 'getUser').and.returnValue(of(mockUser));
        spyOn(searchService, 'getResults').and.returnValue(of([mockOption]));

        expect(searchService.getResults).not.toHaveBeenCalled();

        component.filters$.next(mockFilters);
        fixture.detectChanges();
        expect(searchService.getResults).not.toHaveBeenCalled();

        component.searchFormData$.next(mockFormData);
        fixture.detectChanges();
        expect(searchService.getResults).toHaveBeenCalled();
      })
  );
});
