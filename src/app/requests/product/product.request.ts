import { DecimalPipe } from "@angular/common"

//Dtos/Request/ProductRequestDto en backend
export interface ProductRequest {
    description: string
    brand: string
    purchaseCost: number
    salesCost: number
    categoryId: number
    state: number
}