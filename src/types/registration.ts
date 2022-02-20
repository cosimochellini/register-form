export type registry = {
    name: string,
    surname: string,
    birthDate: string,
}

export type contact = {
    email: string,
    phone: string,
}

export type privacy = {
    privacy: boolean,
    marketing: boolean,
}


export type registrationPayload = {
    registry: registry,
    contact: contact,
    privacy: privacy,
}
