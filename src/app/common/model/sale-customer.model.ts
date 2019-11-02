import { Customer } from './customer.model';
import Sale from './sale.model';

export class SaleCustomer {
  uuid?: string;
  customer?: Customer;
  sale?: Sale;
  finished?: boolean;
}
