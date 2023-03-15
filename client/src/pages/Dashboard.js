
import React, {useState, useEffect, useRef, useContext} from "react";
import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER } from "../utils/queries";
import { REMOVE_DOG } from "../utils/mutations";
import Auth from '../utils/auth';
import CreateDogForm from "../components/DogComponents/CreateDogForm";
import "../components/DogComponents/createDogForm.css"
import UpdateUserForm from '../components/UserComponents/UpdateUserForm';
import CloudinaryUploadWidget from "../components/CloudinaryUploadWidget";
import './Dashboard.css'
import { UserContext } from '../utils/UserContext'


function Dashboard () {
    const { userID } = useParams();
    const { loggedIn, loggedInUser } = useContext(UserContext);
    const userContext = useContext(UserContext);
    console.log("userID dashboard",userID)
    userContext.setLoggedInUser(userID);

    //modal state set to false
    const [showCreateDogForm, setShowCreateDogForm]=useState(false)
    const [showUpdateForm, setShowUpdateForm]=useState(false)
    //this is for modal
    const modalRef = useRef();
    const backdropRef = useRef();
    

    const [currentUser, setCurrentUser] = useState({});

    const [removeDog] = useMutation(REMOVE_DOG);
    
    const { loading, data } = useQuery(GET_USER, {variables: {userId: userID}});
    
    useEffect( () => {
     if (data && data.user) {
         setCurrentUser(data.user);
     };
    },[data, userID]);


    
    const user = currentUser || {};
    const dog = currentUser.dogReference || [];

    useEffect(() => {
        const newDogAdded = user?.dogReference?.length > dog?.length;
        if (newDogAdded) {
          // refetch data to trigger a re-render
        }
      }, [user?.dogReference, dog?.length]);

    //this is for modal
    useEffect( () => {
        const handleOutsideClick = (event) => {
            if (
                (modalRef.current && !modalRef.current.contains(event.target)) || (backdropRef.current && !backdropRef.current.contains(event.target))){
                setShowCreateDogForm(false);
                setShowUpdateForm(false)
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);

        return () =>{
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [showCreateDogForm]);

    const deleteDog = async (dogId) => {
        console.log('we clicking baby')
        console.log(dogId)
        try {
            console.log('this is the try hard')
            await removeDog({variables: {dogId}});
            console.log('returned from server')
            const updatedUser = {
                ...currentUser,
                dogReference: user.dogReference.filter(dog => dog._id !== dogId)
            };
            setCurrentUser(updatedUser);
        }
     catch (error){
        console.log('this is the catch block')
        console.error(error);
    }
    }

    const handleUpdateForm = () => {
        setShowUpdateForm(true)
    };
    const handleCloseUpdateForm = () => {
        setShowUpdateForm(false)
        window.location.reload();
    };
  
  console.log(user)
    const handleCloseForm = () => {
       setShowCreateDogForm(false);
       window.location.reload();
     }

    if (loading) {
       return <div className="loading">Loading...</div>
    } 
        return (

        <div  id="dashboardParentContainer">
        <div id="dashboardContainer">
        <h1 id="userNameHeader">Hi, {user?.username}!</h1>
        {Auth.loggedIn()? (
            <>
            <button className="dashboardButton" onClick={handleUpdateForm}>Update User</button>
            {showUpdateForm && (<> <div className="our-modal-backdrop" ref={backdropRef}>
        <div className="our-modal-content" ref={modalRef}> <UpdateUserForm closeModal={handleCloseUpdateForm} userID={userID}/>
        </div>
        </div>
        </>)}


        <div className="dashboardIconContainer">
        <p>Add a dog Σ>―❤️️→ </p>
        <button className="dashboardIcon" onClick={() => setShowCreateDogForm(true)}>🐶</button>
        </div>
       <>
        {showCreateDogForm && (<> <div className="our-modal-backdrop" ref={backdropRef}>
        <div className="our-modal-content" ref={modalRef}> <CreateDogForm closeModal={handleCloseForm} userID={userID}/>
        </div>
        </div>
        </>)}

        
        <div>{dog?.map((dog) => (<div className="dogCard">
        <div>   
        <h3>{dog.name}</h3> 
        <p>Lives at⦂ {user.location}</p>
        <p>{dog.name} is a⦂ {dog.breed}!</p>

        <p>Favorite play style is⦂ {dog.playStyle}</p>
        <p>This is me!: <img width="200px" alt="doggo" src={dog.media?.[0]?.content}/></p>

        <div><h4>About {dog.name}!</h4> {dog.bio}</div>
        <CloudinaryUploadWidget  dogId={dog?._id} />
        <div className="dashboardIconContainer">
            <p>Delete a dog profile Σ>―დ→</p>
            <button className="dashboardIcon" value={dog._id} onClick={() => deleteDog(dog._id)}>🥺</button>
            </div>
            </div>


        </div>))}</div>
        </>
        </>
        ):(
            <Navigate to= "/"/>
        )}
    </div>
    </div>
    
    );
}

export default Dashboard;