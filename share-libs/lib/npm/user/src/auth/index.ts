import { app as AppNameSpace } from "firebase-admin/lib";

const decodedToken = async (
  firebaseAdmin: AppNameSpace.App,
  decodeString: string,
): Promise<{ id: string; email: string }> => {
  const decode = await firebaseAdmin.auth().verifyIdToken(decodeString);
  return {
    id: decode.uid,
    email: decode.email || "",
  };
};

export { decodedToken };
