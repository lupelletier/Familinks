import { faker } from "@faker-js/faker";
import range from "lodash/range";
import { UniqueEnforcer } from 'enforce-unique';
import Seeder from "./Seeder";
const uniqueEnforcerEmail = new UniqueEnforcer(); // Ensures unique emails
const uniqueEnforcerUsername = new UniqueEnforcer(); // Ensures unique usernames

class UserSeed extends Seeder {
  password: string;
  salt: string;
  constructor(count = 10, password: string, salt: string) {
    super(count);
    this.count = count;
    this.password = password
    this.salt = salt
    this.createData();
  }
  createData() {
    this._data = []; // Ensure data array is initialized
    range(this.count).forEach(() => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const username = uniqueEnforcerUsername.enforce(() => {
        return `${firstName.toLowerCase()}_${lastName.toLowerCase()}`;
      });
      const email = uniqueEnforcerEmail.enforce(() => {
        return faker.internet.email({ firstName, lastName });
      });
      const phone = faker.phone.number(); // Generate a phone number
      this._data.push({
        username: username, // Set username
        firstname: firstName,
        lastname: lastName,
        hashPassword: this.password, // Set hashed password
        saltPassword: this.salt, // Set salt
        email: email, // Ensure unique email
        phone: phone, // Optional phone number
      });
    });
  }
}

export default UserSeed;
