import { Component } from '../core/Component.js';
import { appStore } from '../store/appStore.js';
import { ScoringService } from '../services/ScoringService.js';

export class Contacts extends Component {
    constructor() {
        super();
        this.contacts = appStore.getState().contacts;

        // Mock data if empty
        if (this.contacts.length === 0) {
            this.contacts = [
                { id: 1, name: 'Sarah Connor', email: 'sarah@skynet.com', role: 'CTO', company: 'Skynet', activityCount: 12 },
                { id: 2, name: 'John Wick', email: 'jw@continental.com', role: 'Contractor', company: 'The Continental', activityCount: 3 },
                { id: 3, name: 'Ellen Ripley', email: 'ripley@weyland.com', role: 'Warrant Officer', company: 'Weyland-Yutani', activityCount: 8 }
            ];
            appStore.setState({ contacts: this.contacts });
        }
    }

    template() {
        return `
            <div class="page-header flex justify-between items-center">
                <div>
                    <h1 class="page-title">Contacts</h1>
                    <p class="text-muted">Manage your relationships and leads.</p>
                </div>
                <button class="btn btn-primary">
                    <span>+ Add Contact</span>
                </button>
            </div>

            <div class="card" style="padding: 0; overflow: hidden;">
                <table style="width: 100%; border-collapse: collapse; text-align: left;">
                    <thead>
                        <tr style="border-bottom: 1px solid var(--border-subtle); background: var(--slate-50);">
                            <th style="padding: 1rem; font-weight: 600; color: var(--text-secondary); font-size: 13px;">Name</th>
                            <th style="padding: 1rem; font-weight: 600; color: var(--text-secondary); font-size: 13px;">Company</th>
                            <th style="padding: 1rem; font-weight: 600; color: var(--text-secondary); font-size: 13px;">Score (AI)</th>
                            <th style="padding: 1rem; font-weight: 600; color: var(--text-secondary); font-size: 13px;">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.contacts.map(contact => this.renderRow(contact)).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    renderRow(contact) {
        const score = ScoringService.calculateScore(contact);
        const grade = ScoringService.getGrade(score);

        return `
            <tr style="border-bottom: 1px solid var(--border-subtle);">
                <td style="padding: 1rem;">
                    <div class="flex items-center gap-2">
                        <div class="avatar" style="width: 28px; height: 28px; font-size: 10px;">${contact.name.charAt(0)}</div>
                        <div>
                            <div style="font-weight: 500;">${contact.name}</div>
                            <div class="text-muted" style="font-size: 12px;">${contact.email}</div>
                        </div>
                    </div>
                </td>
                <td style="padding: 1rem;">
                    <div style="font-weight: 500;">${contact.company}</div>
                    <div class="text-muted" style="font-size: 12px;">${contact.role}</div>
                </td>
                <td style="padding: 1rem;">
                    <div class="flex items-center gap-2">
                        <div style="width: 32px; height: 4px; background: var(--slate-200); border-radius: 2px; overflow: hidden;">
                            <div style="width: ${score}%; height: 100%; background: var(--${grade.color});"></div>
                        </div>
                        <span style="font-weight: 600; color: var(--${grade.color});">${score}</span>
                    </div>
                </td>
                <td style="padding: 1rem;">
                    <button class="btn-icon">⋮</button>
                </td>
            </tr>
        `;
    }
}
