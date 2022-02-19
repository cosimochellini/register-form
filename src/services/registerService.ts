import { waitRandom } from "../utils/promise"
import { communication, privacy, registrationPayload, registry } from "../types/registration"

export const registerService = {
    validateRegistry(data: registry) {
        return waitRandom()
    },

    validateCommunication(data: communication) {
        return waitRandom()
    },

    validatePrivacy(data: privacy) {
        return waitRandom()
    },

    sendRegistration(data: registrationPayload) {
        return waitRandom()
    },

}
