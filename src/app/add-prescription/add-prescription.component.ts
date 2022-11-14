import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { PrescriptionService } from '../prescription.service';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.css']
})
export class AddPrescriptionComponent implements OnInit {
  @Input() dName: string = "";
  @Input() strength: string = "";

  public mode = 'Add'; //default mode
  private id: any; //student ID
  private prescription: any;

  //initialize the call using StudentService 
constructor(private _myService: PrescriptionService, private router:Router, public route: ActivatedRoute) { }

ngOnInit() {
  this.route.paramMap.subscribe((paramMap: ParamMap ) => {
      if (paramMap.has('_id')){
          this.mode = 'Edit'; /*request had a parameter _id */ 
          this.id = paramMap.get('_id');

           //request student info based on the id
          this._myService.getPrescription(this.id).subscribe(
              data => { 
                  //read data and assign to private variable student
                  this.prescription = data;

                  console.log("printing data =>>>>> ", data)
                  console.log("printing prescritpion  =>>>>> ", this.prescription);
                  //populate the firstName and lastName on the page
                  //notice that this is done through the two-way bindings
                  this.dName = this.prescription.dName;
                  this.strength = this.prescription.strength;

                  //populate the firstName and lastName on the page
                  //notice that this is done through the two-way bindings
                  this.dName = this.prescription.firstName;
                  this.strength = this.prescription.lastName;

              },
              err => console.error(err),
              () => console.log('finished loading')
          );
      } 
      else {
          this.mode = 'Add';
          this.id = null; 
      }
  });
}
 
 
  onSubmit(){
      console.log("You submitted: " + this.dName + " " + this.strength);

      if (this.mode == 'Add') {
        this._myService.addPrescriptions(this.dName ,this.strength);
        this.router.navigate(['/listPrescriptions']);
      }
     
      if (this.mode == 'Edit') 

      if (this.mode == 'Add')
      this._myService.addPrescriptions(this.dName ,this.strength);
      if (this.mode == 'Edit')

      this._myService.updatePrescription(this.id,this.dName ,this.strength);
      this.router.navigate(['/listPrescriptions']);
    }

  
 

}