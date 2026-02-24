import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { finalize, tap } from 'rxjs';
import { AppStateService } from './app-state.service';
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

  private appStateService = inject(AppStateService);

  usersList = computed(() => {
    return this.users().list;
  });
  selectedUser = computed(() => {
    return this.users().selected;
  });
  private userApiService = inject(UserApiService);

  getAllUsers() {
    this.appStateService.updateState(true);
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
      finalize(() => {
        this.appStateService.updateState(false);
      }),
    );
  }

  findUserById(id: number) {
    this.appStateService.updateState(true);
    return this.userApiService.findUserById(id).pipe(
      tap((result) => {
        if (!!result) {
          this.users.update(({ list }) => ({ list, selected: result }));
        }
      }),
      finalize(() => {
        this.appStateService.updateState(false);
      }),
    );
  }

  createNewUser(user: userModel) {
    this.appStateService.updateState(true);
    return this.userApiService.createNewUser(user).pipe(
      tap((result) => {
        this.users.update((oldState) => ({
          ...oldState,
          list: [...oldState.list, result],
        }));
      }),
      finalize(() => {
        this.appStateService.updateState(false);
      }),
    );
  }

  updateUser(userId: number, user: userModel) {
    this.appStateService.updateState(true);
    return this.userApiService.updateUser(userId, user).pipe(
      tap(() => {
        this.users.update((oldState) => ({
          selected: {
            id: userId,
            ...user,
          },
          list: [
            ...oldState.list.map((e) => {
              return e.id !== userId
                ? e
                : {
                    id: userId,
                    ...user,
                  };
            }),
          ],
        }));
      }),
      finalize(() => {
        this.appStateService.updateState(false);
      }),
    );
  }

  deleteUserById(id: number) {
    this.appStateService.updateState(true);
    return this.userApiService.deleteUserById(id).pipe(
      tap(() => {
        this.users.update((oldState) => ({
          selected: id === oldState.selected?.id ? undefined : oldState.selected,
          list: [...oldState.list.filter((e) => e.id !== id)],
        }));
      }),
      finalize(() => {
        this.appStateService.updateState(false);
      }),
    );
  }
}
