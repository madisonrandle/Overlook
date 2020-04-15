

class ApiHandler {
  constructor() {
    this.mainURL = 'https://fe-apps.herokuapp.com/api/v1/overlook/1904'
  };

  fetchUsersData() {
    let url = `${this.mainURL}/users/users`;
    return fetch(url)
      .then(response => response.json())
  };

  fetchRoomsData() {
    let url = `${this.mainURL}/rooms/rooms`;
    return fetch(url)
      .then(response => response.json())
  };

  fetchBookingsData() {
    let url = `${this.mainURL}/bookings/bookings`;
    return fetch(url)
      .then(response => response.json())
  };
}

export default ApiHandler;
