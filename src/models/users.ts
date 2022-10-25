import client from '../database'
import bcrypt from 'bcrypt';


export type User = {
    id?: number;
    userName:string;
    firstName: string;
    lastName: string;
    password?: string;
}

const { PEPPER, SALT_ROUNDES } = process.env;


export class UserModel {
    async index(): Promise<User[]> {
        try {
            const sql = 'SELECT id, userName , firstName, lastName FROM users';
            const conn = await client.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(
                `Failed to get Users due to: ${(err as Error).message}`
            );
        };
    };

    async show(id: number): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            if (!result.rows.length) throw new Error;
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find User with this ${id}, Error: ${(err as Error).message}`);
        };
    };

    async create(u: User): Promise<User> {

        try {
            const sql = 'INSERT INTO users (username,firstname, lastname, password)VALUES($1, $2, $3,$4) RETURNING id,userName,firstName, lastName';
            const conn = await client.connect(); 
            const hash = bcrypt.hashSync(u.password as string + PEPPER, Number(SALT_ROUNDES));
            const result = await conn.query(sql, [u.userName,u.firstName, u.lastName, hash]);
            const User = result.rows[0];
            conn.release();
            return User
        } catch (err) {
            throw new Error(`Could not add new User ${u.userName}, ${(err as Error).message}`)
        };
    };


      async delete(id: number): Promise<User> {
        try {
          const connection = await client.connect()
          const sql = `DELETE FROM users WHERE id=($1) RETURNING *`
          const result = await connection.query(sql, [id])
          connection.release()
          return result.rows[0]
        } catch (err) {
          throw new Error(
            `Unable to delete user ${id}, ${(err as Error).message}`
          )
        };
      };

    async update (u:User): Promise<User> {
        try {
            const conn = await client.connect();
            const sql = 
    'UPDATE users SET username=($1), firstname=($2), lastname=($3), password=($4) WHERE id=($5) RETURNING id, userName, firstname, lastName';
            const hash = bcrypt.hashSync(u.password as string + PEPPER, Number(SALT_ROUNDES));
            const result = await conn.query(sql ,[u.userName,u.firstName,u.lastName,hash,u.id])
            conn.release();
            return result.rows[0];
 
        } catch (error) {
            throw new Error(
                `Could not update user: ${u.userName}, ${(error as Error).message}`
              )
        }  
    }

    async authenticate(username: string, password: string): Promise<User | null> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT password FROM users WHERE userName=($1)';
            const result = await conn.query(sql, [username]);
            const user = result.rows[0];
            if (user) {
                if (bcrypt.compareSync(password + PEPPER, user.password)) {
                    return user;
                }
                
            };
            conn.release()
            return null;
        } catch (err) {
            throw new Error(`Failed to sign in as a User with the following error: ${(err as Error).message}`);
        };
    };
};



export default UserModel;