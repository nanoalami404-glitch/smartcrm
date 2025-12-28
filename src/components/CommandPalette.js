import { Component } from '../core/Component.js';

export class CommandPalette extends Component {
    constructor() {
        super('div', ['command-palette-overlay']);
        this.visible = false;

        // Inject styles directly for keeping it self-contained
        const style = document.createElement('style');
        style.textContent = `
            .command-palette-overlay {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.2); backdrop-filter: blur(2px);
                z-index: 1000; display: none; align-items: flex-start; justify-content: center;
                padding-top: 100px;
            }
            .command-palette-overlay.open { display: flex; }
            .palette-modal {
                background: var(--bg-surface); width: 600px; max-width: 90%;
                border-radius: var(--radius-lg); box-shadow: var(--shadow-xl);
                overflow: hidden; border: 1px solid var(--border-subtle);
            }
            .palette-input {
                width: 100%; padding: 1rem; border: none; font-size: 1.1rem;
                border-bottom: 1px solid var(--border-subtle); outline: none;
                background: transparent; color: var(--text-main);
            }
            .palette-results { max-height: 300px; overflow-y: auto; padding: 0.5rem; }
            .result-item {
                padding: 0.75rem 1rem; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; border-radius: var(--radius-md); color: var(--text-main);
            }
            .result-item:hover, .result-item.selected { background: var(--primary-50); color: var(--primary-700); }
            .result-shortcut { font-size: 0.75rem; background: var(--bg-body); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--border-subtle); }
        `;
        document.head.appendChild(style);
    }

    template() {
        return `
            <div class="palette-modal">
                <input type="text" class="palette-input" placeholder="Type a command or search..." autofocus>
                <div class="palette-results">
                    <div class="result-item selected">
                        <span>Go to Dashboard</span>
                        <span class="result-shortcut">G D</span>
                    </div>
                     <div class="result-item">
                        <span>Create New Deal</span>
                        <span class="result-shortcut">C D</span>
                    </div>
                     <div class="result-item">
                        <span>Search Contacts...</span>
                        <span class="result-shortcut">S</span>
                    </div>
                </div>
            </div>
        `;
    }

    toggle() {
        this.visible = !this.visible;
        this.element.classList.toggle('open', this.visible);
        if (this.visible) this.$('input').focus();
    }
}

// Global Singleton for easy access
export const commandPalette = new CommandPalette();
document.body.appendChild(commandPalette.element); // Mount to body directly

// Shortcut Listener
document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        commandPalette.toggle();
    }
    if (e.key === 'Escape' && commandPalette.visible) {
        commandPalette.toggle();
    }
});
