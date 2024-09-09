import { Container } from 'inversify';
import { AuthService } from './index.js';
import { Component } from '../../types/index.js';

export function createAuthContainer() {
  const authContainer = new Container();
  authContainer.bind<AuthService>(Component.AuthService).to(AuthService).inSingletonScope();

  return authContainer;
}