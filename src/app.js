import { Router } from './core/Router.js';
import { AppLayout } from './layouts/AppLayout.js';
import { AuthLayout } from './layouts/AuthLayout.js';
import { Home } from './pages/Home.js';
import { Contacts } from './pages/Contacts.js';
import { Pipeline } from './pages/Pipeline.js';
import { Automation } from './pages/Automation.js';
import { Analytics } from './pages/Analytics.js';
import { Login } from './pages/Login.js';
import { Landing } from './pages/Landing.js';
import './components/CommandPalette.js'; // Initialize global shortcut

class App {
    static init() {
        const root = document.getElementById('app');

        // Layout Instances
        const appLayout = new AppLayout();
        const authLayout = new AuthLayout();

        // Router Configuration
        const routes = {
            '/': Home,
            '/contacts': Contacts,
            '/pipeline': Pipeline,
            '/automation': Automation,
            '/analytics': Analytics,
            '/login': Login,
            '/landing': Landing
        };

        // Layout Switcher
        // In a real framework, this would be handled by middleware or router meta
        const renderLayout = (path) => {
            root.innerHTML = '';

            if (path === '/login' || path === '/landing') {
                authLayout.mount(root);
                return authLayout.getPageContainer();
            } else {
                appLayout.mount(root);
                return appLayout.getPageContainer();
            }
        };

        // Initialize Router Handling
        const handleRoute = () => {
            const hash = window.location.hash.slice(1) || '/';

            // Simple Auth Guard Mock
            const isAuthenticated = localStorage.getItem('authToken');
            if (!isAuthenticated && hash !== '/login' && hash !== '/landing') {
                // Redirect to Landing if not logged in and trying to access app
                // For demo purposes, we allow access but normally we'd redirect:
                // window.location.hash = '/landing';
                // return;
            }

            const container = renderLayout(hash);
            const PageClass = routes[hash] || routes['/'];

            if (container && PageClass) {
                container.innerHTML = '';
                const page = new PageClass();
                page.mount(container);
            }
        };

        window.addEventListener('hashchange', handleRoute);
        handleRoute(); // Initial Load
    } catch(err) {
        console.error('CRITICAL APP ERROR:', err);
        document.body.innerHTML = `<div style="color:red; padding:2rem; font-size: 20px;">CRITICAL ERROR: ${err.message}<br/><small>${err.stack}</small></div>`;
    }
}


// Start App
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', App.init);
} else {
    App.init();
}
