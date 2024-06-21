
/**
 * An array of routse that are accessible to be public
 * these routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
]


/**
 * An array of routse that are accessible to be public
 * these routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
    "/sign-in",
    "/error",
]


export const adminRoutes = [
    "/setting-asset",
]


/**
 * The prefix for API auth routes
 * Routes that start with prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"

/**
 * The default redirect path after loging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/"