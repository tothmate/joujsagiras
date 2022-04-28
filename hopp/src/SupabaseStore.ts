import { createClient } from "@supabase/supabase-js";
import { DateTime } from "luxon";
import Hashids from "hashids";
import { ok, err } from "neverthrow";
import { Sticker, StickerStore, StickerStoreErrorType } from "./models";
import { getLocallizedDateString } from "./helpers";

const hashids = new Hashids("hopp public salt", 4);

function SupabaseStore(supabaseUrl: string, supabaseAnonKey: string): StickerStore {
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  return {
    load: async (stickerId: string) => {
      const [realId] = hashids.decode(stickerId);
      if (!realId) {
        return err({ type: StickerStoreErrorType.NotFound });
      }

      const { data, error } = await supabase
        .from("stickers")
        .select("url, explanation, title, image, updated_at, reasons(slug, text, details)")
        .eq("id", realId)
        .limit(1);
      if (error || !data) {
        return err({ type: StickerStoreErrorType.CouldNotLoad, message: error?.message });
      }

      if (data.length === 0) {
        return err({ type: StickerStoreErrorType.NotFound });
      }

      return ok({
        id: stickerId,
        reason: {
          slug: data[0].reasons.slug,
          text: data[0].reasons.text,
          details: data[0].reasons.details,
          defaultExplanation: "",
        },
        explanation: data[0].explanation,
        source: {
          url: data[0].url,
          date: getLocallizedDateString(DateTime.fromISO(data[0].updated_at)),
          title: data[0].title,
          image: data[0].image,
        },
      });
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
  };
}

const store = SupabaseStore(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default store;
