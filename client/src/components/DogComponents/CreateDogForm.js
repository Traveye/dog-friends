import { ADD_DOG} from "../../utils/mutations";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import "./createDogForm.css";
import { GET_USER } from "../../utils/queries"



const CreateDogForm = ({ userID, closeModal, updateCurrentUser }) => {
  const [dogForm, setDog] = useState({
    name: "",
    bio: "",
    breed: "",
    playStyle: "",
  });

  const [addDog, { data, loading, error }] = useMutation(ADD_DOG, {
    update(cache, {data:{addDog}}){
      try {
        const {User}  = cache.readQuery({query: GET_USER, variables: {
          userId: userID
        }});
        console.log('this is before the writequery')
        cache.writeQuery({
          query:GET_USER,
          variables: {
            userId: userID
          },
          data: {user: User}
        });
      } catch(error){
console.error(error)
      }
    },
    refetchQueries:[{query: GET_USER, variables: { userId:userID}}]
  });
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(dogForm)
      await addDog({
        variables: {
          name: dogForm.name,
          bio: dogForm.bio,
          playStyle: dogForm.playStyle,
          breed: dogForm.breed,
        },

      });
      setDog({ name: "", bio: "", breed: "", playStyle: "" });
      closeModal();
    } catch (error) {
      console.log(`This is an error: ${error.message}`);
      console.error(error);
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
        <form className="ourForms" onSubmit={handleFormSubmit}>
          <div className="formItemGroup ourGrid">
            <label htmlFor="name">Name⦂</label>
            <input
              type="text"
              id="name"
              name="name"
              value={dogForm.name}
              onChange={handleChange}
            />
          </div>

          <div className="formItemGroup ourGrid">
            <label htmlFor="bio">Bio⦂</label>
            <textarea
              id="bio"
              name="bio"
              value={dogForm.bio}
              onChange={handleChange}
            />
          </div>

          <div className="formItemGroup ourGrid">
            <label htmlFor="breed">Breed⦂</label>
            <input
              type="text"
              id="breed"
              name="breed"
              value={dogForm.breed}
              onChange={handleChange}
            />
          </div>

          <div className="formItemGroup ourGrid">
            <label htmlFor="playStyle">Play Style⦂</label>
            <input
              type="text"
              id="playStyle"
              name="playStyle"
              value={dogForm.playStyle}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="ourButton">Save</button>
        </form>
      </div>
    </div>
  );
};
export default CreateDogForm;
