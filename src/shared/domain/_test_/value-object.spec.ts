import { ValueObject } from "../value-object";

class StringValueObject extends ValueObject {
  constructor(readonly value: string) {
    super();
  }
}

describe('ValueObject unit tests', () => {

   test('Should be equals', () => {
    const valueObject1 = new StringValueObject('test');
    const valueObject2 = new StringValueObject('test');
    expect(valueObject1.equals(valueObject2)).toBe(true);
   });

   test('Should not be equals', () => {
    const valueObject1 = new StringValueObject('test');
    const valueObject2 = new StringValueObject('test2');
    expect(valueObject1.equals(valueObject2)).toBe(false);
   })
});