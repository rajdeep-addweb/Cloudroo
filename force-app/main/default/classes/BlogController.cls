public with sharing class BlogController {
    
    @AuraEnabled(cacheable=true)
    public static List<Blog__c> getBlogs() {
       return [SELECT Id, Title__c, Image__C, Content__c, Category__c, 
                      Author__r.FirstName, Author__r.LastName, Author__r.SmallPhotoUrl, CreatedDate
                FROM Blog__c 
                ORDER BY CreatedDate DESC];
    }

    @AuraEnabled(cacheable=true)
    public static Map<String, Object> getBlogDetail(Id blogId) {
        Blog__c blog = [SELECT Id, Title__c, Image__C, Content__c, Category__c, 
                               Author__r.FirstName, Author__r.LastName, Author__r.SmallPhotoUrl, CreatedDate
                        FROM Blog__c 
                        WHERE Id = :blogId LIMIT 1];

        // Author Name Formatting (Guest user issue fix)
        String authorName = (blog.Author__r != null) ? blog.Author__r.FirstName + ' ' + blog.Author__r.LastName : 'Unknown Author';
        String authorPhoto = (blog.Author__r != null) ? blog.Author__r.SmallPhotoUrl : '';

        // Create Response Map
        Map<String, Object> response = new Map<String, Object>();
        response.put('Id', blog.Id);
        response.put('Title', blog.Title__c);
        response.put('Image', blog.Image__c);
        response.put('Content', blog.Content__c);
        response.put('Category', blog.Category__c);
        response.put('CreatedDate', blog.CreatedDate);
        response.put('AuthorName', authorName);
        response.put('AuthorPhoto', authorPhoto);

        return response;
    }

    @AuraEnabled(cacheable=true)
    public static List<String> getCategoryPicklist() {
        Schema.DescribeFieldResult fieldResult = Blog__c.Category__c.getDescribe();
        List<Schema.PicklistEntry> picklistValues = fieldResult.getPicklistValues();
        
        List<String> categories = new List<String>();
        for (Schema.PicklistEntry entry : picklistValues) {
            categories.add(entry.getLabel());
        }
        return categories;
    }
}