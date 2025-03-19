import { LightningElement, track } from 'lwc';

export default class Testimonials extends LightningElement {
    @track selectedTestimonialIndex = 0;

    testimonials = [
        {
            name: 'Jim Sheppard',
            title: 'Visionary Marketing Co.',
            message: 'Tablet publishing HTML5 mobile first really simple syndication meetups white board walls.',
            image: 'https://via.placeholder.com/80',
        },
        {
            name: 'Sarah Johnson',
            title: 'Creative Director',
            message: 'User experience iterate algorithm gamification semantic web value add market research.',
            image: 'https://via.placeholder.com/80',
        },
        {
            name: 'David Brown',
            title: 'Marketing Specialist',
            message: 'Stealth tablet publishing HTML5 mobile first really simple research stealth.',
            image: 'https://via.placeholder.com/80',
        }
    ];

    handleTestimonialClick(event) {
        this.selectedTestimonialIndex = event.currentTarget.dataset.index;
    }

    get selectedTestimonial() {
        return this.testimonials[this.selectedTestimonialIndex];
    }
}