import $ from 'jquery';
import './css/main.scss';
import moment from 'moment';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

const usersData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
  .then(response => response.json())
  .then(data => console.log(data.users))
  .catch(error => console.log(`There was an error: ${error}`));

const roomsData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
  .then(response => response.json())
  .then(data => console.log(data.rooms))
  .catch(error => console.log(`There was an error: ${error}`));

const bookingsData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
  .then(response => response.json())
  .then(data => console.log(data.bookings))
  .catch(error => console.log(`There was an error: ${error}`));

Promise.all([usersData, roomsData, bookingsData])
  .then(data => {
    const usersData = data[0];
    const roomsData = data[1];
    const bookingsData = data[2];
  })
  .catch(error => console.log(`There was an error: ${error}`));






//
