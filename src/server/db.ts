import { z } from 'zod';
import { PlayerDataSchema, MoneyTransactionSchema, InventoryItemSchema } from '../shared/validation';
import { logger } from './logger';

export const db = {
  async getPlayer(source: number) {
    const identifier = GetPlayerIdentifier(source, 0);
    const result = await exports['oxmysql'].fetch('SELECT * FROM players WHERE citizenid = ?', [identifier]);
    const validated = PlayerDataSchema.parse(result[0] || { source });
    logger.info({ source, citizenid: identifier }, 'Player loaded from frameworkdb.sql');
    return validated;
  },

  async giveMoney(data: unknown) {
    const transaction = MoneyTransactionSchema.parse(data);
    await exports['oxmysql'].execute('UPDATE players SET cash = cash + ? WHERE citizenid = ?', [transaction.amount, GetPlayerIdentifier(transaction.source, 0)]);
    logger.info(transaction, 'Money given');
  },

  async giveItem(data: unknown) {
    const item = InventoryItemSchema.parse(data);
    await exports['oxmysql'].execute('INSERT INTO inventory (citizenid, item, amount) VALUES (?, ?, ?)', [GetPlayerIdentifier(item.source, 0), item.item, item.amount]);
    logger.info(item, 'Item given');
  }
};