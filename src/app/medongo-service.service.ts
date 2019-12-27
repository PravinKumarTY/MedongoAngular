import { Injectable, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
const headeroption = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class MedongoServiceService implements OnInit{

  url:string= 'http://localhost:8080/medongo';

  selectedUser:any={
    userId:null,
    userName:null,
    userRole:null,
    userEmail:null,
    userPassword:null,
    dob:null,
    age:null,
    adharId:null,
    panId:null,
    voterId:null,
    phoneNo:null
  }

  
  constructor(private http:HttpClient) { }

  userLogin(data){
     return this.http.get<any>(`${this.url}/login?userEmail=${data.userEmail}&userPassword=${data.userPassword}`, headeroption);
  }

  registerPatient(data){
    return this.http.post(`${this.url}/registerPatient`,data,headeroption);
  }

  getAllDoctors(){
    return this.http.get<any>(`${this.url}/getAllDoctors`);
  }
  viewPatientDetails(){
    return this.http.get<any>(`${this.url}/getAllPatient`);
  }

  ngOnInit(){
   
  }

}
