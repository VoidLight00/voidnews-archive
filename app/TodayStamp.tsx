"use client";

import { useEffect, useState } from "react";

function formatToday() {
  const formatter = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Seoul",
  });
  return formatter.format(new Date()).toUpperCase();
}

export default function TodayStamp() {
  const [dateStamp, setDateStamp] = useState("TODAY");

  useEffect(() => {
    setDateStamp(formatToday());
  }, []);

  return <span suppressHydrationWarning>{dateStamp}</span>;
}
