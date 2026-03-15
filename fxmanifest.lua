fx_version 'cerulean'
game 'gta5'

author 'Mercy Collective + You'
description 'AAA TypeScript Boilerplate for Mercy Framework (React NUI + tRPC)'
version '2.3.0'

lua54 'yes'

shared_scripts { 'shared/*.js' }
client_scripts { 'client/*.js' }
server_scripts { 'server/*.js' }

ui_page 'client/ui/dist/index.html'

files {
    'client/ui/dist/**/*.*'
}