import { waitRandomGetResult } from "../utils/promise"
import { registrationPayload } from "../types/registration"

export const registerService = {
    validateRegistry(data: registrationPayload["registry"]) {
        return waitRandomGetResult()
    },

    validateContact(data: registrationPayload["contact"]) {
        return waitRandomGetResult()
    },

    validatePrivacy(data: registrationPayload["privacy"]) {
        return waitRandomGetResult()
    },

    sendRegistration(data: registrationPayload) {
        console.log('Sending registration...', data)
        return waitRandomGetResult(2000, 6000)
    },

}
