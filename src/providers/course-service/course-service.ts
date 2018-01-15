import { Injectable } from '@angular/core'; 
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';  
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch'; 
import 'rxjs/add/observable/throw'; 
import { Course } from '../../models/course'; //import model เขามาใชงาน

@Injectable()
export class CourseServiceProvider {

  constructor(public http: Http) { }     
  
  //ดึงขอมูลจาก Backend ดวย method get() ตาม URL ที่ระบุไว 
  //คําสั่ง .map() ใหพิมพติดกันกับ .get() กอนคอย enter ลงมาได  
  //<Course[]> res.json() แปลง json จากฝง backend ใหกับโมเดล คลาส Course

  getCourse():Observable<Course[]> { 
    return this.http.get('https://codingthailand.com/api/get_courses.php')
    .map((res:Response) => <Course[]> res.json())
    .catch(this.handleError); 
  }

  //method handleError เปน method สําหรับดักจับขอผิดพลาดที่สงมาจาก Backend 
  // error.json().errorMessage คําสั่ง .errorMessage เปน name ของ json ในสวนของ Backend ขึ้นกับวาตั้งอะไรไว 
  //หากไมมี error สงมาจาก Backend จะใชขอความ 'เกิดขอผิดพลาดจาก Server' แทน 
  private handleError(error:any) { 
    return Observable.throw(error.json().errorMessage || 'เกิดขอผิดพลาดจาก Server'); 
  }
}
