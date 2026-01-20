export enum OrderingEnum {
  CREATED_AT_ASC = "CREATED_AT_ASC",
  CREATED_AT_DESC = "CREATED_AT_DESC",
  NAME_ASC = "NAME_ASC",
  NAME_DESC = "NAME_DESC",
  USED_ASC = "USED_ASC",
  USED_DESC = "USED_DESC",
}

export const OrderingLabels: Record<OrderingEnum, string> = {
  [OrderingEnum.CREATED_AT_ASC]: "Created ↑",
  [OrderingEnum.CREATED_AT_DESC]: "Created ↓",
  [OrderingEnum.NAME_ASC]: "Name ↑",
  [OrderingEnum.NAME_DESC]: "Name ↓",
  [OrderingEnum.USED_ASC]: "Usage ↑",
  [OrderingEnum.USED_DESC]: "Usage ↓",
}