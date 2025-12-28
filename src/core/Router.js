export class Router {
    constructor(routes, rootElement) {
        this.routes = routes;
        this.root = rootElement;
        window.addEventListener('hashchange', () => this.handleRoute());
        this.handleRoute(); // Initial load
    }

    handleRoute() {
        const hash = window.location.hash.slice(1) || '/';
        const route = this.routes[hash] || this.routes['*']; // Fallback to 404/Home

        if (route) {
            this.root.innerHTML = ''; // Clear current view
            const page = new route();
            page.mount(this.root);
        }
    }

    static navigate(path) {
        window.location.hash = path;
    }
}
