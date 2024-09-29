import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SellerService {
    private url: string = "http://localhost:5000/api";

    constructor(private http: HttpClient) { }

    userSignUp(sellerData: { name: string, email: string, password: string }) {
        return this.http.post(`${this.url}/auth/register`, sellerData, { withCredentials: true });
    }

    userLogin(sellerData: { email: string, password: string }) {
        return this.http.post(`${this.url}/auth/login`, sellerData, { withCredentials: true });
    }

    profile(): Observable<any> {
        return this.http.get(`${this.url}/auth/me`, { withCredentials: true }).pipe(
            catchError((error) => {
                return of({ user: null });
            })
        );
    }
    createProduct(productData: any): Observable<any> {
        return this.http.post(`${this.url}/products`, productData, { withCredentials: true });
    }

    getProducts(): Observable<any> {
        return this.http.get(`${this.url}/products`, { withCredentials: true });
    }

    updateProduct(productId: string, productData: any): Observable<any> {
        return this.http.put(`${this.url}/products/${productId}`, productData, { withCredentials: true });
    }

    deleteProduct(productId: string): Observable<any> {
        return this.http.delete(`${this.url}/products/${productId}`, { withCredentials: true });
    }
}
