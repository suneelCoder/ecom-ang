// Import necessary Angular and PrimeNG modules
import { Component, Input } from '@angular/core';  // Component decorator and Input decorator from Angular
import { CommonModule } from '@angular/common';    // CommonModule for common Angular directives like ngIf and ngFor
import { CarouselModule } from 'primeng/carousel'; // CarouselModule from PrimeNG for the image carousel
import { ButtonModule } from 'primeng/button';     // ButtonModule from PrimeNG for buttons
import { CardModule } from 'primeng/card';         // CardModule from PrimeNG for the card layout

@Component({
  // Define the selector for this component, allowing it to be used as <app-product> in other templates
  selector: 'app-product',

  // Enable standalone mode, meaning this component doesn't rely on Angular modules to be imported in other modules
  standalone: true,

  // List of imported modules needed for this component
  imports: [CommonModule, CarouselModule, ButtonModule, CardModule],

  // Path to the HTML template file that defines the structure of the component
  templateUrl: './product.component.html',

  // Path to the CSS file that defines the styles for this component
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  // Use the @Input() decorator to accept 'product' data from the parent component
  // 'product' is an object containing id, name, description, price, and an array of image URLs
  @Input() product!: { id: string; name: string; description: string; price: number; images: string[] };

  // Another @Input() to accept a function from the parent component for adding the product to the cart
  @Input() onAddToCart!: (id: string) => void;

  // @Input() to accept a function for removing the product from the cart
  @Input() onRemoveFromCart!: (id: string) => void;

  // Variable to track the quantity of the product selected by the user, initialized to 0
  quantity: number = 0;

  // Function to handle the "Add to Cart" action
  // It calls the onAddToCart function passed from the parent and increments the quantity
  addToCart() {
    this.onAddToCart(this.product.id);  // Call the parent component's function to add the product by its id
    this.quantity++;  // Increment the quantity of the product
  }

  // Function to handle the "Remove from Cart" action
  // It calls the onRemoveFromCart function passed from the parent and decrements the quantity
  removeFromCart() {
    if (this.quantity > 0) {  // Ensure the quantity doesn't go below 0
      this.onRemoveFromCart(this.product.id);  // Call the parent component's function to remove the product by its id
      this.quantity--;  // Decrement the quantity
    }
  }

  // Function to handle the "Buy Now" action
  // It simulates the purchase by showing an alert with the product name and quantity
  buyNow() {
    alert(`Buying ${this.quantity} of ${this.product.name}`);  // Display an alert with the product name and quantity
  }

  // Function to increment the product quantity when the "+" button is clicked
  incrementQuantity() {
    this.quantity++;  // Increase the quantity by 1
  }

  // Function to decrement the product quantity when the "-" button is clicked
  // Ensures the quantity doesn't go below 0
  decrementQuantity() {
    if (this.quantity > 0) {
      this.quantity--;  // Decrease the quantity by 1 only if it's greater than 0
    }
  }
}
