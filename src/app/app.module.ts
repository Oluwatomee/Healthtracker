import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DoctorService } from './doctor.service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { DoctorCreateComponent } from './doctor-create/doctor-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorDetailComponent } from './doctor-detail/doctor-detail.component';
import { DoctorEditComponent } from './doctor-edit/doctor-edit.component';
import { AddPrescriptionComponent } from './add-prescription/add-prescription.component';
import { ListPrescriptionsComponent } from './list-prescriptions/list-prescriptions.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PrescriptionService } from './prescription.service';

const appRoutes: Routes = [ 
  {
    path: 'doctors',
    component: DoctorComponent,
    data: { title: 'Doctor List'}
  },
  {
    path: 'doctor/details/:id', 
    component: DoctorDetailComponent,
    data: { title: 'Doctor Details' }
  },
  {
    path: 'doctor-create/new', 
    component: DoctorCreateComponent,
    data: { title: 'Add New Doctor Info'}
  },
  {
    path: 'doctor/edit/:id',
    component: DoctorEditComponent,
    data: { title: 'Edit Doctor Info'}
  },
  {
    path: 'addPrescription',  //when students added 
    component: AddPrescriptionComponent
  }, 
  {
    path: 'listPrescriptions',  //when students listed
    component: ListPrescriptionsComponent
  }, 
  {
    path: 'editPrescription/:_id', //when students edited 
    component: AddPrescriptionComponent 
  }, 
  {
    path: '',
   component: WelcomeComponent,
   data: { title: 'Home '}
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  }, 
  {
    path: 'addPrescription',  //when students added 
    component: AddPrescriptionComponent
  }, 
  {
    path: 'listPrescriptions',  //when students listed
    component: ListPrescriptionsComponent
  }, 
  {
    path: 'editPrescription/:_id', //when students edited 
    component: AddPrescriptionComponent 
  }, 

  {
    path: '**',  //when path cannot be found
    component: NotFoundComponent
  }
    
];

@NgModule({
  declarations: [
    AppComponent,
    DoctorCreateComponent,
    DoctorComponent,
    DoctorDetailComponent,
    DoctorEditComponent,
    AddPrescriptionComponent,
    ListPrescriptionsComponent,
    NotFoundComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule

  ],
  providers: [DoctorService, PrescriptionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
