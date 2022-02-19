export type registry = {
    name: string,
    surname: string,
    birthDate: string,
}

export type communication = {
    email: string,
    phone: string,
}

export type privacy = {
    privacy: boolean,
    marketing: boolean,
}


export type registrationPayload = {
    registry: registry,
    communication: communication,
    privacy: privacy,
}
