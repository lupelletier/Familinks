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
                createdAt: new Date("2024-06-06"),
            });
        });
    }
}

export default QuestionSeed;
