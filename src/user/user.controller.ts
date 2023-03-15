import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UserTokenData } from '../shared/interfaces/user';
import { User } from './schema/user.schema';
import { CategoryDto } from '../categories/dto/category.dto';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /** USER **/

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

  /** USER CATEGORIES **/

  @Post('/categories')
  @ApiResponse({ status: 201, type: CategoryDto })
  createCategory(
    @Req() req: { user: UserTokenData },
    @Body() createCategoryDto: CategoryDto
  ): Promise<User> {
    return this.userService.createCategory(req.user.userId, createCategoryDto);
  }

  // @Get('/categories')
  // @ApiResponse({ status: 200, type: [CategoryDto] })
  // findAllCategories(
  //   @Req() req: { user: UserTokenData },
  // ): Promise<CategoryDto[]> {
  //   return this.userService.findAllCategories(req.user.userId);
  // }

  @Patch('/categories')
  @ApiResponse({ status: 200, type: CategoryDto })
  updateCategory(
    @Req() req: { user: UserTokenData },
    @Body() updateCategoryDto: CategoryDto,
  ): Promise<User> {
    return this.userService.updateCategory(updateCategoryDto, req.user.userId);
  }

  @Delete('/categories/:id')
  @ApiResponse({ status: 200 })
  removeCategory(
    @Req() req: { user: UserTokenData },
    @Param('id') id: string
  ): void {
    this.userService.removeCategory(id, req.user.userId);
  }
}
