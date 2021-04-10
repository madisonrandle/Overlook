import $ from 'jquery';
import domUpdates from './domUpdates';

class Hotel {
  constructor(users, rooms, bookings) {
    this.users = users.customers;
    this.rooms = rooms.rooms;
    this.bookings = bookings.bookings;
  }

  validateUser(e) {
    let missingRequiredFields = [];
    const inputs = document.querySelectorAll('#login-form input');

    Array.from(inputs).forEach(input => {
      if (input.required && !$(`#${input.id}`).val()) {
        missingRequiredFields.push(input.name);
      }
    })

    const currentUser = $('#username-input').val() === 'manager' && 'manager'
      || this.users.find(user => (
        $('#username-input').val() === `customer${user.id}`)
      );

    const userPassword = $('#password-input').val() === 'overlook2020';

    if (missingRequiredFields.length === 0 && userPassword) {
       currentUser === 'manager'
        ? domUpdates.managerAccessPage()
        : domUpdates.customerAccessPage(currentUser)
    } else {
      domUpdates.invalidLogin(missingRequiredFields)
    }
  }
}

export default Hotel;
