import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchFormData } from 'src/app/types/search-form-data';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFormComponent implements OnInit {

  form = this.getForm();

  @Output() searchChange = new EventEmitter<SearchFormData>();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  search() {
    this.searchChange.emit(this.form.value);
  }

  private getForm(): FormGroup {
    return this.formBuilder.group({
      fromDate: [null, Validators.required]
    });
  }

}
