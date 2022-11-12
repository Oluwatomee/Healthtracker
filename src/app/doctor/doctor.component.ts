import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';


@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
   
  public doctors: any;
  constructor(private apiService: DoctorService) { }

  ngOnInit(): void {
    this.getAllDoctors();
  }

  getAllDoctors() {
      this.apiService.getDoctors().subscribe(data => {
         this.doctors = data
      }, err => {
        console.log(err),
        () => console.log('finished loading data!!!!')
      })
  }

}
