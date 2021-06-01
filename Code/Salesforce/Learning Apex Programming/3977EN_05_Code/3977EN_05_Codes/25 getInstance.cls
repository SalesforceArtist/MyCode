//Get the setting based on the current user
personalSetting__c thisUsersSetting = 
	personalSetting__c.getInstance(userInfo.getUserId());
//Now get the value in the field
String favoriteColor = thisUsersSetting.Favorite_Color__c;
//NO QUERIES HERE!


