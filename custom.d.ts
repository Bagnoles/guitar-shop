import { TokenPayload } from './src/shared/types/token-payload.type';

declare module 'express-serve-static-core' {
  export interface Request {
    tokenPayload: TokenPayload;
  }
}