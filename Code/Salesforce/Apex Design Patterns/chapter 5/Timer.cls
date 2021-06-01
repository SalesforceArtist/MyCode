/**
 * Chapter 5   	:   Concurrency Pattern
 * Author    	:  	Jitendra Zaa
 * Description	:	This class is used to pause execuetion for n number of seconds
   Example		:   <code>
                    Long dt1Long = DateTime.now().getTime();
                    Timer.pause(3);
                    Long dt2Long = DateTime.now().getTime();
                    Long milliseconds = dt2Long - dt1Long;
                    Long seconds = milliseconds / 1000;
                    System.debug('** Diff - '+seconds);
                    </code>
 * */ 
public class Timer {
    
    public static void pause(Integer seconds){
        Date todaysDate = Date.today();
        for(integer i = 0; i<8900*seconds; i++)
        {
            todaysDate.addYears(1).addDays(1).addMonths(1).addYears(-1);
        }
    }
}