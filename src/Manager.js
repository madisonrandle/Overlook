import $ from 'jquery';
import Hotel from './Hotel';

class Manager extends Hotel {
  constructor(users, rooms, bookings, todaysDate) {
    super(users, rooms, bookings, todaysDate)
      this.availableRooms = [];
      this.occupiedRooms = [];
  };

  getAvailableRoomsToday() {
    let roomsBookedToday = [];
    this.rooms.forEach(room => {
      this.bookings.forEach(booking => {
        if (booking.roomNumber === room.number && booking.date === this.todaysDate) {
          roomsBookedToday.push(room);
        };
      });
    });

    this.rooms.forEach(room => {
      this.bookings.forEach(booking => {
        if (!roomsBookedToday.includes(room) && !this.availableRooms.includes(room)) {
          this.availableRooms.push(room);
        }
      })
    });
    return this.availableRooms;
  };

  getTotalRevenueToday() {
    return this.rooms.reduce((totalRevenue, room) => {
      this.bookings.forEach(booking => {
        if (booking.date === '2020/01/11' && room.number === booking.roomNumber) {
          totalRevenue += room.costPerNight;
        };
      });
      return totalRevenue;
    }, 0);
  };

  getPercentageOfRoomsOccupiedToday() {
    
  };

};

export default Manager;
