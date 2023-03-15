import React, { useState, useEffect } from "react";
import { useMutation } from '@apollo/client';
import { ADD_MEDIA } from "../utils/mutations";

const CloudinaryUploadWidget = ({ dogId }) => {
  const cloudName = "datl67gp3";
  const [addMedia] = useMutation(ADD_MEDIA);

  useEffect(() => {
    const handleUpload = async (data) => {
      const mediaUrl = data.info.secure_url;
      console.log(`Media URL: ${mediaUrl}`);
      try {
        await addMedia({ variables: { dogId, content: mediaUrl } });
      } catch (error) {
        console.error(error);
      }
    }

    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName,
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
              }, "image/jpeg", 0.6);
            };
          };
        },
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          handleUpload(result);
        }
      }
    );

    document.getElementById("upload_widget").addEventListener(
      "click",
      () => myWidget.open(),
      false
    );
  }, [addMedia, dogId]);

  return (
    <button id="upload_widget" className="cloudinary-button">
      Upload
    </button>
  );
};

export default CloudinaryUploadWidget;

