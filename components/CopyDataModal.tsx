"use client";

import { CopyIcon, LinkIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

interface CopyDataModalProps {
  triggerComponent: React.ReactNode;
  title: string;
  description: string;
  value: string;
}

export const CopyDataModal = ({
  triggerComponent,
  title,
  description,
  value,
}: CopyDataModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
  };

  const handleRedirect = () => {
    window.open(value, "_blank");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          onClick={() => setIsOpen(true)}
          variant={"ghost"}
          className="text-current hover:scale-110 transition-transform rounded-full"
          aria-controls="copy-data-modal-dialog"
        >
          {triggerComponent}
        </Button>
      </DialogTrigger>
      <DialogContent id="copy-data-modal-dialog">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <Input defaultValue={value} disabled />
          <Button
            size="icon"
            variant={"outline"}
            onClick={handleCopy}
            className="text-current hover:scale-110 transition-transform"
            aria-controls="copy-data-modal-dialog"
          >
            <CopyIcon className="size-8" />
          </Button>
          <Button
            size="icon"
            variant={"outline"}
            onClick={handleRedirect}
            className="text-current hover:scale-110 transition-transform"
            aria-controls="copy-data-modal-dialog"
          >
            <LinkIcon className="size-8" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
