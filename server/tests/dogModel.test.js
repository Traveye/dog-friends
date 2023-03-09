const Dog = require('../models/Dog');

describe('Dog model', () => {
  // Test that the Dog model has the expected fields
  it('should have the following attributes', () => {
    const dog = new Dog();
    expect(dog).toHaveProperty('dog_name');
    expect(dog).toHaveProperty('bio');
    expect(dog).toHaveProperty('dogs_photo');
    expect(dog).toHaveProperty('pictures_or_videos');
    expect(dog).toHaveProperty('family_photo');
    expect(dog).toHaveProperty('play_style');
  });

  // Test that the Bio attribute is required
  it('should throw an error if Bio is not provided', async () => {
    await expect(Dog.create({ dog_name: 'Max', play_style: 'active' })).rejects.toThrow('Bio is required');
  });

  // Test that the Dog name attribute is required
  it('should throw an error if Dog name is not provided', async () => {
    await expect(Dog.create({ bio: 'A friendly dog', play_style: 'active' })).rejects.toThrow('Dog name is required');
  });

  // Test that the Play style attribute is required
  it('should throw an error if Playstyle is not provided', async () => {
    await expect(Dog.create({ bio: 'A friendly dog', dog_name: 'Max' })).rejects.toThrow('Play style is required');
  });
});