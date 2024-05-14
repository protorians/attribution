/**
 * @description Slot values basic
 */
export type IAttributionValue = string | number | object | boolean | null | undefined;

/**
 * @description Function for processing the attribution slot value with the context as the first parameter
 */
export type IAttributionCallback<Context> = (context: Context) => IAttributionValue;

/**
 * @description Slot values available for attribution
 */
export type IAttributionValues<Context> = IAttributionValue | IAttributionCallback<Context>;

/**
 * @description Mapped Attribution Slot values
 */
export type IAttributionMapped<Value> = {
  [K: string]: (Value | IAttributionValue)[]
}

