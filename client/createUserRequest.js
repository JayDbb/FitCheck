const axios = require('axios');

const createUser = async () => {
    try {
        const response = await axios.post('http://localhost:3000/api/users', {
            username: 'newuser',
            password: 'password123'
        });
        console.log('User created successfully:', response.data);
    } catch (error) {
        console.error('Error creating user:', error.response ? error.response.data : error.message);
    }
};

createUser();
