


const BASE_URL = "http://localhost:8000";
export const GetAllEmployees = async (search="",page=1,limit=5) => {
    const url = `${BASE_URL}/api/employees?search=${search}&page=${page}&limit=${limit}`;
    try {
        const options = {
            method:"GET",
            "Content-Type":"application/json"
        }
        const data = await fetch(url,options);
        return await data.json();
    } catch (error) {
        return error
    }
}

export const CreateEmployee = async (empObj) => {
    const url = `${BASE_URL}/api/employees`;
    try {
        const formData = new FormData();
        for(const key in empObj){
            formData.append(key,empObj[key])
        }
        const options = {
            method:"POST",
            "Content-Type":"application/json",
            body:formData
        }
        const data = await fetch(url,options);
        return await data.json();
    } catch (error) {
        return error
    }
}

export const UpdateEmployeeByid = async (empObj,id) => {
    const url = `${BASE_URL}/api/employees/${id}`;
    try {
        const formData = new FormData();
        for(const key in empObj){
            formData.append(key,empObj[key])
        }
        const options = {
            method:"PUT",
            "Content-Type":"application/json",
            body:formData
        }
        const data = await fetch(url,options);
        return await data.json();
    } catch (error) {
        return error
    }
}

export const DeleteEmployeeByid = async (id) => {
    const url = `${BASE_URL}/api/employees/${id}`;
    try {
       
        
        const options = {
            method:"DELETE",
            "Content-Type":"application/json",
            
        }
        const data = await fetch(url,options);
        return await data.json();
    } catch (error) {
        return error
    }
}

export const GetEmployeeByid = async (id) => {
    const url = `${BASE_URL}/api/employees/${id}`;
    try {
       
        
        const options = {
            method:"GET",
            "Content-Type":"application/json",
            
        }
        const data = await fetch(url,options);
        return await data.json();
    } catch (error) {
        return error
    }
}