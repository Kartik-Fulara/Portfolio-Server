import firebaseStorageConfig from "../configs/firebaseConfig";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";

// upload video to firebase storage

export const uploadVideo = async (video: any) => {
  const fileName = v4();

  const storageRef = ref(firebaseStorageConfig, `${fileName}}`);

  // this is when temp file is not created
  await uploadBytes(storageRef, video.data, {
    contentType: video.mimetype,
  });

  const videoUrl = await getDownloadURL(storageRef);

  return videoUrl;
};

// delete video from firebase storage using url

export const deleteVideo = async (videoUrl: string) => {
  const fileName = videoUrl.split("/").pop();

  const rid = fileName?.split("?").shift();

  const id = rid?.split("%")[0] + "}";

  console.log(id);
  const storageRef = ref(firebaseStorageConfig, `${id}`);

  await deleteObject(storageRef);
  
  return "DeletedVideo";
};
