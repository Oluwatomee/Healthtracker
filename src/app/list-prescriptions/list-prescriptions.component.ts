import { Component, OnInit } from '@angular/core';
import { PrescriptionService } from '../prescription.service';

@Component({
  selector: 'app-list-prescriptions',
  templateUrl: './list-prescriptions.component.html',
  styleUrls: ['./list-prescriptions.component.css']
})
export class ListPrescriptionsComponent implements OnInit{


  //declare variable to hold response and make it public to be accessible from components.html
  public prescriptions: any;
  //initialize the call using StudentService 
  constructor(private _myService: PrescriptionService) { }
  ngOnInit() {
      this.getPrescriptions();
  }
  //method called OnInit
  getPrescriptions() {
    this._myService.getPrescriptions().subscribe(
      //read data and assign to public variable students
      data => { this.prescriptions = data},
      err => console.error(err),
      () => console.log('finished loading')
    );
  }

  onDelete(prescriptionId: string) {
    this._myService.deletePrescription(prescriptionId);
}
}
