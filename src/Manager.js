import $ from 'jquery';
import Customer from './Customer';
import domUpdates from './domUpdates';
import { fetchData } from './ApiHandler';

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

  getSerachedUser(searchedUser, users, managerObj) {
    let foundUser = users.find(user => searchedUser === user.name.toLowerCase());
    let customer = new Customer(foundUser);
    domUpdates.managerCustomerSearchPage(customer, managerObj);
  };

  deleteBooking(e, futureBookings) {
    let foundBooking = futureBookings.find(booking => parseInt(e.target.id) === booking.id);
    let bookingID = foundBooking.id;
    let options =  {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: bookingID,
      }),
    }
    fetchData('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', options);
    
    e.target.closest('div').remove();
  };
};

export default Manager;
