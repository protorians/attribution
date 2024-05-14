# Protorians Attribution  
Handle HTML element compound attributes that have multiple values. 

## Installation
NPM : `npm install @protorians/attribution`

YARN : `yarn install @protorians/attribution`

PNPM : `pnpm i @protorians/attribution`

`Note` : If you observed an `EACCES code` type error, you should use `sudo` or an equivalent to install it as administrator 
  
## Use case   
Let's start from the fact that we have an attribute of an HTML element which brings together several values to then define a particular behavior with CSS.
  
### Illustration :   
  
```html  
<div behaviors="float right top boxed ..." id="app"></div>  
  
```  
```scss  

div {
  
  &[behaviors~="float"] {
    position: fixed;
  }

  &[behaviors~="right"] {
    right: 0;
  }

  &[behaviors~="left"] {
    left: 0;
  }
  
}
```  
  
For this case we would like to have more dynamic javascript attribute management.
  
  
## How it works ?  
We will first initialize our HTML element on attribution.
  
### Exemple   
  
```typescript  
import {attrib} from "@protorians/attribution";  
  
const attributions = attrib(document.querySelector("#app"))  
  
```  
Then we create our `behaviors` attribute
  
```typescript  
import {attrib, attribSlot} from "@protorians/attribution";  
  
const attributions = attrib(document.querySelector("#app"))  
  
const slot = attribSlot("behaviors")  
  
  
```  
We add the values
  
```typescript  
import {attrib, attribSlot} from "@protorians/attribution";  
  
const attributions = attrib(document.querySelector("#app"))  
  
const slot = attribSlot("behaviors")  
 .commit("float") .commit("right") .commit("top") .commit("boxed")  
```  
  
We add the slot to the attribution 
  
```typescript  
import {attrib, attribSlot} from "@protorians/attribution";  
  
const attributions = attrib(document.querySelector("#app"))  
  
const slot = attribSlot("behaviors")  
 .commit("float") .commit("right") .commit("top") .commit("boxed")  
attributions.merge(slot)  
  
```  
  
Finally, we make the changes persist
  
```typescript  
import {attrib, attribSlot} from "@protorians/attribution";  
  
const attributions = attrib(document.querySelector("#app"))  
  
const slot = attribSlot("behaviors")  
 .commit("float") .commit("right") .commit("top") .commit("boxed")  
attributions.merge(slot)  
  
attributions.push()  
  
```  
### Updating `slots`
  
```typescript  
...
// Update  
slot.replace("right", "left")  
  
// Delete  
slot.delete("boxed")  
  
// Apply
attributions.push()  
```


# Attribution
**Interface** IAttribution<Context, Value extends (IAttributionValues<Context> | IAttributionValue)>;

```typescript  
new Attribution<Context, Value>(
	public element: Readonly<HTMLElement>,  
	public context: Readonly<Context> = {} as Context,  
	public options: IAttributionOptions = {},
)
```

## Properties

| Properties | Descriptions | Types |
|--|--|--|
| element | Element related to advanced attribute management | `Readonly<HTMLElement>`
| context | The attribution's context is the payload that we want to inject when a function is used to analyze and process the value to be added in the slot | `Readonly<Context>`
| options | Attribution Options | `Attribution Options | IAttributionOptions`


## Methodes

| Methods | Descriptions | Parameters | Returns |
|--|--|--|--|
| slot | Create new slot | name : `string`, value : `Value` | `this` |
| getSlot | Get attribution Slot. Return `undefined` if not exists | - | `IAttributionSlot<Value> | undefined` |
| getSlots | Get all attribution's Slots | - | `IAttributionSlotEntries<Value>` |
| pull | Returns an object containing all location values. Values are sorted by assignment slot name | - | `IAttributionMapped<Value>` |
| push | Returns an object containing all location values. Values are sorted by assignment slot name | - | `this` |
| merge | Merge slot in attribution definition | slots: `IAttributionSlot< Value > | ((IAttributionSlot<Value>)[])` | `this` |
| delete | Delete the slot in attribution definition | name: `string` | `this` |
| parse | Analyzes each input defined in the slot | slot: `IAttributionSlot<Value>` | `(Value | IAttributionValue)[]` |



# AttributionSlot
**Interface** IAttributionSlot<Value extends (IAttributionValues< unknown > | IAttributionValue)>

```typescript  
new AttributionSlot<Context, Value>(
	public name: Readonly<string>,
)
```

## Properties

| Properties | Descriptions | Types |
|--|--|--|
| name | Name of attribution slot |  `Readonly<string>` |
| commits | Committed values | `Value[]` |
| values | Committed values | `(Value | IAttributionValue)[]` |


## Methods

| Methods | Descriptions | Parameters | Returns |
|--|--|--|--|
| sync | Synchronous with Attribution | attribution: `IAttribution<unknown, Value>` | `this` |
| commit | Save value on slot | value: `Value` | `this` |
| replace | Replace value of slot by `newValue` | old: `Value`, newValue: `Value` | `this` |
| contains | Determines the existence of the value among the values in the location | value: `Value` | `boolean` |
| remove | Delete location data value | value: `Value` | `this` |
| rollback | Set the slot to its initial value | - | `this` |


---
# Protorians ;)