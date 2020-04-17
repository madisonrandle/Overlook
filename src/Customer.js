import $ from 'jquery';
import moment from 'moment';

class Customer {
  constructor(user, isManager = false, todaysDate) {
    this.todaysDate = moment().format('YYYY/MM/DD');
    this.id = user.id;
    this.name = user.name;
    this.isManager = isManager;
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

  getPresentBookings(allRoomBookings, bookings) {
    return bookings.reduce((acc, booking) => {
      allRoomBookings.forEach(roomBooking => {
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

    let pastRoomObj = {};

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



    // return usersPastBookings.reduce((acc, usersPastBooking) => {
    //   // pastRoomObj[usersPastBooking.date] = 'hi';
    //   pastRoomObj[usersPastBooking.date] = null;
    //   if (!acc.includes(pastRoomObj)) {
    //     acc.push(pastRoomObj)
    //
    //   }
    //
    //   //   allRoomBookings.forEach(roomBooking => {
    //
    //   //     if (usersPastBooking.roomNumber === roomBooking.number) {
    //   //       acc.push(pastRoomObj[usersPastBooking.date] = roomBooking);
    //   //     }
    //
    //   //   })
    //
    //
    //
    //   return acc;
    // }, []);

  }
}
export default Customer;
