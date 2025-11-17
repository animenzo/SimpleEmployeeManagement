const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

require('dotenv').config();
const PORT = process.env.PORT || 3000;
require('./models/db')

const EmployeeRouter = require('./routes/EmployeeRoutes');

app.get('/', (req, res) => {
    res.send('Hello, Employee Management System!');
});


app.use('/api/employees',EmployeeRouter);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})