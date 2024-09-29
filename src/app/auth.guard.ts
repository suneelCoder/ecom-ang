import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs'; // Import of for creating an observable
import { SellerService } from './services/seller.service';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(SellerService);
    const router = inject(Router);

    return authService.profile().pipe(
        map((response: any) => {
            const isAuthenticated = !!response?.user;
            return { isAuthenticated, requestedRoute: state.url };
        }),
        tap(({ isAuthenticated, requestedRoute }) => {
            const isLoginPage = requestedRoute === '/login';
            const isSellerPage = requestedRoute === '/seller';
            const isSellerHome = requestedRoute === '/seller-home';

            if (isAuthenticated) {
                // If the user is authenticated, prevent access to /login or /seller
                if (isLoginPage || isSellerPage) {
                    router.navigate(['/seller-home']); // Redirect authenticated users to seller-home
                }
            } else {
                // If the user is not authenticated, allow access to /login and /seller
                if (isSellerHome) {
                    router.navigate(['/login']); // Redirect unauthenticated users from seller-home to login
                }
            }
        }),
        map(({ isAuthenticated }) => {
            const isLoginPage = state.url === '/login';
            // Allow access to /login if unauthenticated
            return isLoginPage || isAuthenticated;
        }),
        catchError((error) => {
            console.error('Error in authGuard:', error);
            return of(false); // Return false to prevent access to the route
        })
    );
};
