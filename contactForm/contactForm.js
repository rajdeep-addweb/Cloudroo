import { LightningElement, track } from 'lwc';
import createLead from '@salesforce/apex/ContactFormController.createLead';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ContactForm extends LightningElement {
    @track formData = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    };

    @track isSubmitted = false;

    contactInfo = {
        address: 'Melbourne, Australia',
        phone: '+61-477-387-961',
        email: 'admin@cloudroo.com.au'
    };

    connectedCallback() {
        document.addEventListener('scrolltocontact', () => {
            this.scrollToContact();
        });
    }

    scrollToContact() {
        this.template.querySelector('.contact-section').scrollIntoView({ behavior: 'smooth' });
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.formData = { ...this.formData, [name]: value };
    }

    async handleSubmit(event) {
        event.preventDefault();
        
        try {
            const result = await createLead({
                firstName: this.formData.firstName,
                lastName: this.formData.lastName,
                email: this.formData.email,
                phone: this.formData.phone,
                subject: this.formData.subject,
                message: this.formData.message
            });

            if (result === 'Success') {
                this.isSubmitted = true;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Your message has been sent successfully!',
                        variant: 'success'
                    })
                );
                this.formData = { firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' };

                setTimeout(() => {
                    this.isSubmitted = false;
                }, 5000);
            } else {
                throw new Error(result);
            }
        } catch (error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: error.message,
                    variant: 'error'
                })
            );
        }
    }
}
