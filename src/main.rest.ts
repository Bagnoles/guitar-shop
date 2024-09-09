import 'reflect-metadata';
import { Container } from 'inversify';
import { RestApplication, createRestApplicationContainer } from './rest/index.js';
import { Component } from './shared/types/index.js';
import { createGuitarContainer } from './shared/modules/guitar/guitar.container.js';
import { createUserContainer } from './shared/modules/user/index.js';
import { createAuthContainer } from './shared/modules/auth/auth.container.js';

function bootstrap() {
  const container = Container.merge(
    createRestApplicationContainer(),
    createGuitarContainer(),
    createUserContainer(),
    createAuthContainer()
  );
  const application = container.get<RestApplication>(Component.RestApplication);

  application.init();
}

bootstrap();