import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "./firebase.service";

const storage = getStorage(app);

export const uploadAvatar = async (file: Blob, _id: string): Promise<string> => {
  /** @type {any} */
  const metadata = {
    contentType: "image/jpeg",
  };

  const storageRef = ref(storage, "avatars/" + _id);
  const image = await uploadBytes(storageRef, file, metadata);

  const imageURL = getDownloadURL(image.ref);
  return imageURL;
};

export const uploadAvatarTemp = async (file: Blob): Promise<string> => {
  /** @type {any} */
  const metadata = {
    contentType: "image/jpeg",
  };

  const storageRef = ref(storage, "avatars/" + Math.random().toString());
  const image = await uploadBytes(storageRef, file, metadata);

  const imageURL = getDownloadURL(image.ref);
  return imageURL;
};
