import css from "./Footer.module.css";
import Image from "next/image";
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
    <footer className={css.footer}>
      <div className={css.content}>
        <div className={css.brand}>
          <span className={css.brandIcon} aria-hidden="true">
            <Image
              src="/favicon.png"
              alt=""
              width={28}
              height={28}
              className={css.logoIcon}
              unoptimized
            />
          </span>
          <div className={css.brandCopy}>
            <span className={css.logoText}>NoteHub</span>
          </div>
        </div>
        <p className={css.copyright}>
          © {new Date().getFullYear()} All rights reserved.
        </p>
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
    </footer>
  );
}

export default Footer;
