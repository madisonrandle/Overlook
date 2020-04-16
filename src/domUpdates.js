import $ from 'jquery';
import Manager from './Manager';
import Customer from './Customer';

let hotelObj, user;
const domUpdates = {
  loadLoginPage: (hotel) => {
    hotelObj = hotel;
    $('body').html(`
      <section>
        <form id="login-form">
          <div>
            <input id="username-input" type="text" value="manager" required>
          </div>
          <div>
            <input id="password-input" type="text" value="overlook2020" required>
          </div>
          <div>
            <button id="login-button" type="submit">login</button>
          </div>
        </form>
      </section>
    `);
    $('#login-button').click((e) => {
      e.preventDefault(e);
      hotel.validateUser(e);
    });
    console.log(hotelObj.users);
  },

  managerAccessPage: (user) => {
    user = new Manager(user);
    console.log('user', user);


    $('body').html(`
      <section id="user-access-page">
        <header id="header"></header>
        <main id="main">

          <section id="occupied-rooms">
            <h2>Occupied</h2>

          </section>

          <section id="available-rooms">
            <h2>Available</h2>

          </section>

          <section id="revenue-today">
            <h2>Total Revenue</h2>

          </section>

        </main>
      </section>
    `);
  },

  customerAccessPage: (user) => {

    user = new Customer(user);
    console.log('user', user);
    $('body').html(`
      <section id="user-access-page">
        <header id="header">

        </header>
        <main id="main">

          <section id="occupied-rooms">


          </section>

          <section id="available-rooms">


          </section>

          <section id="revenue-today">


          </section>

        </main>
      </section>
    `);
  },

  invalidLogin: () => {
    console.log('username or password is incorrect');
  },
}





export default domUpdates;
