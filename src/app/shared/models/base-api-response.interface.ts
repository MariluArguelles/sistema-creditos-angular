export interface BaseApiResponse {
    data: any
    totalRecords: number
}

//es la clase Base Response<T> en backend
export interface BaseResponse {
    isSuccess: boolean
    data: any,
    message: any,
    errors: any
}
