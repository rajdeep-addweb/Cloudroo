import { LightningElement, track, wire } from 'lwc';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';
import getBlogDetail from '@salesforce/apex/BlogController.getBlogDetail';

export default class BlogDetail extends NavigationMixin(LightningElement) {
    @track recordId;
    @track blog = {};
    @track error;

    @wire(CurrentPageReference)
    getPageReferenceParameters(currentPageReference) {
        if (currentPageReference?.state?.recordId) {
            this.recordId = currentPageReference.state.recordId;
        }
    }

    @wire(getBlogDetail, { blogId: '$recordId' })
    wiredBlog({ error, data }) {
        if (data) {
            this.blog = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.blog = undefined;
        }
    }

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