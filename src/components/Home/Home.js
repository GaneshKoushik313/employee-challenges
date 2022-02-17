import {React,useState,useEffect} from 'react';
import './home.css';
import CreateChallenges from "./CreateChallenges.js";
import { useNavigate } from 'react-router-dom';

export default function Home(){
    const navigate = useNavigate();
    const [logged_in_user,setLoggedInUser] = useState({
        employee_id: '',
        employee_name: '',
        login_id: ''
    })
    const [open,setOpen] = useState(false)
    const [loading,setLoading] = useState(false)
    let [challenges,setChallenges] = useState([])

    let voterChallenge = (list) => {
        if(list.voter_id == null && list.voter_id != logged_in_user.login_id){
            list.count_info.count = list.const_count.count + 1
            list.voter_id = logged_in_user.login_id
            list.selected_employees.push(list.voter_id)
            console.log(list.selected_employees)
            setChallenges(challenges.map((challenge) => challenge._id === list._id ? {
                ...challenge,
                voter_id: logged_in_user.login_id
            } : challenge));
        }
        else if(list.voter_id && list.voter_id != logged_in_user.login_id){
            list.count_info.count = list.const_count.count + 1
            list.voter_id = logged_in_user.login_id
            list.selected_employees.push(list.voter_id)
            console.log(list.selected_employees)
            setChallenges(challenges.map((challenge) => challenge._id === list._id ? {
                ...challenge,
                voter_id: logged_in_user.login_id
            } : challenge));
        }
        else if(list.voter_id && list.voter_id == logged_in_user.login_id){
            let filter_employees = list.selected_employees.filter(x => {
                if(x !== list.voter_id){
                    return x
                }
            })
            list.count_info.count = list.const_count.count - 1
            list.voter_id = null
            list.selected_employees = filter_employees
            setChallenges(challenges.map((challenge) => challenge._id === list._id ? {
                ...challenge,
                voter_id: null,
                selected_employees: filter_employees
            } : challenge));
        }
        let store_data = []
        store_data = challenges
        localStorage.setItem("challenges",JSON.stringify(store_data))
        let counts = challenges.map(x => {return x.count_info})
        localStorage.setItem("votes",JSON.stringify(counts))
    }

    let addChallenge = () => {
        setOpen(true)
    }

    let saveChallenge = (value) => {
        setChallenges(JSON.parse(localStorage.getItem("challenges")))
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

    let logOut = () => {
        sessionStorage.removeItem("logged_in_user")
        navigate("/")
    }  

    let loadData = () => {
        setLoading(true)
        setLoggedInUser(JSON.parse(sessionStorage.getItem("logged_in_user")))
        setChallenges(JSON.parse(localStorage.getItem("challenges")))
        let set_count = JSON.parse(localStorage.getItem("challenges"))
        if(set_count){
            set_count.forEach(x => {
                x.const_count = x.count_info
                let selected_id = x.selected_employees.filter(z => {
                    if(z === logged_in_user.login_id){
                        return z
                    }
                })
                console.log('test',selected_id)
                x.voter_id = selected_id[0]
            })
            setChallenges(set_count)
        }
        challenges = challenges.sort(function (a, b) {
            return a.created_date.localeCompare(b.created_date);
        });
        setTimeout(() => {
            setLoading(false)
        }, 50);
    }
    
    useEffect(() => {
        loadData()
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
                        <div className="logout" onClick={logOut}>
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
                            { challenges && challenges.length ? 
                                <div>
                                    { challenges && challenges.map((list,index) => (
                                        <div key={index} className="list-challenges p-3 mt-3">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="fw-600">{list.title}</div>
                                                <div>
                                                    <span className="pointer" onClick={() => voterChallenge(list)}>
                                                        {
                                                            list.voter_id !== logged_in_user.login_id ? <i className="fs-14 fa">&#xf087;</i> : <i className="fa fa-thumbs-up fs-14"></i>
                                                        }
                                                    </span>
                                                    <span className="text-primary">{list.count_info.count} Votes</span>
                                                    <span className="ml-4">{formatDate(list.created_date)}</span>
                                                </div>
                                            </div>
                                            <div className="mt-2 text-justify w-100">{list.description}</div>
                                        </div>   
                                    ))}
                                </div>
                                :
                                <div className="list-challenges p-3 mt-3 font-weight-bold fs-16">
                                    No Data
                                </div>    
                            }    
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