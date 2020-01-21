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

  selectedPatient: any = {
    apptId: null,
    partyIdFrom: null,
    partyIdTo: null,
    apptDate: null,
    vendorId: null,
    statusCode: null,
    patId: null,
    patName: null,
    address: null,
    email: null,
    phoneNo: null,
    gender: null,
    age: null,
    dob: null,
    height: null,
    weight: null,
    bloodPressure: null,
    sugar: null,
    respiratoryRate: null,
    fever: null,
    feverType: null,
    symptoms: null,
    doctorId: null
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

  registerUser(data){
    return this.http.post<any>(`${this.url}/registerUser`,data, headeroption);
  }

  addVendor(data){
    return this.http.post<any>(`${this.url}/addVendor`,data,headeroption);
  }

  getAllSubCenters(){
    return this.http.get<any>(`${this.url}/getAllSubcenters`);
  }

  getAllAppointments(userId){
    return this.http.get<any>(`${this.url}/getAllAppointments?userId=${userId}`);
  }

  submitConsult(data){
    return this.http.post<any>(`${this.url}/submitConsult`,data,headeroption);
  }

  getAllUsers(){
    return this.http.get<any>(`${this.url}/getAllUsers`);
  }

  generateReport(data){
    return this.http.get<any>(`${this.url}/generateReport?startDate=${data.startDate}&endDate=${data.endDate}&vendorId=${data.vendorId}&doctorId=${data.doctorId}`);
  }

  generateMedReport(data){
    return this.http.get<any>(`${this.url}/generateMedicinesReport?vendorId=${data.vendorId}&doctorId=${data.doctorId}`);
  }
  
  ngOnInit(){
   
  }

}
