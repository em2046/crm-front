import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

/**
 * 选项
 */
export interface Option {
  /**
   * 值
   */
  value: string;
  /**
   * 显示
   */
  title: string;
}

@Component({
  selector: 'app-chips-autocomplete',
  templateUrl: './chips-autocomplete.component.html',
  styleUrls: ['./chips-autocomplete.component.less'],
})
export class ChipsAutocompleteComponent implements OnInit {
  @Input()
  label = '';

  @Input()
  icon = '';

  @Input()
  placeholder = '';

  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  optionCtrl = new FormControl();
  filteredOptions: Observable<Option[]>;

  @Input()
  selectedOptions: Option[] = [];

  @Output()
  selectedOptionsChange = new EventEmitter();

  @Input()
  allOptions: Option[] = [];

  @Input()
  max?: number;

  @ViewChild('input', { static: false })
  optionInput: ElementRef<HTMLInputElement>;

  @ViewChild('auto', { static: false })
  matAutocomplete: MatAutocomplete;

  constructor() {
    this.refreshFilter();
  }

  public refreshFilter() {
    this.filteredOptions = this.optionCtrl.valueChanges.pipe(
      startWith(null),
      map((option: Option | string | null) => {
        if (option) {
          if (typeof option === 'string') {
            return this._filter(option);
          } else if (option.title) {
            return this._filter(option.title);
          }
        } else {
          return this.allOptions.slice();
        }
      }),
    );
  }

  add(event: MatChipInputEvent): void {
    const max = this.max;
    const full = typeof max === 'number' && this.selectedOptions.length >= max;

    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        const option = this.find(value);
        if (option && !full) {
          this.selectedOptions.push(option);
          this.selectedOptionsChange.emit(this.selectedOptions);
        }
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.optionCtrl.setValue(null);
    }
  }

  remove(option: Option): void {
    const index = this.selectedOptions.indexOf(option);

    if (index >= 0) {
      this.selectedOptions.splice(index, 1);
      this.selectedOptionsChange.emit(this.selectedOptions);
    }
  }

  find(title: string): Option {
    return this.allOptions.find(option => {
      return option.title === title.trim();
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const max = this.max;
    const full = typeof max === 'number' && this.selectedOptions.length >= max;

    const option = this.find(event.option.viewValue);
    const alreadySelected = this.selectedOptions.find(selected => {
      return selected.value === option.value;
    });
    if (!alreadySelected && !full) {
      this.selectedOptions.push(option);
      this.selectedOptionsChange.emit(this.selectedOptions);
    }
    this.optionInput.nativeElement.value = '';
    this.optionCtrl.setValue(null);
  }

  private _filter(title: string): Option[] {
    const optionValue = title.toLowerCase();

    return this.allOptions.filter(r => {
      const foundTitle = r.title.toLowerCase().indexOf(optionValue) === 0;
      const foundName = r.value.toLowerCase().indexOf(optionValue) === 0;
      return foundTitle || foundName;
    });
  }

  ngOnInit(): void {}
}
