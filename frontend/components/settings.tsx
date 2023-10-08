import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { IoCopyOutline } from "react-icons/io5";

export default function SettingTab() {
  return (
    <div className="flex flex-col gap-6 w-[770px] mt-12">
      <div className="flex flex-col w bg-card border-border border font-sans rounded-md ">
        <div className="flex flex-col gap-2 w-full p-5">
          <Label>Share link</Label>
          <div className="flex bg-btn-secondary px-4 py-3 text-sm  items-center justify-between border border-border rounded-md">
            <p>https://formigo.xyz/form/1234-5678-9abc</p>
            <div className="cursor-pointer">
              <IoCopyOutline className="w-5 h-5" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full p-5">
          <Label>Danger</Label>
          <div>
            <Button variant="destructive" className="text-sm font-medium">Delete form</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
