export interface User {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  gender: string;
  address: string;
  dob: string;
  phone: string;
  imageUrl: string;
  coordinate?: Coordinate;
}

export interface Coordinate {
  latitude: string;
  logitude: string;
}
