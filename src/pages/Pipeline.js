import { Component } from '../core/Component.js';
import { appStore } from '../store/appStore.js';

export class Pipeline extends Component {
    constructor() {
        super();
        this.deals = appStore.getState().deals;

        // Mock data if empty
        if (this.deals.length === 0) {
            this.deals = [
                { id: 1, title: 'Global License', value: 50000, stage: 'new', probability: 20 },
                { id: 2, title: 'Q4 Marketing', value: 12000, stage: 'negotiation', probability: 60 },
                { id: 3, title: 'Consulting Retainer', value: 8500, stage: 'won', probability: 100 }
            ];
            appStore.setState({ deals: this.deals });
        }
    }

    template() {
        return `
            <div class="page-header flex justify-between items-center">
                <div>
                    <h1 class="page-title">Pipeline</h1>
                    <p class="text-muted">Drag and drop details to update stages.</p>
                </div>
                <button class="btn btn-primary">+ Add Deal</button>
            </div>
            
            <div class="kanban-board flex gap-4" style="overflow-x: auto; padding-bottom: 1rem;">
                ${this.renderColumn('New', 'new')}
                ${this.renderColumn('Negotiation', 'negotiation')}
                ${this.renderColumn('Proposal', 'proposal')}
                ${this.renderColumn('Won', 'won')}
            </div>
        `;
    }

    renderColumn(title, stageId) {
        const columnDeals = this.deals.filter(d => d.stage === stageId);
        const totalValue = columnDeals.reduce((sum, d) => sum + d.value, 0);

        return `
            <div class="kanban-col" data-stage="${stageId}" style="min-width: 280px; width: 300px; background: var(--bg-surface); padding: 1rem; border-radius: var(--radius-lg); border: 1px solid var(--border-subtle); display: flex; flex-direction: column;">
                <div class="col-header flex justify-between items-center mb-4">
                    <span class="font-bold text-sm text-secondary uppercase tracking-wide">${title}</span>
                    <span class="text-xs text-muted font-mono">$${totalValue.toLocaleString()}</span>
                </div>
                <div class="col-body flex-col gap-2 flex-1 min-h-[200px]" style="background: var(--slate-50); padding: 0.5rem; border-radius: var(--radius-md);">
                    ${columnDeals.map(deal => this.renderCard(deal)).join('')}
                </div>
            </div>
        `;
    }

    renderCard(deal) {
        return `
            <div class="deal-card card" draggable="true" data-id="${deal.id}" style="padding: 0.75rem; cursor: move;">
                <div class="font-bold text-sm mb-1">${deal.title}</div>
                <div class="flex justify-between items-center">
                    <span class="text-xs text-muted">$${deal.value.toLocaleString()}</span>
                    <span class="text-xs text-muted bg-primary-50 text-primary-700 px-1 rounded">${deal.probability}%</span>
                </div>
            </div>
        `;
    }

    bindEvents() {
        // Drag and Drop Logic
        const cards = this.element.querySelectorAll('.deal-card');
        const columns = this.element.querySelectorAll('.col-body');

        cards.forEach(card => {
            card.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', card.dataset.id);
                card.style.opacity = '0.5';
            });
            card.addEventListener('dragend', () => {
                card.style.opacity = '1';
            });
        });

        columns.forEach(col => {
            col.addEventListener('dragover', (e) => {
                e.preventDefault();
                col.style.background = 'var(--primary-50)';
            });
            col.addEventListener('dragleave', () => {
                col.style.background = 'var(--slate-50)';
            });
            col.addEventListener('drop', (e) => {
                e.preventDefault();
                col.style.background = 'var(--slate-50)';
                const dealId = e.dataTransfer.getData('text/plain');
                const newStage = col.parentElement.dataset.stage;
                this.updateDealStage(dealId, newStage);
            });
        });
    }

    updateDealStage(dealId, newStage) {
        const deal = this.deals.find(d => d.id == dealId);
        if (deal && deal.stage !== newStage) {
            deal.stage = newStage;
            if (newStage === 'won') deal.probability = 100;
            appStore.setState({ deals: this.deals });
            this.render(); // Re-render to show updated columns
        }
    }
}
