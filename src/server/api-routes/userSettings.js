export default (router) => {
    router.get("/user-settings", apiAuth(), getUserSettings(objectRepository), renderUserSettings());
    router.patch("/user-settings", apiAuth(), setUserSettings(objectRepository), renderUserSettings());
}