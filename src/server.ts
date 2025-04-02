import { app } from "./app";
import { env } from "./env/env";

app.listen(
  env.PORT, () => console.log(`Server running in port:${env.PORT}`));
