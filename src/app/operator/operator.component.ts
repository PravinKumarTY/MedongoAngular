import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { MedongoServiceService } from '../medongo-service.service';
@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.css']
})
export class OperatorComponent implements OnInit {
  //form: FormGroup;
  doctors:any = [];
  patients:any=[];

  constructor(private formBuilder: FormBuilder,private medongoService:MedongoServiceService) {  }

  form = this.formBuilder.group({
    patName:[''],
    address:[''],
    email:[''],
    phoneNo:[''],
    gender:[''],
    dob:[''],
    age:[''],
    height:[''],
    bloodPressure:[''],
    respiratoryRate:[''],
    feverType:[''],
    symptoms:[''],
    doctorId: ['']
  });

  registerPatForm=false;
  viewPatData=false;

  showRegPatForm(){
    this.registerPatForm=true;
    this.viewPatData=false;

    this.medongoService.getAllDoctors().subscribe(res=>{
      this.doctors=res.userInfoList;
    },)

  }

  showViewPatientDiv(){
    this.viewPatData=true;
    this.registerPatForm=false;
    this.medongoService.viewPatientDetails().subscribe(res=>{
       this.patients=res.patInfoList;
    })

  }

  registerPatient(patRegistrationForm){
   console.log(patRegistrationForm.value);
   this.medongoService.registerPatient(patRegistrationForm.value).subscribe(resData=>{
     console.log(resData);
     if(resData.status=='success'){
      alert('Consult Created Successfully.')
      patRegistrationForm.reset();
      this.registerPatForm=false;
      this.showViewPatientDiv();
     }
     
   },err=>{
     console.log(err)
   })
  }
  
  ngOnInit() {
   this.showViewPatientDiv();
  }

}
