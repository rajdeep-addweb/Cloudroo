import { LightningElement } from 'lwc';
import cloudrooImg from '@salesforce/resourceUrl/cloudrooImage';

export default class CloudrooInfo extends LightningElement {
    cloudrooImage = cloudrooImg;

    cloudrooDetails = {
        title: 'Cloudroo: Elevating Businesses with Cloud Innovation',
        description: `At Cloudroo, we combine expertise, innovation, and agility to drive seamless cloud transformation. Our team of industry veterans ensures tailored cloud solutions, empowering businesses to scale and thrive in the digital era.`,
        details: `We specialize in cutting-edge Salesforce solutions, including CPQ (Configure, Price, Quote), Billing, and Marketing Cloud. With a history of successful projects, Cloudroo is your trusted partner in navigating complex digital landscapes with efficiency and excellence.`,
        points: [
            'A highly skilled team of certified Salesforce consultants and technical architects with over 12 years of experience.',
            'Expertise in solution architecture, seamless cloud integration, and scalable development.',
            'Dedicated to delivering customer-centric solutions that drive business growth and efficiency.',
            'Ensuring top-tier project execution with continuous support throughout the entire lifecycle.'
        ]
    };

    connectedCallback() {
        document.addEventListener('scrolltoinfo', () => {
            this.scrollToSection();
        });
    }

    scrollToSection() {
        this.template.querySelector('.container').scrollIntoView({ behavior: 'smooth' });
    }
}