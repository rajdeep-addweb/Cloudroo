import { createElement } from 'lwc';
import BlogDetail from 'c/blogDetail';
import { getRecord } from 'lightning/uiRecordApi';
import { CurrentPageReference } from 'lightning/navigation';
import { NavigationMixin } from 'lightning/navigation';

// Mock blog record data for testing
const mockGetRecord = require('./data/getRecord.json');

describe('c-blog-detail', () => {
    afterEach(() => {
        // Clean up the DOM after each test
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        jest.clearAllMocks();
    });

    it('renders blog detail successfully', async () => {
        // Create the component
        const element = createElement('c-blog-detail', {
            is: BlogDetail
        });
        document.body.appendChild(element);

        // Emit mock record data
        getRecord.emit(mockGetRecord);

        // Wait for any asynchronous DOM updates
        await Promise.resolve();

        // Check if the blog title is rendered
        const titleElement = element.shadowRoot.querySelector('.blog-detail-title');
        expect(titleElement.textContent).toBe(mockGetRecord.fields.Title__c.value);

        // Check if the blog content is rendered
        const contentElement = element.shadowRoot.querySelector('.blog-detail-content');
        expect(contentElement.textContent).toBe(mockGetRecord.fields.Content__c.value);
    });

    it('navigates back to blog list successfully', async () => {
        // Create the component
        const element = createElement('c-blog-detail', {
            is: BlogDetail
        });
        document.body.appendChild(element);

        // Mock the Navigate function
        const mockNavigate = jest.fn();
        element[NavigationMixin.Navigate] = mockNavigate;

        // Emit mock record data
        getRecord.emit(mockGetRecord);

        // Wait for any asynchronous DOM updates
        await Promise.resolve();

        // Simulate a click on the back button
        const backButton = element.shadowRoot.querySelector('.back-button a');
        backButton.click();

        // Verify that the navigation mock is called with correct parameters
        expect(mockNavigate).toHaveBeenCalledWith({
            type: 'standard__webPage',
            attributes: {
                url: '/cloudroo/blogs'
            }
        });
    });

    it('shows error message', async () => {
        // Create the component
        const element = createElement('c-blog-detail', {
            is: BlogDetail
        });
        document.body.appendChild(element);

        // Simulate an error while fetching the record
        getRecord.error();

        // Wait for any asynchronous DOM updates
        await Promise.resolve();

        // Check if the error message is displayed
        const errorMessage = element.shadowRoot.querySelector('.error-message');
        expect(errorMessage).not.toBeNull();
    });
});