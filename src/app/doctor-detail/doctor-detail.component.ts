import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.css']
})
export class DoctorDetailComponent implements OnInit {

   doctor: any = {}; 

  constructor(private route: ActivatedRoute, private router: Router, private apiService: DoctorService) { }

  ngOnInit(): void {
    this.getDoctorDetails(this.route.snapshot.params['id']);
  }
  
  getDoctorDetails(doctorId: any) {
    this.apiService.getDoctor(doctorId).subscribe(data => {
      console.log("printing single object data ===>", data);
      this.doctor = data
    })
  }

  deleteDoctor(doctorId: string){
      this.apiService.deleteDoctor(doctorId);
      this.router.navigate(['/doctors']);
  }
}
