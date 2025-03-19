import { LightningElement } from 'lwc';
import FOOTER_LOGO from '@salesforce/resourceUrl/CloudrooLogo'; // Cloudroo logo resource

export default class FooterComponent extends LightningElement {
    currentYear = new Date().getFullYear();
    logoUrl = FOOTER_LOGO;

    connectedCallback() {
        // Add Font Awesome if not already present
        if (!document.querySelector('link[href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"]')) {
            let link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
            link.type = 'text/css';
            document.head.appendChild(link);
        }
    }
}