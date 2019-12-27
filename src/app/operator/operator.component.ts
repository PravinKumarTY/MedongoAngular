import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { of } from 'rxjs';
import { MedongoServiceService } from '../medongo-service.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.css']
})
export class OperatorComponent implements OnInit {
  //form: FormGroup;
  doctors:any = [];
  patients:any=[];

  constructor(private formBuilder: FormBuilder,private medongoService:MedongoServiceService) { 
  
    
  }

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
    doctors: ['']
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
       this.patients=res;
      console.log(this.patients);
    })

  }

  registerPatient(patRegistrationForm){
   console.log(patRegistrationForm.value);
   this.medongoService.registerPatient(patRegistrationForm.value).subscribe(resData=>{
     console.log(resData);
   },err=>{
     console.log(err)
   })
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}
