export const AppRoutes = {
  Main: '/',
  Register: '/register',
  List: '/products',
  Product: '/products/:id',
  Add: '/add',
  Edit: '/edit/:id'
} as const;

export enum NameSpace {
  Guitar = 'GUITAR',
  User = 'USER'
}

export enum APIRoute {
  Guitars = '/guitars'
}
