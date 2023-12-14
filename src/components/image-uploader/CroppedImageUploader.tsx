import React, {useRef, useState} from "react";
import ReactCrop, {Crop} from "react-image-crop";
import 'react-image-crop/dist/ReactCrop.css'
import {ref, uploadBytes} from "firebase/storage";


import {getCroppedImg} from "./utils/getCroppedImg";

import "./styles.scss";
import {useFirebaseContext} from "../../firebase";

type Props = {
  firebaseStorageRef: string;
  title?: string;
  handleUpdateComplete?: (uploadUrl: string) => void;
  buttonUploadText?: string;
  cropAspectRatio?: number;
};

export const CroppedImageUploader: React.FC<Props> = ({
  handleUpdateComplete,
  title,
  buttonUploadText = "Last opp",
  cropAspectRatio = 9 / 16
}: Props) => {
  const firebase = useFirebaseContext();
  const myRef = useRef(null);

  const [crop, setCrop] = useState<Crop>({
    height: cropAspectRatio * 150,
    width: 150,
    x: 1,
    y: 1,
    unit: "px"
  });
  const [fileName, setFileName] = useState<string>("");
  const [fileLocation, setFileLocation] = useState<string>("");

  const [imageElement] = useState<HTMLImageElement | null>(
    null
  );

  const handleUpload = async () => {
    if (imageElement) {
      const croppedImage = await getCroppedImg(imageElement, crop, fileName);
      const storageRef = ref(firebase.storageRef);
      const imageRef = ref(storageRef, "images");
      const uploadRef = ref(imageRef, new Date().getTime() + fileName);
      const imageUrl = await uploadBytes(uploadRef,croppedImage).then(
        success => {
          return success.ref.fullPath; // testme
        },
      );

      return handleUpdateComplete ? handleUpdateComplete(imageUrl) : null;
    }
    return null;
  };

  return (
    <div className="image-uploader__container">
      {title && <h3>{title}</h3>}
      <div className="image-uploader__file-input">
        <label htmlFor="file-upload">
          <p>
            <span role="img" aria-label="folder-icon">
              📁{" "}
            </span>
            Velg fil..
          </p>
        </label>
        {fileLocation && (
          <div className="image-uploader__image-preview-container">
            <ReactCrop
              className="image-uploader__image-preview"
              crop={crop}
              onChange={(newCrop: Crop) => {
                setCrop(newCrop);
              }}
            >
              <img  src={fileLocation} alt="preview" />
            </ReactCrop>
          </div>
        )}
        {fileName && <p>{fileName}</p>}
        <input
          className="image-uploader__file-input"
          id="file-upload"
          type="file"
          accept="image/*;capture=camera"
          onChange={event => {
            if (event.target?.files?.[0]) {
              setFileLocation(URL.createObjectURL(event.target.files?.[0]));
              setFileName(event.target.files?.[0].name);
            }
          }}
        />
        {imageElement && (
          <button ref={myRef} type="button" onClick={handleUpload}>
            {buttonUploadText}
          </button>
        )}
      </div>
    </div>
  );
};

export default CroppedImageUploader;
