import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { UMPService } from './ump.service';
import { environment } from '../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import Swal from 'sweetalert2';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

declare var google;
@Component({
  selector: 'app-ump-page',
  templateUrl: './ump.component.html',
  styleUrls: ['./ump.component.scss'],
  providers: [UMPService]
})

export class UMPComponent implements OnInit {

  usersData = [];
  response: any;

  constructor(
    private umpService: UMPService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    Swal.fire({
      title: 'Loading data!',
      text: 'Users are loading, Please wait...',
      onOpen: () => {
        Swal.showLoading();
      }
    });

    this.umpService.getUsersData().subscribe(
      data => {
        this.response = data;
        this.changeDetector.detectChanges();
        Swal.close();
        if (this.response.Status) {
          this.usersData = this.response.Data;
        } else {
          Swal.fire({
            title: 'Failed!!',
            text: this.response.Msg + '',
            icon: 'error'
          });
        }

      },
      error => {
        console.log(error);
        Swal.fire(
          'Failed!!',
          'Registeration Failed :(',
          'error'
        );
        // this.alertService.error(error);
      }
    );
  }

  changeAccess(id, isActive) {
    Swal.fire({
      title: 'Saving data!',
      text: 'Saving data, Please wait...',
      onOpen: () => {
        Swal.showLoading();
      }
    });

    this.umpService.changeUserAccess(id, isActive).subscribe(data => {
      Swal.close();
      this.response = data;
      if (this.response.Status) {
        Swal.fire({
          title: 'Success',
          text: 'Access change Successfull :)',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          onClose: () => {
            this.getUsers();
          }
        });
        // this.getUsers();
      } else {
        Swal.fire({
          title: 'Failed!!',
          text: this.response.Msg + '',
          icon: 'error'
        });
      }

    },
    error => {
      Swal.close();
      Swal.fire(
        'Failed!!',
        'Access change Failed :(',
        'error'
      );
    });
  }
}
