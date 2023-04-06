import { useState, useContext } from 'react';
import sgMail from '@sendgrid/mail';
import { UserContext } from "../../utils/UserContext";
import { Html } from '@react-email/html';
import { Button } from '@react-email/button';



// function EmailForm({email}) {
//   const userContext = useContext(UserContext);
//   const [text, setText] = useState('');
//   sgMail.setApiKey('');
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const msg = {
//       to: `${email}`,
//       from: `${userContext.currentUser.email}`,
//       subject: 'Test email',
//       text: text,
//     };
//     sgMail.send(msg);
//   };
  // return (
  //   <form onSubmit={handleSubmit}>
  //     <label>
  //       Email text:
  //       <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
  //     </label>
  //     <button type="submit">Send email</button>
  //   </form>
  // );
//   return (
//     <Html lang="en">
//       <Button href={email}>Click me</Button>
//     </Html>
//   );
// }
// export default EmailForm;
