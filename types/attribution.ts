import type {
  IAttributionMapped, IAttributionValue,
  IAttributionValues
} from "./value";
import type {
  IAttributionSlot,
  IAttributionSlotEntries,
} from "./slot";
import {IAttributionOptions} from "./options";

/**
 * Attribution Class
 */
export interface IAttribution<Context, Value extends (IAttributionValues<Context> | IAttributionValue)> {

  /**
   * Attribution.element
   * @description Element related to advanced attribute management
   */
  element: Readonly<HTMLElement>

  /**
   * Attribution.context
   * @description The attribution's context is the payload that we want to inject when a function is used to analyze and process the value to be added in the slot
   */
  context: Readonly<Context>;

  /**
   * Attribution.options
   * @description Attribution Options
   */
  options?: IAttributionOptions;

  /**
   * Create new slot
   * @param name
   * @param value
   */
  slot(name: string, value: Value): this;

  /**
   * Attribution.slot()
   * @description Get attribution Slot. Return `undefined` if not exists
   */
  getSlot(name: string): IAttributionSlot<Value> | undefined;

  /**
   * Attribution.slots()
   * @description Get all attribution's Slots
   */
  getSlots(): IAttributionSlotEntries<Value>;

  /**
   * Attribution.pull()
   * @description Returns an object containing all location values. Values are sorted by assignment slot name
   */
  pull(): IAttributionMapped<Value>;

  /**
   * Attribution.push()
   * @description Send slots to HTML element attributes
   */
  push(): this;

  /**
   * Attribution.push()
   * @description Merge slot in attribution definition
   */
  merge(slots: IAttributionSlot<Value> | ((IAttributionSlot<Value>)[])): this;

  /**
   * Attribution.delete()
   * @description Delete the slot in attribution definition
   * @param name
   */
  delete(name: string): this;

  /**
   * @description Analyzes each input defined in the slot
   * @param slot
   */
  parse(slot: IAttributionSlot<Value>): (Value | IAttributionValue)[]

}

