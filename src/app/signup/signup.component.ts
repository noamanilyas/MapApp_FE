import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import  { SignupService } from './signup.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()],
    providers: [SignupService]
})
export class SignupComponent implements OnInit {

	registerForm: FormGroup;
	loading: boolean = false;

  constructor(
  	private signupService:SignupService, 
  	private formBuilder: FormBuilder,
  	private router: Router) {}

  ngOnInit() {
  	this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
     });
  }

  onSubmit() {
    // this.submitted = true;

    // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    this.loading = true;
    this.signupService.registerUser(this.registerForm.value)
      // .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
        	if(data.Status) {
        		Swal.fire(
			        'Success',
			        'Registeration Successfull :)',
			        'success'
			      )
	          // this.alertService.success('Registration successful', true);
	          this.router.navigate(['/login']);
        	} else {
        		Swal.fire(
			        'Failed!!',
			        data.Msg + '',
			        'error'
			      )
        	}
        	
        },
        error => {
        	Swal.fire(
	          'Failed!!',
	          'Registeration Failed :(',
	          'error'
	        )
          // this.alertService.error(error);
          this.loading = false;
        });
  }
}
