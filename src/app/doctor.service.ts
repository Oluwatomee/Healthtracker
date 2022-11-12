import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions =  {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
const baseAPIURL = 'http://localhost:8080/api/doctor'

@Injectable()
export class DoctorService {
    constructor(private http: HttpClient) {};

    getDoctors() {
        return this.http.get(`${baseAPIURL}/`, httpOptions);
    }

    getDoctor(doctorId: string) {
        return this.http.get(`${baseAPIURL}/details/${doctorId}`, httpOptions);
    }

    addDoctor(data: string) {
        return this.http.post(`${baseAPIURL}/new-doctor`,{ data }).subscribe((res) => {
            console.log(res);
        });
    }

    updateDoctor(doctorId: string, data: string){
        return this.http.put(`${baseAPIURL}/details/${doctorId}`, {data}).subscribe(() => {
            console.log(`updated doctor info with id of: ${doctorId}`);
        });
    }

    deleteDoctor(doctorId: string) {
        return this.http.delete(`${baseAPIURL}/details/${doctorId}`).subscribe(() => {
            console.log(`Deleted doctor info with Id of ${doctorId}`);
        });
        location.reload();
    }
}