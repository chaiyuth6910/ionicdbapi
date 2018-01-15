import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CourseServiceProvider } from '../../providers/course-service/course-service'; //import service เขามาใชงาน 
import { Course } from '../../models/course'; //import model เขามาใชงาน 
import { Subscription } from 'rxjs/Subscription'; //import Subscription เพื่อ unsubscribe() ขอมูลจาก Server 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  courses: Course[];   
  sub:Subscription;  
  errorMessage:string;

  constructor(public navCtrl: NavController,public navParams: NavParams, private courseServiceProvider:CourseServiceProvider) { }

  // ดึงรายการคอร์ส
  private getCourses() { 
    this.sub = this.courseServiceProvider.getCourse().subscribe( 
      (res) => this.courses = res,
      (error) => this.errorMessage = <any> error
    )
  }

  ionViewWillEnter(){
    this.getCourses(); //เรียกใช method getCourses()  
  }

  ionViewWillLeave(){
    this.sub.unsubscribe(); // unsubscribe ขอมูลที่มาจาก server 
  }
}
