import { Component } from '../core/Component.js';

export class Login extends Component {
    template() {
        return `
            <div class="card shadow-lg" style="padding: 2.5rem;">
                <div class="text-center mb-6">
                     <div class="logo-icon mb-4 mx-auto" style="width: 48px; height: 48px; font-size: 24px;">S</div>
                     <h1 class="page-title" style="margin-bottom: 0.5rem;">Welcome back</h1>
                     <p class="text-muted">Enter your details to access.</p>
                </div>
                
                <form id="loginForm">
                    <div class="mb-4">
                        <label class="block text-sm font-bold mb-2">Email</label>
                        <input type="email" class="input" placeholder="name@company.com" required>
                    </div>
                    <div class="mb-6">
                        <label class="block text-sm font-bold mb-2">Password</label>
                        <input type="password" class="input" placeholder="••••••••" required>
                    </div>
                    <button type="submit" class="btn btn-primary w-full">Sign In</button>
                </form>

                <div class="text-center mt-4">
                    <a href="#/" class="text-sm text-primary-600 font-bold">Back to Dashboard (Demo)</a>
                </div>
            </div>
        `;
    }

    bindEvents() {
        this.$('#loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            // Mock Login
            window.location.hash = '/'; // Go to dashboard
        });
    }
}
