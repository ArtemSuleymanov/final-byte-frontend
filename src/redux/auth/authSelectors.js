export const selectUser = (state) => state.auth.user;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const selectToken = (state) => state.auth.accesToken;

export const selectIsRefreshing = (state) => state.auth.isRefreshing;
