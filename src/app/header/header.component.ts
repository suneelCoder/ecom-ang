import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api'; // Import MenuItem interface from PrimeNG
import { MenubarModule } from 'primeng/menubar'; // Import MenubarModule from PrimeNG
import { BadgeModule } from 'primeng/badge'; // Import BadgeModule for displaying badges
import { AvatarModule } from 'primeng/avatar'; // Import AvatarModule for displaying user avatars
import { InputTextModule } from 'primeng/inputtext'; // Import InputTextModule for input fields
import { CommonModule } from '@angular/common'; // Import CommonModule for common Angular directives
import { RippleModule } from 'primeng/ripple'; // Import RippleModule for ripple effect on buttons
import { ButtonModule } from 'primeng/button';
import { SellerService } from '../services/seller.service';
@Component({
    selector: 'app-header', // The component's HTML tag
    standalone: true, // Indicates this component is standalone and does not belong to a module
    templateUrl: './header.component.html', // Path to the HTML template
    imports: [MenubarModule, BadgeModule, AvatarModule, InputTextModule, RippleModule, CommonModule, ButtonModule], // Import necessary modules
    styleUrls: ['./header.component.css'] // Path to the CSS styles
})
export class HeaderComponent implements OnInit { // Define the HeaderComponent class that implements OnInit
    items: MenuItem[] | undefined; // Declare items as an array of MenuItem, initially undefined
    isAuthenticated: boolean = false;
    constructor(private sellerService: SellerService) {

    }
    ngOnInit() { // Lifecycle hook that runs after the component is initialized
        this.checkAuthentication();
        this.items = [ // Assign items to an array of MenuItem objects
            {
                label: 'Home', // Menu item label
                routerLink: "/"
            },
            {
                label: 'Seller', // Menu item label
                routerLink: "/seller"
            },
            {
                label: 'Categories',
                items: [ // Submenu items
                    {
                        label: 'Shoes',
                    },
                    {
                        label: 'Clothes'
                    },
                    {
                        label: 'Electronics'
                    },
                    {
                        separator: true // Separator in the menu
                    },
                    {
                        label: 'Templates',
                        items: [ // Submenu for Templates
                            {
                                label: 'Apollo'
                            },
                            {
                                label: 'Ultima',
                            }
                        ]
                    }
                ]
            },
        ];
    }


    checkAuthentication() {
        this.sellerService.profile().subscribe({
            next: (response: any) => {
                this.isAuthenticated = !!response?.user; // Set the authenticated status
            },
            error: () => {
                this.isAuthenticated = false; // Handle error (user not authenticated)
            }
        });
    }
}
