import { cleanEnv, str } from "envalid";

const env = cleanEnv(process.env, {
  EXAMPLE_API_KEY: str(),
});

export default env;
