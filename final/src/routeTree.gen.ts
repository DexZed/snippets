/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const SignInLazyImport = createFileRoute('/signIn')()
const ProductsLazyImport = createFileRoute('/products')()
const ErrorLazyImport = createFileRoute('/error')()
const DashboardLazyImport = createFileRoute('/dashboard')()
const RegisterLazyImport = createFileRoute('/Register')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const SignInLazyRoute = SignInLazyImport.update({
  id: '/signIn',
  path: '/signIn',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/signIn.lazy').then((d) => d.Route))

const ProductsLazyRoute = ProductsLazyImport.update({
  id: '/products',
  path: '/products',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/products.lazy').then((d) => d.Route))

const ErrorLazyRoute = ErrorLazyImport.update({
  id: '/error',
  path: '/error',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/error.lazy').then((d) => d.Route))

const DashboardLazyRoute = DashboardLazyImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/dashboard.lazy').then((d) => d.Route))

const RegisterLazyRoute = RegisterLazyImport.update({
  id: '/Register',
  path: '/Register',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/Register.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/Register': {
      id: '/Register'
      path: '/Register'
      fullPath: '/Register'
      preLoaderRoute: typeof RegisterLazyImport
      parentRoute: typeof rootRoute
    }
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardLazyImport
      parentRoute: typeof rootRoute
    }
    '/error': {
      id: '/error'
      path: '/error'
      fullPath: '/error'
      preLoaderRoute: typeof ErrorLazyImport
      parentRoute: typeof rootRoute
    }
    '/products': {
      id: '/products'
      path: '/products'
      fullPath: '/products'
      preLoaderRoute: typeof ProductsLazyImport
      parentRoute: typeof rootRoute
    }
    '/signIn': {
      id: '/signIn'
      path: '/signIn'
      fullPath: '/signIn'
      preLoaderRoute: typeof SignInLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/Register': typeof RegisterLazyRoute
  '/dashboard': typeof DashboardLazyRoute
  '/error': typeof ErrorLazyRoute
  '/products': typeof ProductsLazyRoute
  '/signIn': typeof SignInLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/Register': typeof RegisterLazyRoute
  '/dashboard': typeof DashboardLazyRoute
  '/error': typeof ErrorLazyRoute
  '/products': typeof ProductsLazyRoute
  '/signIn': typeof SignInLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/Register': typeof RegisterLazyRoute
  '/dashboard': typeof DashboardLazyRoute
  '/error': typeof ErrorLazyRoute
  '/products': typeof ProductsLazyRoute
  '/signIn': typeof SignInLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/Register'
    | '/dashboard'
    | '/error'
    | '/products'
    | '/signIn'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/Register' | '/dashboard' | '/error' | '/products' | '/signIn'
  id:
    | '__root__'
    | '/'
    | '/Register'
    | '/dashboard'
    | '/error'
    | '/products'
    | '/signIn'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  RegisterLazyRoute: typeof RegisterLazyRoute
  DashboardLazyRoute: typeof DashboardLazyRoute
  ErrorLazyRoute: typeof ErrorLazyRoute
  ProductsLazyRoute: typeof ProductsLazyRoute
  SignInLazyRoute: typeof SignInLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  RegisterLazyRoute: RegisterLazyRoute,
  DashboardLazyRoute: DashboardLazyRoute,
  ErrorLazyRoute: ErrorLazyRoute,
  ProductsLazyRoute: ProductsLazyRoute,
  SignInLazyRoute: SignInLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/Register",
        "/dashboard",
        "/error",
        "/products",
        "/signIn"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/Register": {
      "filePath": "Register.lazy.tsx"
    },
    "/dashboard": {
      "filePath": "dashboard.lazy.tsx"
    },
    "/error": {
      "filePath": "error.lazy.tsx"
    },
    "/products": {
      "filePath": "products.lazy.tsx"
    },
    "/signIn": {
      "filePath": "signIn.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
