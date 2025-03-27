import { LightningElement, wire, track } from 'lwc';
import getBlogs from '@salesforce/apex/BlogController.getBlogs';
import getCategoryPicklist from '@salesforce/apex/BlogController.getCategoryPicklist';
import { NavigationMixin } from 'lightning/navigation';

export default class BlogList extends NavigationMixin(LightningElement) {
    @track blogs = [];
    @track filteredBlogs = [];
    @track categories = [];
    @track selectedCategory = 'All';

    @wire(getBlogs)
    wiredBlogs({ error, data }) {
        if (data) {
            this.blogs = data.map(blog => ({
                ...blog,
                imageUrl: this.getImageUrl(blog.Image_URL__c) // ✅ Processed Image URL
            }));
            this.filteredBlogs = this.blogs.slice(0, 4);
        }
    }

    @wire(getCategoryPicklist)
    wiredCategories({ error, data }) {
        if (data) {
            this.categories = ['All', ...data];
        }
    }

    handleReadMore(event) {
        const blogId = event.currentTarget.dataset.id;
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'blogDetail__c'
            },
            state: {
                recordId: blogId
            }
        });
    }

    handleCategoryChange(event) {
        this.selectedCategory = event.target.value;
        
        if (this.selectedCategory === 'All') {
            this.filteredBlogs = this.blogs.slice(0, 4);
        } else {
            this.filteredBlogs = this.blogs.filter(blog => blog.Category__c === this.selectedCategory);
        }
    }

    // ✅ Compute Image URL Correctly
    getImageUrl(imageName) {
        return `/sfsites/c/resource/${imageName}`;
    }
}