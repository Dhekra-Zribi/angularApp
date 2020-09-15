import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { Sms } from '../sms';
  import { from, Observable } from 'rxjs';
  import {NgForm} from '@angular/forms';
import { Router } from '@angular/router'
import { TranscieverService } from '../transciever.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-compagne',
  templateUrl: './compagne.component.html',
  styleUrls: ['./compagne.component.css']
})
export class CompagneComponent implements OnInit {
 
 public userfile :any=File;
 

  form:any=FormGroup;
  public csvFile:any=FileList;
  @ViewChild('csvReader') csvReader: any;  


  constructor(private _service : TranscieverService , private formBuilder: FormBuilder,private _route : Router,
    
    public dialogRef:MatDialogRef<CompagneComponent>) {
    
    this.form = this.formBuilder.group({
      shortMessage:['', Validators.required],
      sourceAddr:['', Validators.required],
      file: [null, Validators.required]
     
    });
  }
 
  get shortMessage() { return this.form.get('shortMessage'); }

  get sourceAddr() { return this.form.get('sourceAddr'); }
  get file() { return this.form.get('file'); }


  ngOnInit(): void {
   
  }

 


  uploadListener(event) {

   const file = event.target.files[0];
   this.userfile=file;
   /* if (event.target.files.length > 0) {

      const selectedFileList = (<HTMLInputElement>document.getElementById('myFile')).files; 
      const file = selectedFileList.item(0); */
      //const file = event.target.files[0];
      //this.form.get('file').setValue(file);
    }
     /* const file = event.target.files[0];
      this.csvFile=file;*/
     
   /* let reader = new FileReader();
 
  if(event.target.files && event.target.files.length) {
    const [file] = event.target.files;
    reader.readAsText(file.files[0]);
  
    reader.onload = () => {
      this.form.patchValue({
        file: reader.result
      });
      
      
    };*/
  
   /* if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('csv').setValue(file);
    }*/



    
  
    sendMultSms(form:FormGroup){
   const sms=form.value;
  

 
    const formData = new FormData();
    formData.append('file',  this.userfile);
    formData.append('sms', JSON.stringify(sms));
    
    

   
    this._service.createMultSms(formData).subscribe(
      data => {
        //alert('Sms send :)');
        console.log("Message send");
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'SMS send.',
          showConfirmButton: false,
          timer: 1500
        })
        window.location.reload();
       //this._route.navigate(['/sms']);
       //this.sendSmsform.reset();
      },
      error => {
        console.log("exception occured");
        
        }
      
     );
    
 
      
    }


    close(){
      this.dialogRef.close();
      window.location.reload();
      
    }
  }
  
  

 

