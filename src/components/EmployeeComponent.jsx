import React,{useState,useEffect} from 'react'
import { createEmployee,getEmployeeById, updateEmployee } from '../services/EmployeeService'
import { useNavigate,useParams } from 'react-router-dom';



const EmployeeComponent = () => {

    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const { id } = useParams(); 

    const [errors, setErrors] = useState({
        firstname: '',  
        lastname: '',
        email: ''   
    }  );


    const navigator = useNavigate();


    useEffect(() => {
        if(id) {
           
            getEmployeeById(id).then((response) => {
                const employee = response.data;
                setFirstName(employee.firstname);
                setLastName(employee.lastname);

                setEmail(employee.email);
            }).catch((error) => {
                console.error("Error fetching employee details:", error);
            }); 
        }
    }, [id]);



    function saveOrUpdateEmployee(event) {
        event.preventDefault();
        
       
        if(validateForm()) {
            console.log("Employee saved:", { firstname, lastname, email });

            if(id) {
                updateEmployee(id, { firstname, lastname, email }).then((response) => {
                    console.log("Employee updated successfully:", response.data);
                    navigator('/employees'); 
                }).catch((error) => {
                    console.error(error);
                });
            }
            else {
                createEmployee({ firstname, lastname, email }).then((response) => {
                    console.log("Employee created successfully:", response.data);
                    navigator('/employees'); 
                }).catch((error) => {
                    console.error(error);
                });
            }

        }
  
        
    }
    function cancel() {
        // Logic to cancel the operation
        console.log("Operation cancelled");
    }


    function validateForm() {
        let valid = true; 
        const errorsCopy = { ...errors };

        if(firstname.trim())
        {
            errorsCopy.firstname = '';

        }else{
            errorsCopy.firstname = 'First Name is required';
            valid = false;
        }
        if(lastname.trim())
        {
            errorsCopy.lastname = '';       

        }else{
            errorsCopy.lastname = 'Last Name is required';
            valid = false;
        }
        if(email.trim())
        {
            errorsCopy.email = '';

        }else{

            errorsCopy.email = 'Email is required';
            valid = false;
        }       

        setErrors(errorsCopy);
        return valid;

    }


    function pageTitle() {
        if(id) {    
            return <h2 className='text-center'> Update Employee</h2>
        }
        else {
            return <h2 className='text-center'> Add Employee</h2>
        }   

    }





  return (
    <div className="container">
        <br />
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
         {
            pageTitle()
         }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>First Name:</label>
                            <input type="text"
                            placeholder='First Name'
                            name='firstname'
                            value={firstname}
                            className={`form-control ${errors.firstname ? 'is-invalid' : ''}`}
                            
                            onChange={(event) => setFirstName(event.target.value)}
                            
                            />
                            {errors.firstname && <div className="invalid-feedback">{errors.firstname}</div>
                            
                            }

                        </div>

                    
                        <div className='form-group mb-2'>
                            <label className='form-label'>Last Name:</label>
                            <input type="text"
                            placeholder='Enter Last Name'
                            name='lastname'
                            value={lastname}
                           className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}

                            onChange={(event) => setLastName(event.target.value)}
                            
                            />
                            {errors.lastname && <div className="invalid-feedback">{errors.lastname}</div>
                            
                            }
                        </div>
                        <div className='form-group mb-2'>       
                            <label className='form-label'>Email:</label>
                            <input type="email"
                            placeholder='Enter Email'
                            name='email'
                            value={email}
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            onChange={(event) => setEmail(event.target.value)}
                            
                            />  
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>
                            
                            }
                        </div>
                        <button className='btn btn-success' onClick={saveOrUpdateEmployee}>
                            Save   
                        </button>
                        <button className='btn btn-danger' style={{marginLeft: "10px"}}>
                            Cancel
                        </button>      

                    </form>

                </div>
                </div>
        </div>

    </div>
  )
}

export default EmployeeComponent