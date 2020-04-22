import $ from 'jquery';
import moment from 'moment';
import Manager from './Manager';
import Customer from './Customer';

let hotelObj, user, customer;
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
        <section id="manager-search-container"></section>
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

    $('#manager-search-container').append(`
      <input type="text" id="manager-search-input" value="Michel Kunze">
      <button type='submit' id='manager-search-submit-button'>search customer</button>
    `);

    $('#manager-search-submit-button').click((e) => {
      let searchedUser = $('#manager-search-input').val().toLowerCase();
      user.getSerachedUser(searchedUser, hotelObj.users, user);
    })

  },

  managerCustomerSearchPage: (searchedUser, managerObj) => {
    const allBookings = searchedUser.getAllRoomBookings(hotelObj.rooms, hotelObj.bookings, searchedUser);
    const presentBookings = searchedUser.getPresentBookings(allBookings, hotelObj.bookings, searchedUser);
    const pastBookings = searchedUser.getPastBookings(allBookings, hotelObj.bookings, searchedUser);
    const futureBookings = searchedUser.getFutureBookings(allBookings, hotelObj.bookings, searchedUser);
    const totalSpent = searchedUser.getTotalSpentOnBookings(allBookings);


    $('body').html(`
      <section id="user-access-page">
        <header id="header">
        </header>
        <main id="main-customer-page">
          <section id="manager-search-container">
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

    $('#manager-search-container').append(`
      <p>${searchedUser.name}</p>
      <p>Total Spent: ${totalSpent}</p>
    `)

    if (presentBookings.length) {
      presentBookings.forEach(presentBooking => {
        Object.keys(presentBooking).forEach(date => {
          let formattedDate = moment(`${date}`, 'YYYY/MM/DD').format('l');
          $('#today-bookings').append(`
            <div style="border: 1px solid black;">

              <p style="padding: 1rem;">${formattedDate}</p>

              <p style="padding: 1rem;">${presentBooking[date].roomType}</p>
              <p style="padding: 1rem;">${presentBooking[date].numBeds} ${presentBooking[date].bedSize}</p>

              <p style="padding: 1rem;">${presentBooking[date].costPerNight.toLocaleString("en-US", {style: "currency", currency: "USD"})}</p>

            </div>
          `);
        });
      });
    } else {
      $('#today-bookings').append(`
        <div>
          <p>${presentBookings.length} current Reservations for ${searchedUser.name}.</p>
        </div>
      `);
    }

    let pastBookingRooms = Object.keys(pastBookings).reduce((acc, booking) => {
      allBookings.forEach(customerRoomBooking => {
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

    pastBookingRooms.forEach(pastBooking => {
      $('#past-bookings').append(`
        <div style="border: 1px solid black;">
          <p style="padding: 1rem;">${pastBooking.roomType}</p>
          <p style="padding: 1rem;">${pastBooking.numBeds} ${pastBooking.bedSize}</p>
          <p style="padding: 1rem;">${pastBooking.costPerNight.toLocaleString("en-US", {style: "currency", currency: "USD"})}</p>
        </div>
      `);
    });

    if (futureBookings.length) {
      futureBookings.forEach((futureBooking) => {
        let formattedDate = moment(`${futureBooking.date}`).format('l');
        $('#upcoming-bookings').append(`
          <div style="border: 1px solid black;">
            <p style="padding: 1rem;">${formattedDate}</p>
            <p style="padding: 1rem;">${futureBooking.roomNumber}</p>
            <button class="delete-future-booking-button" id=${futureBooking.id}>delete booking</button>
          </div>
        `);
      });

      $('.delete-future-booking-button').click((e) => {
        managerObj.deleteBooking(e, futureBookings);
      })
    } else {
      $('#upcoming-bookings').append(`
        <div>
          <p>${futureBookings.length} future reservations for ${searchedUser.name}.</p>
        </div>
      `);
    }
  },


  customerAccessPage: (user) => {
    user = new Customer(user);
    const allCustomerRoomBookings = user.getAllRoomBookings(hotelObj.bookings, user);
    const presentBookings = user.getPresentBookings(hotelObj.bookings, user);
    const pastBookings = user.getPastBookings(hotelObj.bookings, user);
    const futureBookings = user.getFutureBookings(hotelObj.bookings, user);
    const totalSpent = user.getTotalSpentOnBookings(allCustomerRoomBookings, hotelObj.rooms);

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
        let formattedDate = moment(`${presentBooking.date}`, 'YYYY/MM/DD').format('l');
        $('#today-bookings').append(`
          <div style="border: 1px solid black;">
            <p style="padding: 1rem;">Date: ${formattedDate}</p>
            <p style="padding: 1rem;">Room Number: ${presentBooking.roomNumber}</p>
          </div>
        `);
      });
    } else {
      $('#today-bookings').append(`
        <div>
          <p>You have no current reservations.</p>
        </div>
      `);
    }


    pastBookings.forEach(pastBooking => {
      let formattedDate = moment(`${pastBooking.date}`, 'YYYY/MM/DD').format('l');
      $('#past-bookings').append(`
        <div style="border: 1px solid black;">
          <p style="padding: 1rem;">Date: ${formattedDate}</p>
          <p style="padding: 1rem;">Room Number: ${pastBooking.roomNumber}</p>
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

    if (futureBookings.length) {
      futureBookings.forEach(futureBooking => {
        let formattedDate = moment(`${futureBooking.date}`, 'YYYY/MM/DD').format('l');
        $('#upcoming-bookings').append(`
          <div style="border: 1px solid black;">
            <p style="padding: 1rem;">Date: ${formattedDate}</p>
            <p style="padding: 1rem;">Room Number: ${futureBooking.roomNumber}</p>
          </div>
        `);
      });
    } else {
      $('#upcoming-bookings').append(`
        <div>
          <p>You have no future reservations.</p>
        </div>
      `);
    }

    $('#booking-form-submit-button').click((e) => {
      e.preventDefault(e);
      user.getAvailableRooms(hotelObj.rooms, hotelObj.bookings);

      $('body').html(`
        <section id="user-access-page" class="availble-rooms-page">
          <header id="header">
          </header>
          <main id="main-available-rooms">
            <nav id="filter-room-by-type">
              <button class="room-type-button" id="residential suite">Residential Suite</button>
              <button class="room-type-button" id="suite">Suite</button>
              <button class="room-type-button" id="single room">Single Room</button>
              <button class="room-type-button" id="junior suite">Junior Suite</button>
            </nav>
          </main>
        </section>
      `);

      user.availableRooms.forEach(room => {
        $('#main-available-rooms').append(`
          <div style="border: 1px solid black;">
            <p style="padding: 1rem;">${room.number}</p>
            <p style="padding: 1rem;">${room.roomType}</p>
            <p style="padding: 1rem;">${room.numBeds} ${room.bedSize}</p>
            <p style="padding: 1rem;">${room.costPerNight.toLocaleString("en-US", {style: "currency", currency: "USD"})}</p>
            <button class="book-room" id=${room.number}>Book Room</button>
          </div>
        `)
        $(".book-room").click((e) => {
          user.postBooking(e);
        })
      });

      $('.room-type-button').click((e) => {
        let uniqueID = e.target.id;
        let filteredRoomsByType = user.getRoomByType(user.availableRooms, uniqueID);
        $('#main-available-rooms').html(``);
        filteredRoomsByType.forEach(room => {
          $('#main-available-rooms').append(`
            <div style="border: 1px solid black;">
              <p style="padding: 1rem;">${room.number}</p>
              <p style="padding: 1rem;">${room.roomType}</p>
              <p style="padding: 1rem;">${room.numBeds} ${room.bedSize}</p>
              <p style="padding: 1rem;">${room.costPerNight.toLocaleString("en-US", {style: "currency", currency: "USD"})}</p>
              <button class="book-room" id=${room.number}>Book Room</button>
            </div>
          `)
        });
      });

      $(".book-room").click((e) => {
        user.postBooking(e);
      })
    });
  },


  invalidLogin: () => {
    console.log('username or password is incorrect');
  },
}





export default domUpdates;
