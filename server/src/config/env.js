import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
    PORT: z.coerce.number().default(8080),
    CLIENT_ORIGIN: z.string().url(),
    DATABASE_URL: z.string().url()
});

const env = envSchema.parse(process.env);

export default env;