import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { SaleItems } from "../responses/sales/sales.interface";

@Injectable({
    providedIn: 'root' // estara disponible para toda la aplicación
})

export class ShoppingCartService {
    itemsTable: SaleItems[] = [];

    public cartSubject = new BehaviorSubject<SaleItems[]>([]);
    public totalSubject = new BehaviorSubject<number>(0);
    public quantitySubject = new BehaviorSubject<number>(0);

    get totalAction$(): Observable<number> {
        return this.totalSubject.asObservable();
    }

    get quantityAction$(): Observable<number> {
        return this.quantitySubject.asObservable();
    }

    get cartAction$(): Observable<SaleItems[]> {
        return this.cartSubject.asObservable();
    }

    updateCart(product: SaleItems): void {
        this.addToCart(product);
        this.quantityProducts();
        this.calcTotal();
    }

    resetCart() {
        this.cartSubject.next([]);
        this.totalSubject.next(0);
        this.quantitySubject.next(0);
        this.itemsTable = [];
    }


    private addToCart(product: SaleItems): void {
        const isProductInCart = this.itemsTable.find(({ saleItemId }) => saleItemId == product.SaleId) //aqui le movi

        if (isProductInCart) {
            isProductInCart.quantity += 1;
        }
        else {
            this.itemsTable.push({ ...product, quantity: 1 })
        }

        this.cartSubject.next(this.itemsTable);
    }

    private quantityProducts(): void {
        const quantity = this.itemsTable.reduce((acc, prod) => acc += prod.quantity, 0);
        this.quantitySubject.next(quantity);
    }

    private calcTotal(): void {
        const total = this.itemsTable.reduce((acc, prod) => acc += (prod.price * prod.quantity), 0);
        this.totalSubject.next(total);
    }
}