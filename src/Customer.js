import $ from 'jquery';
import moment from 'moment';
import { fetchData } from './ApiHandler';


class Customer {
  constructor(user, isManager = false, todaysDate) {
    this.todaysDate = moment().format('YYYY/MM/DD');
    this.bookingDate = null;
    this.id = user.id;
    this.name = user.name;
    this.isManager = isManager;
    this.unavailableRooms = [];
    this.availableRooms = [];

  }

  getAllRoomBookings(rooms, bookings) {
    return bookings.reduce((acc, booking) => {
      rooms.forEach(room => {
        if (room.number === booking.roomNumber && booking.userID === this.id) {
          acc.push(room);
        }
      })
      return acc;
    }, []);
  }

  getPresentBookings(allUserRoomBookings, bookings) {
    return bookings.reduce((acc, booking) => {
      allUserRoomBookings.forEach(roomBooking => {
        if (this.id === booking.userID && booking.date === this.todaysDate && booking.roomNumber === roomBooking.number) {
          let roomObj = {};
          roomObj[booking.date] = roomBooking;
          acc.push(roomObj);
        }
      })
      return acc;
    }, []);
  }

  getPastBookings(allUserRoomBookings, bookings) {
    let sortedBookings = bookings.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    let pastBookings = sortedBookings.filter(booking => new Date(booking.date) < new Date(this.todaysDate));
    let usersPastBookings = pastBookings.filter(pastBooking => this.id === pastBooking.userID);

    return allUserRoomBookings.reduce((acc, roomBooking) => {
      acc[roomBooking.number] = [];
        usersPastBookings.forEach(userPastBooking => {
          if (userPastBooking.roomNumber === roomBooking.number) {
            acc[roomBooking.number].push(userPastBooking);
          }
        });
      return acc;
    }, {});
  }

  getFutureBookings(allUserRoomBookings, bookings) {
    let sortedBookings = bookings.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    let futureBookings = sortedBookings.filter(booking => new Date(booking.date) > new Date(this.todaysDate));
    let usersFutureBookings = futureBookings.filter(futureBooking => this.id === futureBooking.userID);

    return allUserRoomBookings.reduce((acc, roomBooking) => {
      acc[roomBooking.number] = [];
        usersFutureBookings.forEach(usersFutureBooking => {
          if (usersFutureBooking.roomNumber === roomBooking.number) {
            acc[roomBooking.number].push(usersFutureBooking);
          }
        });
      return acc;
    }, {});
  }

  getTotalSpentOnBookings(allUserRoomBookings) {
    return allUserRoomBookings.reduce((acc, room) => {
      acc += room.costPerNight;
      return acc;
    }, 0).toLocaleString("en-US", {style: "currency", currency: "USD"});
  }

  getAvailableRooms(rooms, bookings){
    let bookingDate = $('#booking-date-input').val();
    this.bookingDate =  moment(bookingDate).format('YYYY/MM/DD');
    rooms.forEach(room => {
      bookings.forEach(booking => {
        if (booking.roomNumber === room.number && booking.date === this.bookingDate) {
          this.unavailableRooms.push(room);
        };
      });
    });
    rooms.forEach(room => {
      if (!this.unavailableRooms.includes(room)) {
        this.availableRooms.push(room)
      };
    })
  }

  getRoomByType(availableRooms, id) {
    return availableRooms.filter(room => room.roomType === id);
  }

  postBooking(roomNumber) {
    let options =  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "userID": this.id,
          "date": this.bookingDate,
          "roomNumber": parseInt(roomNumber)
        }),
      }

    fetchData('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', options);
  }

}
export default Customer;
