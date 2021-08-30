import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Flight } from 'src/app/types/flight';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsComponent implements OnInit {

  @Input() searchResults!: Flight[];

  @Output() selectionChange = new EventEmitter<Flight>();

  constructor() { }

  ngOnInit(): void {
  }

}
