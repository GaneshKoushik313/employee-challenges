import {React,useState,useEffect} from 'react';
import './home.css';
import CreateChallenges from "./CreateChallenges.js";

export default function Home(){
    const [logged_in_user,setLoggedInUser] = useState({
        employee_id: '',
        employee_name: '',
        login_id: ''
    })
    const [open,setOpen] = useState(false)
    const [loading,setLoading] = useState(false)
    const [challenges,setChallenges] = useState([])

    let voterChallenge = (index) => {
        // if(!loading){
        //     console.log(index)
        //     if(challenges[index].voter_id){
        //         challenges[index].voter_id = null
        //     }
        //     else if(challenges[index].voter_id == null){
        //         challenges[index].voter_id = logged_in_user.login_id
        //     }
        // }
    }

    let addChallenge = () => {
        setOpen(true)
    }

    let saveChallenge = (value) => {
        setChallenges(JSON.parse(localStorage.getItem("store_challenges")))
        setOpen(false)
    }

    let hideChallenge = () => {
        setOpen(false)
    }

    let formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [day, month, year].join('-');
    }
     
    useEffect(() => {
        setLoading(true)
        setLoggedInUser(JSON.parse(sessionStorage.getItem("logged_in_user")))
        setChallenges(JSON.parse(localStorage.getItem("store_challenges")))
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    },[])
    
    return(
        <div className="h-100">
            {
                loading === true ?
                <div>
                    Loading ....
                </div> :
                <div className="d-flex main-container">
                    <div className="header navbar-fuse-sidebar left-positioned open locked-open unfoldedSidebar p-3">
                        <div className="text-justify">
                            <div>{logged_in_user.employee_id}</div>
                            <div>{logged_in_user.employee_name}</div>
                        </div>
                        <div className="logout">
                            <i className="fa fa-sign-out text-white fs-16"></i>
                            Logout
                        </div>
                    </div>
                    <div className="w-100 pt-10 pl-3 pr-3">
                        <h3 className="font-weight-bold text-center">HACK IDEAS</h3>
                        { open === false ?
                            <div className="w-100">
                                <button type="button" onClick={addChallenge} className="btn btn-success text-white d-block pull-right fs-14 fw-600 mt-3">Create Challenges</button>
                            </div> : null
                        } 
                        <div className="mt-18 w-100">
                            { challenges && challenges.map((list,index) => (
                                <div key={index} className="list-challenges p-3 mt-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="fw-600">{list.title}</div>
                                        <div>
                                            <span className="pointer" onClick={voterChallenge(index)}>
                                                {
                                                    challenges[index].voter_id ? <i className="fs-14 fa">&#xf087;</i> : <i className="fa fa-thumbs-up fs-14"></i>
                                                }
                                            </span>
                                            <span className="text-primary">24 Votes</span>
                                            <span className="ml-4">{formatDate(list.created_date)}</span>
                                        </div>
                                    </div>
                                    <div className="mt-2 text-justify w-100">{list.description}</div>
                                </div>   
                            ))}    
                        </div>
                    </div>
                </div> 
            }
            {
                open === true ? <CreateChallenges style={{zIndex:'9999'}} open={open} saveChallenge={saveChallenge} hideChallenge={hideChallenge}></CreateChallenges> : null
            }
        </div>
    )
}