/**
 * 用户类型
 */
export enum CustomerType {
  /**
   * 普通会员
   */
  NORMAL = '',

  /**
   * VIP会员
   */
  VIP = 'vip',
}

export const customerTypeList = [CustomerType.NORMAL, CustomerType.VIP];

/**
 * 用户等级
 */
export enum CustomerLevel {
  LEVEL_1 = 1,
  LEVEL_2 = 2,
  LEVEL_3 = 3,
  LEVEL_4 = 4,
  LEVEL_5 = 5,
  LEVEL_6 = 6,
}

export const CustomerLevelList = [
  CustomerLevel.LEVEL_1,
  CustomerLevel.LEVEL_2,
  CustomerLevel.LEVEL_3,
  CustomerLevel.LEVEL_4,
  CustomerLevel.LEVEL_5,
  CustomerLevel.LEVEL_6,
];

/**
 * 性别
 */
export enum CustomerGender {
  /**
   * 未知
   */
  UN_KNOW = '',

  /**
   * 男性
   */
  MALE = 'male',

  /**
   * 女性
   */
  FEMALE = 'female',

  /**
   * 其他
   */
  OTHER = 'other',
}

export const CustomerGenderList = [
  CustomerGender.UN_KNOW,
  CustomerGender.MALE,
  CustomerGender.FEMALE,
  CustomerGender.OTHER,
];

/**
 * 学历
 */
export enum CustomerEducation {
  /**
   * 未知
   */
  UN_KNOW = '',

  /**
   * 专科
   */
  ASSOCIATE = 'associate',

  /**
   * 本科
   */
  BACHELOR = 'bachelor',

  /**
   * 硕士
   */
  MASTER = 'master',

  /**
   * 博士
   */
  DOCTOR = 'doctor',

  /**
   * 其他
   */
  OTHER = 'other',
}

export const CustomerEducationList = [
  CustomerEducation.UN_KNOW,
  CustomerEducation.ASSOCIATE,
  CustomerEducation.BACHELOR,
  CustomerEducation.MASTER,
  CustomerEducation.DOCTOR,
  CustomerEducation.OTHER,
];

/**
 * 婚姻状况
 */
export enum CustomerMaritalStatus {
  /**
   * 未知
   */
  UN_KNOW = '',

  /**
   * 已婚
   */
  MARRIED = 'married',

  /**
   * 未婚
   */
  UNMARRIED = 'unmarried',

  /**
   * 其他
   */
  OTHER = 'other',
}

export const CustomerMaritalStatusList = [
  CustomerMaritalStatus.UN_KNOW,
  CustomerMaritalStatus.MARRIED,
  CustomerMaritalStatus.UNMARRIED,
  CustomerMaritalStatus.OTHER,
];

export interface Customer {
  uuid?: string;
  name?: string;
  nickName?: string;
  realName?: string;
  type?: CustomerType;
  level?: CustomerLevel;
  registrationTime?: string;
  gender?: CustomerGender;
  birthday?: string;
  city?: string;
  occupation?: string;
  annualIncome?: number;
  education?: CustomerEducation;
  maritalStatus?: CustomerMaritalStatus;
  numberOfChildren?: number;
  phoneNumber?: string;
  weChat?: string;
  qq?: string;
  email?: string;
}
