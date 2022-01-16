import {React,useState,useEffect} from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import "./login.css";

export default function Login(){
    const navigate = useNavigate();
    const[show_register,setRegister] = useState(false)
    const[employees,setEmployee] = useState([])
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = (data,e) => {
        if(show_register){
            let check_data = null
            check_data = employees.find(x => {
                return x.employee_id === data.employee_id
            })
            if(check_data == null){
                employees.push(data)
                employees.forEach(x => {
                    x['login_id'] = uuidv4();
                })
                localStorage.setItem("store_employee",JSON.stringify(employees))
                setEmployee(JSON.parse(localStorage.getItem("store_employee")))
                setRegister(false)
            }
            else{
                alert("Employee Already Exists")
            }   
        }
        else{
            let show_data = null
            if(employees && employees.length){
                show_data = employees.filter(x => {
                    return x.employee_id === register.employee_id
                })
            }
            if(!show_data){
                alert("Employee ID does not Exists")
            }
            else{
                let store_data
                store_data = employees.find(x => {
                    return x.employee_id === data.employee_id
                })
                sessionStorage.setItem("logged_in_user",JSON.stringify(store_data))
                navigate('/home')
            }
        }
        e.target.reset();
    }
    let registerEmployee = () => {
        if(!show_register){
            setRegister(true)
        }
        else{
            setRegister(false)
        }
    }

    useEffect(() => {
        let data = []
        data = JSON.parse(localStorage.getItem("store_employee"))
        data = data === null ? [] : data
        if(data.length == 0){
            setEmployee([])
        }
        else{
            setEmployee(data)
        }
    },[])

    return( 
        <div className={show_register === true ? 'h-350 d-block login' : 'd-block login'}>
            <h3>{show_register === true ? 'Sign Up' : 'Sign In'}</h3>
            <hr />
            <form className="mt-7px" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-0">
                    <label className="text-left d-block text-black">Employee ID</label>
                    <input className="form-control" {...register("employee_id",{required: true})} placeholder="Enter Employee ID"></input>
                </div>
                {errors.employee_id && <div className="text-danger text-left fw-500">Employee ID is Required</div>}
                {
                    show_register === true ?
                        <div className="form-group mb-0 mt-16px">
                            <label className="text-left d-block text-black">Employee Name</label>
                            <input {...register("employee_name", {required: true})} className="form-control" placeholder="Enter Employee Name"></input>
                        </div>
                    : null    
                }
                {errors.employee_name && <div className="text-danger text-left fw-500">Employee Name is Required</div>}
                <button type="submit" className="btn btn-success btn-smm mt-12px fs-14 text-white">
                    SUBMIT
                </button>
                <a href="javascript:;" className="fw-600 text-primary pointer d-block mt-7px" onClick={registerEmployee}>{ show_register ? 'Please Click here to Login' : 'Please Click here to Register'}</a>
            </form>
        </div>
    )
}