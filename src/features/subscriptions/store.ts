export interface Subscription {
  id: string;
  name: string;
  amountCents: number;
  currency: string;
  billingCycle: "weekly" | "monthly" | "yearly";
  renewalDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type NewSubscription = Omit<
  Subscription,
  "isActive" | "createdAt" | "updatedAt"
> & {
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type SubscriptionUpdate = Partial<
  Omit<Subscription, "id" | "createdAt" | "updatedAt">
> & {
  updatedAt?: string;
};

export interface SubscriptionStorage {
  load(): Subscription[];
  save(subscriptions: Subscription[]): void;
}

export interface SubscriptionStoreState {
  subscriptions: Subscription[];
  hydrated: boolean;
}

type SubscriptionAction =
  | { type: "hydrate"; payload: Subscription[] }
  | { type: "create"; payload: Subscription }
  | { type: "update"; id: string; changes: SubscriptionUpdate; timestamp: string }
  | { type: "delete"; id: string }
  | { type: "deactivate"; id: string; timestamp: string }
  | { type: "reactivate"; id: string; timestamp: string };

type StoreListener = () => void;

const STORAGE_KEY = "subscriptions";

const EMPTY_STATE: SubscriptionStoreState = {
  subscriptions: [],
  hydrated: false,
};

function isSubscription(value: unknown): value is Subscription {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<Subscription>;

  return (
    typeof candidate.id === "string" &&
    typeof candidate.name === "string" &&
    typeof candidate.amountCents === "number" &&
    typeof candidate.currency === "string" &&
    (candidate.billingCycle === "weekly" ||
      candidate.billingCycle === "monthly" ||
      candidate.billingCycle === "yearly") &&
    typeof candidate.renewalDate === "string" &&
    typeof candidate.isActive === "boolean" &&
    typeof candidate.createdAt === "string" &&
    typeof candidate.updatedAt === "string"
  );
}

function normalizeSubscriptions(input: unknown): Subscription[] {
  if (!Array.isArray(input)) {
    return [];
  }

  return input.filter(isSubscription);
}

function upsertSubscription(
  subscriptions: Subscription[],
  id: string,
  updater: (current: Subscription) => Subscription
): Subscription[] {
  let found = false;
  const updated = subscriptions.map((current) => {
    if (current.id !== id) {
      return current;
    }

    found = true;
    return updater(current);
  });

  if (!found) {
    throw new Error(`Subscription with id "${id}" does not exist`);
  }

  return updated;
}

function subscriptionReducer(
  state: SubscriptionStoreState,
  action: SubscriptionAction
): SubscriptionStoreState {
  switch (action.type) {
    case "hydrate":
      return {
        subscriptions: normalizeSubscriptions(action.payload),
        hydrated: true,
      };
    case "create":
      if (state.subscriptions.some((subscription) => subscription.id === action.payload.id)) {
        throw new Error(`Subscription with id "${action.payload.id}" already exists`);
      }

      return {
        ...state,
        subscriptions: [...state.subscriptions, action.payload],
      };
    case "update":
      return {
        ...state,
        subscriptions: upsertSubscription(state.subscriptions, action.id, (subscription) => ({
          ...subscription,
          ...action.changes,
          id: subscription.id,
          createdAt: subscription.createdAt,
          updatedAt: action.timestamp,
        })),
      };
    case "delete":
      if (!state.subscriptions.some((subscription) => subscription.id === action.id)) {
        throw new Error(`Subscription with id "${action.id}" does not exist`);
      }

      return {
        ...state,
        subscriptions: state.subscriptions.filter(
          (subscription) => subscription.id !== action.id
        ),
      };
    case "deactivate":
      return {
        ...state,
        subscriptions: upsertSubscription(state.subscriptions, action.id, (subscription) => ({
          ...subscription,
          isActive: false,
          updatedAt: action.timestamp,
        })),
      };
    case "reactivate":
      return {
        ...state,
        subscriptions: upsertSubscription(state.subscriptions, action.id, (subscription) => ({
          ...subscription,
          isActive: true,
          updatedAt: action.timestamp,
        })),
      };
    default:
      return state;
  }
}

export function createLocalSubscriptionStorage(
  key: string = STORAGE_KEY
): SubscriptionStorage {
  return {
    load() {
      if (typeof window === "undefined") {
        return [];
      }

      const raw = window.localStorage.getItem(key);

      if (!raw) {
        return [];
      }

      try {
        return normalizeSubscriptions(JSON.parse(raw));
      } catch {
        return [];
      }
    },
    save(subscriptions) {
      if (typeof window === "undefined") {
        return;
      }

      window.localStorage.setItem(key, JSON.stringify(subscriptions));
    },
  };
}

export interface SubscriptionStore {
  getState(): SubscriptionStoreState;
  subscribe(listener: StoreListener): () => void;
  hydrate(): void;
  createSubscription(input: NewSubscription): Subscription;
  updateSubscription(id: string, changes: SubscriptionUpdate): void;
  deleteSubscription(id: string): void;
  deactivateSubscription(id: string): void;
  reactivateSubscription(id: string): void;
  getActiveSubscriptions(): Subscription[];
  getInactiveSubscriptions(): Subscription[];
}

export interface SubscriptionStoreOptions {
  storage?: SubscriptionStorage;
  now?: () => string;
}

export function selectActiveSubscriptions(state: SubscriptionStoreState): Subscription[] {
  return state.subscriptions.filter((subscription) => subscription.isActive);
}

export function selectInactiveSubscriptions(state: SubscriptionStoreState): Subscription[] {
  return state.subscriptions.filter((subscription) => !subscription.isActive);
}

export function createSubscriptionStore(
  options: SubscriptionStoreOptions = {}
): SubscriptionStore {
  const storage = options.storage ?? createLocalSubscriptionStorage();
  const now = options.now ?? (() => new Date().toISOString());

  let state: SubscriptionStoreState = {
    subscriptions: normalizeSubscriptions(storage.load()),
    hydrated: true,
  };
  const listeners = new Set<StoreListener>();

  const notify = () => {
    listeners.forEach((listener) => listener());
  };

  const persist = () => {
    storage.save(state.subscriptions);
  };

  const dispatch = (action: SubscriptionAction) => {
    state = subscriptionReducer(state, action);

    if (action.type !== "hydrate") {
      persist();
    }

    notify();
  };

  return {
    getState() {
      return state;
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    hydrate() {
      dispatch({ type: "hydrate", payload: storage.load() });
    },
    createSubscription(input) {
      const timestamp = input.createdAt ?? now();
      const subscription: Subscription = {
        ...input,
        isActive: input.isActive ?? true,
        createdAt: timestamp,
        updatedAt: input.updatedAt ?? timestamp,
      };

      dispatch({ type: "create", payload: subscription });
      return subscription;
    },
    updateSubscription(id, changes) {
      dispatch({ type: "update", id, changes, timestamp: changes.updatedAt ?? now() });
    },
    deleteSubscription(id) {
      dispatch({ type: "delete", id });
    },
    deactivateSubscription(id) {
      dispatch({ type: "deactivate", id, timestamp: now() });
    },
    reactivateSubscription(id) {
      dispatch({ type: "reactivate", id, timestamp: now() });
    },
    getActiveSubscriptions() {
      return selectActiveSubscriptions(state);
    },
    getInactiveSubscriptions() {
      return selectInactiveSubscriptions(state);
    },
  };
}

