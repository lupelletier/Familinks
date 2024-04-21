import { faker } from "@faker-js/faker";
import range from "lodash/range";

import { EnforceUniqueError, UniqueEnforcer } from 'enforce-unique';
import Seeder from "./Seeder";

const uniqueEnforcerEmail = new UniqueEnforcer();

class UserSeed extends Seeder {
  constructor(count: number = 10) {
    super(count);
    this.count = count;
    this.createData();
  }

  createData() {
    range(this.count).forEach(() => {
      let firstName = faker.person.firstName();
      let lastName = faker.person.lastName();
      let email = uniqueEnforcerEmail.enforce(() => {
        return faker.internet.email({ firstName, lastName });
      })
      this._data.push({
        firstname: firstName,
        lastname: lastName,
        email: email,
      });
    });
  }
}

export default UserSeed;
