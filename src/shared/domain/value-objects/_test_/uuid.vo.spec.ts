import { InvalidUuidError, Uuid } from "../uuid.vo";
import { validate as uuidValidate } from "uuid";

describe('UUID unit tests', () => {

  test('should throw erro when uuid is invalid', () => {
    expect(() => {
        new Uuid('Invalid-uuid')
    }).toThrow(new InvalidUuidError());
  });

  test('should create a valid uuid', () => {
    const uuid = new Uuid();
    expect(uuid.id).toBeDefined();
    expect(uuidValidate(uuid.id)).toBe(true);
  });

  test('should accept a valid uuid', () => {
    const uuid = new Uuid('96147920-be7b-4c92-867b-8ed72f817852');
    expect(uuid.id).toBe('96147920-be7b-4c92-867b-8ed72f817852');
  });
})