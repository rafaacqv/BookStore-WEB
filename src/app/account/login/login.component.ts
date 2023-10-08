import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomErrorStateMatcher } from 'src/app/core/form-validators/CustomErrorStateMatcher ';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  returnUrl: string;

  matcher = new CustomErrorStateMatcher();

  constructor(private accountService: AccountService, private router: Router,
    private activatedRoute: ActivatedRoute){
      this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    }

  onSubmit() {
    if(!this.loginForm.invalid) {
      this.accountService.login(this.loginForm.value).subscribe({
        next: () => this.router.navigateByUrl(this.returnUrl)
      })
    }
  }
}
