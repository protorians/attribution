import type {
  IAttribution, IAttributionMapped, IAttributionOptions,
  IAttributionSlot,
  IAttributionSlotEntries,
  IAttributionValue,
  IAttributionValues
} from "../types";
import {AttributionSlot} from "./slot";

export class Attribution<
  Context,
  Value extends (IAttributionValues<Context> | IAttributionValue)
> implements IAttribution<Context, Value> {

  protected entries: IAttributionSlotEntries<Value> = {}

  constructor(
    public element: Readonly<HTMLElement>,
    public context: Readonly<Context> = {} as Context,
    public options: IAttributionOptions = {},
  ) {
    this.element = element as Readonly<HTMLElement>
    this.context = context || ({} as Context)
    this.options = options || ({} as IAttributionOptions);
    this.options.separator = this.options.separator || ' ';
  }

  slot(name: string, value: Value | Value[]): this {
    const slot = (new AttributionSlot<Value>(name));
    (Array.isArray(value) ? value : [value])
      .forEach(value => slot.commit(value))
    this.merge(slot)
    return this;
  }

  getSlot(name: string): IAttributionSlot<Value> | undefined {
    return this.entries[name];
  }

  getSlots(): IAttributionSlotEntries<Value> {
    return this.entries
  }

  pull(): IAttributionMapped<Value> {
    const mapped: IAttributionMapped<Value> = {}

    Object.values(this.entries)
      .forEach(slot =>
        mapped[slot.name] = slot.values)
    return mapped
  }

  push(): this {
    Object.values(this.entries)
      .forEach(slot => {
        slot.sync(this);
        this.element.setAttribute(
          `${slot.name}`,
          `${ slot.values.join(this.options.separator) }`
        )
      })
    return this;
  }

  merge(slots: IAttributionSlot<Value> | ((IAttributionSlot<Value>)[])): this {
    (Array.isArray(slots) ? slots : [slots])
      .forEach(slot => {
        this.entries[slot.name] = slot
      })
    return this;
  }

  delete(name: string): this {
    const entries: IAttributionSlotEntries<Value> = {}

    Object.values(this.entries)
      .forEach(slot =>
        (slot.name !== name)
          ? entries[slot.name] = slot
          : this.element.removeAttribute(slot.name)
      )

    this.entries = entries;
    return this;
  }

  parse(slot: IAttributionSlot<Value>): (Value | IAttributionValue)[] {
    return slot.commits.map(commit => {
      if (typeof commit == 'function') return commit(this.context)
      return commit;
    })
  }

}