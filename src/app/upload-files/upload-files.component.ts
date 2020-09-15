import { Component, OnInit } from '@angular/core';
import { UploadFilesService } from 'src/app/upload-files.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {

  selectedFiles: FileList;
  progressInfos = [];
  message = '';
  msg ='';
  ex = 'undefined';
  searchText;
  fileInfos: Observable<any>;
  p :number = 1;
  user : string;

  constructor(private uploadService: UploadFilesService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.user= this.tokenStorage.getUser().userName;
    this.fileInfos = this.uploadService.getFiles(this.user);
    
    
  }

  selectFiles(event): void {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;

  }

  uploadFiles(): void {
    this.message = '';
  
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }
  upload(idx, file): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name, user : file.user };
  
    this.uploadService.upload(this.user, file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.fileInfos = this.uploadService.getFiles(this.user);
        }
      },
      err => {
        this.progressInfos[idx].value = 0;
        this.msg= err.error.message;
        //if (this.msg.startsWith("undefined")) {}
        if (this.msg != "File already exist!"){
          this.msg = 'File size > 256MB ! Could not upload ' + file.name;
        }
        this.message = this.msg;
        console.log(err.error.message);
        
        //'File size > 30GB ! Could not upload ' + file.name;
      });
  }

  show(name : string): void{
    this.uploadService.show(name,this.user).subscribe(
      data => {
        console.log("ok"+data.data);
      },
      err => {
        console.log("non",err.error.message);
      })
  }


 deleteFile(name : string): void{
  Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to delete this record!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it',
  }).then((result) => {

    if (result.isConfirmed) {

      this.uploadService.deleteFile(name,this.user).subscribe();
    window.location.reload();
      console.log('Clicked Yes, File deleted!');

    } else if (result.isDismissed) {

      console.log('Clicked No, File is safe!');

      
    }
  })
}
    
}
