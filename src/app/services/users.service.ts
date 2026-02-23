import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { tap } from 'rxjs';
import { UserApiService, userModel } from './users-api.service';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private users: WritableSignal<{
    selected: userModel | undefined;
    list: userModel[];
  }> = signal({
    selected: undefined,
    list: [],
  });
  usersList = computed(() => {
    return this.users().list;
  });
  selectedUser = computed(() => {
    return this.users().selected;
  });
  private userApiService = inject(UserApiService);

  getAllUsers() {
    return this.userApiService.getAllUsers().pipe(
      tap((result) => {
        if (!!result && result.length) {
          this.users.update(({ selected }) => {
            return {
              list: [...result],
              selected,
            };
          });
        }
      }),
    );
  }

  findUserById(id: number) {
    return this.userApiService.findUserById(id).pipe(
      tap((result) => {
        if (!!result) {
          this.users.update(({ list }) => ({ list, selected: result }));
        }
      }),
    );
  }

  createNewUser(user: userModel) {
    return this.userApiService.createNewUser(user).pipe(
      tap((result) => {
        this.users.update((oldState) => ({
          ...oldState,
          list: [...oldState.list, result],
        }));
      }),
    );
  }

  deleteUserById(id: number) {
    return this.userApiService.deleteUserById(id).pipe(
      tap(() => {
        this.users.update((oldState) => ({
          selected: id === oldState.selected?.id ? undefined : oldState.selected,
          list: [...oldState.list.filter((e) => e.id !== id)],
        }));
      }),
    );
  }
}
