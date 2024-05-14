import {Attribution} from "../supports";
import type {
  IAttributionOptions,
  IAttributionValue,
  IAttributionValues
} from "../types";


export function attrib<Context, Value extends (IAttributionValues<Context> | IAttributionValue)>(
  element: HTMLElement,
  context?: Context,
  options?: IAttributionOptions,
) {
  return new Attribution<Context, Value>(element, context, options)
}

