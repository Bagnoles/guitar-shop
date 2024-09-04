export const Component = {
    Logger: Symbol.for('Logger'),
    DatabaseClient: Symbol.for('DatabaseClient'),
    GuitarService: Symbol.for('GuitarService'),
    GuitarModel: Symbol.for('GuitarModel'),
    GuitarController: Symbol.for('GuitarController'),
  } as const;