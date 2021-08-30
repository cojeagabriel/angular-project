import { FormBuilder, FormGroup } from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { startWith, takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFiltersComponent implements OnInit, OnDestroy {

  form = this.getForm();
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  @Output() filtersChange = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      startWith(this.form.value),
      takeUntil(this.destroyed$)
    ).subscribe(value => this.filtersChange.emit(value));
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  private getForm(): FormGroup {
    return this.formBuilder.group({
      nonStop: false
    });
  }

}
