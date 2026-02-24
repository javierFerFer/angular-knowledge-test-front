import { Routes } from '@angular/router';
import { UserDetailsComponent } from './pages/users/subpages/details/user-details.component';
import { UserCreateComponent } from './pages/users/subpages/user-create/user-create.component';
import { UserEditComponent } from './pages/users/subpages/user-edit/user-edit.component';
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
          componentToRender: UserCreateComponent,
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
          componentToRender: UserDetailsComponent,
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
          componentToRender: UserEditComponent,
        },
        loadComponent: () =>
          import('./components/modals/modal-wrapper/modal-wrapper.component').then(
            (m) => m.ModalWrapperComponent,
          ),
      },
    ],
  },
];
