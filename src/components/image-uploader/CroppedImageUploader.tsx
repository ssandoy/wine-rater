import React, { useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import { getCroppedImg } from "./utils/getCroppedImg";
import { executeScrollToRef } from "../../utils/scroll-utils";

import styles from "./styles.module.css";
import { useFirebaseContext } from "../../firebase";

type Props = {
  firebaseStorageRef: string;
  title?: string;
  handleUpdateComplete?: (uploadUrl: string) => void;
  buttonUploadText?: string;
  cropAspectRatio?: number;
};

export const CroppedImageUploader: React.FC<Props> = ({
  firebaseStorageRef,
  handleUpdateComplete,
  title,
  buttonUploadText = "Last opp",
  cropAspectRatio = 9 / 16
}: Props) => {
  const firebase = useFirebaseContext();
  const myRef = useRef(null);

  const [crop, setCrop] = useState<Crop>({
    aspect: cropAspectRatio,
    width: 150,
    x: 1,
    y: 1
  });
  const [fileName, setFileName] = useState<string>("");
  const [fileLocation, setFileLocation] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(false);

  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(
    null
  );

  const handleUpload = async () => {
    if (!imageElement) {
      return null;
    }

    setIsUploading(true);
    setUploadError(false);

    try {
      const croppedImage = await getCroppedImg(imageElement, crop, fileName);
      const uploadRef = ref(
        firebase.storage,
        `${firebaseStorageRef}/${Date.now()}${fileName}`
      );
      const upload = await uploadBytes(uploadRef, croppedImage);
      const imageUrl = await getDownloadURL(upload.ref);

      return handleUpdateComplete ? handleUpdateComplete(imageUrl) : null;
    } catch (error) {
      console.error("Failed to upload wine picture", error);
      setUploadError(true);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={styles.container}>
      {title && <h3>{title}</h3>}
      <div className={styles["file-input"]}>
        <label htmlFor="file-upload">
          <p>
            <span role="img" aria-label="folder-icon">
              📁{" "}
            </span>
            Velg fil..
          </p>
        </label>
        {fileLocation && (
          <div className={styles["image-preview-container"]}>
            <ReactCrop
              onImageLoaded={image => {
                executeScrollToRef(myRef);
                setImageElement(image);
              }}
              className={styles["image-preview"]}
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
          className={styles["file-input"]}
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
          <button
            ref={myRef}
            type="button"
            onClick={handleUpload}
            disabled={isUploading}
          >
            {isUploading ? "Laster opp..." : buttonUploadText}
          </button>
        )}
        {uploadError && (
          <p className={styles["upload-error"]} role="alert">
            Kunne ikke laste opp bildet. Prøv igjen.
          </p>
        )}
      </div>
    </div>
  );
};

export default CroppedImageUploader;
