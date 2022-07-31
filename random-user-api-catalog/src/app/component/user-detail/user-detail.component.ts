import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { from } from 'rxjs';
import { Coordinate, User } from 'src/app/interface/user.interface';
import { UserService } from 'src/app/shared/service/user.service';
import { Response } from '../../interface/response.interface';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  response: Response;
  userInfo: User;
  editMode: 'edit' | 'locked' = 'locked';
  buttonText: 'Save Changes' | 'Edit' = 'Edit';

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userInfo = <User>(
      this.activatedRoute.snapshot.data['resolvedResponse'].results[0]
    );

    console.log('show me user info', this.userInfo);
    this.loadMap(
      this.userInfo.coordinate.latitude,
      this.userInfo.coordinate.longitude
    );
    // this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
    //   this.userService
    //     .getUser(params.get('uuid')!)
    //     .subscribe((userData: Response) => {
    //       console.log('show me data: ', userData);
    //       this.userInfo = userData.results[0];
    //     });
    // });
  }

  changeMode(editMode: 'edit' | 'locked'): void {
    this.editMode = this.editMode === 'locked' ? 'edit' : 'locked';
    this.buttonText = this.buttonText === 'Edit' ? 'Save Changes' : 'Edit';
  }

  private loadMap(latitude: number, logitude: number) {
    // const latitude = coordinate.latitude;
    // const logitude = coordinate.logitude;

    const map = Leaflet.map('map', {
      center: [latitude, logitude],
      zoom: 8,
    });
    const mainLayer = Leaflet.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        tileSize: 512,
        minZoom: -1,
        maxZoom: 30,
        crossOrigin: true,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    );
    mainLayer.addTo(map);
  }
}
