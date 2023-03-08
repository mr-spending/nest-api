import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';

import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UserTokenData } from '../shared/interfaces/user';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: UserDto): Promise<UserDto> {
    return this.userService.create(createUserDto) as Promise<UserDto>;
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserDto> {
    return this.userService.findOne(id) as Promise<UserDto>;
  }

  @Patch()
  update(
    @Req() req: { user: UserTokenData },
    @Body() payload: UserDto,
  ): Promise<UserDto> {
    return this.userService.update(req.user.userId, payload) as Promise<UserDto>;
  }
}
