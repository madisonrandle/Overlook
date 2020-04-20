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

    const availableRoomsToday = user.getAvailableRoomsToday(hotelObj.rooms, hotelObj.bookings, user.todaysDate).length;

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

  // Should I break this into seperate functions?
  customerAccessPage: (user) => {
    user = new Customer(user);

    const allCustomerRoomBookings = user.getAllRoomBookings(hotelObj.rooms, hotelObj.bookings);

    const presentBookings = user.getPresentBookings(allCustomerRoomBookings, hotelObj.bookings);

    const pastBookings = user.getPastBookings(allCustomerRoomBookings, hotelObj.bookings);

    const futureBookings = user.getFutureBookings(allCustomerRoomBookings, hotelObj.bookings);

    const totalSpent = user.getTotalSpentOnBookings(allCustomerRoomBookings);

    // const availRooms = user.getAvailableRooms(hotelObj.rooms, hotelObj.bookings);



    $('body').html(`
      <section id="user-access-page">
        <header id="header">
        </header>
        <main id="main-customer-page">
          <section id="total-spent">

          </section>
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
          let formattedDate = moment(`${date}`, 'YYYY/MM/DD').format('l');
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


    let pastBookingRooms = Object.keys(pastBookings).reduce((acc, booking) => {
      allCustomerRoomBookings.forEach(customerRoomBooking => {
        if (parseInt(booking) === customerRoomBooking.number) {
          pastBookings[booking].forEach(el => {
            if (!acc.includes(customerRoomBooking)) {
              acc.push(customerRoomBooking)
            }
          })
        }
      })
      return acc;
    }, []);

    // get date listed with each booking
    pastBookingRooms.forEach(pastBooking => {
      $('#past-bookings').append(`
        <div style="border: 1px solid black;">
          <p style="padding: 1rem;">${pastBooking.roomType}</p>
          <p style="padding: 1rem;">${pastBooking.numBeds} ${pastBooking.bedSize}</p>
          <p style="padding: 1rem;">${pastBooking.costPerNight.toLocaleString("en-US", {style: "currency", currency: "USD"})}</p>
        </div>
      `);
    });

    $('#total-spent').append(`
      <p>Total Amount Spent: ${totalSpent}</p>
      <form>
        <input type="date" id="booking-date-input">
        <button type='submit' id='booking-form-submit-button'>select date</button>
      </form>
    `);

    $('#booking-form-submit-button').click((e) => {
      e.preventDefault(e);
      user.getAvailableRooms(hotelObj.rooms, hotelObj.bookings);

      $('body').html(`
        <section id="user-access-page" class="availble-rooms-page">
          <header id="header">
          </header>
          <main id="main-available-rooms">
          </main>
        </section>
      `);

      user.availableRooms.forEach(room => {
        $('#main-available-rooms').append(`
          <div style="border: 1px solid black;">
            <p style="padding: 1rem;">${room.roomType}</p>
            <p style="padding: 1rem;">${room.numBeds} ${room.bedSize}</p>
            <p style="padding: 1rem;">${room.costPerNight.toLocaleString("en-US", {style: "currency", currency: "USD"})}</p>
          </div>
        `)
      });

    });
  },

  invalidLogin: () => {
    console.log('username or password is incorrect');
  },
}





export default domUpdates;
