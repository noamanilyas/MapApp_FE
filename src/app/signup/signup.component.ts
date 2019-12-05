import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [routerTransition()],
  providers: [SignupService]
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  response: any;

  constructor(
    private signupService: SignupService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }

  onSubmit() {
    // this.submitted = true;

    // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log('invalid');
      return;
    }

    this.loading = true;
    this.signupService.registerUser(this.registerForm.value)
      // .pipe(first())
      .subscribe(
        data => {
          this.response = data;
          this.loading = false;
          if (this.response.Status) {
            Swal.fire({
              title: 'Success',
              text: 'Registeration Successfull :)',
              icon: 'success',
              showConfirmButton: false,
              timer: 2000
            });
            // this.alertService.success('Registration successful', true);
            this.router.navigate(['/login']);
          } else {
            Swal.fire({
              title: 'Failed!!',
              text: this.response.Msg + '',
              icon: 'error'
            });
          }

        },
        error => {
          Swal.fire(
            'Failed!!',
            'Registeration Failed :(',
            'error'
          );
          // this.alertService.error(error);
          this.loading = false;
        });
  }
}
