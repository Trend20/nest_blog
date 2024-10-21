import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesGuard } from './guards/roles.guard';
import { UserResponseDto } from './dto/user-response.dto';
import { UserQueryDto } from './dto/user-query.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  // @Roles('admin')
  @UseGuards(RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  // @Roles('admin')
  @UseGuards(RolesGuard)
  findAll(@Query() query: UserQueryDto) {
    return this.userService.findAllUsers(query);
  }

  @Get('profile')
  getProfile(@CurrentUser() user: any): Promise<UserResponseDto> {
    return this.userService.findSingleUser(user.id);
  }

  @Get(':id')
  // @Roles('admin')
  @UseGuards(RolesGuard)
  findOne(@Param('id') id: string): Promise<UserResponseDto> {
    return this.userService.findSingleUser(id);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() user: any,
  ): Promise<UserResponseDto> {
    return this.userService.updateUser(id, updateUserDto, user);
  }

  @Patch(':id/change-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  changeUserPassword(
    @Param('id') id: string,
    @Body() changePasswordDto: ChangePasswordDto,
    @CurrentUser() user: any,
  ): Promise<void> {
    return this.userService.changeUserPassword(id, changePasswordDto, user);
  }

  @Delete(':id')
  // @Roles('admin')
  @UseGuards(RolesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  removeUser(@Param('id') id: string, @CurrentUser() user: any): Promise<void> {
    return this.userService.removeUser(id, user);
  }
}
