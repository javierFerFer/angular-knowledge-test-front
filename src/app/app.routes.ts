import { Routes } from '@angular/router';
import { UserIdResolver } from './resolvers/user-id.resolver';
import { UsersResolver } from './resolvers/users.resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    resolve: [UsersResolver],
    loadComponent: () => import('./pages/users/users.component').then((m) => m.UsersComponent),
    children: [
      {
        path: 'create',
        data: {
          componentToRenderPromise: () =>
            import('./pages/users/subpages/user-create/user-create.component').then(
              (m) => m.UserCreateComponent,
            ),
        },
        loadComponent: () =>
          import('./components/modals/modal-wrapper/modal-wrapper.component').then(
            (m) => m.ModalWrapperComponent,
          ),
      },
      {
        path: 'details/:id',
        resolve: [UserIdResolver],
        data: {
          componentToRenderPromise: () =>
            import('./pages/users/subpages/details/user-details.component').then(
              (m) => m.UserDetailsComponent,
            ),
        },
        loadComponent: () =>
          import('./components/modals/modal-wrapper/modal-wrapper.component').then(
            (m) => m.ModalWrapperComponent,
          ),
      },
      {
        path: 'edit/:id',
        resolve: [UserIdResolver],
        data: {
          componentToRenderPromise: () =>
            import('./pages/users/subpages/user-edit/user-edit.component').then(
              (m) => m.UserEditComponent,
            ),
        },
        loadComponent: () =>
          import('./components/modals/modal-wrapper/modal-wrapper.component').then(
            (m) => m.ModalWrapperComponent,
          ),
      },
    ],
  },
];
