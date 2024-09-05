import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { GuitarService, GuitarEntity, GuitarModel, GuitarController } from './index.js';
import { Component } from '../../types/index.js';
import { Controller } from '../../libs/rest/controller/index.js';

export function createGuitarContainer() {
  const guitarContainer = new Container();
  guitarContainer.bind<GuitarService>(Component.GuitarService).to(GuitarService).inSingletonScope();
  guitarContainer.bind<types.ModelType<GuitarEntity>>(Component.GuitarModel).toConstantValue(GuitarModel);
  guitarContainer.bind<Controller>(Component.GuitarController).to(GuitarController).inSingletonScope();

  return guitarContainer;
}