import $ from 'jquery'

class Hotel {
  constructor(usersData, roomsData, bookingsData) {
    this.users = usersData;
    this.roomsData = roomsData;
    this.bookingsData = bookingsData;
  }
}

export default Hotel;
