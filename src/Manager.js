import $ from 'jquery';
import Hotel from './Hotel';


class Manager extends Hotel {
  constructor(usersData, roomsData, bookingsData, todaysDate) {
    super(usersData, roomsData, bookingsData, todaysDate)
      this.availableRooms = [];
      this.occupiedRooms = [];
  };

  getAvailableRoomsToday() {
    let roomsBookedToday = [];
    this.roomsData.forEach(room => {
      this.bookingsData.forEach(booking => {
        if (booking.roomNumber === room.number && booking.date === this.todaysDate) {
          roomsBookedToday.push(room);
        };
      });
    });

    this.roomsData.forEach(room => {
      this.bookingsData.forEach(booking => {
        if (!roomsBookedToday.includes(room) && !this.availableRooms.includes(room)) {
          this.availableRooms.push(room);
        }
      })
    });
  };
};

export default Manager;
