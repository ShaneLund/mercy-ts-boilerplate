import { z } from 'zod';

export const PlayerDataSchema = z.object({
  source: z.number().int().positive(),
  citizenid: z.string().optional(),
  name: z.string().optional(),
  money: z.number().int().nonnegative().optional(),
});

export const MoneyTransactionSchema = z.object({
  source: z.number().int().positive(),
  amount: z.number().int().positive(),
  reason: z.string().min(3).max(50).default('Unknown'),
});

export const InventoryItemSchema = z.object({
  source: z.number().int().positive(),
  item: z.string().min(1),
  amount: z.number().int().positive(),
});

export const VoiceChannelSchema = z.object({
  source: z.number().int().positive(),
  channel: z.enum(['general', 'admin', 'job', 'casino']).default('general'),
});

export const ConfigSchema = z.object({
  Debug: z.boolean().default(true),
});

export type PlayerData = z.infer<typeof PlayerDataSchema>;
export type MoneyTransaction = z.infer<typeof MoneyTransactionSchema>;
export type InventoryItem = z.infer<typeof InventoryItemSchema>;
export type VoiceChannel = z.infer<typeof VoiceChannelSchema>;