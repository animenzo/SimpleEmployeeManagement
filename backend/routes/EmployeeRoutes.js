const { createEmployee, getAllEmployees, getEmployeeById, deleteEmployeeById, updateEmployeeById } = require('../controllers/EmployeeController');
const { cloudinaryUploader } = require('../middlewares/FileUploader');

const routes = require('express').Router()

// routes.get('/',(req,res)=>{
//     res.send("get all emp")
// })

routes.get('/',getAllEmployees)


routes.get('/:id',getEmployeeById)



routes.post('/',cloudinaryUploader.single('profileImage'), createEmployee)

routes.put('/:id',cloudinaryUploader.single('profileImage'), updateEmployeeById)

routes.delete('/:id',deleteEmployeeById)


module.exports = routes;