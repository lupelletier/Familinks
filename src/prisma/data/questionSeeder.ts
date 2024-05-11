import { faker } from "@faker-js/faker";
import range from "lodash/range";
import Seeder from "./Seeder";

class QuestionSeed extends Seeder {
    constructor(count = 10) {
        super(count);
        this.createData();
    }

    createData() {
        this._data = [];
        range(this.count).forEach(() => {
            const question = faker.lorem.sentence();
            this._data.push({
                question: question,
            });
        });
    }
}

export default QuestionSeed;
