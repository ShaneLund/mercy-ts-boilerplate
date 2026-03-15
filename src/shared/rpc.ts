import { z } from 'zod';
import { MoneyTransactionSchema, InventoryItemSchema, VoiceChannelSchema } from './validation';

export const RPC = {
  giveMoney: { event: 'mercy:rpc:giveMoney', schema: MoneyTransactionSchema },
  giveItem: { event: 'mercy:rpc:giveItem', schema: InventoryItemSchema },
  joinVoiceChannel: { event: 'mercy:rpc:joinVoiceChannel', schema: VoiceChannelSchema },
  notify: { 
    event: 'mercy:rpc:notify', 
    schema: z.object({ message: z.string(), type: z.enum(['success', 'error', 'info']) }) 
  },
} as const;

export type RPCProcedures = typeof RPC;