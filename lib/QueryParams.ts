import { OrderingEnum } from "./OrderingEnum";

export default interface QueryParams {
  name?: string;
  order?: OrderingEnum;
}