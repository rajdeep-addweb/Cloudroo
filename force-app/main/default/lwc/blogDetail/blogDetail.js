import { LightningElement, track, wire } from 'lwc';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';
import { getRecord } from 'lightning/uiRecordApi';
import TITLE_FIELD from '@salesforce/schema/Blog__c.Title__c';
import CONTENT_FIELD from '@salesforce/schema/Blog__c.Content__c';
import IMAGE_FIELD from '@salesforce/schema/Blog__c.Image__c';
import AUTHOR_FIELD from '@salesforce/schema/Blog__c.Author__c';
import AUTHOR_FIRST_NAME from '@salesforce/schema/User.FirstName';
import AUTHOR_LAST_NAME from '@salesforce/schema/User.LastName';

import AUTHOR_PHOTO_FIELD from '@salesforce/schema/User.SmallPhotoUrl';
import CREATED_DATE_FIELD from '@salesforce/schema/Blog__c.CreatedDate';

const BLOG_FIELDS = [TITLE_FIELD, CONTENT_FIELD, IMAGE_FIELD, AUTHOR_FIELD, CREATED_DATE_FIELD];
const AUTHOR_FIELDS = [AUTHOR_FIRST_NAME , AUTHOR_LAST_NAME, AUTHOR_PHOTO_FIELD];

export default class BlogDetail extends NavigationMixin(LightningElement) {
    @track recordId;
    @track blog = {};
    @track author = {};
    @track error;

    @wire(CurrentPageReference)
    getPageReferenceParameters(currentPageReference) {
        if (currentPageReference?.state?.recordId) {
            this.recordId = currentPageReference.state.recordId;
        }
    }

    @wire(getRecord, { recordId: '$recordId', fields: BLOG_FIELDS })
    wiredBlog({ error, data }) {
        if (data) {
            this.blog = {
                Title__c: data.fields.Title__c.value,
                Content__c: data.fields.Content__c.value,
                Image__c: data.fields.Image__c.value,
                AuthorId: data.fields.Author__c?.value, // Getting Author Id
                CreatedDate: data.fields.CreatedDate.value
            };
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.blog = undefined;
        }
    }

    @wire(getRecord, { recordId: '$blog.AuthorId', fields: AUTHOR_FIELDS })
    wiredAuthor({ error, data }) {
        if (data) {
            this.author = {
                Name: data.fields.FirstName.value + ' ' + data.fields.LastName.value,
                Photo: data.fields.SmallPhotoUrl.value
            };
        } else {
            this.author = { Name: 'Unknown Author', Photo: '' };
        }
    }

    // Format Date
    get formattedDate() {
        if (this.blog.CreatedDate) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(this.blog.CreatedDate).toLocaleDateString('en-US', options);
        }
        return '';
    }

    handleBackToList() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/cloudroo/blogs'
            }
        });
    }
}
