import { LightningElement, track } from 'lwc';
import Somil from '@salesforce/resourceUrl/Somil';
import Naveen from '@salesforce/resourceUrl/Naveen';
import Prabhu from '@salesforce/resourceUrl/Prabhu';

export default class Testimonials extends LightningElement {
    @track activeTestimonial = 1;

    @track testimonials = [
        {
            id: 1,
            name: 'Somil Jain',
            message: 'With expertise in Salesforce Administration, ISTQB Foundation Level, Agile Tester Extension, and 18+ certifications, he leads with innovation and excellence. A visionary in his field, driving success with knowledge and experience.',
            designation: 'Founder & Certified Expert',
            image: Somil
        },
        {
            id: 2,
            name: 'Naveen Ramaiah',
            message: 'A seasoned professional with 9x Salesforce Certifications, including Platform Developer II, Application Architect, Sales Cloud Consultant, and Service Cloud Consultant. As a SAFe Certified Agilist and Practitioner, he excels in driving scalable, agile solutions in the Salesforce ecosystem.',
            designation: 'Salesforce Certified Architect & Agile Expert',
            image: Naveen
        },
        {
            id: 3,
            name: 'Prabu Baskaran',
            message: 'A distinguished expert with multiple Salesforce certifications, including System & Application Architect, CPQ Specialist, and Integration Architecture Designer. His expertise spans development, deployment, and cloud solutions, driving innovation in CRM and enterprise architecture!',
            designation: 'Salesforce Certified Architect & Consultant',
            image: Prabhu
        }
    ];

    get currentTestimonial() {
        return this.testimonials.find(t => t.id === this.activeTestimonial);
    }

    handleTestimonialHover(event) {
        this.activeTestimonial = parseInt(event.target.dataset.id);
    }
}