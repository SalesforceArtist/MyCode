public class ConditionalCodeController {
    public String deviceType { get; set; }
  
    public ConditionalCodeController() {
        String userAgent = ApexPages.currentPage().getHeaders().get('USER-AGENT');      
        if(userAgent.contains('iPhone')) {
            deviceType = 'iPhone';
        }
        else if(userAgent.contains('BlackBerry')) {
            deviceType = 'BlackBerry';
        }
    }

}