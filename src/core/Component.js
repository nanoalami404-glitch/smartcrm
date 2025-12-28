export class Component {
    constructor(tagName = 'div', classes = []) {
        this.element = document.createElement(tagName);
        if (classes.length) this.element.classList.add(...classes);
        this.state = {};
        this.props = {};
        this.children = [];
    }

    /**
     * Mount the component to a parent element
     */
    mount(parent) {
        if (typeof parent === 'string') {
            document.querySelector(parent).appendChild(this.element);
        } else {
            parent.appendChild(this.element);
        }
        this.onMount();
        return this;
    }

    /**
     * Lifecycle method called after mounting
     */
    onMount() { }

    /**
     * Update component state and re-render
     */
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.render();
    }

    /**
     * Clear and render content
     */
    render() {
        this.element.innerHTML = '';
        const content = this.template();

        if (typeof content === 'string') {
            this.element.innerHTML = content;
        } else if (content instanceof HTMLElement) {
            this.element.appendChild(content);
        } else if (Array.isArray(content)) {
            content.forEach(child => {
                if (child instanceof Component) {
                    child.mount(this.element);
                } else {
                    this.element.appendChild(child);
                }
            });
        }

        this.bindEvents();
    }

    /**
     * Return HTML string or HTMLElement(s)
     */
    template() {
        return '';
    }

    bindEvents() { }

    /**
     * Helper to find element within this component
     */
    $(selector) {
        return this.element.querySelector(selector);
    }
}
