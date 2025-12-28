import { Component } from '../core/Component.js';

export class Analytics extends Component {
    template() {
        return `
            <div class="page-header">
                <h1 class="page-title">Analytics & Insights</h1>
                <p class="text-muted">Track your performance and growth metrics.</p>
            </div>

            <div class="dashboard-grid mb-8">
                <!-- Funnel Chart Mock -->
                <div class="card">
                    <h3 class="font-bold mb-4">Sales Funnel</h3>
                    <div class="flex-col gap-2">
                        <div class="flex justify-between items-center text-sm">
                            <span>Leads</span>
                            <span class="font-mono">1,240</span>
                        </div>
                        <div style="width: 100%; height: 8px; background: var(--primary-100); border-radius: 4px; overflow: hidden;">
                            <div style="width: 100%; height: 100%; background: var(--primary-500);"></div>
                        </div>

                        <div class="flex justify-between items-center text-sm mt-2">
                            <span>Qualified</span>
                            <span class="font-mono">850</span>
                        </div>
                        <div style="width: 100%; height: 8px; background: var(--primary-100); border-radius: 4px; overflow: hidden;">
                            <div style="width: 68%; height: 100%; background: var(--primary-500);"></div>
                        </div>

                        <div class="flex justify-between items-center text-sm mt-2">
                            <span>Proposals</span>
                            <span class="font-mono">320</span>
                        </div>
                        <div style="width: 100%; height: 8px; background: var(--primary-100); border-radius: 4px; overflow: hidden;">
                            <div style="width: 25%; height: 100%; background: var(--primary-500);"></div>
                        </div>

                        <div class="flex justify-between items-center text-sm mt-2">
                            <span>Won</span>
                            <span class="font-mono">145</span>
                        </div>
                        <div style="width: 100%; height: 8px; background: var(--primary-100); border-radius: 4px; overflow: hidden;">
                            <div style="width: 11%; height: 100%; background: var(--success);"></div>
                        </div>
                    </div>
                </div>

                <!-- Heatmap Mock -->
                <div class="card">
                    <h3 class="font-bold mb-4">Activity Heatmap</h3>
                    <div class="flex gap-1 justify-center" style="height: 140px; align-items: flex-end;">
                         ${this.generateHeatmapCols()}
                    </div>
                    <div class="text-center text-xs text-muted mt-2">Last 30 Days</div>
                </div>
            </div>
        `;
    }

    generateHeatmapCols() {
        // Generate random bars
        let html = '';
        for (let i = 0; i < 20; i++) {
            const height = Math.floor(Math.random() * 80) + 20;
            const opacity = height / 100;
            html += `<div style="width: 8px; height: ${height}%; background: rgba(99, 102, 241, ${opacity}); border-radius: 2px;"></div>`;
        }
        return html;
    }
}
