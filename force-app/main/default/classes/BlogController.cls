public with sharing class BlogController {
    
    @AuraEnabled(cacheable=true)
    public static List<Blog__c> getBlogs() {
        return [SELECT Id, Title__c, Content__c, Category__c , Image_URL__c
                FROM Blog__c 
                ORDER BY CreatedDate DESC];
    }

    @AuraEnabled(cacheable=true)
    public static Blog__c getBlogDetail(Id blogId) {
        return [SELECT Id, Title__c, Content__c, Image_URL__c, Category__c 
                FROM Blog__c 
                WHERE Id = :blogId LIMIT 1];
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