import $ from 'jquery';
import Manager from './Manager';

let manager;

const domUpdates = {
  loadLoginPage: (data) => {

    // $('body').html(`
    //
    // `);
  },

  loadManagerPage: () => {
    manager = new Manager(todaysDate);

  },
}





export default domUpdates;
