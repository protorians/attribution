import type {
  IAttribution,
  IAttributionSlot,
  IAttributionValue,
  IAttributionValues
} from "../types";

export class AttributionSlot<Value extends (IAttributionValues<unknown> | IAttributionValue)> implements IAttributionSlot<Value> {

  protected current: (Value | IAttributionValue)[] = [];

  protected initial: Value[] = [];

  commits: Value[] = [];

  constructor(
    public name: Readonly<string>,
  ) {
  }

  sync(attribution: IAttribution<unknown, Value>): this {
    this.current = attribution.parse(this);
    return this;
  }

  get values(): (Value | IAttributionValue)[] {
    return this.current;
  }

  commit(value: Value): this {
    this.commits.push(value);
    return this;
  }

  replace(old: Value, newValue: Value): this {
    this.remove(old).commit(newValue)
    return this;
  }

  contains(value: Value): boolean {
    return this.commits.includes(value);
  }

  remove(value: Value): this {
    this.commits = this.commits.filter(commit => value !== commit);
    return this;
  }

  clear(): this {
    this.commits = [];
    return this;
  }

  rollback(): this {
    this.commits = this.initial;
    return this;
  }


}