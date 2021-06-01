/**
 * Maintains and manages various states
 * */
public class CareTaker {
	private List<Memento> lstMementos;
    private Integer currentLevel;
    
    public CareTaker(){
        
    }
    
    public CareTaker(String stateJson){
        CareTaker oldState = (CareTaker) Json.deserialize(stateJson, CareTaker.class);
        this.lstMementos = oldState.lstMementos;
        this.currentLevel = oldState.lstMementos.size() - 1;
    }
    
    public void addState(Memento newState){
        if(lstMementos == null){
        	lstMementos = new List<Memento>();
            currentLevel = 0;
        }
        else{
            if(currentLevel == null){
                currentLevel = lstMementos.size();
            }
            
            if(lstMementos.size() > currentLevel){
                List<Memento> newStates = new List<Memento>();
                for(Integer i=0; i < currentLevel; i++){
                    newStates.add(lstMementos[i]);
                }
                lstMementos = newStates;
            }
        }
        
        lstMementos.add(newState);
        currentLevel++;
    }
    
    public Memento getPreviousState(){
        Memento state = null;
        if(lstMementos != null && lstMementos.size() > 0){
            if(currentLevel == null){
                currentLevel = lstMementos.size() - 1;
            } 
            if(lstMementos.size() > 0 && currentLevel >= 0){
                if(currentLevel > 0) currentLevel--;
                state = lstMementos.get(currentLevel);
            }
        }
        return state;
    }
}