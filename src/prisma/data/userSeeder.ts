import { faker } from "@faker-js/faker";
import range from "lodash/range";
import { UniqueEnforcer } from 'enforce-unique';
import Seeder from "./Seeder";

const uniqueEnforcerEmail = new UniqueEnforcer(); // Ensures unique emails

class UserSeed extends Seeder {
  constructor(count = 10, familyId = null) { // Default count is 10, and optional familyId
    super(count);
    this.count = count;
    this.createData();
  }

  createData() {
    this._data = []; // Ensure data array is initialized
    range(this.count).forEach(() => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const username = `${firstName.toLowerCase()}_${lastName.toLowerCase()}`; // Generate a simple username
      const email = uniqueEnforcerEmail.enforce(() => {
        return faker.internet.email({ firstName, lastName });
      });
      const phone = faker.phone.number('+1 ###-###-####'); // Generate a phone number

      this._data.push({
        username: username, // Set username
        firstname: firstName,
        lastname: lastName,
        email: email, // Ensure unique email
        phone: phone, // Optional phone number
      });
    });
  }
}

export default UserSeed;
