export type SelectionId = string | null;

export type AppState = {
  selectedId: SelectionId;
};

type Listener = (state: AppState) => void;

export function createStore(initial: AppState) {
  let state = { ...initial };
  const listeners = new Set<Listener>();

  return {
    getState(): AppState {
      return state;
    },
    select(id: SelectionId): void {
      if (state.selectedId === id) return;
      state = { selectedId: id };
      for (const listener of listeners) listener(state);
    },
    clear(): void {
      this.select(null);
    },
    subscribe(listener: Listener): () => void {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

export type Store = ReturnType<typeof createStore>;
