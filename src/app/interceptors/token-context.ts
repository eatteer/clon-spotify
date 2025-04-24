import { HttpContextToken } from '@angular/common/http';
import { TokenType } from './auth.interceptor';

export const TOKEN_TYPE: HttpContextToken<TokenType> =
  new HttpContextToken<TokenType>(() => TokenType.APP);
