import { LightningElement, track } from 'lwc';
import Slider1 from '@salesforce/resourceUrl/Slider1';
import Slider2 from '@salesforce/resourceUrl/Slider2';
import Slider3 from '@salesforce/resourceUrl/Slider3';
import Slider4 from '@salesforce/resourceUrl/Slider4';

export default class HeroSlider extends LightningElement {
    @track currentIndex = 0;
    autoPlayInterval;

    slides = [
        { id: 1, inlineStyle: `background-image: url('${Slider1}');`, title: 'Cloud Transformation & Salesforce Solutions', description: 'Cloudroo is an emerging start-up in cloud transformation and sales/service areas within Salesforce products. Our expertise includes a vast array of services driven by strong development principles, architecture, solution design, and delivery. We are dedicated to helping businesses leverage the power of cloud technology for seamless operations and enhanced customer experiences.', buttonText: 'Explore' },
        { id: 2, inlineStyle: `background-image: url('${Slider2}');`, title: 'Bridging Gap through technology', description: 'The strategy, process and people are the bridge that connects the use of new technology to the upgrade in customer experience.', buttonText: 'Learn More' },
        { id: 3, inlineStyle: `background-image: url('${Slider3}');`, title: 'We transform your business', description: 'Rethink how your enterprise creates value today and in the future. Your organization requires sustained growth in the face of near constant disruption, and sustained growth requires agile reinvention.', buttonText: 'Get Started' },
        { id: 4, inlineStyle: `background-image: url('${Slider4}');`, title: 'You have a challenge? We have a solution', description: 'We provide customised and scalable solutions. Our managed services approach means we’ll do all the heavy lifting so you can focus on running your business.', buttonText: 'Contact Us' }
    ];

    get carouselStyle() {
        return `transform: translateX(-${this.currentIndex * 100}%);`;
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    }

    handleButtonClick() {
        window.location.href = "https://www.example.com"; // Replace with your link
    }
    
    connectedCallback() {
        setTimeout(() => {
            this.startAutoPlay();
        }, 2000); // Ensures DOM is fully loaded
    }

    disconnectedCallback() {
        this.stopAutoPlay();
    }

    startAutoPlay() {
        if (!this.autoPlayInterval) {
            this.autoPlayInterval = setInterval(() => {
                this.nextSlide();
            }, 5000);
        }
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}