import axios from 'axios';

/*
|============================================================
| If you didnt want to use the same baseUrl for the whole application,
| but only parts of it, and for the other parts you have a different
| URL and headers. For this we can use instances. 
|
| Here we import axios and use the create function. This creates an
| instance of axios (bascially like a copy of it), we can create multiple
| instances. By default the instance will assume the default setup but
| can overwrite anything set up in the index.js file.
| e.g the authorisation headers in the index.js file, will be ignored
| after setting the one in here for all requests sent via this instance.
|
| We then have to export the instance to be able to use it in other files.
| Go to the Blog.js component to see further steps in this explanation.
|============================================================
*/

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

export default instance;


