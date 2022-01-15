import {React,useState} from 'react';
import "./login.css";

export default function Login(){
    const[show_register,setRegister] = useState(false)

    let registerEmployee = () => {
        if(!show_register){
            setRegister(true)
        }
        else{
            setRegister(false)
        }
    }

    return( 
        <div className={show_register === true ? 'h-350 d-block login' : 'd-block login'}>
            <h5>{show_register === true ? 'Sign Up' : 'Sign In'}</h5>
            <hr />
            <form className="mt-7px">
                <div className="form-group">
                    <label className="text-left d-block">Employee ID</label>
                    <input className="form-control" placeholder="Enter Employee ID"></input>
                </div>
                {
                    show_register === true ?
                        <div className="form-group">
                            <label className="text-left d-block">Employee Name</label>
                            <input className="form-control" placeholder="Enter Employee Name"></input>
                        </div>
                    : null    
                }
                <button className="btn btn-success btn-smm">
                    SUBMIT
                </button>
                <a href="javascript:;" className="fw-600 text-primary pointer d-block mt-7px" onClick={registerEmployee}>{ show_register ? 'Please Click here to Login' : 'Please Click here to Register'}</a>
            </form>
        </div>
    )
}