import $ from 'jquery';
import domUpdates from './domUpdates';

class Hotel {
  constructor(users, rooms, bookings) {
    this.users = users.users;
    this.rooms = rooms.rooms;
    this.bookings = bookings.bookings;
  }

  validateUser(e) {
    const foundUser = this.users.find(user => {
      return $('#username-input').val() === `customer${user.id}` && $('#password-input').val() === 'overlook2020';
    });

    if (foundUser) {
      domUpdates.customerAccessPage(foundUser);
    } else {
      $('#username-input').val() === 'manager' && $('#password-input').val() === 'overlook2020' ?
        domUpdates.managerAccessPage(foundUser) :
        domUpdates.invalidLogin();
    }
  }
}

export default Hotel;
