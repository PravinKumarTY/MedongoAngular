import { Component, OnInit } from '@angular/core';
import { MedongoServiceService } from '../medongo-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http:HttpClient , private medongoService:MedongoServiceService,private router:Router) { }

  submmitLoginForm(userLoginForm){
    this.medongoService.userLogin(userLoginForm.value).subscribe(resData => {
       if(resData.statusCode===200){
         this.medongoService.selectedUser=resData.userInfoList[0];
         localStorage.setItem('userId',this.medongoService.selectedUser.userId);
         if(this.medongoService.selectedUser.userRole==='admin'){
             this.router.navigateByUrl('/admin');
         }else if(this.medongoService.selectedUser.userRole==='operator'){
             this.router.navigateByUrl('/operator');
         }else{
             this.router.navigateByUrl('/doctor');
         }
       }else{
         console.log('user not found');
       }
    });
  }

  ngOnInit() {
  }

}
