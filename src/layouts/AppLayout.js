import { Component } from '../core/Component.js';

export class AppLayout extends Component {
    constructor() {
        super('div', ['app-layout']);
    }

    template() {
        return `
            <aside class="sidebar">
                <div class="logo-area">
                    <div class="logo-icon">S</div>
                    <span class="logo-text">SmartCRM</span>
                </div>
                <nav class="main-nav">
                    <a href="#/" class="nav-item active"><span class="icon">🏠</span> Dashboard</a>
                    <a href="#/contacts" class="nav-item"><span class="icon">👥</span> Contacts</a>
                    <a href="#/pipeline" class="nav-item"><span class="icon">💼</span> Pipeline</a>
                    <a href="#/automation" class="nav-item"><span class="icon">⚡</span> Automation</a>
                    <a href="#/settings" class="nav-item"><span class="icon">⚙️</span> Settings</a>
                </nav>
                <div class="user-profile">
                    <div class="avatar">JD</div>
                    <div class="info">
                        <div class="name">John Doe</div>
                        <div class="role">Admin</div>
                    </div>
                </div>
            </aside>
            <main class="main-content">
                <header class="topbar">
                    <div class="search-trigger">
                        <span class="icon">🔍</span>
                        <span class="placeholder">Search or type command...</span>
                        <span class="shortcut">⌘K</span>
                    </div>
                    <div class="actions">
                        <button class="btn-icon">🔔</button>
                        <button class="btn-icon">Help</button>
                    </div>
                </header>
                <div id="page-container" class="page-view"></div>
            </main>
        `;
    }

    getPageContainer() {
        return this.element.querySelector('#page-container');
    }
}
