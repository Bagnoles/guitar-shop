export const Component = {
    RestApplication: Symbol.for('RestApplication'),
    Logger: Symbol.for('Logger'),
    Config: Symbol.for('Config'),
    DatabaseClient: Symbol.for('DatabaseClient'),
    GuitarService: Symbol.for('GuitarService'),
    GuitarModel: Symbol.for('GuitarModel'),
    GuitarController: Symbol.for('GuitarController'),
  } as const;