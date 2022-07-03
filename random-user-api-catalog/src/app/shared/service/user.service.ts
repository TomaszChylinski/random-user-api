import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../../interface/response.interface';
import { User } from '../../interface/user.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl: string = 'https://randomuser.me/api';

  constructor(private http: HttpClient) {}

  // Fetch users
  getUsers(size: number = 10): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/?results=${size}`)
      .pipe(map((response) => this.processResponse(response)));
  }

  // Fetch one user the user id
  getUser(id: number = 1): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/?uuid=${id}`).pipe(
      map((response) => {
        this.processResponse(response);
      })
    );
  }

  private processResponse(response: Response): Response {
    return {
      info: { ...response.info },
      results: response.results.map(
        (user: any) =>
          <User>{
            uuid: user.login.uuid,
            firstName: user.name.first,
            lastName: user.name.last,
            email: user.email,
            userName: user.login.username,
            gender: user.gender,
            address: `${user.location.city} ${user.location.state}  ${user.location.country}`,
            dob: user.dob.date,
            phone: user.cell,
            imageUrl: user.picture.medium,
            coordinate: {
              latitude: user.location.coordinates.latitude,
              logitude: user.location.coordinates.logitude,
            },
          }
      ),
    };
  }
}
