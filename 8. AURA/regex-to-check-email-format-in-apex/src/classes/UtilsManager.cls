public class UtilsManager{
  /**
    * Method to valid email addresses & usernames in email format
  **/
  public Static Boolean checkValidUsername(String emailAddress){
    String emailRegex = '([a-zA-Z0-9_\\-\\.]+)@((\\[a-z]{1,3}\\.[a-z]{1,3}\\.[a-z]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})';

    Pattern MyPattern = Pattern.compile(emailRegex); 
    Matcher MyMatcher = MyPattern.matcher(emailAddress);       
    if(MyMatcher.matches()){
      return true;
    }else{
        return false;
    }
  }
}