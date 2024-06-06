import { HttpHeaders } from "@angular/common/http";

export const endpoint = {
    //CATEGORY MODULE
    LIST_CATEGORIES: 'Category',
    LIST_SELECT_CATEGORIES: 'Category/Select',
    CATEGORY_BY_ID: 'Category/',
    CATEGORY_REGISTER: 'Category/Register/',
    CATEGORY_EDIT: 'Category/Edit/',
    CATEGORY_REMOVE: 'Category/Remove/',

    //CUSTOMER MODULE
    LIST_CUSTOMERS: 'Customer',
    LIST_SELECT_CUSTOMERS: 'Customer/Select',
    CUSTOMER_BY_ID: 'Customer/',
    CUSTOMER_REGISTER: 'Customer/Register/',
    CUSTOMER_EDIT: 'Customer/Edit/',
    CUSTOMER_REMOVE: 'Customer/Remove/',

    //PRODUCT MODULE
    LIST_PRODUCTS: 'Product',
    LIST_SELECT_PRODUCTS: 'Product/Select',
    PRODUCT_BY_ID: 'Product/',
    PRODUCT_REGISTER: 'Product/Register/',
    PRODUCT_EDIT: 'Product/Edit/',
    PRODUCT_REMOVE: 'Product/Remove/',

    //USER MODULE
    LIST_USERS: 'User',
    USER_BY_ID: 'User/',
    USER_REGISTER: 'User/Register/',
    USER_EDIT: 'User/Edit/',

    //SALES MODULE
    LIST_SALES: 'Sale/ListSalesForPayments',
    SALE_BY_ID: 'Sale/',
    SALE_REGISTER: 'Sale/Register/',
    SALE_EDIT: 'Sale/Edit/',
    SALE_REMOVE: 'Sale/Remove/',

    //SALE ITEMS MODULE
    LIST_SALE_ITEMS: 'SaleItem',
    SALE_ITEMS_REGISTER: 'SaleItem/Register/',
    SALE_ITEMS_REMOVE: 'SaleItem/Remove/',

    //PAYMENTS
    LIST_FOR_PAYMENT: 'Sale/ListSalesForPayments',
    PAYMENT_REGISTER: 'Payment/Register/',
    PAYMENT_REMOVE: 'Payment/Register/',

    //AUTH MODULE
    LOGIN: "Auth/Login",
    LOGIN_GOOGLE: "Auth/LoginWithGoogle"
}

export const httpOptions = {
    headers: new HttpHeaders({
        "Content-type": "application/json"
    })
};