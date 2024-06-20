import { S3Client } from "@aws-sdk/client-s3";

const r2 = new S3Client({
  region: "EEUR",
  endpoint: "https://2af9645abd2182012cc3cc61e3aab5e3.r2.cloudflarestorage.com",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_R2_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_R2_ANON!,
  },
});

export default r2;
