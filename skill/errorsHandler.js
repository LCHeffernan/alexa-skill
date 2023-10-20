"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorsHandler = void 0;
exports.ErrorsHandler = {
    canHandle() {
        return true;
    },
    handle({ responseBuilder }, error) {
        console.log(`Error handled: ${error.message}`);
        return responseBuilder
            .speak("Sorry, I do not understand your command. Please say it again.")
            .reprompt("Sorry, I do not understand your command. Please say it again.")
            .getResponse();
    },
};
