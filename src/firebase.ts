// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyCyr3YB3OUjFDwtmCENfsY13Cz3BrnoDOc",
//   authDomain: "biodiversity-e1c59.firebaseapp.com",
//   projectId: "biodiversity-e1c59.web.app",
//   storageBucket: "biodiversity-e1c59.appspot.com", // Fixed the storage bucket URL
//   messagingSenderId: "511865310732",
//   appId: "1:511865310732:web:d3543571ac7cc916b6e829",
//   measurementId: "G-30R0QJBEC7"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);

// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCyr3YB3OUjFDwtmCENfsY13Cz3BrnoDOc",
  authDomain: "biodiversity-e1c59.firebaseapp.com",
  projectId: "biodiversity-e1c59",
  storageBucket: "biodiversity-e1c59.appspot.com",
  messagingSenderId: "511865310732",
  appId: "1:511865310732:web:d3543571ac7cc916b6e829",
  measurementId: "G-30R0QJBEC7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
