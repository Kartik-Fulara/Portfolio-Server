import express, { NextFunction, Request, Response } from "express";
import { uploadVideo, deleteVideo } from "../helpers/firebase";
import { uploadImage, deleteImage } from "../helpers/cloudnary";
import { deleteFiles } from "../helpers/delfiles";
import { deleteData, getDataById, insertData } from "../helpers/mongoDb";
import { v4 } from "uuid";
import fs from "fs";

const router = express.Router();

const changeTmpToBuffer = async (file: any) => {
  const tempFilePath = file.tempFilePath;
  const buffer = fs.readFileSync(tempFilePath);
  file.data = buffer;
  return file;
};

const saveData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.files);

    const video: any = req.files?.video;
    const image: any = req.files?.image;

    console.log(req.body);

    let vdeo = await changeTmpToBuffer(video);

    let videoUrl = await uploadVideo(vdeo);

    let imageUrl = await uploadImage(image);

    console.log("videoUrl", videoUrl);
    console.log("imageUrl", imageUrl);

    let links = [];

    if (req.body.links !== undefined) {
      const linksBody = [...req.body.links];
      const linkLen = linksBody.length;

      if (linkLen > 0) {
        console.log("body", linksBody);
        if (linkLen === 1) {
          links.push(JSON.parse(linksBody[0]));
        } else {
          linksBody.forEach((link: any) => {
            links.push(JSON.parse(link));
          });
        }
      }
    }

    let tags = [];

    if (req.body.tags !== undefined) {
      tags = req.body.tags?.split(",");

      console.log("tags", tags);
    }

    const data = {
      id: v4(),
      projectName: req.body.projectName,
      projectDescription: req.body.about,
      otherUrls: links,
      projectVideoUrl: videoUrl,
      projectImageUrl: imageUrl,
      projectTags: tags,
    };

    const portfolio_data = await insertData(data);

    deleteFiles();
    res.status(200).send({ status: "Ok", data: portfolio_data });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const delData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body.id);
    const docId = req.body.id;

    if (docId === undefined) {
      throw new Error("docId is undefined");
    }

    const data = await getDataById(docId);

    console.log(data);
    if (data === null) {
      throw new Error("data is null");
    }
    const videoUrl = data.projectVideoUrl;
    const imageUrl = data.projectImageUrl;
    await deleteVideo(videoUrl);
    await deleteImage(imageUrl);

    await deleteData(docId);

    res.status(200).send({ status: "Ok" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

router.post("/save", saveData);

router.post("/del", delData);

export default router;
