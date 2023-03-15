import React, { useState, useContext } from 'react';
import Swal from 'sweetalert'
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { useNavigate  } from 'react-router-dom';
import {UserContext} from '../../utils/UserContext'


function SignupModal() {
  const [addUser, { error }] = useMutation(ADD_USER);
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState("")
  const userContext = useContext(UserContext);

        return { username, location, password };
      }
    });

    if (formValues) {
      try {
        const { data } = await addUser({
          variables: formValues,
        });
        const userID = data.addUser.user._id;

      Auth.login(data.addUser.token);
      userContext.setLoggedInUser(userID);

      Swal({
        title: 'Signup successful!',
        icon: 'success',
      });
      navigate(`/dashboard/${userID}`);

    } catch (err) {
      console.log("catch err", err)
      Swal({
        title: 'Error!',
        text: err.message,
        icon: 'error',
      });
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <button onClick={handleSubmit}>
        Signup
      </button>
    </div>
  )
}

export default SignupModal;
