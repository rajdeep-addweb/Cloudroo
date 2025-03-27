import { LightningElement, track, wire } from 'lwc';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';
import { getRecord } from 'lightning/uiRecordApi';
import TITLE_FIELD from '@salesforce/schema/Blog__c.Title__c';
import CONTENT_FIELD from '@salesforce/schema/Blog__c.Content__c';
import IMAGE_FIELD from '@salesforce/schema/Blog__c.Image_URL__c';

const FIELDS = [TITLE_FIELD, CONTENT_FIELD, IMAGE_FIELD];

export default class BlogDetail extends NavigationMixin(LightningElement) {
    @track recordId;
    @track blog;
    @track error;

    @wire(CurrentPageReference)
    getPageReferenceParameters(currentPageReference) {
        if (currentPageReference?.state?.recordId) {
            this.recordId = currentPageReference.state.recordId;
        }
    }

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    wiredBlog({ error, data }) {
        if (data) {
            this.blog = {
                Title__c: data.fields.Title__c.value,
                Content__c: data.fields.Content__c.value,
                Image_URL__c: this.getImageUrl(data.fields.Image_URL__c.value)
            };
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.blog = undefined;
        }
    }

    // ✅ Function to format Static Resource URLs
    getImageUrl(imageName) {
        return imageName.startsWith('http') ? imageName : `/sfsites/c/resource/${imageName}`;
    }

    // ✅ Function to navigate back to the blog list
    handleBackToList() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/cloudroo/blogs'
            }
        });
    }
}