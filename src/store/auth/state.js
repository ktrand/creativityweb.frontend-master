export default {
    isAuthenticated: false,
    error: false,
    token: localStorage.getItem('creativity-user-token') || null,
    user: localStorage.getItem('creativity-user-profile') || null,
    permissions: localStorage.getItem('creativity-user-permissions') || null,
    process: false,
    permissionsLoaded: false
}
