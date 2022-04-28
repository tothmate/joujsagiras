import { createClient } from "@supabase/supabase-js";
import { DateTime } from "luxon";
import Hashids from "hashids";
import { ok, err } from "neverthrow";
import { Sticker, StickerStore, StickerStoreErrorType } from "./models";
import { getLocallizedDateString } from "./helpers";

const hashids = new Hashids("hopp public salt", 4);

function SupabaseStore(supabaseUrl: string, supabaseAnonKey: string): StickerStore {
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const convertRowToSticker = (row: any) => {
    return {
      id: hashids.encode(row.id),
      reason: {
        slug: row.reasons.slug,
        text: row.reasons.text,
        details: row.reasons.details,
        defaultExplanation: "",
      },
      explanation: row.explanation,
      source: {
        url: row.url,
        date: getLocallizedDateString(DateTime.fromISO(row.updated_at)),
        title: row.title,
        image: row.image,
      },
    };
  };

  return {
    load: async (stickerId: string) => {
      const [realId] = hashids.decode(stickerId);
      if (!realId) {
        return err({ type: StickerStoreErrorType.NotFound });
      }

      const { data, error } = await supabase
        .from("stickers")
        .select("id, url, explanation, title, image, updated_at, reasons(slug, text, details)")
        .eq("id", realId)
        .limit(1);
      if (error || !data) {
        return err({ type: StickerStoreErrorType.CouldNotLoad, message: error?.message });
      }

      if (data.length === 0) {
        return err({ type: StickerStoreErrorType.NotFound });
      }

      return ok(convertRowToSticker(data[0]));
    },

    save: async (sticker: Sticker) => {
      const tableRow = {
        reason_slug: sticker.reason.slug,
        url: sticker.source.url,
        explanation: sticker.explanation,
        title: sticker.source.title,
        image: sticker.source.image,
      };

      const { data, error } = await supabase.from("stickers").insert(tableRow);
      if (error || !data || data.length === 0) {
        return err({ type: StickerStoreErrorType.CouldNotSave, message: error?.message });
      }

      return ok(hashids.encode(data[0].id));
    },

    loadReasons: async () => {
      const { data, error } = await supabase
        .from("reasons")
        .select("slug, text, details, defaultExplanation:default_explanation");
      if (error || !data) {
        return err({ type: StickerStoreErrorType.CouldNotLoadReasons, message: error?.message });
      }

      return ok(data);
    },

    loadMoreStickers: async (currentSticker: Sticker) => {
      const { data, error } = await supabase
        .from("stickers")
        .select("id, url, explanation, title, image, updated_at, reasons(slug, text, details)")
        .neq("id", hashids.decode(currentSticker.id))
        .order("id", { ascending: false })
        .limit(4);
      if (error || !data) {
        return ok([]);
      }

      return ok(data.map(convertRowToSticker));
    },
  };
}

const store = SupabaseStore(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default store;
