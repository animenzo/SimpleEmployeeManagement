const EmployeeModel = require("../models/EmployeeModel");

const createEmployee = async (req, res) => {
  // Logic to create a new employee

  try {
    const body = req.body;
    body.profileImage = req.file ? req.file.path : null;
    // console.log("Request Body:", body);
    const emp = new EmployeeModel(body);
    await emp.save();
    res.status(201).json({
      message: "Employee created successfully",
      success: true,
      data: emp,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating employee",
      success: false,
      error: error,
    });
  }
};

const getAllEmployees = async (req, res) => {
  // Logic to get all employee

  try {
    let { page, limit, search } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    const skip = (page - 1) * limit;

    let searchCriteria = {};
    if (search) {
      searchCriteria = {
        name: {
          $regex: search,
          $options: "i",
        }, //case insensitive
      };
    }

    const totalEmployees = await EmployeeModel.countDocuments(searchCriteria);

    // console.log("Request Body:", body);
    const emps = 
      await EmployeeModel.find(searchCriteria).skip(skip)
      .limit(limit)
    .sort({ updatedAt: -1 });
    // console.log(emps);

    const totalPages = Math.ceil(totalEmployees / limit);

    res.status(200).json({
      message: "Employees fetched successfully",
      success: true,
      data: {
        employees: emps,
        pagination: {
          totalEmployees,
          totalPages,
          currentPage: page,
          pageSize: limit,
        },
      },
    });
  } catch (error) {
    
    res.status(500).json({

      message: "Error fetching employee",
      success: false,
      error: error,
      
    });
  }
};

const getEmployeeById = async (req, res) => {
  // Logic to create a new employee

  try {
    const { id } = req.params;
    const emp = await EmployeeModel.findOne({ _id: id });
    // console.log(emps);

    res.status(200).json({
      message: "Employee fetched successfully",
      success: true,
      data: emp,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching employee",
      success: false,
      error: error,
    });
  }
};

const deleteEmployeeById = async (req, res) => {
  // Logic to create a new employee

  try {
    const { id } = req.params;

    // console.log("Request Body:", body);
    const emp = await EmployeeModel.findByIdAndDelete({ _id: id });
    // console.log(emps);

    res.status(200).json({
      message: "Employee deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching employee",
      success: false,
      error: error,
    });
  }
};

const updateEmployeeById = async (req, res) => {
  // Logic to create a new employee

  try {
    const { name, phone, email, department, salary } = req.body;
    const { id } = req.params;
    let updateData = {
      name,
      phone,
      email,
      department,
      salary,
      updatedAt: new Date(),
    };

    if (req.file) {
      updateData.profileImage = req.file.path;
    }

    const updateEmployee = await EmployeeModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (updateEmployee == null) {
      return res.status(404).json({
        message: "Employee not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Employee updated successfully",
      success: true,
      data: updateEmployee,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating employee",
      success: false,
      error: error,
    });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  deleteEmployeeById,
  updateEmployeeById,
};
