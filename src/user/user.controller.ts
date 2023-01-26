import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/create-user.dto';
import { User } from '../shared/interfaces/user';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: UserDto): Promise<UserDto> {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  findOne(
    @Req() req: { user: User },
    @Param('id') id: string,
  ): Promise<UserDto> {
    return this.userService.findOne(id, req.user.userId);
  }
}
