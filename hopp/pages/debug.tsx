import React from "react";
import ShareBox from "../components/ShareBox";
import { emptySticker } from "../src/models";

export default function Page() {
  return <ShareBox sticker={emptySticker} />;
}
