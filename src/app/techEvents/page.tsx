"use client";

import React from "react";
import {TechEventsContainer} from "./TechEventsContainer";


const TechEvents: React.FC = () => {
  return (
    <div className="p-5">
      <h1 className="text-center">Tech Events</h1>
      <TechEventsContainer />
    </div>
  );
};

export default TechEvents;
