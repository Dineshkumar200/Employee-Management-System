import React,{useState,useEffect} from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const ListEmployeeComponent = () => {

  const [employees, setEmployees] = useState([]);   
 const navigate = useNavigate();
  useEffect(() => {
    getAllEmployees();
    }, []);

    
    function getAllEmployees() {

        listEmployees()
      .then((response) => {
        setEmployees(response.data);
      } )
      .catch((error) => {
        console.error(error);
        }); 
    }

     function addnewEmployee() {
        navigate('/add-employee');      
    } 
    
    function updateEmployee(id) {
        navigate(`/update-employee/${id}`);
    }


    function removeEmployee(id) {
        console.log("Removing employee with id:", id);

        deleteEmployee(id).then((response) => {
            getAllEmployees();
            console.log("Employee deleted successfully:", response.data);

    } ).catch(error => {
            console.error("Error deleting employee:", error);   
        });
    }

       

  return (
    <div className='container' >
        
        <h2 className='text-center'>List Of Employees</h2>
        <button className='btn btn-primary mb-2' onClick={addnewEmployee}>
            Add Employee
        </button>

        <table className='table table-striped table-bordered'>

            <thead>
                <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>

            </thead>
            <tbody>
                {
                    employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstname}</td>
                            <td>{employee.lastname}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button className='btn btn-info' onClick={()=>updateEmployee(employee.id)}>Update</button>
                                <button className='btn btn-danger' onClick={()=>removeEmployee(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListEmployeeComponent