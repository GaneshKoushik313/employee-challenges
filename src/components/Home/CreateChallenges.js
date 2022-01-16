import {React, useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import { useForm } from "react-hook-form";
import { Modal } from 'react-responsive-modal';
export default function CreateChallenges(props){
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = (data,e) => {
        data['_id'] = uuidv4();
        data['voter_id'] = null
        data['created_date'] = new Date()
        let store_data = []
        let check_data = []
        check_data = JSON.parse(localStorage.getItem("store_challenges"))
        if(check_data){
            store_data = check_data
            store_data.push(data)
        }
        else{
            store_data.push(data)
        }
        localStorage.setItem("store_challenges",JSON.stringify(store_data))
        props.saveChallenge()
    }
    return(
        <div>
            <Modal open={props.open} classNames={{animationIn: 'customEnterAnimation',animationOut: 'customLeaveAnimation'}} animationDuration={500} className="p-4" center>
                <div className="modal-title">
                    <div>
                        <h5>CREATE CHALLENGE</h5>
                        <span className="mt-2" onClick={props.hideChallenge}>
                            <i className="fa fa-times-circle pointer text-white fs-20"></i>
                        </span>
                    </div>
                </div>
                <div className="modal-body m-5">
                    <form className="mt-7px" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group mb-0">
                            <label className="text-left d-block text-black">Title</label>
                            <input className="form-control" {...register("title",{required: true})} placeholder="Enter Title"></input>
                        </div>
                        {errors.title && <div className="text-danger text-left fw-500">Title is Required</div>}
                        <div className="form-group mb-0 mt-16px">
                            <label className="text-left d-block text-black">Description</label>
                            <textarea {...register("description", {required: true})} className="form-control" placeholder="Enter Description"></textarea>
                        </div>
                        {errors.descripiton && <div className="text-danger text-left fw-500">Description is Required</div>}
                        <div className="form-group mb-0 mt-16px">
                            <label className="text-left d-block text-black">Tags</label>
                            <select className="w-100" {...register("tags", { required: true })}>
                                <option value="feature">Feature</option>
                                <option value="Technical">Technical</option>
                                <option value="deployment">Deployment</option>
                            </select>
                        </div>    
                        {errors.tags && <div className="text-danger text-left fw-500">Tags is Required</div>}
                        <div className="footer-actions mt-0 pt-3 d-block">
                            <button type="submit" className="btn btn-success btn-smm mt-12px contentCenter d-block text-white fw-500 fs-14">
                                SAVE
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
       </div>     
    )
}