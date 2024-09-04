import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { GuitarService, GuitarEntity, GuitarModel } from './index.js';
import { Component } from '../../types/index.js';

export function createGuitarContainer() {
  const guitarContainer = new Container();
  guitarContainer.bind<GuitarService>(Component.GuitarService).to(GuitarService).inSingletonScope();
  guitarContainer.bind<types.ModelType<GuitarEntity>>(Component.GuitarModel).toConstantValue(GuitarModel);

  return guitarContainer;
}