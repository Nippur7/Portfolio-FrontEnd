import { Component, OnInit } from '@angular/core';
import { ToastPackage, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-toast-component',
  templateUrl: './toast-component.component.html',
  styleUrls: ['./toast-component.component.scss']
})
export class ToastComponentComponent implements OnInit {

  toastPackage!: ToastPackage;

  constructor(private toastrService: ToastrService) { }

  ngOnInit(): void {
  }

  confirm(): void {
    this.toastPackage.triggerAction();
    this.toastrService.clear(this.toastPackage.toastId);
    console.log('Borrado confirmado');
  }

  cancel(): void {
    this.toastrService.clear(this.toastPackage.toastId);
    console.log('Borrado cancelado');
  }
}
