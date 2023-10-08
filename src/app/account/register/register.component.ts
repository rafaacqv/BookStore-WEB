import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { CustomErrorStateMatcher } from 'src/app/core/form-validators/CustomErrorStateMatcher ';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private fb: FormBuilder,
              private accountService: AccountService,
              private router: Router) {}


  matcher = new CustomErrorStateMatcher();
  strongPassword = "(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$"
  errors: string[] | null = null;

  registerForm = this.fb.group({
    displayName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(this.strongPassword)]],
  });

  onSubmit() {
    if(!this.registerForm.invalid) {
      this.accountService.register(this.registerForm.value).subscribe({
        next: () => this.router.navigateByUrl('/'),
        error: error => this.errors = error.errors
      });
    }
  }
}
