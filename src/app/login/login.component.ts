import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()],
    providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  returnUrl: string;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public authenticationService: AuthenticationService,
    private formBuilder: FormBuilder
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
        this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParamMap['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    // this.submitted = true;

    // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value)
      // .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          if (data.Status === 0) {
            Swal.fire(
              'Login Failed!!',
              data.Msg,
              'error'
            );
          } else if (data.Status === 1) {
            this.loading = false;
            // this.router.navigate([this.returnUrl]);
            this.router.navigate(['structure']);
          }
        },
        error => {
          console.log('login error:', error);
          Swal.fire(
            'Login Failed!!',
            'Email or password incorrect.',
            'error'
          );
          // this.alertService.error(error);
          this.loading = false;
        });
  }

  onLoggedin() {
      localStorage.setItem('isLoggedin', 'true');
  }
}
