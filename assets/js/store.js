/**
 * Simple Store for persisting data to localStorage
 */
class Store {
    constructor() {
        this.dbName = 'smart_crm_db';
        this.init();
    }

    init() {
        if (!localStorage.getItem(this.dbName)) {
            const seedData = {
                contacts: [
                    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', company: 'TechCorp', status: 'Lead' },
                    { id: 2, name: 'Bob Smith', email: 'bob@designstudio.com', company: 'Design Studio', status: 'Customer' },
                    { id: 3, name: 'Charlie Davis', email: 'charlie@startup.io', company: 'Startup IO', status: 'Prospect' }
                ],
                deals: [
                    { id: 1, title: 'Website Redesign', value: 5000, stage: 'negotiation', contactId: 2 },
                    { id: 2, title: 'SEO Audit', value: 1200, stage: 'new', contactId: 3 }
                ],
                activities: [
                    { id: 1, text: 'Call with Alice', date: '2023-10-25', type: 'call' },
                    { id: 2, text: 'Email Bob proposal', date: '2023-10-26', type: 'email' }
                ],
                settings: {
                    theme: 'light'
                }
            };
            this.save(seedData);
        }
    }

    getData() {
        return JSON.parse(localStorage.getItem(this.dbName));
    }

    save(data) {
        localStorage.setItem(this.dbName, JSON.stringify(data));
    }

    get contacts() { return this.getData().contacts; }
    get deals() { return this.getData().deals; }
    get activities() { return this.getData().activities; }

    addContact(contact) {
        const data = this.getData();
        contact.id = Date.now();
        data.contacts.push(contact);
        this.save(data);
    }
}

const store = new Store();
window.store = store; // Expose to window for easy access
