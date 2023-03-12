// should be able to add dog update dog and update user

//! Queries
// me === getUserByID username/media/all dogs that belong to that user
//? user might need to enter street address 
//! Mutation 
// update dog find the dog by id and they should be able to update any field in the model
//add dog dogName/breed/playStyle/media/and any other 
// delete dog by id

import React, {useState, useEffect} from "react";
import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";
import { GET_USERS } from "../utils/queries";
import { UPDATE_USER, REMOVE_USER,ADD_DOG, UPDATE_DOG, REMOVE_DOG, ADD_MEDIA, UPDATE_MEDIA, REMOVE_MEDIA } from "../utils/mutations";
import Auth from '../utils/auth';

function Dashboard () {
    const { userID } = useParams();

    const [currentUser, setCurrentUser] = useState({});

    console.log(userID)
   

    console.log(`this is thisID: ${userID}`)
    
    const [updateUser] = useMutation(UPDATE_USER);
    const [removeUser] = useMutation(REMOVE_USER);
    const [addDog] = useMutation(ADD_DOG);
    const [updateDog] = useMutation(UPDATE_DOG);
    const [removeDog] = useMutation(REMOVE_DOG);
    const [addMedia] = useMutation(ADD_MEDIA);
    const [updateMedia] = useMutation(UPDATE_MEDIA);
    const [removeMedia] = useMutation(REMOVE_MEDIA);
    
    const { loading, data } = useQuery(GET_USERS);
    
    
    useEffect( () => {
     if (data) {
        const user = data.users.find((user) => user._id === userID);
        setCurrentUser(user);
     };
    },[userID, data]);

    const user = currentUser;
    const dog = currentUser.dogReference;


    if (Auth.loggedIn() && Auth.getProfile().data._id === userID) {
        return <Navigate to="/me" />;
      }

    if (loading) {
       return <div className="loading">Loading...</div>
    } 
        return (
    <div className="container">
        <h1 className="userName">Hi, I am {user.username} and these are my Doggos!</h1>
        <div className="doggos">{dog?.map((dog) => (<div className="dogCard"><h3>My name is {dog.name}</h3> 
        <p>We live in {user.location}</p>
        <p>I am a {dog.breed}!</p>
        <p>I love {dog.playStyle}</p>
        <p>I love {dog.media}</p>
        
        <p><h4>This is what my friends say about me!</h4> {dog.bio}</p>
        </div>))}</div>
        

    </div>
    )
};

export default Dashboard;