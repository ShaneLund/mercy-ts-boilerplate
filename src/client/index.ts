import { z } from 'zod';
import { Config } from '../shared';
import { RPC } from '../shared/rpc';

console.log(`[Mercy-TS] Client loaded – Debug: ${Config.Debug}`);

on('onClientResourceStart', (resName: string) => {
  if (resName === GetCurrentResourceName()) console.log('[Mercy-TS] Resource ready');
});

const rpcClient = {
  giveMoney: (data: z.infer<typeof RPC.giveMoney.schema>) => TriggerServerEvent(RPC.giveMoney.event, data),
  giveItem: (data: z.infer<typeof RPC.giveItem.schema>) => TriggerServerEvent(RPC.giveItem.event, data),
  joinVoiceChannel: (data: z.infer<typeof RPC.joinVoiceChannel.schema>) => TriggerServerEvent(RPC.joinVoiceChannel.event, data),
  spinWheelRequest: () => emitNet(RPC.spinWheelRequest.event, {}),
};

onNet(RPC.notify.event, (data: unknown) => {
  const notification = RPC.notify.schema.parse(data);
  console.log(`[Mercy-TS] Notification: ${notification.message}`);
});

function registerNuiCallback<T>(name: string, handler: (data: T) => void) {
  RegisterNuiCallbackType(name);
  on(`__cfx_nui:${name}`, (data: T, cb: (resp: { success: boolean }) => void) => {
    try {
      handler(data);
      cb({ success: true });
    } catch {
      cb({ success: false });
    }
  });
}

registerNuiCallback('giveMoney', (data: z.infer<typeof RPC.giveMoney.schema>) => {
  rpcClient.giveMoney(RPC.giveMoney.schema.parse(data));
});

registerNuiCallback('giveItem', (data: z.infer<typeof RPC.giveItem.schema>) => {
  rpcClient.giveItem(RPC.giveItem.schema.parse(data));
});

registerNuiCallback('joinVoice', (data: z.infer<typeof RPC.joinVoiceChannel.schema>) => {
  rpcClient.joinVoiceChannel(RPC.joinVoiceChannel.schema.parse(data));
});

registerNuiCallback('spinWheel', () => {
  rpcClient.spinWheelRequest();
});

setTimeout(() => SendNuiMessage({ type: 'init', debug: Config.Debug }), 500);
