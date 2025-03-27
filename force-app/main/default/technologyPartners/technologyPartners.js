import { LightningElement } from 'lwc';
import ADDWEB_LOGO from '@salesforce/resourceUrl/AddwebLogo';
import CLOUDSENSI_LOGO from '@salesforce/resourceUrl/CloudSensiSmall';
import SALESFORCE_PARTNER from '@salesforce/resourceUrl/SalesforcePartners';

export default class TechnologyPartners extends LightningElement {
    partner1 = ADDWEB_LOGO;
    partner2 = CLOUDSENSI_LOGO;
    salesforcePartner = SALESFORCE_PARTNER;
}