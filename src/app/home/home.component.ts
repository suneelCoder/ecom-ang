import { Component, OnInit } from '@angular/core'; // Import necessary Angular core features
import { CommonModule } from '@angular/common'; // Import CommonModule for common directives
import { SellerService } from '../services/seller.service'; // Import the service for fetching products
import { ProductComponent } from '../product/product.component'; // Import the ProductComponent to be used in this component

// Define the structure of a Product object using an interface
interface Product {
    id: string; // Unique identifier for the product
    name: string; // Name of the product
    description: string; // Description of the product
    price: number; // Price of the product
    images: string[]; // Array of image URLs for the product
}

@Component({
  selector: 'app-home', // Selector for this component
  standalone: true, // Indicates that this component is a standalone component
  imports: [CommonModule, ProductComponent], // Import the necessary modules and components
  templateUrl: './home.component.html', // Path to the HTML template
  styleUrls: ['./home.component.css'] // Path to the CSS styles
})
export class HomeComponent implements OnInit {
  products: Product[] = []; // Array to hold the list of products
  cart: { [key: string]: number } = {}; // Object to hold product IDs and their quantities in the cart

  // Constructor to inject the SellerService for fetching products
  constructor(private sellerService: SellerService) {}

  // Lifecycle hook that gets called when the component is initialized
  ngOnInit() {
    this.fetchProducts(); // Fetch the list of products when the component is initialized
  }

  // Method to fetch products from the SellerService
  fetchProducts() {
    this.sellerService.getProducts().subscribe((data: Product[]) => {
      this.products = data; // Assign the fetched products to the products array
    });
  }

  // Method to add a product to the cart based on its ID
  addToCart(productId: string) {
    if (this.cart[productId]) { // Check if the product is already in the cart
      this.cart[productId]++; // If yes, increment the quantity
    } else {
      this.cart[productId] = 1; // If no, set the quantity to 1
    }
  }

  // Method to remove a product from the cart based on its ID
  removeFromCart(productId: string) {
    if (this.cart[productId]) { // Check if the product is in the cart
      this.cart[productId]--; // Decrement the quantity
      if (this.cart[productId] <= 0) { // If the quantity goes to zero or below
        delete this.cart[productId]; // Remove the product from the cart
      }
    }
  }
}
