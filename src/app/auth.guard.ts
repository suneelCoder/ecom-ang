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
            const isLoginOrSeller = requestedRoute === '/login' || requestedRoute === '/seller';
            const isSellerHome = requestedRoute === '/seller-home';

            if (isAuthenticated) {
                // Redirect authenticated users away from /login or /seller
                if (isLoginOrSeller) {
                    router.navigate(['/seller-home']); // Redirect to home or any other page
                }
            } else if (isSellerHome) {
                // Redirect non-authenticated users trying to access /seller-home to login
                router.navigate(['/login']);
            }
        }),
        map(({ isAuthenticated }) => isAuthenticated), // Only allow access if authenticated
        catchError((error) => {
            console.error('Error in authGuard:', error);
            return of(false); // Return false to prevent access to the route
        })
    );
};
