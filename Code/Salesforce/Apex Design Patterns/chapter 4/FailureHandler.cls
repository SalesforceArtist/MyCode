//Command to handle failure
public class FailureHandler implements IRequestHandler{
    public void execute(){
        system.debug('Failure operation');
    }
}