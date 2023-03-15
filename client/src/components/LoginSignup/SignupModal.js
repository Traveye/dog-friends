import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { useNavigate  } from 'react-router-dom';


function SignupModal() {
  const [addUser, { error }] = useMutation(ADD_USER);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Signup',
      html:
        '<input type="text" id="username" class="swal2-input" placeholder="Username">' +
        '<input type="text" id="location" class="swal2-input" placeholder="Location">' +
        '<input type="password" id="password" class="swal2-input" placeholder="Password">',
      focusConfirm: false,
      preConfirm: () => {
        const username = Swal.getPopup().querySelector('#username').value;
        const location = Swal.getPopup().querySelector('#location').value;
        const password = Swal.getPopup().querySelector('#password').value;

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
        Swal.fire({
          title: 'Signup successful!',
          icon: 'success',
        });
        navigate(`/dashboard/${userID}`);
      } catch (err) {
        Swal.fire({
          title: 'Error!',
          text: err.message,
          icon: 'error',
        });
      }
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
