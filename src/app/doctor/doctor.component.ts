import { Component, OnInit } from '@angular/core';
import { MedongoServiceService } from '../medongo-service.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  prescriptionForm: FormGroup;
  appointmentList:any=[];
  showConsultaionForm=false;
  
  constructor(private medongoService:MedongoServiceService,private formBuilder: FormBuilder) { 
    this.prescriptionForm = this.formBuilder.group({
        apptId:this.formBuilder.control(''),
        prescriptionDet: this.formBuilder.array([
        this.addMed()
      ]),
      advice: this.formBuilder.control('')
    });
  }
  addMed(): FormGroup {
    return this.formBuilder.group({
      medicineType: this.formBuilder.control(''),
      medicineName: this.formBuilder.control(''),
      dose:this.formBuilder.control(''),
      days:this.formBuilder.control(''),
      freequency:this.formBuilder.control('')
    })
  }

  addMedcine(){
    (this.prescriptionForm.get('prescriptionDet') as FormArray).push(this.addMed());
  }

  removeCandidate(i:number){
    (this.prescriptionForm.get('prescriptionDet') as FormArray).removeAt(i);
  }

  startConsult(appointment){
    this.showConsultaionForm=true;
    this.medongoService.selectedPatient=appointment;
  }
  submitConsult(){
    console.log(this.prescriptionForm.value);
    this.medongoService.submitConsult(this.prescriptionForm.value).subscribe(res=>{
      console.log('consult successful.');
      this.prescriptionForm.reset();
      this.showConsultaionForm=false;
      this.getAllAppt();
    },err=>{
      console.log('consult successful.');
    })
  }
  
  getAllAppt(){
    this.medongoService.getAllAppointments(localStorage.getItem('userId')).subscribe(resData=>{
      this.appointmentList=resData.masterDtoList;
      console.log(this.appointmentList);
    })

  }
  ngOnInit() {
    this.getAllAppt();
  }

}
