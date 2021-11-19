import admin from "firebase-admin";
import { messaging as MessagingNameSpace } from "firebase-admin/lib/messaging";

const {
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_CLIENT_EMAIL,
} = process.env;

const serviceAccount: admin.ServiceAccount = {
  projectId: FIREBASE_PROJECT_ID,
  privateKey: FIREBASE_PRIVATE_KEY
    ? FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
    : FIREBASE_PRIVATE_KEY,
  clientEmail: FIREBASE_CLIENT_EMAIL,
};
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: FIREBASE_DATABASE_URL,
});

const messaging = admin.messaging();

const FCM_DEFAULT_OPTIONS = {
  // Required for background/quit data-only messages on iOS
  contentAvailable: true,
  // Required for background/quit data-only messages on Android
  priority: "high",
};

export { messaging, FCM_DEFAULT_OPTIONS, MessagingNameSpace };
export default admin;
