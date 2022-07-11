import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { User } from 'src/app/interface/user.interface';
import { UserService } from 'src/app/shared/service/user.service';
import { Response } from '../../interface/response.interface';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  response: Response;
  userInfo: User;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.userService
        .getUser(params.get('uuid')!)
        .subscribe((userData: Response) => {
          console.log('show me data: ', userData);
          this.userInfo = userData.results[0];
        });
    });
  }
}
