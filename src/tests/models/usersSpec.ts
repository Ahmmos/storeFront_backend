import { User,UserModel } from '../../models/users';
import client from '../../database'

const userModel = new UserModel();


describe('User Model', () => {
  describe('Test methods exists', () => {
    it('should have index Users method', () => {
      expect(userModel.index).toBeDefined()
    })

    it('should have show one user method', () => {
      expect(userModel.show).toBeDefined()
    })
    
    it('should have a Create User method', () => {
      expect(userModel.create).toBeDefined()
    })
    
    it('should have a Update User method', () => {
      expect(userModel.update).toBeDefined()
    })
    
    it('should have a Delete User method', () => {
      expect(userModel.delete).toBeDefined()
    })
    
    it('should have an Authenticate User method', () => {
      expect(userModel.authenticate).toBeDefined()
    })
  })
  
  describe('Test User Model Logic', () => {
    const user:User = {
      
      userName:"testUser",
      firstName: "test",
      lastName: "User",
      password: "pass123"
    }as User
    
    beforeAll(async () => {
      const createdUser = await userModel.create(user)
      user.id = createdUser.id
    })
    
    afterAll(async () => {
      const connection = await client.connect()
      const sql = 'DELETE FROM users \nALTER SEQUENCE users_id_seq RESTART WITH 1;'
      await connection.query(sql)
      connection.release()
    })
    
    it('Create method should return a New User', async () => {
      const createdUser = await userModel.create({
        userName:"Ahmos",
        firstName: "Ahmed",
        lastName: "Mostafa",
        password: "ahmos123"
      } as User)

      expect(createdUser).toEqual({
        id: createdUser.id,
        userName:"Ahmos",
        firstName: "Ahmed",
        lastName: "Mostafa",
        password: "ahmos123"
      } as User)
    })
    
    it('index method should return All available users in DB', async () => {
      const users = await userModel.index()
      expect(users.length).toBe(2)
    })
    
    it('show method should return createdUser when called with ID', async () => {
      const returnedUser = await userModel.show(user.id as number)
      expect(returnedUser.id).toBe(user.id)
      expect(returnedUser.userName).toBe(user.userName)
      expect(returnedUser.firstName).toBe(user.firstName)
      expect(returnedUser.lastName).toBe(user.lastName)
    })
    
    it('Update method should return a user with edited attributes', async () => {
      const updatedUser = await userModel.update({
        ...user,
        userName: 'Ahmos333',
        firstName: 'Ahmed',
        lastName: 'Hassan',
      })
      expect(updatedUser.id).toBe(user.id)
      expect(updatedUser.userName).toBe('Ahmos333')
      expect(updatedUser.firstName).toBe('Ahmed')
      expect(updatedUser.lastName).toBe('Hassan')
    })
    
    it('Delete One method should delete user from DB', async () => {
      const deletedUser = await userModel.delete(user.id as number)
      expect(deletedUser.id).toBe(user.id)
    })
  })
})
