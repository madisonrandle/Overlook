import $ from 'jquery';
import Hotel from './Hotel';


class Manager extends Hotel {
  constructor(usersData, roomsData, bookingsData, todaysDate) {
    super(usersData, roomsData, bookingsData, todaysDate)
      this.availableRooms = [];
      this.occupiedRooms = [];
  }


}

export default Manager;
