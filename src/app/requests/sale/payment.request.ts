export interface Payments {
    id: number;
    PreSaleId: number;
    Quantity: number;
    Balance: number;
    PaymentDate: Date;
    RegistrationDate: Date;
    State: boolean;
    Description: string;
}