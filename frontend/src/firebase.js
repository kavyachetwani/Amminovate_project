import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCMIQP5qIqPW1SPnZuRM7he0YjL7CcI-8Q",
    authDomain: "summithacks-jash.firebaseapp.com",
    projectId: "summithacks-jash",
    storageBucket: "summithacks-jash.appspot.com",
    messagingSenderId: "469258310489",
    appId: "1:469258310489:web:42cb08c34cbed5f190f248",
    measurementId: "G-0ED9WYTPJC"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const storage = getStorage(app);

export const uploadFileToFirebaseStorage = async (file) => {
    const storageRef = ref(storage, 'summit');
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    console.log('File uploaded to Firebase Storage.');
  };
  
  export const getDownURL = async (fileName) => {
    const fileRef = ref(storage, fileName);
    const downloadUrl = await getDownloadURL(fileRef);
    console.log('Download URL:', downloadUrl);
    return downloadUrl;
  };