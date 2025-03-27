import { LightningElement, track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import LEAD_OBJECT from '@salesforce/schema/Lead';
import FIRSTNAME_FIELD from '@salesforce/schema/Lead.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Lead.LastName';
import EMAIL_FIELD from '@salesforce/schema/Lead.Email';
import PHONE_FIELD from '@salesforce/schema/Lead.Phone';
import COMPANY_FIELD from '@salesforce/schema/Lead.Company';
import DESCRIPTION_FIELD from '@salesforce/schema/Lead.Description';

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

        const fields = {};
        fields[FIRSTNAME_FIELD.fieldApiName] = this.formData.firstName;
        fields[LASTNAME_FIELD.fieldApiName] = this.formData.lastName;
        fields[EMAIL_FIELD.fieldApiName] = this.formData.email;
        fields[PHONE_FIELD.fieldApiName] = this.formData.phone;
        fields[COMPANY_FIELD.fieldApiName] = 'Enquiry'; // Default company value as it's required in Lead
        fields[DESCRIPTION_FIELD.fieldApiName] = `Subject: ${this.formData.subject}\nMessage: ${this.formData.message}`;

        const recordInput = { apiName: LEAD_OBJECT.objectApiName, fields };

        try {
            await createRecord(recordInput);
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
        } catch (error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Something went wrong. Please try again.',
                    variant: 'error'
                })
            );
        }
    }
}