import "dotenv/config";
import "./configs/init_mongodb";
import express, { Request, Response, Application } from "express";
import cors from "cors";
import verifyAuthor from "./middleware/verifyAuthor";
import bodyParser from "body-parser";
import morgan from "morgan";
import upload from "express-fileupload";
import adminRouter from "./routes/admin";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(upload({
  useTempFiles: true,
}));

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  const htmlFile = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./styles.css" />
    <title>Just Backend Things</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
            extend: {
                colors: {
                primary: "#f00",
                },
            },
            },
        },
    </script>
    <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"></script>
    <script
      src="https://kit.fontawesome.com/af4eaebe74.js"
      crossorigin="anonymous"
    ></script>
  </head>

  <body>
    <!-- component -->
    <div
      class="relative flex items-top justify-center min-h-screen bg-white dark:bg-gray-900 sm:items-center sm:pt-0"
    >
      <div class="max-w-6xl mx-auto sm:px-6 lg:px-8">
        <div class="mt-8 overflow-hidden">
          <div class="flex ">
            <div class="p-6 mr-2 bg-gray-100 dark:bg-gray-800 sm:rounded-lg">
              <h1
                class="text-4xl sm:text-5xl text-gray-800 dark:text-white font-extrabold tracking-tight"
              >
                Contact Links
              </h1>
              <p
                class="text-normal text-lg sm:text-2xl font-medium text-gray-600 dark:text-gray-400 mt-2"
              >
                Click the Below links to Get In Touch.
              </p>

              <div
                class="flex items-center mt-8 text-gray-600 dark:text-gray-400"
              >
                <i class="fa-brands fa-github"></i>
                <a
                  type="_blank"
                  href="https://github.com/Kartik-Fulara"
                  class="ml-4 text-md tracking-wide font-semibold w-40"
                >
                  Github
                </a>
              </div>

              <div
                class="flex items-center mt-2 text-gray-600 dark:text-gray-400"
              >
                <i class="fa-solid fa-envelope"></i>
                <a
                  type="email"
                  href="mailto:kartikfulara87@gmail.com"
                  class="ml-1 text-md tracking-wide font-semibold w-40 bg-transparent w-fit border-none focus:outline-none"
                  >kartikfulara87@gmail.com</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>

`;
  res.send(htmlFile);
});

app.get("/admin", verifyAuthor, (req: Request, res: Response) => {
  res.send("Admin Page");
});

app.use("/admin", verifyAuthor, adminRouter);

app.get("/client", verifyAuthor, (req: Request, res: Response) => {
  res.send("Client Page");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
