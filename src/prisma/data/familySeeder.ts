import { faker } from "@faker-js/faker";
import range from "lodash/range";

import { EnforceUniqueError, UniqueEnforcer } from 'enforce-unique';
import Seeder from "./Seeder";

const uniqueEnforcerFamily = new UniqueEnforcer();

class FamilySeed extends Seeder {
  constructor(count: number = 10) {
    // limit number to 20 as only 30 unique colors are available in faker.color.human()
    if (count > 20) {
      count = 20;
    };
    super(count);
    this.count = count;
    this.createData();
  }

  createData() {
    range(this.count).forEach(() => {
      this._data.push({
        name: uniqueEnforcerFamily.enforce(() => {
          return faker.color.human();
        })
      });
    });
  }
}

export default FamilySeed;
