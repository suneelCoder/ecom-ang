import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'app-add-product',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputTextModule,
        InputNumberModule,
        FileUploadModule,
        ButtonModule,
        InputTextareaModule,
        CardModule
    ],
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
    addProductForm!: FormGroup;
    images: string[] = []; // Store Base64 encoded images

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.addProductForm = this.fb.group({
            name: ['', [Validators.required]],
            price: [null, [Validators.required, Validators.min(1)]],
            description: ['', [Validators.required, Validators.maxLength(500)]],
            stock: [null, [Validators.required, Validators.min(1)]],
            images: [null, [Validators.required]] // Validation for images
        });
    }

    onSubmit() {
        if (this.addProductForm.valid) {
            const productData = {
                name: this.addProductForm.get('name')?.value,
                price: this.addProductForm.get('price')?.value,
                description: this.addProductForm.get('description')?.value,
                stock: this.addProductForm.get('stock')?.value,
                images: this.images // Send the Base64 images as part of the JSON
            };

            console.log('Product Data:', productData);
            // Send `productData` to the backend using your preferred HTTP method (e.g., HttpClient in Angular)
        }
    }

    onImageUpload(event: any) {
        const files = event.files as File[]; // Cast to File[] to avoid type error

        this.images = []; // Reset the images array

        Array.from(files).forEach((file: File) => {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.images.push(e.target.result); // Convert the image to Base64 and store
            this.addProductForm.patchValue({ images: this.images });
          };
          reader.readAsDataURL(file); // Read the file as a data URL (Base64)
        });
      }

}
