import { ConfigSchema } from './validation';

export const Config = ConfigSchema.parse({
  Debug: process.env.DEBUG === 'true',
});

export type { PlayerData, MoneyTransaction, InventoryItem, VoiceChannel } from './validation';
export { PlayerDataSchema, MoneyTransactionSchema, InventoryItemSchema, VoiceChannelSchema } from './validation';
export { RPC } from './rpc';
