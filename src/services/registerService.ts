import { waitRandom } from "../utils/promise"
import { contact, privacy, registrationPayload, registry } from "../types/registration"

export const registerService = {
    validateRegistry(data: registry) {
        return waitRandom()
    },

    validateContact(data: contact) {
        return waitRandom()
    },

    validatePrivacy(data: privacy) {
        return waitRandom()
    },

    sendRegistration(data: registrationPayload) {
        return waitRandom()
    },

}
