import $ from 'jquery';
// import ApiHandler from './ApiHandler';
import Manager from './Manager';

let manager;

const domUpdates = {
  loadLoginPage: (hotel) => {
    console.log(hotel);
    $('body').html(`
      <section>
        <section class="header">
        </section>
        <div>
          <label></label>
          <input class="username" type="text" value="username" onfocus="this.value=''""></input>
          <label></label>
          <input class="password" value="password" onfocus="this.value='', this.type='password'"></input>
          <button class="submit-login" type="submit">Login</button>
        </div>
      </section>
    `);
    $('.submit-login').click((e) => hotel.validateUser(e));
  },

  loadManagerPage: () => {
    manager = new Manager(todaysDate);

  },
}





export default domUpdates;
