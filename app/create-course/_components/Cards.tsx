import React from "react";
import data from "@/app/_shared/TopicList";
function Cards() {
  return (
    <div>
      {data.subjects.map((subject) => (
        <li key={subject.id} className="flex items-center gap-x-2">
          <div>{subject.subject_name}</div>
          <div>{subject.modules.length}</div>
        </li>
      ))}
    </div>
  );
}

export default Cards;
