export class Store {
    constructor(initialState = {}) {
        this.state = initialState;
        this.listeners = new Set();
    }

    /**
     * Get current state
     */
    getState() {
        return this.state;
    }

    /**
     * Update state and notify listeners
     */
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.notify();
    }

    /**
     * Subscribe to state changes
     */
    subscribe(listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener); // Unsubscribe function
    }

    /**
     * Notify all listeners
     */
    notify() {
        this.listeners.forEach(listener => listener(this.state));
    }
}

// Global Application Store Instance (Singleton)
export const appStore = new Store({
    user: null,
    theme: localStorage.getItem('theme') || 'light',
    contacts: JSON.parse(localStorage.getItem('contacts') || '[]'),
    deals: JSON.parse(localStorage.getItem('deals') || '[]'),
    activities: [],
    notifications: []
});
