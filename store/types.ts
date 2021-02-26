type Dispatch<A> = <T extends keyof A>(type: T, payload?: A[T]) => any;
type Commit<M> = <T extends keyof M>(type: T, payload?: M[T]) => void;

type Context<S, A, G, M, RS, RG> = {
    commit: Commit<M>;
    state: S;
    dispatch: Dispatch<A>;
    getters: G;
    rootState: RS;
    rootGetters: RG;
  };

export interface RootState {
    locales: 'ru'|'ua';
    isLogin: boolean;
    activeModalWindowName: string;
    modalWindowMeta: null;
    currentCarName: string;
};

export type Mutations<S, M> = {
    [K in keyof M]: (state: S, payload: M[K]) => void;
};

export type Actions<S, A, G = {}, M = {}, RS = {}, RG = {}> = {
    [K in keyof A]: (ctx: Context<S, A, G, M, RS, RG>, payload: A[K]) => any;
};