import { defaults } from 'lodash';
import models from '../models/index';

const { users } = models;

class UserService {
    getUser = async(email) => {
        const user = await users.findOne({
            where: {
                email,
            },
        });
        return user;
    }
}

export default new UserService();