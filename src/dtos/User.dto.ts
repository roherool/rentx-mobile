export interface UserDTO {
  user: {
    id: string;
    name: string;
    email: string;
    driverLicense: string;
    password?: string;
  };
}
