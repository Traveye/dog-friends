import React, { useState, useEffect, useRef, useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER } from "../utils/queries";
import { REMOVE_DOG } from "../utils/mutations";
import Auth from "../utils/auth";
import CreateDogForm from "../components/DogComponents/CreateDogForm";
import "../components/DogComponents/createDogForm.css";
import UpdateUserForm from "../components/UserComponents/UpdateUserForm";
import CloudinaryUploadWidget from "../components/CloudinaryUploadWidget";
import "./Dashboard.css";
import { UserContext } from "../utils/UserContext";

function Dashboard() {
  const { userID } = useParams();
 
  const userContext = useContext(UserContext);
  console.log("userID dashboard", userID);
  userContext.setLoggedInUser(userID);

  //modal state set to false
  const [showCreateDogForm, setShowCreateDogForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  //this is for modal
  const modalRef = useRef();
  const backdropRef = useRef();


  const [removeDog] = useMutation(REMOVE_DOG);

  const { loading, data, refetch } = useQuery(GET_USER, {
    variables: { userId: userID },
  });

  useEffect(() => {
    if (data && data.user) {
      userContext.setCurrentUser(data.user);
    }
  }, [data, userID, userContext]);

  const user = userContext.currentUser || {};
  const dog = userContext.currentUser.dogReference || [];

  useEffect(() => {
    const newDogAdded = user?.dogReference?.length > dog?.length;
    if (newDogAdded) {
      // refetch data to trigger a re-render
      refetch();
    }
  }, [user?.dogReference, dog?.length, refetch]);

  //this is for modal
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        (modalRef.current && !modalRef.current.contains(event.target)) ||
        (backdropRef.current && !backdropRef.current.contains(event.target))
      ) {
        setShowCreateDogForm(false);
        setShowUpdateForm(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showCreateDogForm]);

  const deleteDog = async (dogId) => {
    console.log(dogId);
    try {
      await removeDog({ variables: { dogId } });
      const updatedUser = {
        ...userContext.currentUser,
        dogReference: user.dogReference.filter((dog) => dog._id !== dogId),
      };
      userContext.setCurrentUser(updatedUser);
    } catch (error) {
      console.error(error);
    }
  };

 
  const handleCloseUpdateForm = () => {
    setShowUpdateForm(false);
    
  };

  console.log(user);
  const handleCloseForm = () => {
    setShowCreateDogForm(false);
  
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  return (
    <div id="dashboardParentContainer">
      <div id="dashboardContainer">
        <h1 id="userNameHeader">Hi, {user?.username}!</h1>
        {Auth.loggedIn() ? (
          <>
            <button className="dashboardButton" onClick={() => setShowUpdateForm(true)}>
              Update User
            </button>
            {showUpdateForm && (
              <>
                {" "}
                <div className="our-modal-backdrop" ref={backdropRef}>
                  <div className="our-modal-content" ref={modalRef}>
                    {" "}
                    <UpdateUserForm
                      closeModal={handleCloseUpdateForm}
                      userID={userID}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="dashboardIconContainer">
              <p>Add a dog Σ>―❤️️→ </p>
              <button
                className="dashboardIcon"
                onClick={() => setShowCreateDogForm(true)}
              >
                Add Dog
              </button>
            </div>
            <>
              {showCreateDogForm && (
                <>
                  {" "}
                  <div className="our-modal-backdrop" ref={backdropRef}>
                    <div className="our-modal-content" ref={modalRef}>
                      {" "}
                      <CreateDogForm
                        closeModal={handleCloseForm}
                        userID={userID}
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                {dog?.map((dog) => (
                  <div className="dogCard">
                    <div>
                      <h3>{dog.name}</h3>
                      <p>Lives at⦂ {user.location}</p>
                      <p>
                        {dog.name} is a⦂ {dog.breed}!
                      </p>

        <p>Favorite play style is⦂ {dog.playStyle}</p>
        <p>This is me!: <img width="200px" alt="doggo" src={dog.media?.[0]?.content}/></p>

                      <div>
                        <h4>About {dog.name}!</h4> {dog.bio}
                      </div>
                      <CloudinaryUploadWidget dogId={dog?._id} />
                      <div className="dashboardIconContainer">
                        <button
                          className="dashboardIcon"
                          value={dog._id}
                          onClick={() => deleteDog(dog._id)}
                        >
                          Remove Dog
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          </>
        ) : (
          <Navigate to="/" />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
