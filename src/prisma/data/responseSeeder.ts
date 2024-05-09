import { faker } from "@faker-js/faker";
import Seeder from "./Seeder";
import {Family, User} from "@prisma/client";

class ResponseSeed extends Seeder {
    random_user: User;
    family: Family;

    constructor(count = 1, random_user: User, family: Family) {
        super(count);
        this.count = count;
        this.random_user = random_user;
        this.family = family;
        this.createData();

    }

    createData() {
        console.log('response in creation...')
        this._data = [];
        this._data.push({
            response: faker.lorem.sentence(),
            User : {
                connect: {
                    id_user: this.random_user.id_user,
                },
            },
            Family: {
                connect: {
                    id_family: this.random_user.familyId,
                }
            }
        });
        console.log('response created...')

    }
}

export default ResponseSeed;