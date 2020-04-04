import $ from 'jquery';
import Hotel from './Hotel';

class Manager extends Hotel {
  constructor(usersData, roomsData, bookingsData) {
    super(usersData, roomsData, bookingsData)
      this.availableRooms = [];
      this.occupiedRooms = [];
  }

  
}

export default Manager;
