import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { CustomErrorStateMatcher } from 'src/app/core/form-validators/CustomErrorStateMatcher ';
import { SnackBarService } from 'src/app/core/material/snackbar.service';
import { debounceTime, finalize, map, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private fb: FormBuilder,
              private accountService: AccountService,
              private router: Router,
              private snackbarService: SnackBarService) {}


  matcher = new CustomErrorStateMatcher();
  strongPassword = "(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$"
  errors: string[] | null = null;

  registerForm = this.fb.group({
    displayName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email], [this.validateEmailNotInUse()]],
    password: ['', [Validators.required, Validators.pattern(this.strongPassword)]],
  });

  onSubmit() {
    if(!this.registerForm.invalid) {
      this.accountService.register(this.registerForm.value).subscribe({
        next: () => this.router.navigateByUrl('/'),
        error: error => this.snackbarService.error(error.errors[0])
      });
    }
  }

  validateEmailNotInUse(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        debounceTime(1000),
        take(1),
        switchMap(() => {
          return this.accountService.checkEmailExists(control.value).pipe(
            map(result => result ? {emailExists: true} : null),
            finalize(() => control.markAsTouched())
          )
        })
      )
    }
  }
}
