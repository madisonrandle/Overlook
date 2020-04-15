
// import './css/main.scss';
import domUpdates from './domUpdates';
import Hotel from './Hotel';
import ApiHandler from './ApiHandler';

const fetchAllData = () => {
  const apiHandler = new ApiHandler();
  const usersData = apiHandler.fetchUsersData();
  const roomsData = apiHandler.fetchRoomsData();
  const bookingsData = apiHandler.fetchBookingsData();

  Promise.all([usersData, roomsData, bookingsData])
  .then(data => {
    const hotel = new Hotel(data[0], data[1], data[2]);
    domUpdates.loadLoginPage(hotel);
  })
  .catch(error => console.log(`There was an error: ${error}`));
};

fetchAllData();
