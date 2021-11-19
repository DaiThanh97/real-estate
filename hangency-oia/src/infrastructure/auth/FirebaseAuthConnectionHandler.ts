import admin, { app as FirebaseAdmin } from "firebase-admin";
import { IAuthConnectionHolder } from "./IAuthConnectionHolder";

export class FirebaseAuthConnectionHolder implements IAuthConnectionHolder<FirebaseAdmin.App> {
  private firebaseAdmin: FirebaseAdmin.App | null = null;

  async initialize(): Promise<void> {
    if (this.firebaseAdmin) {
      return;
    }
    const { FIREBASE_DATABASE_URL, FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL } = process.env;
    const serviceAccount: admin.ServiceAccount = {
      projectId: FIREBASE_PROJECT_ID,
      privateKey: FIREBASE_PRIVATE_KEY ? FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n") : FIREBASE_PRIVATE_KEY,
      clientEmail: FIREBASE_CLIENT_EMAIL,
    };
    this.firebaseAdmin = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: FIREBASE_DATABASE_URL,
      projectId: FIREBASE_PROJECT_ID,
    });
  }

  getInstance(): FirebaseAdmin.App {
    if (this.firebaseAdmin === null) {
      throw new Error("Please call initialize() once before calling this method if you can.");
    }
    return this.firebaseAdmin;
  }

  async close(): Promise<void> {
    admin.database().goOffline();
  }
}
