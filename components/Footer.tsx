"use client";

import { MailIcon, Share2Icon } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  FaGithub as FaGithubIcon,
  FaLinkedinIn as FaLinkedinInIcon,
} from "react-icons/fa";
import { CopyDataModal } from "./CopyDataModal";

const EMAIL_URL = process.env.NEXT_PUBLIC_EMAIL_URL;
const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL;
const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL;

export const FooterComponent = () => {
  const pathname = usePathname();

  return (
    <footer className="py-8 text-center" id="contact">
      <div className="flex justify-center gap-6">
        <CopyDataModal
          triggerComponent={<Share2Icon className="size-8" />}
          title="Share"
          description="Share the data to the clipboard"
          value={pathname}
        />
        <CopyDataModal
          triggerComponent={<MailIcon className="size-8" />}
          title="Email"
          description="Email the data to the clipboard"
          value={EMAIL_URL ?? ""}
        />
        <CopyDataModal
          triggerComponent={<FaLinkedinInIcon className="size-8" />}
          title="Linkedin"
          description="Linkedin the data to the clipboard"
          value={LINKEDIN_URL ?? ""}
        />
        <CopyDataModal
          triggerComponent={<FaGithubIcon className="size-8" />}
          title="Github"
          description="Github the data to the clipboard"
          value={GITHUB_URL ?? ""}
        />
      </div>
    </footer>
  );
};
