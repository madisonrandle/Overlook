import { fetchData } from './ApiHandler';
import domUpdates from './domUpdates';
import Hotel from './Hotel';
import './css/main.scss';

export const fetchAllData = () => {
  const urlFragment = 'https://fe-apps.herokuapp.com/api/v1/overlook/1904';
  const usersData = fetchData(`${urlFragment}/users/users`);
  const roomsData = fetchData(`${urlFragment}/rooms/rooms`);
  const bookingsData = fetchData(`${urlFragment}/bookings/bookings`);

  Promise.all([usersData, roomsData, bookingsData])
    .then(data => {
      const hotel = new Hotel(data[0], data[1], data[2]);
      domUpdates.loadLoginPage(hotel);
    })
    .catch(error => console.log(`There was an error: ${error}`));
};

fetchAllData();
