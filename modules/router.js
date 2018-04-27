export class Router {
    constructor() {
        this.routes = [];
        this.current = null;
    }

    register(path, view){
        this.routes[path] = view;
        view.toggle(false);
    }

    go(path) {
        if (this.current) {
            this.current.toggle(false);
        }

        this.routes[path].toggle(true);
        this.current = this.routes[path];
    }

    start() {
        this.go(location.hash.replace(/^#/,''));

        window/addEventListener('hashchange', event => {
            this.go(location.hash.replace(/^#/,''));
        });
    }
}