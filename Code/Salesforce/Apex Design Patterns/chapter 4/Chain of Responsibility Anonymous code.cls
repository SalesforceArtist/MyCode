/* Anonynous apex for Chain of reposnsibility */

/* Snippet 1*/
RequestHandler logger = Loggers.getChainOfLoggers();
logger.logMessage(RequestHandler.LOG_LEVEL_SYSTEMDEBUG, 'I am logger using Chain of responsibility principal');

/* Snippet 2*/
RequestHandler logger = Loggers.getChainOfLoggers();
logger.logMessage(RequestHandler. LOG_LEVEL_SAVE, 'I am logger using Chain of responsibility principal');

/* Snippet 3*/
RequestHandler logger = Loggers.getChainOfLoggers();
logger.logMessage(RequestHandler. LOG_LEVEL_EMAIL, 'I am logger using Chain of responsibility principal');
