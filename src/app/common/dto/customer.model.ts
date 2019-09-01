/**
 * 用户类型
 */
export enum CustomerType {
  /**
   * 普通
   */
  NORMAL = '',

  /**
   * 会员
   */
  VIP = 'vip',
}

/**
 * 用户等级
 */
export enum CustomerLevel {
  LEVEL_0 = 0,
  LEVEL_1 = 1,
  LEVEL_2 = 2,
  LEVEL_3 = 3,
  LEVEL_4 = 4,
  LEVEL_5 = 5,
  LEVEL_6 = 6,
}

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
