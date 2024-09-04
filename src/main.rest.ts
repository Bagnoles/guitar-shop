import 'reflect-metadata';
import { Container } from 'inversify';
import { RestApplication, createRestApplicationContainer } from './rest/index.js';
import { Component } from './shared/types/index.js';
import { createGuitarContainer } from './shared/modules/guitar/guitar.container.js';

function bootstrap() {
  const container = Container.merge(
    createRestApplicationContainer(),
    createGuitarContainer()
  );
  const application = container.get<RestApplication>(Component.RestApplication);

  application.init();
}

bootstrap();