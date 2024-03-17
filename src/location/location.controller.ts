import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { LocationService } from './location.service';
import { UpdateLocationDto } from './dto/update-location.dto';
import { CreateLocationDto } from './dto/create-location.dto';
import Location from './interfaces/location.interface';


@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}
  @Post()
  async create(@Body() createLocationDto: CreateLocationDto): Promise<void> {
    await this.locationService.createLocation(createLocationDto);
  }

  @Get()
  async findAll(): Promise<Location[]> {
    return this.locationService.getAllLocations();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Location> {
    return this.locationService.getLocationById(id);
  }

  @Get(':parentLocationId/children')
  async getLocationsAndAllChildrens(@Param('parentLocationId') parentLocationId: number): Promise<Location[]> {
    return this.locationService.getLocationsAndAllChildrens(parentLocationId);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.locationService.deleteLocationById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateLocationDto: UpdateLocationDto,
  ): Promise<void> {
    await this.locationService.updateLocationById(id, updateLocationDto);
  }
}
