import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { CategoryDto, UserDto } from './dto/user.dto';
import { UserTokenData } from '../shared/interfaces/user';
import { User } from './schema/user.schema';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /** USER **/

  @Post()
  @ApiResponse({ status: 201, type: UserDto })
  async create(@Body() createUserDto: UserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: UserDto })
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Patch()
  @ApiResponse({ status: 200, type: UserDto })
  async update(
    @Req() req: { user: UserTokenData },
    @Body() payload: UserDto,
  ): Promise<User> {
    return await this.userService.update(req.user.userId, payload);
  }

  /** USER CATEGORIES **/

  @Post('/categories')
  @ApiResponse({ status: 201, type: CategoryDto })
  async createCategory(
    @Req() req: { user: UserTokenData },
    @Body() createCategoryDto: CategoryDto
  ): Promise<User> {
    return await this.userService.createCategory(req.user.userId, createCategoryDto);
  }

  @Patch('/categories')
  @ApiResponse({ status: 200, type: CategoryDto })
  async updateCategory(
    @Req() req: { user: UserTokenData },
    @Body() updateCategoryDto: CategoryDto,
  ): Promise<User> {
    return await this.userService.updateCategory(updateCategoryDto, req.user.userId);
  }

  @Delete('/categories/:id')
  @ApiResponse({ status: 200 })
  async removeCategory(
    @Req() req: { user: UserTokenData },
    @Param('id') id: string
  ): Promise<any> {
    await this.userService.removeCategory(id, req.user.userId);
  }
}
