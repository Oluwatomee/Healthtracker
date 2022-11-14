import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//we know that response will be in JSON format
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PrescriptionService {

    constructor(private http:HttpClient) {}

    // Uses http.get() to load data 
    getPrescriptions() {
        return this.http.get('http://localhost:8080/prescriptions');
    }
    

    //Uses http.post() to post data 
    addPrescriptions(dName: string, strength: string) {
        this.http.post('http://localhost:8080/prescriptions',{ dName, strength })
            .subscribe((responseData) => {
                console.log(responseData);
            }); 
    }

    updatePrescription(prescriptionId: string,dName: string, strength: string) {
        //request path http://localhost:8000/prescriptions/5xbd456xx 
        //first and last names will be send as HTTP body parameters 
        this.http.put("http://localhost:8080/prescriptions/" + 
        prescriptionId,{ dName, strength })
        .subscribe(() => {
            console.log('Updated: ' + prescriptionId);
        });
    }

    deletePrescription(prescriptionId: string) {
        this.http.delete("http://localhost:8080/prescriptions/" + prescriptionId)
            .subscribe(() => {
                console.log('Deleted: ' + prescriptionId);
            });
            location.reload();
    }

    //Uses http.get() to request data based on student id 
    getPrescription(prescriptionId: string) {
        return this.http.get('http://localhost:8080/prescriptions/'+ prescriptionId);
    }
}