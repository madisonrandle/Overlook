import $ from 'jquery';
import Customer from './Customer';

class Manager extends Customer {
  constructor(user, todaysDate) {
    super(user, true, todaysDate)
      this.availableRoomsToday = [];
      this.occupiedRooms = [];
      this.roomsBookedToday = [];
  };

  getAvailableRoomsToday(rooms, bookings, date) {
    rooms.forEach(room => {
      bookings.forEach(booking => {
        if (booking.roomNumber === room.number && booking.date === date) {
          this.roomsBookedToday.push(room);
        };
      });
    });

    rooms.forEach(room => {
      bookings.forEach(booking => {
        if (!this.roomsBookedToday.includes(room) && !this.availableRoomsToday.includes(room)) {
          this.availableRoomsToday.push(room);
        }
      })
    });
    return this.availableRoomsToday;
  };

  getTotalRevenueToday(rooms, bookings) {
    return rooms.reduce((totalRevenue, room) => {
      bookings.forEach(booking => {
        if (booking.date === this.todaysDate && room.number === booking.roomNumber) {
          totalRevenue += room.costPerNight;
        };
      });
      return totalRevenue;
    }, 0).toLocaleString("en-US", {style: "currency", currency: "USD"});
  };

  getPercentageOfRoomsOccupiedToday(rooms) {
    return Math.round(this.roomsBookedToday.length * 100 / rooms.length);
  };

};

export default Manager;
