import { Component } from '../core/Component.js';

export class Automation extends Component {
    template() {
        return `
            <div class="page-header flex justify-between items-center">
                <div>
                    <h1 class="page-title">Automation</h1>
                    <p class="text-muted">Visualise and manage your workflows.</p>
                </div>
                <button class="btn btn-primary">+ New Workflow</button>
            </div>

            <div class="automation-canvas" style="background: var(--slate-50); height: 600px; border-radius: var(--radius-lg); border: 1px dashed var(--border-subtle); position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center;">
                <div class="flow-container flex-col items-center gap-8">
                    
                    <!-- Trigger Node -->
                    <div class="node trigger-node flex-col items-center">
                        <div class="card flex items-center gap-3" style="width: 240px; border-left: 4px solid var(--warning);">
                            <div class="icon-box" style="background: var(--warning); color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">⚡</div>
                            <div>
                                <div class="font-bold text-sm">When Deal Created</div>
                                <div class="text-muted text-xs">Trigger</div>
                            </div>
                        </div>
                        <div class="line" style="height: 32px; width: 2px; background: var(--border-subtle);"></div>
                    </div>

                    <!-- Condition Node -->
                    <div class="node condition-node flex-col items-center">
                        <div class="card flex items-center gap-3" style="width: 240px; border-left: 4px solid var(--info);">
                            <div class="icon-box" style="background: var(--info); color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">?</div>
                            <div>
                                <div class="font-bold text-sm">Value > $10,000</div>
                                <div class="text-muted text-xs">Condition</div>
                            </div>
                        </div>
                        <div class="line" style="height: 32px; width: 2px; background: var(--border-subtle);"></div>
                    </div>

                    <!-- Action Node -->
                    <div class="node action-node flex-col items-center">
                        <div class="card flex items-center gap-3" style="width: 240px; border-left: 4px solid var(--success);">
                            <div class="icon-box" style="background: var(--success); color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">✉️</div>
                            <div>
                                <div class="font-bold text-sm">Send "Big Deal" Email</div>
                                <div class="text-muted text-xs">Action</div>
                            </div>
                        </div>
                    </div>
                
                </div>
            </div>
        `;
    }
}
