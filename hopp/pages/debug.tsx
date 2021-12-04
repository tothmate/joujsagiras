import React from "react";
import Viewer from "../components/Viewer";
import { emptySticker } from "../src/models";

export default function Page() {
  return <Viewer sticker={emptySticker} />;
}
