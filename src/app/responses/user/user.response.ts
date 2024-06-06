//UserResponseDto
export interface User {
    userId: number
    userName: string
    email:string,
    authType: string
    auditCreateDate: string
    state: number
    stateUser: string
}

//BaseEntityResponse<T>
export interface UserApi {
    data: any
    totalRecords: number
}
