import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";

export const getGameImages = async () => {
  const getImage = await getDocs(collection(db, "images"));
  const images = getImage.docs.map(doc => doc.data());
  return images.slice(0, 10); 
};
