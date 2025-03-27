import { LightningElement } from 'lwc';
export default class CustomBanner extends LightningElement {
    handleCallNow() {
        window.location.href = 'tel:+1234567890';
    }
}