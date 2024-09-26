import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload'; // For file upload (avatar)
import { InputTextModule } from 'primeng/inputtext'; // For input fields
import { PasswordModule } from 'primeng/password'; // For password input
import { ButtonModule } from 'primeng/button'; // For buttons
import { AvatarModule } from 'primeng/avatar'; // For avatar display
import { CommonModule } from '@angular/common'; // For common directives
import { RippleModule } from 'primeng/ripple'; // For ripple effect
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-seller',
    standalone: true,
    imports: [
        CommonModule,
        FileUploadModule,
        InputTextModule,
        PasswordModule,
        ButtonModule,
        AvatarModule,
        CardModule,
        RippleModule,
        ReactiveFormsModule,
        ToastModule,
    ],
    templateUrl: './seller.component.html',
    styleUrls: ['./seller.component.css'],
    providers: [MessageService]
})
export class SellerComponent {
    sellerForm: FormGroup;
    uploadedAvatar: any;

    constructor(private fb: FormBuilder, private sellerService: SellerService, private messageService: MessageService, private router: Router) {
        this.sellerForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }


    onSubmit() {
        if (this.sellerForm.valid) {
            const sellerData = { ...this.sellerForm.value };
            this.sellerService.userSignUp(sellerData).subscribe({
                next: (response: any) => {
                    this.showToast('success', 'Registration Successful', response.msg || 'You have registered successfully.');
                    this.router.navigate(["login"])
                },
                error: (error) => {
                    this.showToast('error', 'Registration Failed', error.error.msg || 'An error occurred during registration.');
                }
            });
        }
    }

    showToast(severity: string, summary: string, detail: string) {
        this.messageService.add({ severity, summary, detail });
    }
}
