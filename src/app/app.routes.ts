import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerComponent } from './seller/seller.component';
import { SellerLoginComponent } from './seller-login/seller-login.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { authGuard } from './auth.guard';
import { AddProductComponent } from './add-product/add-product.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "seller",
        component: SellerComponent,
        canActivate: [authGuard]
    },
    {
        path: "login",
        component: SellerLoginComponent,
        canActivate: [authGuard]
    },
    {
        path: "seller-home",
        component: SellerHomeComponent,
        canActivate: [authGuard]
    },
    {
        path: "add-product",
        component: AddProductComponent,
        canActivate: [authGuard]
    }
];
