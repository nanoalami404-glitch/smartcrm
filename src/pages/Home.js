import { Component } from '../core/Component.js';

export class Home extends Component {
    template() {
        return `
            <div class="page-header">
                <h1 class="page-title">Dashboard</h1>
                <p class="text-muted">Welcome back, here's what's happening today.</p>
            </div>
            <div class="dashboard-grid">
                <div class="card">
                    <h3>Total Revenue</h3>
                    <div class="kpi-value">$124,500</div>
                    <div class="trend up">+12% vs last month</div>
                </div>
                <div class="card">
                    <h3>Active Leads</h3>
                    <div class="kpi-value">45</div>
                    <div class="trend">12 new this week</div>
                </div>
                <div class="card">
                    <h3>Pipeline Value</h3>
                    <div class="kpi-value">$32,000</div>
                    <div class="trend down">-2% vs last month</div>
                </div>
            </div>
        `;
    }
}
