function getLocalStorage(name: any) {
    try {
        return JSON.parse(localStorage.getItem(name) || '');
    } catch (error) {
        return null;
    }
}

function saveLocalStorage(name: any,data: any) {
    localStorage.setItem(name, JSON.stringify(data));
}

function removeLocalStorage(name: any) {
    localStorage.removeItem(name);
}

export { getLocalStorage,saveLocalStorage,removeLocalStorage }