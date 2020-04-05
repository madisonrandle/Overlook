import $ from 'jquery';
import moment from 'moment';

class Hotel {
  constructor(usersData, roomsData, bookingsData, todaysDate) {
    this.todaysDate = moment().format('YYYY-MM-DD');
    this.users = usersData;
    this.roomsData = roomsData.rooms;
    this.bookingsData = bookingsData.bookings;
  }


}

export default Hotel;
