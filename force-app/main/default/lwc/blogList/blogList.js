import { LightningElement, wire, track } from 'lwc';
import getBlogs from '@salesforce/apex/BlogController.getBlogs';
import getCategoryPicklist from '@salesforce/apex/BlogController.getCategoryPicklist';
import { NavigationMixin } from 'lightning/navigation';

export default class BlogList extends NavigationMixin(LightningElement) {
    @track blogs = [];
    @track filteredBlogs = [];
    @track categories = [];
    @track selectedCategory = 'All';
    @track emptySlots = [];

    // ✅ Fetch Blogs
    @wire(getBlogs)
    wiredBlogs({ error, data }) {
        if (data) {
            this.blogs = data; // ✅ No need for image URL processing
            this.updateFilteredBlogs();
        }
    }

    // ✅ Fetch Categories
    @wire(getCategoryPicklist)
    wiredCategories({ error, data }) {
        if (data) {
            this.categories = ['All', ...data];
        }
    }

    // ✅ Navigate to Blog Detail Page
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

    // ✅ Handle Category Selection
    handleCategoryChange(event) {
        this.selectedCategory = event.target.value;
        this.updateFilteredBlogs();
    }

    // ✅ Filter Blogs Based on Selected Category
    updateFilteredBlogs() {
        if (this.selectedCategory === 'All') {
            this.filteredBlogs = this.blogs.slice(0, 6);
        } else {
            this.filteredBlogs = this.blogs.filter(blog => blog.Category__c === this.selectedCategory).slice(0, 6);
        }

        // Ensure 6 blog slots always exist (empty slots for layout consistency)
        const missingSlots = 6 - this.filteredBlogs.length;
        this.emptySlots = new Array(missingSlots).fill(null).map((_, index) => `empty-${index}`);
    }
}
