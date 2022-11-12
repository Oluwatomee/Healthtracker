import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DoctorService } from '../doctor.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.css']
})
export class DoctorEditComponent implements OnInit {

  doctorForm!: FormGroup;
  firstName:string='';
  lastName:string='';
  email:string='';
  contact:string='';
  specialization:string='';
  medical_center:string='';
  location:string='';
  years_of_practice:string='';

  constructor(private apiService: DoctorService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  private doctor: any;
  private id: any

  ngOnInit(): void {
    this.getDoctor(this.route.snapshot.params['id']);
    this.doctorForm = this.formBuilder.group({
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'email': [null, Validators.required],
      'contact': [null, Validators.required],
      'specialization': [null, Validators.required],
      'medical_center': [null, Validators.required],
      'location': [null, Validators.required], 
      'years_of_practice': [null, Validators.required]     

    })

  }
  
  getDoctor(id: any){
    this.apiService.getDoctor(id).subscribe(data => {
      console.log("printing data in edit ====> ", data);
       this.doctor = data;
       console.log("printing data in edit ====> ",this.doctor.years_of_practice);
      this.id = this.doctor._id;
      this.doctorForm.setValue({
        firstName: this.doctor.firstName,
        lastName: this.doctor.lastName,
        email: this.doctor.email,
        contact: this.doctor.contact,
        specialization: this.doctor.specialization,
        medical_center: this.doctor.medical_center,
        location: this.doctor.location,
        years_of_practice: this.doctor.years_of_practice
    });
  });
}

onSubmit(){
  console.log("form values to be updated ====> ", this.doctorForm.value);
  this.apiService.updateDoctor(this.id, this.doctorForm.value);
  this.router.navigate(['/doctor/details/', this.id])
  }
}

