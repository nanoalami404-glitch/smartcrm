import { Component } from '../core/Component.js';

export class Landing extends Component {
    template() {
        return `
            <div class="landing-page">
                <!-- Hero -->
                <section class="text-center py-20 px-4">
                    <div class="logo-icon mx-auto mb-6" style="width: 64px; height: 64px; font-size: 32px; font-weight: 700;">S</div>
                    <h1 class="text-5xl font-bold mb-6" style="font-size: 3.5rem; letter-spacing: -0.03em; line-height: 1.1;">
                        CRM that works <br/>
                        <span style="color: var(--primary-600);">as fast as you do.</span>
                    </h1>
                    <p class="text-xl text-muted mb-10 max-w-2xl mx-auto" style="font-size: 1.25rem;">
                        Stop wrestling with complex software. SmartCRM gives you the power of enterprise tools with the simplicity of a spreadsheet.
                    </p>
                    <div class="flex justify-center gap-4">
                        <a href="#/login" class="btn btn-primary" style="height: 48px; padding: 0 2rem; font-size: 16px;">Start Free Trial</a>
                        <a href="#/" class="btn btn-outline" style="height: 48px; padding: 0 2rem; font-size: 16px;">View Demo</a>
                    </div>
                </section>
                
                <!-- Feature Grid -->
                <section class="py-20 px-6 max-w-5xl mx-auto grid grid-cols-3 gap-8 dashboard-grid">
                    <div class="card text-center p-8">
                        <div class="text-4xl mb-4">⚡</div>
                        <h3 class="font-bold text-lg mb-2">Instant Setup</h3>
                        <p class="text-muted">No implementation consultants. Just sign up and start selling.</p>
                    </div>
                    <div class="card text-center p-8">
                        <div class="text-4xl mb-4">🧠</div>
                        <h3 class="font-bold text-lg mb-2">AI Scoring</h3>
                        <p class="text-muted">Automatically grade leads based on their activity and profile.</p>
                    </div>
                    <div class="card text-center p-8">
                        <div class="text-4xl mb-4">🤖</div>
                        <h3 class="font-bold text-lg mb-2">Automation</h3>
                        <p class="text-muted">Visual workflows to handle busywork so you can focus on closing.</p>
                    </div>
                </section>
                
                <footer class="text-center py-10 text-muted text-sm border-t border-subtle">
                    &copy; 2025 SmartCRM Inc. Elite SaaS Demo.
                </footer>
            </div>
        `;
    }
}
