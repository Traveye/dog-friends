const User = require('../models/User');

describe('User model', () => {
    //test that the user model has the expected fields
    it ('should have the following attributes', () => {
        const user = new User();
        expect(user).toHaveProperty('username');
        expect(user).toHaveProperty('password');
        expect(user).toHaveProperty('location');
        expect(user).toHaveProperty('dogReference');
    });

    //test thhe username is required validation
    it('should throw an error if a username is not provided', async () => {
        await expect(User.create({ password: 'Password1!', location: 'New York' })).rejects.toThrow('Username is required');
    });

    //test the username is unique validation
    it('should throw an error when a non-unique username is used to create a user', async () => {
        await User.create({ username: 'johndoe', password: 'Password1!', location: 'New York' });

        await expect(User.create({ username: 'johndoe', password: 'Password1!', location: 'Los Angeles' })).rejects.toThrow('Username must be unique');
    });

    //test the password is required validation
    it('should throw an error if a password is not provided', async () => {
        await expect(User.create({ username: 'johndoe', location: 'New York', dogReference: 'goldenretriever' })).rejects.toThrow('Password is required');
    });

    //test the passowrd is at least 6 characters validation
    it('should throw an error if a password is less than 6 characters', async () => {
        await expect(User.create({ username: 'johndoe', password: 'dog', location: 'New York', dogReference: 'goldenretriever' })).rejects.toThrow('Password must be 6 characters or more');
    });

    //test the passowrd regex validation - /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/

    it('should throw an error if a password does not meet regex /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/ ', async () => {
        await expect(User.create({ username: 'johndoe', password: 'password', location: 'New York', dogReference: 'goldenretriever' })).rejects.toThrow('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
    });

    //need test for webtoken generation - not sure what library being used.
    // will be usin jsonwebtoken
    it('should generate a webtoken', async () => {
        const user = await User.create({ username: 'johndoe', password: 'Password1!', location: 'New York', dogReference: 'goldenretriever' });
        const token = user.generateAuthToken();
        expect(token).not.toBeNull();
    });
});
