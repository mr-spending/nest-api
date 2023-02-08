import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserTokenData } from '../shared/interfaces/user';
import { User } from './schema/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: UserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Patch()
  update(
    @Req() req: { user: UserTokenData },
    @Body() payload: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(req.user.userId, payload);
  }
}
