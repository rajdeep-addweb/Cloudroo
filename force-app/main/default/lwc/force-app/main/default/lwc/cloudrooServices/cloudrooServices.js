import { LightningElement, track } from 'lwc';
import ConsultingService from '@salesforce/resourceUrl/ConsultingService';
import CloudTransformation from '@salesforce/resourceUrl/CloudTransformation';
import SolutionDevelopment from '@salesforce/resourceUrl/SolutionDevelopment';
import SalesforceHealthcheck from '@salesforce/resourceUrl/SalesforceHealthcheck';
import StrategyandArchitecture from '@salesforce/resourceUrl/StrategyandArchitecture';
import UserTraining from '@salesforce/resourceUrl/UserTraining';

export default class CloudrooServices extends LightningElement {
    @track services = [
        {
            id: 1,
            title: 'Consulting Services',
            shortDescription: 'Have a project involving Salesforce or cloud applications?',
            fullDescription: 'With over a decade of hands-on development expertise, Let our extensive experience help fuel your business goals.',
            icon:ConsultingService,
            isExpanded: false,
            readMoreLabel: 'READ MORE'
        },
        {
            id: 2,
            title: 'Cloud Transformation',
            shortDescription: 'A digital transformation is a complete business transformation.',
            fullDescription: '  to keep this in mind if you’re seriously considering transforming your business. It’s not just about updating IT systems and apps. It’s a cultural shift, and a reimagining of all of your company’s processes and ways of doing things and customer experience.',
            icon: CloudTransformation,
            isExpanded: false,
            readMoreLabel: 'READ MORE'
        },
        {
            id: 3,
            title: 'Solution Development',
            shortDescription: 'Cloudroo’s functional and highly technical experts rapidly design, construct,',
            fullDescription: ' and test your new solution including integration with other systems and the smooth migration of legacy system data.',
            icon: SolutionDevelopment,
            isExpanded: false,
            readMoreLabel: 'READ MORE'
        },
        {
            id: 4,
            title: 'Salesforce Healthcheck',
            shortDescription: 'OurHeath Check service provides you with an overview of how the platform is',
            fullDescription: ' being used, its limits and maintenance requirements, while also assisting you in aligning Salesforce security measures with your organisation’s policies.',
            icon: SalesforceHealthcheck,
            isExpanded: false,
            readMoreLabel: 'READ MORE'
        },
        {
            id: 5,
            title: 'Strategy and Architecture',
            shortDescription: 'Our team members immerse themselves in your business to design new business',
            fullDescription: ' processes, architecture, operating models, and technology platforms that will transform your business results and customer experience',
            icon: StrategyandArchitecture,
            isExpanded: false,
            readMoreLabel: 'READ MORE'
        },
        {
            id: 6,
            title: 'User Training and Support',
            shortDescription: 'Change management can be the most critical aspect of any new program launch.',
            fullDescription: ' Our consultants will work closely with your team to help educate and empower your user base via on-site and virtual training. We will stay by your side with a range of flexible, ongoing support services to help you maintain your new solution.',
            icon: UserTraining,
            isExpanded: false,
            readMoreLabel: 'READ MORE'
        }
    ];

    toggleReadMore(event) {
        const serviceId = parseInt(event.target.dataset.id, 10);
        this.services = this.services.map(service => {
            if (service.id === serviceId) {
                return { 
                    ...service, 
                    isExpanded: !service.isExpanded,
                    readMoreLabel: service.isExpanded ? 'READ MORE' : 'READ LESS'
                };
            }
            return service;
        });
    }

    connectedCallback() {
        document.addEventListener('scrolltoservices', () => {
            this.scrollToSection();
        });
    }

    scrollToSection() {
        this.template.querySelector('.container').scrollIntoView({ behavior: 'smooth' });
    }
}