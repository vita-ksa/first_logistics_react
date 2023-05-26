const tokenSelector = (state: any) => state.auth?.entities?.tokens?.token
const refreshTokenSelector = (state: any) => state.auth?.entities?.tokens?.refresh?.token
const tempTokenSelector = (state: any) => state.auth?.tempToken?.token

export {tokenSelector, tempTokenSelector, refreshTokenSelector}
