import { Component } from '../core/Component.js';

export class AuthLayout extends Component {
    constructor() {
        super('div', ['auth-layout']);
    }

    template() {
        return `
            <div class="auth-wrapper flex items-center justify-center" style="min-height: 100vh; background: var(--bg-body);">
                <div id="auth-container" style="width: 100%; max-width: 400px; padding: 1rem;">
                    <!-- Auth Page Content Injected Here -->
                </div>
            </div>
        `;
    }

    getPageContainer() {
        return this.element.querySelector('#auth-container');
    }
}
