import * as DotEnv from "dotenv";

export default () => {
  DotEnv.config({
    path: `${process.cwd()}/.env`
  });
};
