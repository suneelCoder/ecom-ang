import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SellerService {
    private url: string = "http://localhost:5000/api/auth";

    constructor(private http: HttpClient) { }

    userSignUp(sellerData: { name: string, email: string, password: string }) {
        return this.http.post(`${this.url}/register`, sellerData, { withCredentials: true });
    }

    userLogin(sellerData: { email: string, password: string }) {
        return this.http.post(`${this.url}/login`, sellerData, { withCredentials: true });
    }

    profile(): Observable<any> {
        return this.http.get(`${this.url}/me`, { withCredentials: true }).pipe(
            catchError((error) => {
                return of({ user: null });
            })
        );
    }
}
