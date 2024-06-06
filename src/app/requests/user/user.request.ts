//Dtos/Request/CategoryRequestDto en backend
export interface UserRequest {
    UserName: string
    Password: string
    Email: string
    Image?: string 
    AuthType: string
    State: number
}