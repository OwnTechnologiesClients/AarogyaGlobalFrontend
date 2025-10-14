import { 
  signInWithPopup, 
  GoogleAuthProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { auth } from './config';

/**
 * Google Sign-In using Firebase
 * Opens a popup for Google authentication
 */
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    
    // Force account selection
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    
    // Sign in with popup
    const result = await signInWithPopup(auth, provider);
    
    // Get Firebase ID token
    const idToken = await result.user.getIdToken();
    
    return {
      user: result.user,
      idToken,
      authProvider: 'google'
    };
  } catch (error) {
    console.error('Google sign-in error:', error);
    
    // Handle specific error codes
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Sign-in cancelled. Please try again.');
    } else if (error.code === 'auth/popup-blocked') {
      throw new Error('Popup blocked. Please allow popups for this site.');
    } else {
      throw new Error(error.message || 'Failed to sign in with Google');
    }
  }
};

/**
 * Setup ReCAPTCHA verifier for phone authentication
 * This must be called before sending OTP
 */
export const setupRecaptcha = (elementId) => {
  try {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, elementId, {
        size: 'invisible',
        callback: (response) => {
          console.log('reCAPTCHA solved');
        },
        'expired-callback': () => {
          console.log('reCAPTCHA expired');
          window.recaptchaVerifier = null;
        }
      });
    }
    return window.recaptchaVerifier;
  } catch (error) {
    console.error('ReCAPTCHA setup error:', error);
    throw new Error('Failed to setup verification. Please refresh and try again.');
  }
};

/**
 * Send OTP to phone number
 * Phone number must be in international format (e.g., +919876543210)
 */
export const sendOTP = async (phoneNumber) => {
  try {
    if (!window.recaptchaVerifier) {
      throw new Error('ReCAPTCHA not initialized. Please refresh the page.');
    }

    const appVerifier = window.recaptchaVerifier;
    
    // Send OTP
    const confirmationResult = await signInWithPhoneNumber(
      auth, 
      phoneNumber, 
      appVerifier
    );
    
    console.log('OTP sent successfully to:', phoneNumber);
    
    return confirmationResult;
  } catch (error) {
    console.error('Send OTP error:', error);
    
    // Clear recaptcha on error
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = null;
    }
    
    // Handle specific error codes
    if (error.code === 'auth/invalid-phone-number') {
      throw new Error('Invalid phone number. Please check and try again.');
    } else if (error.code === 'auth/too-many-requests') {
      throw new Error('Too many attempts. Please try again later.');
    } else if (error.code === 'auth/captcha-check-failed') {
      throw new Error('Verification failed. Please refresh and try again.');
    } else {
      throw new Error(error.message || 'Failed to send OTP');
    }
  }
};

/**
 * Verify OTP code
 */
export const verifyOTP = async (confirmationResult, otpCode) => {
  try {
    if (!confirmationResult) {
      throw new Error('Invalid confirmation. Please request OTP again.');
    }

    // Verify OTP
    const result = await confirmationResult.confirm(otpCode);
    
    // Get Firebase ID token
    const idToken = await result.user.getIdToken();
    
    console.log('OTP verified successfully');
    
    // Clear recaptcha
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = null;
    }
    
    return {
      user: result.user,
      idToken,
      authProvider: 'phone'
    };
  } catch (error) {
    console.error('Verify OTP error:', error);
    
    // Handle specific error codes
    if (error.code === 'auth/invalid-verification-code') {
      throw new Error('Invalid OTP. Please check and try again.');
    } else if (error.code === 'auth/code-expired') {
      throw new Error('OTP expired. Please request a new one.');
    } else {
      throw new Error(error.message || 'Failed to verify OTP');
    }
  }
};

/**
 * Sign out from Firebase
 */
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    console.log('Signed out successfully');
  } catch (error) {
    console.error('Sign out error:', error);
    throw new Error('Failed to sign out');
  }
};

/**
 * Get current user's Firebase ID token
 * Useful for refreshing the token
 */
export const getCurrentUserToken = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('No user signed in');
    }
    
    const idToken = await user.getIdToken(true); // Force refresh
    return idToken;
  } catch (error) {
    console.error('Get token error:', error);
    throw new Error('Failed to get authentication token');
  }
};

