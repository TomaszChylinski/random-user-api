import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/service/user.service';
import { Response } from '../../interface/response.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  userData: Response;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers(15).subscribe((results) => {
      console.log('show me data', results);
      this.userData = results;
    });
  }
}
