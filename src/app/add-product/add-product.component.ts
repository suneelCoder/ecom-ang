import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';
import { SellerService } from '../services/seller.service';
import { FileUpload } from 'primeng/fileupload';  // Import FileUpload

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
    images: string[] = [];
    isLoading = false;  // Loader flag
    isSuccess = false;  // Success message flag

    @ViewChild('fileUpload') fileUpload!: FileUpload;  // ViewChild for FileUpload

    constructor(private fb: FormBuilder, private sellerService: SellerService) { }

    ngOnInit() {
        this.addProductForm = this.fb.group({
            name: ['', [Validators.required]],
            price: [null, [Validators.required, Validators.min(1)]],
            description: ['', [Validators.required, Validators.maxLength(500)]],
            stock: [null, [Validators.required, Validators.min(1)]],
            images: [null, [Validators.required]]  // Validation for images
        });
    }

    onSubmit() {
        if (this.addProductForm.valid) {
            this.isLoading = true;  // Start loader
            const productData = {
                name: this.addProductForm.get('name')?.value,
                price: this.addProductForm.get('price')?.value,
                description: this.addProductForm.get('description')?.value,
                stock: this.addProductForm.get('stock')?.value,
                images: this.images
            };

            this.sellerService.createProduct(productData).subscribe(
                (response) => {
                    console.log('Product Created:', response);
                    this.isSuccess = true;  // Show success message
                    this.isLoading = false;  // Stop loader
                    this.addProductForm.reset();  // Reset the form
                    this.images = [];  // Clear images
                    this.fileUpload.clear();  // Clear the file upload component
                },
                (error) => {
                    console.error('Error creating product:', error);
                    this.isLoading = false;  // Stop loader
                }
            );
        }
    }

    onImageUpload(event: any) {
        const files = event.files as File[];
        this.images = [];

        Array.from(files).forEach((file: File) => {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.images.push(e.target.result);
                this.addProductForm.patchValue({ images: this.images });
            };
            reader.readAsDataURL(file);
        });
    }
}
