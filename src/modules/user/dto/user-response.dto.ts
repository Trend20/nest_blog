export class UserResponseDto {
  id: string;
  username: string;
  email: string;
  role: string;
  title?: string;
  createdAt: Date;
  updatedAt: Date;
}
