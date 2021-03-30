import models from '../models/index';
import _ from 'lodash';
import UserService from '../service/user';
const { users } = models;
class userController {
    getUser = async (req, res) => {
        //getUser 取得資料
        // const pureCommand = await models.sequelize.query('select * from users', {
        //   type: QueryTypes.SELECT
        // });
        // const user = _.head(pureCommand);
        const user = await users.findAll({
          attributes: { exclude: ['password'] }
        });
        const response = _.map(user, o => {
          return {
            ...o.dataValues,
            vip: true
          };
        });
        res.status(200).json({ user });
    };
    
    postUser = async (req, res) => {
      //postUser 新增資料
      const { body } = req;
      const { email, password } = body;
      const user = await users.create({
        email,
        password
      });
      res.status(200).json({ user });
    };

    deleteUser = async (req, res) => {
      const { body } = req;
      const { email } = body;
      const user = await users.destroy({
        where: {
          email,
        }
      });
      res.status(200).json({ user });
    }

    patchUser = async (req, res) => {
      //patch 修改
      const {body} = req;
      let { id } = req.body;

      const { email, password } = body;
      const user = await users.update({ password }, {
        where: {
          email
        }
      });
      res.status(200).json({ user });
    }
    

}

export default new userController();