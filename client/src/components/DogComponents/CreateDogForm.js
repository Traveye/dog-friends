import { ADD_DOG } from "../../utils/mutations";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import auth from "../../utils/auth";
import swal from "sweetalert";
import './createDogForm.css'

const CreateDogForm = ({ userID, closeModal }) => {
    const [dogForm, setDog] = useState({name:'', bio:'', breed:'', playStyle:'',});

    const [addDog, {data, loading, error}] = useMutation(ADD_DOG);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try{
            console.log(dogForm.playStyle)
            
             await addDog({
                variables: {  name: dogForm.name, bio: dogForm.bio, playStyle: dogForm.playStyle, breed: dogForm.breed, }
            });
            setDog({name:'', bio:'', breed:'', playStyle:''});
            
            console.log('this is after addDog and setDog')
             closeModal();

        } catch (error) {
            console.log('this is catch block')
            console.error(error)
        }
    };
    

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDog({
            ...dogForm,
            [name]: value,
        });
    };
    return (
        <div>
        <div>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={dogForm.name} onChange={handleChange} />
  
            <label htmlFor="bio">Bio</label>
            <textarea id="bio" name="bio" value={dogForm.bio} onChange={handleChange} />
  
            <label htmlFor="breed">Breed</label>
            <input type="text" id="breed" name="breed" value={dogForm.breed} onChange={handleChange} />
  
            <label htmlFor="playStyle">Play Style</label>
            <input type="text" id="playStyle" name="playStyle" value={dogForm.playStyle} onChange={handleChange} />
  
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    )
}
export default CreateDogForm;