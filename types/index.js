import { number, string, shape } from 'prop-types';

export const error = shape({
  code: number.isRequired,
  message: string.isRequired,
});

export * from 'prop-types';
