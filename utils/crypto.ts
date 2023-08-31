import { AES, enc } from "crypto-js";

export const encodeToken = (token: string) => {
  return AES.encrypt(
    token,
    process.env.NEXT_PUBLIC_EXCRYPTION_KEY as string
  ).toString();
};

export const decodeToken = (token: string) => {
  return AES.decrypt(
    token,
    process.env.NEXT_PUBLIC_EXCRYPTION_KEY as string
  ).toString(enc.Utf8);
};
