import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Return JWT access token' })
  @ApiBody({ type: LoginDto })
  // @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() loginUserDto: LoginDto) {
    const user = await this.authService.validateUser(loginUserDto);
    return this.authService.login(user);
  }

  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: 201, description: 'User successfully created' })
  @Post('register')
  async register(@Body() registerUserDto: RegisterDto) {
    return this.authService.register(registerUserDto);
  }
}
