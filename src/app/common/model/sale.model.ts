import Task from './task.model';
import { Label } from './label.model';
import { Customer } from './customer.model';

export default class Sale extends Task {
  label?: Label;
  customers?: Customer[];
}
