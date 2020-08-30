import { GeographicLocation } from "@/entities/geographicLocation/GeographicLocation";

const TOKEN =
  "pk.eyJ1IjoiaW50ZXJmZWNvIiwiYSI6ImNrZWZxeHoxMzBzejgzNnQ1N2U1djlvc3kifQ.4FBmQ_sbClfeyMKuunHx1g";

const SMALL_SIZE = 200;

export const staticMap = (width: number, height: number) => (
  { longitude, latitude }: GeographicLocation,
  zoom: number
) =>
  "https://api.mapbox.com" +
  "/styles/v1/mapbox/streets-v11/static" +
  `/${longitude},${latitude},${zoom},0` +
  `/${width}x${height}` +
  `?access_token=${TOKEN}`;

export const smallStaticMap = staticMap(SMALL_SIZE, SMALL_SIZE);
