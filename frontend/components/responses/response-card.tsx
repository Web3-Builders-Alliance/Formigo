"use client";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type ResponseProps = {
  name: string;
  image?: string;
  date: Date;
  id: string;
};

type DataProps = {
  data: ResponseProps;
  surveyName: string;
};

export default function ResponseCard({ data, surveyName }: DataProps) {
  const router = useRouter();
  return (
    <div className="flex bg-card justify-between h-[114px] border border-border w-full gap-4 rounded-md px-9 py-6">
      <div className="flex gap-4">
        <Avatar className="h-14 w-14">
          <AvatarFallback className="text-xl">
            {data.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold">
            {data.name.length > 12
              ? `${data.name.substring(0, 12)}...`
              : data.name}
          </h1>
          <p className="text-txt-secondary">
            Completed the <b className="text-txt">{surveyName}</b>{" "}
            {formatDistanceToNow(data.date, { addSuffix: true })}
          </p>
        </div>
      </div>
      <div>
        <Button
          onClick={() => router.push(`/response/${data.id}`)}
          variant="outline"
        >
          View
        </Button>
      </div>
    </div>
  );
}
