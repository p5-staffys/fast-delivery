import { getStorage, ref, uploadBytesResumable, UploadTask } from "firebase/storage";

const storage = getStorage();

export const uploadAvatar = (file: Blob, _id: string): UploadTask => {
  /** @type {any} */
  const metadata = {
    contentType: "image/jpeg",
  };

  const storageRef = ref(storage, "avatars/" + _id);
  return uploadBytesResumable(storageRef, file, metadata);
};

//Esta lógica iría al componente
//const uploadTask = uploadBytesResumable(storageRef, file, metadata);

// Listen for state changes, errors, and completion of the upload.
/* uploadTask.on(
  "state_changed",
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

    switch (snapshot.state) {
      case "paused":
        break;
      case "running":
        break;
    }
  },
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case "storage/unauthorized":
        // User doesn't have permission to access the object
        break;
      case "storage/canceled":
        // User canceled the upload
        break;

      // ...

      case "storage/unknown":
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  },
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      return downloadURL;
    });
  },
);*/
