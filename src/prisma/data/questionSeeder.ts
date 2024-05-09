import { faker } from "@faker-js/faker";
import range from "lodash/range";
import Seeder from "./Seeder"; // Assuming you have a base Seeder class

class QuestionSeed extends Seeder {
    constructor(count = 10) { // Default count is 10
        super(count);
        this.createData();
    }

    createData() {
        this._data = [];
        range(this.count).forEach(() => {
            const question = faker.lorem.sentence(); // Generate a fake question
            this._data.push({
                question,
            });
        });
    }
}

export default QuestionSeed;
