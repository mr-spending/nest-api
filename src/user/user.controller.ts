import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UserTokenData } from '../shared/interfaces/user';
import { User } from './schema/user.schema';
import { SpendingDto } from '../spending/dto/spending.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({ status: 201, type: UserDto })
  create(@Body() createUserDto: UserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: UserDto })
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Patch()
  @ApiResponse({ status: 200, type: UserDto })
  update(
    @Req() req: { user: UserTokenData },
    @Body() payload: UserDto,
  ): Promise<User> {
    return this.userService.update(req.user.userId, payload);
  }
}
