import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import { converHourStringToMinutes } from "./utils/conver-hour-string-to-minutes";
import { convertMinutesToHourString } from "./utils/conver-minutes-to-hours-string";

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient({
  log: ["query", "error", "warn"],
});

app.get("/games", async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  return response.json(games);
});

app.post("/games/:id/ads", async (request, response) => {
  const gameId = request.params.id;
  const body = request.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(","),
      hourEnd: converHourStringToMinutes(body.hourEnd),
      hourStart: converHourStringToMinutes(body.hourStart),
      useVoiceChannel: body.useVoiceChannel,
    },
  });

  return response.status(201).json(ad);
});

app.get("/games/:id/ads", async (request, response) => {
  const gameId = request.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      weekDays: true,
      hourEnd: true,
      hourStart: true,
      useVoiceChannel: true,
      name: true,
      yearsPlaying: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createadAt: "desc",
    },
  });

  return response.json(
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(","),
        hourStart: convertMinutesToHourString(ad.hourStart),
        hourEnd: convertMinutesToHourString(ad.hourEnd),
      };
    })
  );
});

app.get("/games/:id/discord", async (request, response) => {
  const adId = request.params.id;
  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });
  return response.json({
    data: ad.discord,
  });
});

app.listen(3333);
