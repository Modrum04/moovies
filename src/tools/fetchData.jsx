import { useEffect, useState } from "react";

const randomNumber = Math.floor(Math.random() * 10);

const token = import.meta.env.VITE_MY_API_TOKEN;

const maxRating = 3;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};
// `include_adult=true&include_video=false&language=fr&page=${randomNumber}&sort_by=popularity.asc&vote_average.lte=${maxRating}&vote_count.gte=20`;
const tab = [
  { include_adult: true },
  { include_video: false },
  { language: "fr" },
  { page: randomNumber },
  { "vote_average.lte": maxRating },
  { "vote_count.gte": 20 },
];

const query = (tab) => {
  return tab
    .flatMap((obj, i, arr) => {
      const stringQuery = Object.keys(obj) + "=" + Object.values(obj);
      return arr.length - 1 === i ? stringQuery : stringQuery + "&";
    })
    .join("");
};

export async function fetchData() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?${query(tab)}`,
      options,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
