import React, { useState, useEffect } from "react";
import { useMutation } from '@apollo/client';
import { ADD_MEDIA } from "../utils/mutations";
const CloudinaryUploadWidget =  ({dogId}) => {
  console.log(`this is line 5 ${dogId}`)
  const cloudName = "datl67gp3";
  const [secureUrl, setSecureUrl] = useState('');
  const [addMedia]=useMutation(ADD_MEDIA);



  useEffect(() => {
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName,
        uploadPreset: "n9mflcx1",
        cropping: false,
        multiple: false,
        maxFiles: 1,
        resourceType: "image",
        clientAllowedFormats: ["jpeg", "jpg", "png"],
        maxFileSize: 10000000, // max file size of 10MB
        customUploadFunction: function (data) {
          const reader = new FileReader();
          reader.readAsDataURL(data.file);
          reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");
              const maxDimensions = 800; // maximum width or height of 800px
              const scaleFactor = Math.min(
                maxDimensions / img.width,
                maxDimensions / img.height
              );
              const newWidth = img.width * scaleFactor;
              const newHeight = img.height * scaleFactor;
              canvas.width = newWidth;
              canvas.height = newHeight;
              ctx.drawImage(img, 0, 0, newWidth, newHeight);
              canvas.toBlob((blob) => {
                data.file = new File([blob], data.file.name, {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                });
              }, "image/jpeg", 0.6);
            };
          };
        },
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          console.log(`this is dogId in addImg${dogId}`)
          document
            .getElementById("uploadedimage")
          
            console.log(secureUrl)
         addImg(dogId, result.info.secure_url);
        }
      }
    );

    const addImg = async (dogId, secureUrl) => {
      console.log("this is line 11 "+dogId+" "+secureUrl)
      
      try{
        await addMedia({variables:{dogId:dogId, content:secureUrl}
        })
        
      }
        catch (error){
          console.error(error)
        }
    }

    const handleUpload = async () => {
      await myWidget.open();
     
    };


    document.getElementById(`${dogId}`).addEventListener(
      "click",
      function (event) {
        event.stopPropagation();
        handleUpload();
      },
      false
    );
   }, [dogId, secureUrl, addMedia]);

   console.log(`this is dogId before the return ${dogId}`)
   console.log(`this is URL ${secureUrl}`)

  return (
    <button id={dogId} className="dashboardButton">
      Upload Photos
    </button>
  );
};

export default CloudinaryUploadWidget;

