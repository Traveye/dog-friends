import React, { useState, useEffect } from "react";
import { useMutation } from '@apollo/client';
import { ADD_MEDIA } from "../utils/mutations";
console.log(ADD_MEDIA)
const CloudinaryUploadWidget =  (dogId) => {
  const cloudName = "datl67gp3";
  const [secureUrl, setSecureUrl] = useState('');
  const [addMedia]=useMutation(ADD_MEDIA);

  const addImg = async (dogId, secureUrl) => {
    console.log(dogId+" "+secureUrl)
    
    try{
      await addMedia({variables:{dogId:dogId, content:secureUrl}
      })
      
    }
      catch (error){
        console.error(error)
      }
  }

  useEffect(() => {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: "n9mflcx1",
        cropping: false,
        multiple: false,
        maxFiles: 1,
        resourceType: "image",
        clientAllowedFormats: ["jpeg", "jpg", "png"],
        maxFileSize: 10000000, // 10MB
        customUploadFunction: function (data, callback) {
          const reader = new FileReader();
          reader.readAsDataURL(data.file);
          reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");
              const maxDimensions = 800; // maximum width or height
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
                callback(data);
                setSecureUrl(data.info.secure_url);
              }, "image/jpeg", 0.6);
            };
          };
        },
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          console.log(dogId)
          document
            .getElementById("uploadedimage")
            .setAttribute("src", result.info.secure_url);
         addImg(dogId, secureUrl);
        }
      }
    );


    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );
  }, []);

  return (
    <button id="upload_widget" className="cloudinary-button">
      Upload
    </button>
  );
};

export default CloudinaryUploadWidget;
