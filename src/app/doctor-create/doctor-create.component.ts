import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctor-create',
  templateUrl: './doctor-create.component.html',
  styleUrls: ['./doctor-create.component.css']
})
export class DoctorCreateComponent implements OnInit {

  doctorForm!: FormGroup;
  firstName:string='';
  lastName:string='';
  email:string='';
  contact:string='';
  specialization:string='';
  medical_center:string='';
  location:string='';
  years_of_practice:string='';
  


  constructor(private formBuilder: FormBuilder, private apiService: DoctorService, private router: Router, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.doctorForm = this.formBuilder.group({
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'email': [null, Validators.required],
      'contact': [null, Validators.required],
      'specialization': [null, Validators.required],
      'medical_center': [null, Validators.required],
      'location': [null, Validators.required], 
      'years_of_practice': [null, Validators.required]     

    });

  }

 
  onSubmit() {
    console.log("msg from angular ===> " , this.doctorForm.value)
      this.apiService.addDoctor(this.doctorForm.value);
     this.router.navigate(['/doctors']);
  }

}
