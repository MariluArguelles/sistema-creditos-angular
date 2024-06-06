//CategoryResponseDto
export interface Category {
    categoryId: number
    name: string
    description: string
    auditCreateDate: string
    state: number
    stateCategory: string
}
//BaseEntityResponse<T>
export interface CategoryApi {
    data: any
    totalRecords: number
}



