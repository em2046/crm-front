import Task from './task.model';
import { Label } from './label.model';
import { SaleCustomer } from './sale-customer.model';

export default class Sale extends Task {
  label?: Label;
  saleCustomers?: SaleCustomer[];
}
