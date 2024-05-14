import {AttributionSlot} from "../supports";
import {IAttributionValue, IAttributionValues} from "../types";


export function attribSlot<Value extends (IAttributionValues<any> | IAttributionValue)>(name: string){
  return new AttributionSlot<Value>(name)
}