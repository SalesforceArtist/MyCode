/*
 * Author: Shantanu Srivastava
 */
public without sharing class EinsteinBotLiveAgentChecker {
    /**
      * @description	-	checks if any agent is available for live chat
      * @param 			-	liveAgentSessionIds	-	chatKey for LiveChatTranscript
      * @return			-	true if agent available, else false
      */

    @InvocableMethod(label='Einstein Bot - Live Agent Available?')
    public static List<Boolean> checkLiveAgent(List<String> liveAgentSessionIds) 
    {
		try {
			//fetch live chat transcript
			List <LiveChatTranscript> liveChatTranscripts = [SELECT Id, LiveChatButtonId, LiveChatDeploymentId FROM LiveChatTranscript 
																WHERE ChatKey =: liveAgentSessionIds[0] Order By CreatedDate Desc];
			if (liveChatTranscripts.size()> 0) {
				return new List<Boolean>{EinsteinBotRestUtil.getButtonAvailabilityForTransfer(UserInfo.getOrganizationId(), liveChatTranscripts[0].LiveChatDeploymentId, liveChatTranscripts[0].LiveChatButtonId)};
			}
			return new List<Boolean>{false}; 
		} catch(Exception e) {
			return new List<Boolean>{false}; 
		}
    }
}