import { Config } from '../shared';
import { logger } from './logger';
import { db } from './db';
import { RPC } from '../shared/rpc';

console.log(`[Mercy-TS] Server started – Debug: ${Config.Debug}`);

on('playerJoined', async (source: number) => {
  const player = await db.getPlayer(source);
  logger.info(`Player ${player.source} fully loaded`);
});

onNet(RPC.giveMoney.event, (data: unknown) => {
  try {
    const tx = RPC.giveMoney.schema.parse(data);
    db.giveMoney(tx);
    logger.info(tx, 'Money given via RPC');
  } catch (e) {
    logger.error(e, 'Invalid giveMoney RPC');
  }
});

onNet(RPC.giveItem.event, (data: unknown) => {
  try {
    const item = RPC.giveItem.schema.parse(data);
    db.giveItem(item);
    logger.info(item, 'Item given via RPC');
  } catch (e) {
    logger.error(e, 'Invalid giveItem RPC');
  }
});

onNet(RPC.joinVoiceChannel.event, (data: unknown) => {
  const voice = RPC.joinVoiceChannel.schema.parse(data);
  logger.info(voice, 'Voice channel joined via RPC');
});

setTimeout(() => {
  TriggerClientEvent(RPC.notify.event, -1, { message: 'Welcome to Mercy TS v2.3!', type: 'success' });
}, 3000);

logger.info('[Mercy-TS] tRPC handlers & DB layer ready');