
// import './css/main.scss';
import domUpdates from './domUpdates';
import Hotel from './Hotel';
import Api from './Api';

const apiHandler = new ApiHandler();


//seperate function
// would essentially run when validation for login is confirmed
// eg => if pass && username .val()

let usersData = api.fetchUsersData();
let roomsData = api.fetchRoomsData();
let bookingsData = api.fetchBookingsData();
Promise.all([usersData, roomsData, bookingsData])
  .then(data => {
    let hotel = new Hotel(data[0], data[1], data[2]);
    // console.log('hotel in promise: ', hotel);
    domUpdates.loadLoginPage(hotel);
  })
  .catch(error => console.log(`There was an error: ${error}`));
