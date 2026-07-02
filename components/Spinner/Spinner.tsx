"use client";

import { BeatLoader } from "react-spinners";
import css from "./Spinner.module.css";

export default function Spinner() {
  return (
    <div className={css.spinner}>
      <BeatLoader size={12} />
    </div>
  );
}
