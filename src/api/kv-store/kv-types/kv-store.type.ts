export type Session = {
    id: string,
    verificationKey: string,
    verificationTimestamp: string,
    status: 'ACTIVE' | 'BLOCKED'
}


export type CreateSession = {
    id: string
}

export type SetVerificationProps = {
    verificationTimestamp: string,
    verificationKey: string,
}

export type CloseSession = {
    id: string
}
