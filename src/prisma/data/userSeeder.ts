import { faker } from "@faker-js/faker";
import range from "lodash/range";
import { UniqueEnforcer } from 'enforce-unique';
import Seeder from "./Seeder";

const uniqueEnforcerEmail = new UniqueEnforcer(); // Ensures unique emails

class UserSeed extends Seeder {
  family_id: number| null;

  constructor(count = 10, familyId = null) {
    super(count);
    this.count = count;
    this.family_id = familyId;
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
      const phone = faker.phone.number(); // Generate a phone number

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
