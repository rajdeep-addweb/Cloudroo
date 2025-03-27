import { LightningElement } from 'lwc';

export default class BusinessCards extends LightningElement {
    cards = [
        {
            id: 1,
            icon: "utility:phone_portrait",
            altText: "Digital Business",
            text: "We digitize your business."
        },
        {
            id: 2,
            icon: "utility:connected_apps",
            altText: "Bridging Gap",
            text: "Bridging Gap through technology."
        },
        {
            id: 3,
            icon: "utility:data_transforms",
            altText: "Business Transformation",
            text: "We transform your business."
        },
        {
            id: 4,
            icon: "utility:settings",
            altText: "Solution",
            text: "You have a challenge? We have a solution."
        }
    ];
}