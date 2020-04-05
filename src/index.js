import $ from 'jquery';
import './css/main.scss';
import domUpdates from './domUpdates';
import Hotel from './Hotel';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

const usersData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
  .then(response => response.json())
  .then(data => data.users)
  .catch(error => console.log(`There was an error: ${error}`));

const roomsData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
  .then(response => response.json())
  .then(data => data.rooms)
  .catch(error => console.log(`There was an error: ${error}`));

const bookingsData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
  .then(response => response.json())
  .then(data => data.bookings)
  .catch(error => console.log(`There was an error: ${error}`));

Promise.all([usersData, roomsData, bookingsData])
  .then(data => {
    let hotel = new Hotel(data[0], data[1], data[2]);
    domUpdates.loadLoginPage(hotel);
  })
  .catch(error => console.log(`There was an error: ${error}`));
