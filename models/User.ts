export class User {
  id: string;
  email: string;
  name: string;

  constructor(userResponse: any) {
    this.id = userResponse.id;
    this.email = userResponse.email;
    this.name = userResponse.name;
  }
}
