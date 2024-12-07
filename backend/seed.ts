import { AppDataSource } from './data-source';
import { User } from './entities/User';

const seedDatabase = async () => {
    try {
        // Initialize the database connection
        await AppDataSource.initialize();
        console.log('Database connected successfully!');

        const userRepository = AppDataSource.getRepository(User);

        // Define sample users (with plain text passwords)
        const users = [
            {
                username: 'adminUser',
                password: 'admin123', // Plain text password
                role: 'admin',
                token: 'IhaveADMINaccess',
            },
            {
                username: 'writerUser',
                password: 'writer123', // Plain text password
                role: 'write',
                token: 'IhaveWRITEaccess',
            },
            {
                username: 'readerUser',
                password: 'reader123', // Plain text password
                role: 'read',
                token: 'IhaveREADaccess',
            },
        ];

        // Save users into the database
        await userRepository.save(users);
        console.log('Sample users have been added to the database!');

        process.exit(0); // Exit the script successfully
    } catch (error) {
        console.error('Error seeding the database:', error);
        process.exit(1); // Exit the script with an error
    }
};

seedDatabase();