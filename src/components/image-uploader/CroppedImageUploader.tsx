import React, { useRef, useState } from "react";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/lib/ReactCrop.scss";

import { getCroppedImg } from "./utils/getCroppedImg";
import { executeScrollToRef } from "../../utils/scroll-utils";

import "./styles.scss";

type Props = {
  firebase: any;
  firebaseStorageRef: string;
  title?: string;
  handleUpdateComplete?: (uploadUrl: string) => void;
  buttonUploadText?: string;
  cropAspectRatio?: number;
};

export const CroppedImageUploader: React.FC<Props> = ({
  firebase,
  firebaseStorageRef,
  handleUpdateComplete,
  title,
  buttonUploadText = "Last opp",
  cropAspectRatio = 9 / 16
}: Props) => {
  const myRef = useRef(null);

  const [crop, setCrop] = useState<Crop>({
    aspect: cropAspectRatio,
    width: 150,
    x: 1,
    y: 1
  });
  const [fileName, setFileName] = useState<string>("");
  const [fileLocation, setFileLocation] = useState<string>("");

  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(
    null
  );

  const handleUpload = async () => {
    if (imageElement) {
      const croppedImage = await getCroppedImg(imageElement, crop, fileName);
      const uploadURL = await firebase.uploadImage(
        firebaseStorageRef,
        new Date().getTime() + fileName,
        croppedImage
      );
      return handleUpdateComplete ? handleUpdateComplete(uploadURL) : null;
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
              onImageLoaded={image => {
                executeScrollToRef(myRef);
                setImageElement(image);
              }}
              className="image-uploader__image-preview"
              src={fileLocation}
              crop={crop}
              onChange={(newCrop: Crop) => {
                setCrop(newCrop);
              }}
            />
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
