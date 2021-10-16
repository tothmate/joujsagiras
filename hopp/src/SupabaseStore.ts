import { createClient } from '@supabase/supabase-js';
import { DateTime } from 'luxon';
import Hashids from 'hashids';
import { ok, err } from 'neverthrow';
import { reasons, Sticker, StickerStore, StickerStoreErrorType } from './models';
import { getLocallizedDateString, getReasonBySlug } from './helpers';

const hashids = new Hashids('hopp public salt', 4);

function SupabaseStore(supabaseUrl: string, supabaseAnonKey: string): StickerStore {
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  return {
    load: async (stickerId: string) => {
      const [realId] = hashids.decode(stickerId);
      if (!realId) {
        return err({ type: StickerStoreErrorType.NotFound });
      }

      const { data, error } = await supabase.from('stickers').select('*').eq('id', realId).limit(1);
      if (error || !data) {
        return err({ type: StickerStoreErrorType.CouldNotLoad, message: error?.message });
      }

      if (data.length === 0) {
        return err({ type: StickerStoreErrorType.NotFound });
      }

      return ok({
        id: stickerId,
        reason: getReasonBySlug(data[0].reason) || reasons[0],
        explanation: data[0].explanation,
        source: {
          url: data[0].url,
          date: getLocallizedDateString(DateTime.fromISO(data[0].updated_at)),
          title: data[0].title,
          image: data[0].image
        }
      });
    },

    save: async (sticker: Sticker) => {
      const tableRow = {
        reason: sticker.reason.slug,
        url: sticker.source.url,
        explanation: sticker.explanation,
        title: sticker.source.title,
        image: sticker.source.image
      };

      const { data, error } = await supabase.from('stickers').insert(tableRow);
      if (error || !data || data.length === 0) {
        return err({ type: StickerStoreErrorType.CouldNotSave, message: error?.message });
      }

      return ok(hashids.encode(data[0].id));
    }
  };
}

const store = SupabaseStore(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default store;
