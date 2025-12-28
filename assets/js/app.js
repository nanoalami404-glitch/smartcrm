// App Logic
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Theme
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        document.documentElement.setAttribute('data-theme', storedTheme);
    }

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024) {
                if (!sidebar.contains(e.target) && !menuToggle.contains(e.target) && sidebar.classList.contains('open')) {
                    sidebar.classList.remove('open');
                }
            }
        });
    }

    // Initialize Dashboard Data
    if (window.location.pathname.includes('dashboard.html')) {
        loadDashboardData();
    }

    // Initialize Contacts Data
    if (window.location.pathname.includes('contacts.html')) {
        loadContactsData();
        setupContactModal();
    }

    // Initialize Pipeline
    if (window.location.pathname.includes('pipeline.html')) {
        loadPipelineData();
        setupPipelineDragDrop();
    }
});

function loadDashboardData() {
    const contacts = window.store.contacts;
    const deals = window.store.deals;
    const activities = window.store.activities;

    // Update KPIs
    updateElement('kpiContacts', contacts.length);
    updateElement('kpiDeals', deals.length);

    const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);
    updateElement('kpiValue', formatCurrency(totalValue));

    // Update Activity Feed
    const activityList = document.getElementById('activityList');
    if (activityList) {
        activityList.innerHTML = activities.slice(0, 5).map(activity => `
            <li class="activity-item">
                <div class="activity-icon">${getActivityIcon(activity.type)}</div>
                <div>
                    <div class="text-sm font-bold text-main">${activity.text}</div>
                    <div class="text-sm text-muted">${formatDate(activity.date)}</div>
                </div>
            </li>
        `).join('');
    }
}

// --- Contacts Logic ---
function loadContactsData() {
    const contacts = window.store.contacts;
    const tbody = document.getElementById('contactsList');
    if (tbody) {
        tbody.innerHTML = contacts.map(contact => `
            <tr>
                <td><span class="font-bold">${contact.name}</span></td>
                <td class="text-muted">${contact.email}</td>
                <td>${contact.company || '-'}</td>
                <td><span class="status-badge status-${contact.status.toLowerCase()}">${contact.status}</span></td>
                <td>
                    <button class="btn btn-outline text-sm" style="padding: 0.25rem 0.5rem;">View</button>
                </td>
            </tr>
        `).join('');
    }
}

function setupContactModal() {
    const modal = document.getElementById('addContactModal');
    const openBtn = document.getElementById('addContactBtn');
    const closeBtn = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelModal');
    const form = document.getElementById('addContactForm');

    if (!modal) return;

    function openForModal() { modal.classList.add('open'); }
    function closeForModal() { modal.classList.remove('open'); }

    if (openBtn) openBtn.addEventListener('click', openForModal);
    if (closeBtn) closeBtn.addEventListener('click', closeForModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeForModal);

    // Close on click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeForModal();
    });

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const newContact = {
                name: document.getElementById('cName').value,
                email: document.getElementById('cEmail').value,
                company: document.getElementById('cCompany').value,
                status: document.getElementById('cStatus').value
            };
            window.store.addContact(newContact);
            loadContactsData();
            form.reset();
            closeForModal();
        });
    }
}

// --- Pipeline Logic ---
function loadPipelineData() {
    const deals = window.store.deals;
    const columns = {
        'new': document.getElementById('col-new'),
        'negotiation': document.getElementById('col-negotiation'),
        'won': document.getElementById('col-won')
    };

    // Clear columns
    Object.values(columns).forEach(col => {
        if (col) col.innerHTML = '';
    });

    deals.forEach(deal => {
        const col = columns[deal.stage];
        if (col) {
            const card = createDealCard(deal);
            col.appendChild(card);
        }
    });
}

function createDealCard(deal) {
    const div = document.createElement('div');
    div.className = 'deal-card';
    div.draggable = true;
    div.dataset.id = deal.id;
    div.innerHTML = `
        <div class="deal-title">${deal.title}</div>
        <div class="deal-value">${formatCurrency(deal.value)}</div>
    `;

    div.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', deal.id);
        div.classList.add('dragging');
    });

    div.addEventListener('dragend', () => {
        div.classList.remove('dragging');
    });

    return div;
}

function setupPipelineDragDrop() {
    const columns = document.querySelectorAll('.kanban-column-body');

    columns.forEach(col => {
        col.addEventListener('dragover', (e) => {
            e.preventDefault();
            col.classList.add('drag-over');
        });

        col.addEventListener('dragleave', () => {
            col.classList.remove('drag-over');
        });

        col.addEventListener('drop', (e) => {
            e.preventDefault();
            col.classList.remove('drag-over');
            const dealId = e.dataTransfer.getData('text/plain');
            const newStage = col.dataset.stage;

            // Update store
            const deals = window.store.deals;
            const deal = deals.find(d => d.id == dealId);
            if (deal && deal.stage !== newStage) {
                deal.stage = newStage;
                window.store.save(window.store.getData()); // Persist changes
                loadPipelineData(); // Re-render
            }
        });
    });
}

// --- Helpers ---

function updateElement(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

function formatCurrency(num) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
}

function formatDate(dateStr) {
    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
}

function getActivityIcon(type) {
    switch (type) {
        case 'call': return '📞';
        case 'email': return '✉️';
        case 'meeting': return '📅';
        default: return '📝';
    }
}
