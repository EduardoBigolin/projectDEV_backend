export interface UserDTO {
  id?: string;
  name: string;
  email: string;
  password: string | null;
  dateOfBirth: string;
  isAdmin?: boolean;
  photoFile?: string;
  isActived?: boolean;
  classId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
