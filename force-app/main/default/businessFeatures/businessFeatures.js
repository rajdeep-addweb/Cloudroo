import { LightningElement } from 'lwc';

export default class BusinessFeatures extends LightningElement {
    features = [
        { id: 1, icon: 'utility:target', title: 'Focus', description: 'Become laser-focused on your goals and what matters most, with information about your customers all in one place.' },
        { id: 2, icon: 'utility:automate', title: 'Automate', description: 'Spend more time closing sales and serving customers and less time completing manual steps.' },
        { id: 3, icon: 'utility:preview', title: 'Visualize', description: 'Get real-time reports and dashboards to guide decision-making within your sales team and across your business.' },
        { id: 4, icon: 'utility:check', title: 'Manage', description: 'Get a handle on your sales pipeline, forecast with precision, and improve your sales process.' },
        { id: 5, icon: 'utility:touch_action', title: 'Go mobile', description: 'Run your business from anywhere in the world on any device.' },
        { id: 6, icon: 'utility:section', title: 'Scale', description: 'Build what you need today to drive results. Grow with confidence when you’re ready in the future.' }
    ];
}