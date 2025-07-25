import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
 async create(@Body() createUserDto: CreateUserDto) {
    const res = await this.usersService.create(createUserDto);
    return {
      status: 201,
      message: 'User created successfully',
      data: res
    }
  }

  @Get("all")
 async findAll() {
    const res = await this.usersService.findAll();
    return {
      status: 200,
      message: 'Users fetched successfully',
      data: res
    }
  }

  @Get('user/:id')
  async findOne(@Param('id') id: string) {
    const res = await this.usersService.findOne(id);
    return {
      status: 200,
      message: 'User fetched successfully',
      data: res
    }
  }
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
   const res = await this.usersService.update(+id, updateUserDto);
    return {
      status: 200,
      message: 'User updated successfully',
      data: res
    }
  }

  @Delete(':id')
 async remove(@Param('id') id: string) {
   const res = await this.usersService.remove(+id);
    return {
      status: 200,
      message: 'User deleted successfully',
      data: res
    }
  }
}
