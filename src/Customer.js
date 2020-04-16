import $ from 'jquery'

class Customer {
  constructor(user, isManager = false) {
    this.id = user.id;
    this.name = user.name;
    this.isManager = isManager;
  }
}
export default Customer;
