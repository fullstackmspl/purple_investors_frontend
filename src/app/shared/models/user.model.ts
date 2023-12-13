
  export class User{
      fullname: string;
      email: string;
      dob: string;
      gender: string;
      roles: string;
      password: string;
      phone_number: string;
      location: {
        coordinates: [ string]
      }
      address: string
    constructor(obj?: any) {
        if (!obj) {
            return;
        }
        this.fullname=obj.fullname,
        this.email=obj.email,
        this.dob=obj.dob,
        this.gender=obj.gender,
        this.roles=obj.roles,
        this.password=obj.password,
        this.phone_number=obj.phone_number,
        this.location=obj.location,
        this.address = obj.address
    }
}

