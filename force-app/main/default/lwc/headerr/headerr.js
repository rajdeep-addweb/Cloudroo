import { LightningElement, track } from 'lwc';
import cloudrooLogo from '@salesforce/resourceUrl/CloudrooLogo';

export default class Headerr extends LightningElement {
    @track isMenuOpen = false;
    @track isBlogPage = false;
    cloudrooLogo = cloudrooLogo;

    connectedCallback() {
        // ✅ Check if URL contains '/blogs'
        this.isBlogPage = window.location.pathname.includes('/blogs');
    }

    // ✅ Toggle Mobile Menu
    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }

    // ✅ Close Menu when clicking outside
    closeMenu() {
        this.isMenuOpen = false;
    }

    // ✅ Navigate to Home
    navigateToHome(event) {
        event.preventDefault();
        this.closeMenu();
        window.location.href = '/';
    }

    // ✅ Scroll to About Section
    navigateToAbout(event) {
        event.preventDefault();
        this.closeMenu();
        this.dispatchEvent(new CustomEvent('scrolltoinfo', { bubbles: true, composed: true }));
    }

    // ✅ Scroll to Services Section
    navigateToServices(event) {
        event.preventDefault();
        this.closeMenu();
        this.dispatchEvent(new CustomEvent('scrolltoservices', { bubbles: true, composed: true }));
    }

    // ✅ Navigate to Blogs Page
    navigateToBlogs(event) {
        event.preventDefault();
        this.closeMenu();
        window.location.href = '/blogs';
    }

    // ✅ Scroll to Contact Section
    handleScrollToContact(event) {
        event.preventDefault();
        this.closeMenu();
        this.dispatchEvent(new CustomEvent('scrolltocontact', { bubbles: true, composed: true }));
    }

    // ✅ Get dynamic class for mobile menu
    get computedMenuClass() {
        return this.isMenuOpen ? 'mobile-menu show' : 'mobile-menu';
    }
}