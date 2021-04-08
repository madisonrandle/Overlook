import { fetchData } from './ApiHandler';
import domUpdates from './domUpdates';
import Hotel from './Hotel';
import './css/main.scss';

const fetchAllData = () => {
  const urlFragment = 'http://localhost:3001/api/v1';
  const usersData = fetchData(`${urlFragment}/customers`);
  const roomsData = fetchData(`${urlFragment}/rooms`);
  const bookingsData = fetchData(`${urlFragment}/bookings`);

  Promise.all([usersData, roomsData, bookingsData])
    .then(data => {
      const hotel = new Hotel(data[0], data[1], data[2]);
      domUpdates.loadLoginPage(hotel);
    })
    .catch(error => console.log(`There was an error: ${error}`));
};

fetchAllData();
