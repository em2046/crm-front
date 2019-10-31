import {
  CustomerEducation,
  CustomerGender,
  CustomerLevel,
  CustomerMaritalStatus,
  CustomerType,
} from '../model/customer.model';

export const customerTypeTable = {
  [CustomerType.NORMAL]: { title: '普通会员' },
  [CustomerType.VIP]: { title: 'VIP会员' },
};

export const customerLevelTable = {
  [CustomerLevel.LEVEL_1]: { title: 'LV1', icon: 'looks_one' },
  [CustomerLevel.LEVEL_2]: { title: 'LV2', icon: 'looks_two' },
  [CustomerLevel.LEVEL_3]: { title: 'LV3', icon: 'looks_3' },
  [CustomerLevel.LEVEL_4]: { title: 'LV4', icon: 'looks_4' },
  [CustomerLevel.LEVEL_5]: { title: 'LV5', icon: 'looks_5' },
  [CustomerLevel.LEVEL_6]: { title: 'LV6', icon: 'looks_6' },
};

export const customerGenderTable = {
  [CustomerGender.UN_KNOW]: { title: '未知' },
  [CustomerGender.MALE]: { title: '男性' },
  [CustomerGender.FEMALE]: { title: '女性' },
  [CustomerGender.OTHER]: { title: '其他' },
};

export const customerEducationTable = {
  [CustomerEducation.UN_KNOW]: { title: '未知' },
  [CustomerEducation.ASSOCIATE]: { title: '专科' },
  [CustomerEducation.BACHELOR]: { title: '本科' },
  [CustomerEducation.MASTER]: { title: '硕士' },
  [CustomerEducation.DOCTOR]: { title: '博士' },
  [CustomerEducation.OTHER]: { title: '其他' },
};

export const customerMaritalStatusTable = {
  [CustomerMaritalStatus.UN_KNOW]: { title: '未知' },
  [CustomerMaritalStatus.MARRIED]: { title: '已婚' },
  [CustomerMaritalStatus.UNMARRIED]: { title: '未婚' },
  [CustomerMaritalStatus.OTHER]: { title: '其他' },
};
