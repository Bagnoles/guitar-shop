import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ValidationError } from 'class-validator';
import * as crypto from 'node:crypto';
import { ValidationErrorField } from '../libs/rest/errors/validation-error.js';

export const generateRandomValue = (min: number, max: number): number => Math.floor(min + Math.random() * (max + 1 - min));

export const getRandomItem = <T>(items: T[]): T => items[generateRandomValue(0, items.length - 1)];

export const getFullServerPath = (host: string, port: number) => `http://${host}:${port}`;

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) => plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });

export const createSHA256 = (string: string, salt: string): string => crypto.createHash('sha256')
  .update(string)
  .update(crypto.createHash('sha256').update(salt).digest('hex'))
  .digest('hex');

export const reduceValidationErrors = (errors: ValidationError[]): ValidationErrorField[] => errors.map(({property, value, constraints}) => ({
  property,
  value,
  messages: constraints ? Object.values(constraints) : []
}));