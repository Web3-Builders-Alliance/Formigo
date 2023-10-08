"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function FormTab() {
  const pathname = usePathname();
  const router = useRouter();
  let parts = pathname.split("/");
  parts = parts.slice(1, parts.length);
  return (
    <div className="flex w-full items-center gap-2.5">
      <Button
        onClick={() => router.push(`/form/${parts[1]}`)}
        variant={parts.length == 2 ? "ghost-active" : "ghost"}
      >
        Overview
      </Button>
      <Button
        onClick={() => router.push(`/form/${parts[1]}/responses`)}
        variant={
          parts.length == 3 && parts[2].toLowerCase() == "responses"
            ? "ghost-active"
            : "ghost"
        }
      >
        Responses
      </Button>
      <Button
        onClick={() => router.push(`/form/${parts[1]}/settings`)}
        variant={
          parts.length == 3 && parts[2].toLowerCase() == "settings"
            ? "ghost-active"
            : "ghost"
        }
      >
        Settings
      </Button>
    </div>
  );
}
