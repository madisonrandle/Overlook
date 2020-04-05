import $ from 'jquery';
import moment from 'moment';

class Hotel {
  constructor(usersData, roomsData, bookingsData, todaysDate) {
    this.todaysDate = moment().format('L');
    this.users = usersData;
    this.roomsData = roomsData;
    this.bookingsData = bookingsData;
  }
}

export default Hotel;
