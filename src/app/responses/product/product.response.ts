
//ProductResponseDto
export interface Product {
    productId: number
    description: string
    brand: string
    purchaseCost: string
    salesCost: string
    categoryId: number
    auditCreateDate: string
    state: number
    stateProduct: string
}


//BaseEntityResponse<T>
export interface ProductApi {
    data: any
    totalRecords: number
}

export interface CategorySelect {
    categoryId: number;
    name: string;
}