// should be able to add dog update dog and update user

//! Queries
// me === getUserByID username/media/all dogs that belong to that user
//? user might need to enter street address 
//! Mutation 
// update dog find the dog by id and they should be able to update any field in the model
//add dog dogName/breed/playStyle/media/and any other 
// delete dog by id

import React, {useState, useEffect, useRef, useContext} from "react";
import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER } from "../utils/queries";
import { UPDATE_USER, UPDATE_DOG, REMOVE_DOG, ADD_MEDIA, UPDATE_MEDIA, REMOVE_MEDIA } from "../utils/mutations";
import Auth from '../utils/auth';
import CreateDogForm from "../components/DogComponents/CreateDogForm";
import "../components/DogComponents/createDogForm.css"
import UpdateUserForm from '../components/UserComponents/UpdateUserForm';

import { UserContext } from '../utils/UserContext'


function Dashboard () {
    const { userID } = useParams();
    const { loggedIn, loggedInUser } = useContext(UserContext);
    console.log("loggedIN", loggedIn)
    console.log("loggedInUser", loggedInUser)
    //modal state set to false
    const [showCreateDogForm, setShowCreateDogForm]=useState(false)
    const [showUpdateForm, setShowUpdateForm]=useState(false)
    //this is for modal
    const modalRef = useRef();
    const backdropRef = useRef();

    const [currentUser, setCurrentUser] = useState({});

console.log(currentUser)

    const [updateUser] = useMutation(UPDATE_USER);
    // const [addDog] = useMutation(ADD_DOG);
    const [updateDog] = useMutation(UPDATE_DOG);
    const [removeDog] = useMutation(REMOVE_DOG);
    const [addMedia] = useMutation(ADD_MEDIA);
    const [updateMedia] = useMutation(UPDATE_MEDIA);
    const [removeMedia] = useMutation(REMOVE_MEDIA);
    
    const { loading, data } = useQuery(GET_USER, {variables: {userId: userID}});
    
    console.log(data)
    
    useEffect( () => {
     if (data && data.user) {
         setCurrentUser(data.user);
     };
    },[data, userID]);

console.log(currentUser)
    
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
        // window.location.reload();
    };
    const handleCloseUpdateForm = () => {
        setShowUpdateForm(false)
        window.location.reload();
    };
  
  console.log(user)
    const handleCloseForm = () => {
       setShowCreateDogForm(false);
     }

    if (loading) {
       return <div className="loading">Loading...</div>
    } 
        return (
    <div  className="container">
        <h1 className="userName">Hi, I am {user?.username} and these are my Doggos!</h1>
        {Auth.loggedIn()? (
            <>
            <button className="update" onClick={handleUpdateForm}>Update User</button>
            {showUpdateForm && (<> <div className="modal-backdrop" ref={backdropRef}>
        <div className="modal-content" ref={modalRef}> <UpdateUserForm closeModal={handleCloseUpdateForm} userID={userID}/>
        </div>
        </div>
        </>)}
        <button onClick={() => setShowCreateDogForm(true)}>🐶</button>
       <>
        {showCreateDogForm && (<> <div className="modal-backdrop" ref={backdropRef}>
        <div className="modal-content" ref={modalRef}> <CreateDogForm closeModal={handleCloseForm} userID={userID}/>
        </div>
        </div>
        </>)}
        <div className="doggos">{dog?.map((dog) => (<div className="dogCard"><h3>My name is {dog.name}</h3> 
        <p>We live in {user.location}</p>
        <p>I am a {dog.breed}!</p>
        <p>I love {dog.playStyle}</p>
        <p>This is me!: {dog.media}</p>
        <div><h4>This is what my friends say about me!</h4> {dog.bio}</div>
            <button value={dog._id} onClick={() => deleteDog(dog._id)}>🥺</button>
        </div>))}</div>
        </>
        </>
        ):(
            <Navigate to= "/"/>
        )}

    </div>
    
    );
}

export default Dashboard;