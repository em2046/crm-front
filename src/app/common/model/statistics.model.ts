interface UserData {
  staffCount: number;
  supervisorCount: number;
  operatorCount: number;
}

interface CustomerData {
  customerCount: number;
  vipCount: number;
}

export default class Statistics {
  user: UserData;
  customer: CustomerData;
  labelCount: number;
  knowledgeCount: number;
}
