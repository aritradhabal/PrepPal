"use client";
import React, { useState } from "react";
import data_ from "@/app/_shared/TopicList2";
import searchSubjects from "@/app/create-course/_components/SearchQuery";
import { EmojiProvider, Emoji } from "react-apple-emojis";
import emojiData from "react-apple-emojis/src/data.json";
import Dialog_render from "./Dialog_render";

function Cards({ searchterm }: { searchterm: string }) {
  const [open, setOpen] = useState(false);
  const [subject_id, setSubject_id] = useState<number | null>(null);

  const data: any = searchSubjects(data_, searchterm);
  if (data.subjects.length < 1) {
    return;
  }
  data.subjects = data.subjects.filter(
    (subject: any, index: any, self: any) =>
      index ===
      self.findIndex((s: any) => s.subject_name === subject.subject_name)
  );
  const total_modules = (data: any) => {
    return data.subjects.reduce((total: number, subject: any) => {
      return total + subject.modules.length;
    }, 0);
  };
  const _modules = total_modules(data);

  const format_string = (str: string): string => {
    let base = str.split(":")[0].trim();
    base = base.replace(/_/g, " ");
    return base
      .split(/\s+/)
      .map((word, idx) => {
        if (
          /^(?=[MDCLXVI])(M{0,3})(C[MD]|D?C{0,3})(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})$/i.test(
            word
          )
        ) {
          return word.toUpperCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  };

  const getEmoji = (value: number) => {
    const _subjects = data.subjects.length;
    const avg_value = Math.floor(_modules / _subjects) - 1;

    if (value <= avg_value) {
      return (
        <EmojiProvider data={emojiData}>
          <Emoji name="green-book" width={16} />
        </EmojiProvider>
      );
    } else if (value < avg_value * 2) {
      return (
        <EmojiProvider data={emojiData}>
          <Emoji name="orange-book" width={16} />
        </EmojiProvider>
      );
    } else {
      return (
        <EmojiProvider data={emojiData}>
          <Emoji name="closed-book" width={16} />
        </EmojiProvider>
      );
    }
  };
  const handleCardClick = (id: number) => {
    setOpen(true);
    setSubject_id(id);
  };

  return (
    <div className="cards-grid sticky max-h-[27svh] md:max-h-64 overflow-y-scroll space-x-1 space-y-1">
      {data.subjects.map((subject: any) => (
        <div
          onClick={() => handleCardClick(subject.id)}
          key={subject.id}
          className="bg-white p-2 h-30 max-w-full rounded-sm gray-50 flex flex-col items-start gap-y-1 border-1 border-[#E2E8F0] hover:bg-[#ecf0f4] duration-400 cursor-pointer"
        >
          <div className="flex items-center gap-x-2">
            <div>{getEmoji(subject.modules.length)}</div>
            <p className="text-gray-500 text-sm">
              ({subject.modules.length} Modules)
            </p>
          </div>
          <p className="font-medium text-base">
            {format_string(subject.subject_name)}
          </p>
        </div>
      ))}
      <Dialog_render
        open={open}
        setOpen={setOpen}
        subjects={data.subjects}
        subject_id={subject_id}
      />
    </div>
  );
}

export default Cards;
