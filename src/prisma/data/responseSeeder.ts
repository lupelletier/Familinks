import { faker } from "@faker-js/faker";
import Seeder from "./Seeder";
import {Family, User} from "@prisma/client";
import QuestionSeed from "./questionSeeder";
import range from "lodash/range";
import {getUsersByFamilyName} from "~/utils/db";

class ResponseSeed extends Seeder {
    families: Family[];


    constructor(count = 1,  families: Family[]) {
        super(count);
        this.count = count;
        this.families = families;
        this.createData();
    }


    async createData() {
        console.log('response in creation...')
        this._data = [];
        for(const family of this.families) {
            const family_users = await getUsersByFamilyName(family.name);
            const nb_answers = Math.ceil(0.6 * family_users.length);
            for (let i = 0; i < nb_answers; i++) {
                const random_user = faker.helpers.arrayElement(family_users);
                this._data.push({
                    response: faker.lorem.sentence(),
                    /*                    id_user: random_user.id_user,
                                        id_family: random_user.familyId,
                                        id_question: id_question,*/
                    User: {
                        connect: {
                            id_user: random_user.id_user,
                        },
                    },
                    Family: {
                        connect: {
                            id_family: random_user.familyId,
                        }
                    },
/*                    Question: {
                        connect: {
                            id_question: id_question,
                        }
                    }*/
                });
            }
        console.log('response created...')
        }
    }
}

export default ResponseSeed;