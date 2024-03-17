import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import Location from './interfaces/location.interface';

@Injectable()
export class LocationService {
  private readonly pool = new Pool();

  public async createLocation(locationData: CreateLocationDto): Promise<Location> {
    const client = await this.pool.connect();
    try {
      const { location_name, location_number, area, parent_location } = locationData;

      const insertQuery = `
        INSERT INTO Location (location_name, location_number, area, parent_location)
        VALUES ($1, $2, $3, $4)
      `;
      
      const values = [location_name, location_number, area, parent_location];

      const result = await client.query(insertQuery, values);

      const createdLocation: Location = result.rows[0];

      return createdLocation;
    } catch (error) {
      console.error('Error creating location:', error.message);
      throw error;
    } finally {
      client.release();
    }
  }

  async getAllLocations(): Promise<Location[]> {
    const client = await this.pool.connect();
    try {
      const result = await client.query('SELECT * FROM Location');
      const locations: Location[] = result.rows; 
      return locations;
    } catch (error) {
      console.error('Error fetching all locations:', error.message);
      throw error;
    } finally {
      client.release();
    }
}


  async getLocationById(locationId: number): Promise<Location> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(
        'SELECT * FROM Location WHERE id = $1',
        [locationId],
      );
      if (result.rows.length === 0) {
        throw new Error('Location not found');
      }
      return result.rows[0];
    } catch (error) {
      console.error('Error fetching location by ID:', error.message);
      throw error;
    } finally {
      client.release();
    }
  }

  async deleteLocationById(locationId: number): Promise<void> {
    const client = await this.pool.connect();
    try {
      await client.query('DELETE FROM Location WHERE id = $1', [locationId]);
    } catch (error) {
      console.error('Error deleting location by ID:', error.message);
      throw error;
    } finally {
      if (client) {
        client.release();
      }
    }
  }

  async updateLocationById(
    locationId: number,
    updatedLocationData: UpdateLocationDto,
  ): Promise<void> {
    const client = await this.pool.connect();
    try {
      const { location_name, location_number, area, parent_location } =
        updatedLocationData;

      const updateQuery = `
            UPDATE Location 
            SET location_name = $1, 
                location_number = $2, 
                area = $3, 
                parent_location = $4 
            WHERE id = $5`;

      const values = [
        location_name,
        location_number,
        area,
        parent_location,
        locationId,
      ];

      await client.query(updateQuery, values);
    } catch (error) {
      console.error('Error updating location:', error.message);
      throw error;
    } finally {
      client.release();
    }
  }

  // Get all locations and their children (as required by the home test)
  async getLocationsAndAllChildrens(parentLocationId: number): Promise<Location[]> {
    const client = await this.pool.connect();
    try {
      const parentLocationQuery =
        'SELECT parent_location FROM Location WHERE id = $1';
      const parentLocationValues = [parentLocationId];
      const parentLocationResult = await client.query(
        parentLocationQuery,
        parentLocationValues,
      );

      const parentLocation = parentLocationResult.rows[0]?.parent_location;

      if (!parentLocation) {
        return [];
      }

      const childrenLocationQuery =
        'SELECT * FROM Location WHERE parent_location ~ $1';
      const childrenLocationValues = [parentLocation + '.*'];
      const childrenLocationResult = await client.query(
        childrenLocationQuery,
        childrenLocationValues,
      );
      return childrenLocationResult.rows;
    } finally {
      client.release();
    }
  }
}
