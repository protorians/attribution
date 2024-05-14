import type {IAttributionValue, IAttributionValues} from "./value";
import type {IAttribution} from "./attribution";

/**
 * @description Attribution's slots entries
 */
export type IAttributionSlots<Value extends (IAttributionValues<any> | IAttributionValue)> = IAttributionSlot<Value>[]

export type IAttributionSlotEntries<Value extends (IAttributionValues<any> | IAttributionValue)> = {
  [K: string]: IAttributionSlot<Value>
}


/**
 * Attribution Slot
 * @description Represent an attribute
 */
export interface IAttributionSlot<Value extends (IAttributionValues<unknown> | IAttributionValue)> {

  /**
   * AttributionSlot.name
   * @description Name of attribution slot
   */
  name: Readonly<string>;

  /**
   * AttributionSlot.commits
   * @description Committed values
   */
  commits: Value[];

  /**
   * AttributionSlot.sync()
   * @description Synchronous with Attribution
   * @param attribution
   */
  sync(attribution: IAttribution<unknown, Value>): this;

  /**
   * AttributionSlot.values
   * @description Get values parsed
   */
  get values(): (Value | IAttributionValue)[];

  /**
   * AttributionSlot.commit()
   * @description Save value on slot
   * @param value
   */
  commit(value: Value): this;

  /**
   * @description Replace value of slot by `newValue`
   * @param old
   * @param newValue
   */
  replace(old: Value, newValue: Value): this;

  /**
   * AttributionSlot.contains()
   * @description Determines the existence of the value among the values in the location
   * @param value
   */
  contains(value: Value): boolean;

  /**
   * AttributionSlot.remove()
   * @description Delete location data value
   * @param value
   */
  remove(value: Value): this;

  /**
   * AttributionSlot.reset()
   * @description Set the slot to its initial value
   */
  rollback(): this;

  /**
   * AttributionSlot.clean()
   * @description Remove all values from slot
   */
  clear(): this;

}
