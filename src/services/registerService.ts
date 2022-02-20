import { waitRandom } from "../utils/promise"
import { registrationPayload } from "../types/registration"

export const registerService = {
    validateRegistry(data: registrationPayload["registry"]) {
        return waitRandom()
    },

    validateContact(data: registrationPayload["contact"]) {
        return waitRandom()
    },

    validatePrivacy(data: registrationPayload["privacy"]) {
        return waitRandom()
    },

    sendRegistration(data: registrationPayload) {
        console.log('Sending registration...', data)
        return waitRandom()
    },

}
