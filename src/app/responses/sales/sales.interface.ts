
export interface Sales {
    saleId: number;
    customerId?: number;
    registerDate?: Date;
    subTotal: number;
    total: number;
    balance: number;
    closed?:boolean;
    paid?: boolean;
    saleItems?: SaleItems[];
    payments?: Payments[];
    value?: string | undefined;  //Se usa para guardar un pago, aqui se guarda la Quantity de Payments ..
    paymentDate?: string | undefined;//Se usa para guardar un pago, aqui se guarda la PaymentDate de Payments ..
    state?: number;
}

export interface SaleResponse {
    SaleId: number,
    customerId: number,
    subTotal: string,
    total: string,
    balance: string,
    closed:boolean;
    paid: boolean;
    auditCreateDate: string
}

export interface SaleRequest {
    customerId:number;
    subTotal: number;
    total: number;
    balance: number;
    closed?:boolean;
    paid?: boolean;
    state?: number;
}

export interface SaleItems {
    saleItemId: number;
    SaleId: number;
    quantity: number;
    price: number;
    productDescription: string;
    state?: number;
}

export interface Payments {
    //id: number;
    saleId: number;
    quantity: number;
    balance: number;
    paymentDate: string;
    description: string;
    state?:number;
}

export interface BaseApiResponse {
    data: any
    totalRecords: number
}
