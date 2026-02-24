import { computed, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppStateService {
  private appState = signal({
    loading: false,
  });

  loadingState = computed(() => {
    return this.appState().loading;
  });

  updateState(state: boolean) {
    this.appState.update((s) => ({ loading: state }));
  }
}
