import { Config } from '../shared';
import { RPC } from '../shared/rpc';

console.log(`[Mercy-TS] Client loaded – Debug: ${Config.Debug}`);

on('onClientResourceStart', (resName: string) => {
  if (resName === GetCurrentResourceName()) console.log('[Mercy-TS] Resource ready');
});

export const rpcClient = {
  giveMoney: (data: z.infer<typeof RPC.giveMoney.schema>) => TriggerServerEvent(RPC.giveMoney.event, data),
  giveItem: (data: z.infer<typeof RPC.giveItem.schema>) => TriggerServerEvent(RPC.giveItem.event, data),
  joinVoiceChannel: (data: z.infer<typeof RPC.joinVoiceChannel.schema>) => TriggerServerEvent(RPC.joinVoiceChannel.event, data),
};

onNet(RPC.notify.event, (data: unknown) => {
  const notification = RPC.notify.schema.parse(data);
  console.log(`[Mercy-TS] Notification: ${notification.message}`);
});

RegisterNuiCallbackType('giveMoney');
on('__cfx_nui:giveMoney', (data: any, cb: Function) => {
  rpcClient.giveMoney(data);
  cb({ success: true });
});

RegisterNuiCallbackType('giveItem');
on('__cfx_nui:giveItem', (data: any, cb: Function) => {
  rpcClient.giveItem(data);
  cb({ success: true });
});

RegisterNuiCallbackType('joinVoice');
on('__cfx_nui:joinVoice', (data: any, cb: Function) => {
  rpcClient.joinVoiceChannel(data);
  cb({ success: true });
});

RegisterNuiCallbackType('spinWheel');
on('__cfx_nui:spinWheel', (_, cb: Function) => {
  TriggerClientEvent('mercy-casino:openWheel', -1);
  cb({ success: true });
});

setTimeout(() => SendNuiMessage({ type: 'init', debug: Config.Debug }), 500);