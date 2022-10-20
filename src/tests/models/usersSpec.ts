import { User,UserModel } from '../../models/users';

const userModel = new UserModel();
const baseUser: User = {

    userName:"Ahmos",
    firstName: "Ahmed",
    lastName: "Mostafa",
    password: "ahmos123"
};
let user: User;
describe('Testing: users', () => {
  it('Must have a create method', () => {
    expect(userModel.create).toBeDefined();
  });

  it('Testing the createtion', async () => {
    user = await userModel.create(baseUser);
    expect({ usernme: user.userName, firstName: user.firstName , lastName:user.lastName, password: user.password}).toEqual({
      usernme: baseUser.userName,
      firstName: baseUser.firstName,
      lastName: baseUser.lastName,
      password: baseUser.password
    });
  });
  it('Must have an index method', () => {
    expect(userModel.index).toBeDefined();
  });


  it('Must have a show method', () => {
    expect(userModel.show).toBeDefined();
  });

  it('Must have a delete method', () => {
    expect(userModel.delete).toBeDefined();
  });

  it('Must have an authanticate method', () => {
    expect(userModel.authenticate).toBeDefined();
  });


})