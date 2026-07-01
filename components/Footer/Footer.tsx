import css from "./Footer.module.css";
import Image from "next/image";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const SOCIAL_LINKS = [
  {
    href: "https://github.com/Anastasiia-git",
    label: "GitHub profile",
    icon: FaGithub,
  },
  {
    href: "https://www.linkedin.com/in/anastasiia-totska/",
    label: "LinkedIn profile",
    icon: FaLinkedinIn,
  },
];

function Footer() {
  return (
    <div className={css.footer}>
      <div className={css.content}>
        <div className={css.brand}>
          <span className={css.brandIcon} aria-hidden="true">
            <Image
              src="/favicon.png"
              alt=""
              width={30}
              height={30}
              unoptimized
            />
          </span>
          <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        </div>
        <div className={css.socials} aria-label="Social links">
          {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
            >
              <Icon size={24} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Footer;
