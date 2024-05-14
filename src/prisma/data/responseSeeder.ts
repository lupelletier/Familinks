import Seeder from "./Seeder";
import { faker } from "@faker-js/faker";

class ResponseSeed extends Seeder {
    answeringUsersIds: [];
    questionId: number;

    constructor(count = 1, answeringUsersIds: [], questionId: number) {
        super(count);
        this.count = count;
        this.answeringUsersIds = answeringUsersIds;
        this.questionId = questionId;
        this._data = [];
        this.createData();
    }

    createData() {
        this._data = [];
        // Check if answeringUsers is defined and not empty
        if (this.answeringUsersIds && this.answeringUsersIds.length > 0) {
            for (let i = 0; i < this.answeringUsersIds.length; i++) {
                const response = faker.lorem.sentence();
                this._data.push({
                    response: response,
                    userId: this.answeringUsersIds[i], // Assuming User object has an 'id' property
                    questionId: this.questionId,
                });
            }
        } else {
            console.log("No answeringUsers provided."); // Logging
        }
    }
}

export default ResponseSeed;