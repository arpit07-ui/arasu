// Add this debug function to your component or a separate utility file

export function checkFirebaseSetup() {
    try {
      // Import firebase directly in this function
      const firebase = require('firebase/app');
      const auth = require('firebase/auth');
      
      console.log("Firebase version:", firebase.SDK_VERSION);
      
      // Check if Firebase is initialized
      const apps = firebase.getApps();
      console.log("Firebase apps initialized:", apps.length);
      
      if (apps.length === 0) {
        console.error("No Firebase apps initialized!");
        return false;
      }
      
      // Check if auth is available
      const authInstance = auth.getAuth();
      console.log("Auth instance:", authInstance ? "Available" : "Not available");
      
      if (!authInstance) {
        console.error("Auth instance is not available!");
        return false;
      }
      
      // Check if reCAPTCHA can be initialized
      console.log("Testing reCAPTCHA initialization...");
      
      try {
        // Create a temporary div for testing
        const tempDiv = document.createElement('div');
        tempDiv.id = 'temp-recaptcha-test';
        document.body.appendChild(tempDiv);
        
        // Try to initialize reCAPTCHA
        const recaptchaVerifier = new auth.RecaptchaVerifier(
          'temp-recaptcha-test',
          {
            size: 'invisible',
          },
          authInstance
        );
        
        console.log("reCAPTCHA initialized successfully");
        
        // Clean up
        recaptchaVerifier.clear();
        document.body.removeChild(tempDiv);
        
        return true;
      } catch (error) {
        console.error("Failed to initialize reCAPTCHA:", error);
        return false;
      }
    } catch (error) {
      console.error("Firebase setup check failed:", error);
      return false;
    }
  }
  
  // Usage:
  // Import this function in your component and call it in useEffect or a button click
  // if (checkFirebaseSetup()) {
  //   console.log("Firebase is properly set up!");
  // } else {
  //   console.log("Firebase setup has issues!");
  // }