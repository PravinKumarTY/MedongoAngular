import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { MedongoServiceService } from '../medongo-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  addUserForm = false;
  addVendorForm = false;
  showUserDataTable = true;
  viewReportCard = false;
  showPrescribedList = false;
  showMedList = false;
  showPrescriptionData = false;

  subcenters: any = [];
  allUsersList: any = [];
  doctors: any = [];
  patientList: any = [];
  totalConsumedMedDetails: any = [];




  constructor(private formBuilder: FormBuilder, private medongoService: MedongoServiceService) { }
  form = this.formBuilder.group({
    userName: [''],
    userEmail: [''],
    phoneNo: [''],
    gender: [''],
    dob: [''],
    userRole: [''],
    vendorId: [''],
    adharId: [''],
    panId: [''],
    voterId: ['']
  });

  vendorform = this.formBuilder.group({
    vendorName: [''],
    block: [''],
    pinCode: ['']
  })

  reportForm = this.formBuilder.group({
    startDate: [''],
    endDate: [''],
    vendorId: [''],
    doctorId: ['']
  });

  medicineReportForm = this.formBuilder.group({
    vendorId: [''],
    doctorId: ['']
  });

  showUserForm() {
    this.addUserForm = true;
    this.addVendorForm = false;
    this.showUserDataTable = false;
    this.viewReportCard = false;
    this.showPrescribedList = false;
    this.showMedList = false;
    this.showPrescriptionData = false;
  }

  getAllSubcenters() {
    this.medongoService.getAllSubCenters().subscribe(res => {
      this.subcenters = res.subCentersList;

    })
  }
  getAllDoctors() {
    this.medongoService.getAllDoctors().subscribe(res => {
      this.doctors = res.userInfoList;
    })
  }

  showVendorForm() {
    this.addVendorForm = true;
    this.addUserForm = false;
    this.showUserDataTable = false;
    this.viewReportCard = false;
    this.showPrescribedList = false;
    this.showMedList = false;
    this.showPrescriptionData = false;
  }



  registerUser() {

    console.log(this.form.value);

    this.medongoService.registerUser(this.form.value).subscribe(res => {
      this.form.reset();
      this.addUserForm = false;
      alert('User Registered successfully.');

      this.addVendorForm = false;

      this.showUserDataTable = true;

    }, err => {
      console.log("User does not registered.");
    })
  }

  addVendor() {

    this.medongoService.addVendor(this.vendorform.value).subscribe(res => {
      this.vendorform.reset();
      this.addVendorForm = false;
      alert('Subcenter added successfully.')
      this.showUserDataTable = true;
    }, err => {
      console.log(err);
    })
  }

  showViewReportCard() {
    this.addUserForm = false;
    this.addVendorForm = false;
    this.showUserDataTable = false;
    this.viewReportCard = true;
    this.showMedList = false;
    this.showPrescriptionData = false;
    this.getAllSubcenters();
  }

  showViewInventoryCard() {
    this.showMedList = true;
    this.addUserForm = false;
    this.addVendorForm = false;
    this.showUserDataTable = false;
    this.viewReportCard = false;
    console.log(this.showMedList);
  }

  generateReport() {
    this.showPrescribedList = false;
    this.medongoService.generateReport(this.reportForm.value).subscribe(res => {
      if (res.masterDtoList !== null) {
        this.showPrescribedList = true;
        this.patientList = res.masterDtoList;
        this.reportForm.reset();
      } else {
        this.showPrescribedList = false;
        this.reportForm.reset();
        alert('No Patient Record Found..');
      }

    }, err => {
      console.log(err);
    })
  }

  generateMedicineReport() {
    console.log(this.medicineReportForm.value);
    this.medongoService.generateMedReport(this.medicineReportForm.value).subscribe(resData => {
      if (resData.masterDtoList !== null) {
        this.showPrescriptionData = true;
        for (let med of resData.masterDtoList) {
          for (let eachMed of med.prescriptionDet) {
            let prescribedMedicinesName = {
              apptId: '',
              medicineType: '',
              medicineName: '',
              freequency: '',
              dose: '',
              days: ''
            }

            prescribedMedicinesName.apptId = med.apptId;
            prescribedMedicinesName.medicineType = eachMed.medicineType;
            prescribedMedicinesName.medicineName = eachMed.medicineName;
            prescribedMedicinesName.freequency = eachMed.freequency;
            this.totalConsumedMedDetails.push(prescribedMedicinesName);
            this.medicineReportForm.reset();
          }
        }
      }else{
        this.showPrescriptionData = false;
        alert('No Medicine Record Found.')
        this.medicineReportForm.reset();
      }

    }, err => {
      console.log(err);
    })
    console.log(this.totalConsumedMedDetails);
  }

  getAllUsersDet() {
    this.medongoService.getAllUsers().subscribe(resData => {
      this.allUsersList = resData.masterDtoList;
      console.log(this.allUsersList);
    }, err => {
      console.log(err);
    })
  }

  ngOnInit() {
    this.getAllUsersDet();
    this.getAllSubcenters();
    this.getAllDoctors();
  }

}
