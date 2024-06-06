//CustomerResponseDto
export interface CustomerResponse {
    customerId: number
    name: string,
    lastName1: string,
    lastName2: string,
    birthDate: string,
    gender: number,
    genderText: string,
    email: string,
    auditCreateDate: string,
    state: number,
    stateCustomer: string
}
//BaseEntityResponse<T>
export interface CustomerApi {
    data: any
    totalRecords: number
}
