import $ from 'jquery';
import moment from 'moment';
import Manager from './Manager';
import Customer from './Customer';

let hotelObj, user;
const domUpdates = {
  loadLoginPage: (hotel) => {
    hotelObj = hotel;
    $('body').html(`
      <section>
        <form id="login-form">
          <div>
            <input id="username-input" type="text" value="manager" required>
          </div>
          <div>
            <input id="password-input" type="text" value="overlook2020" required>
          </div>
          <div>
            <button id="login-button" type="submit">login</button>
          </div>
        </form>
      </section>
    `);
    $('#login-button').click((e) => {
      e.preventDefault(e);
      hotel.validateUser(e);
    });
  },

  managerAccessPage: () => {
    user = new Manager({
      id: 51,
      name: 'Billy Joe'
    });

    const availableRoomsToday = user.getAvailableRoomsToday(hotelObj.rooms, hotelObj.bookings).length;

    const occupiedRoomsToday = user.getPercentageOfRoomsOccupiedToday(hotelObj.rooms);

    const totalRevenueToday = user.getTotalRevenueToday(hotelObj.rooms, hotelObj.bookings);


    $('body').html(`
      <section id="user-access-page">
        <header id="header"></header>
        <main id="main">

          <section id="occupied-rooms">
            <h2>Occupied</h2>
            <p id="percent-occupied-rooms">${occupiedRoomsToday}%</p>
          </section>

          <section id="available-rooms">
            <h2>Available</h2>
            <p id="num-available-rooms">${availableRoomsToday} rooms</p>
          </section>

          <section id="revenue-today">
            <h2>Total Revenue</h2>
            <p id="num-revenue-today">${totalRevenueToday}</p>
          </section>

        </main>
      </section>
    `);
  },

  customerAccessPage: (user) => {
    user = new Customer(user);
    const allCustomerRoomBookings = user.getAllRoomBookings(hotelObj.rooms, hotelObj.bookings);
    const presentBookings = user.getPresentBookings(allCustomerRoomBookings, hotelObj.bookings);

    $('body').html(`
      <section id="user-access-page">
        <header id="header">

        </header>
        <main id="main">

          <section id="today-bookings">
            <h2>Today</h2>

          </section>

          <section id="upcoming-bookings">
            <h2>Upcoming</h2>

          </section>

          <section id="past-bookings">
            <h2>History</h2>

          </section>

        </main>
      </section>
    `);

    if (presentBookings.length) {
      presentBookings.forEach(presentBooking => {
        Object.keys(presentBooking).forEach(date => {
          let formattedDate = moment(`${date}`, 'YYYY-MM-DD').format('l');
          $('#today-bookings').append(`
            <p>${formattedDate}</p>
            <p>${presentBooking[date].roomType}</p>
            <p>${presentBooking[date].numBeds} ${presentBooking[date].bedSize}</p>
            <p>${presentBooking[date].costPerNight.toLocaleString("en-US", {style: "currency", currency: "USD"})}</p>
          `);
        });
      });
    } else {
      $('#today-bookings').append(`
        <div>
          <p>You have no present bookings.</p>
        </div>
      `);
    }
  },

  invalidLogin: () => {
    console.log('username or password is incorrect');
  },
}





export default domUpdates;
