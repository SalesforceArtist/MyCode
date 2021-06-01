/**
 * Case state abstract class
 * */
public interface CaseState {
    void close(Case customerCase);
    void calculateTimeSpent(Case customerCase);
    void validate(Case customerCase);
}