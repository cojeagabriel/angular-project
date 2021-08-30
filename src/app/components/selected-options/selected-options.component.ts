import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Flight } from 'src/app/types/flight';

@Component({
  selector: 'app-selected-options',
  templateUrl: './selected-options.component.html',
  styleUrls: ['./selected-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectedOptionsComponent implements OnInit {

  @Input() selectedOptions!: Flight[];

  @Output() removeId = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

}
