/**
 * Resolves attributes from an object. Each new node will be separated by `separator`
 * @param attributes Object from which attributes are resolved
 * @param ns The name of the starting space
 * @param separator Separator character
 */
export function resolveAttrib<T>(
  attributes: object,
  ns?: string | undefined,
  separator?: string | undefined,
): T {

  const nms = ((typeof ns != 'undefined') ? `${ns}${separator || ':'}` : '');
  let output: T = {} as T;

  Object.entries(attributes).map(({0: name, 1: value}) => {
    if (typeof value == 'object' && value) {

      if (Array.isArray(value)) {
        output[`${nms}${name}` as keyof T] = `${value.join(' ')}` as T[keyof T];
      } else {
        Object.assign(output as object, resolveAttrib(value, `${nms}${name}`, separator));
      }
    } else if (typeof value != 'undefined') {
      output[(`${name == '$' ? ns : `${nms}${name}`}`) as keyof T] = `${value}` as T[keyof T];
    }
  });

  return output;

}

/**
 * Resolves the attribute name then transforms it into an object
 * @param inlineName
 * @param separator
 */
export function resolveAttribName<T>(inlineName: string | Array<string>, separator?: string | undefined,): T {

  return ((Array.isArray(inlineName) ? inlineName : [inlineName])
    .map(name => (
      {
        ...name.split(separator || ':')
          .reverse()
          .reduce(
            (accumulate, current) =>
              ({[current]: accumulate}), {}
          ) as T
      }
    )) as T[])[0]

}

/**
 * Resolves the attributes name then transforms it into an array of object
 * @param inlineName
 * @param separator
 */
export function resolveAttribNames<T>(inlineName: Array<string>, separator?: string | undefined,): T[] {

  return inlineName
    .map(name => (
      {
        ...name.split(separator || ':')
          .reverse()
          .reduce(
            (accumulate, current) =>
              ({[current]: accumulate}), {}
          ) as T
      }
    )) as T[]

}