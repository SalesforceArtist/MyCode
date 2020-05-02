/*
MIT License

Copyright (c) 2020 Playground, https://www.playg.app

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

public with sharing class ToDoController {
    @AuraEnabled(cacheable=true)
    public static List<ToDo__c> getToDoList() {
        return [
            SELECT Id, Description__c, ReminderDate__c, DueDate__c, Status__c
            FROM ToDo__c
            WHERE Status__c != 'Completed'
            AND (DueDate__c = null 
                OR (DueDate__c != TOMORROW
                    AND DueDate__c != NEXT_N_DAYS:7
                    AND DueDate__c > TODAY))
            AND AssignedTo__c =: UserInfo.getUserId()
            Order By LastModifiedDate ASC
        ];
    }

    @AuraEnabled(cacheable=true)
    public static List<ToDo__c> getTODOCompletedList() {
        return [
            SELECT Id, Description__c, ReminderDate__c, DueDate__c, Status__c, AssignedTo__r.Name
            FROM ToDo__c
            WHERE Status__c = 'Completed'
            AND (AssignedTo__c =: UserInfo.getUserId() OR CreatedById =: UserInfo.getUserId())
            Order By LastModifiedDate DESC
        ];
    }

    @AuraEnabled(cacheable=true)
    public static List<ToDo__c> getTODODueTomorrow() {
        return [
            SELECT Id, Description__c, ReminderDate__c, DueDate__c, Status__c
            FROM ToDo__c
            WHERE Status__c != 'Completed'
            AND DueDate__c = TOMORROW
            AND AssignedTo__c =: UserInfo.getUserId()
            Order By CreatedDate ASC
        ];
    }

    @AuraEnabled(cacheable=true)
    public static List<ToDo__c> getTODODueInWeek() {
        return [
            SELECT Id, Description__c, ReminderDate__c, DueDate__c, Status__c
            FROM ToDo__c
            WHERE Status__c != 'Completed'
            AND DueDate__c = NEXT_N_DAYS:7
            AND DueDate__c != TOMORROW 
            AND AssignedTo__c =: UserInfo.getUserId()
            Order By DueDate__c ASC
        ];
    }

    @AuraEnabled(cacheable=true)
    public static List<ToDo__c> getOverdue() {
        return [
            SELECT Id, Description__c, ReminderDate__c, DueDate__c, Status__c, AssignedTo__r.Name
            FROM ToDo__c
            WHERE Status__c != 'Completed'
            AND DueDate__c < TODAY
            AND (AssignedTo__c =: UserInfo.getUserId() OR CreatedById =: UserInfo.getUserId())
            Order By DueDate__c ASC
        ];
    }

    @AuraEnabled(cacheable=true)
    public static List<ToDo__c> getDelegatedList() {
        return [
            SELECT Id, Description__c, ReminderDate__c, DueDate__c, Status__c, AssignedTo__r.Name
            FROM ToDo__c
            WHERE Status__c != 'Completed'
            AND CreatedById =: UserInfo.getUserId()
            AND AssignedTo__c !=: UserInfo.getUserId()
            Order By LastModifiedDate ASC
        ];
    }
}