import { app, Menu, BrowserWindow } from 'electron';
import i18n from '../../i18n';

const template = [
  {
    label: i18n.t('file.title'),
    submenu: [
      {
        label: i18n.t('file.newTab'),
        accelerator: 'CmdOrCtrl+T',
        click: () => BrowserWindow.fromId(global.wid).webContents.send('new-tab'),
      },
      {
        label: i18n.t('file.closeTab'),
        accelerator: 'CmdOrCtrl+W',
        click: () => BrowserWindow.fromId(global.wid).webContents.send('tab-close'),
      },
    ],
  },
  {
    label: i18n.t('edit.title'),
    submenu: [
      {
        label: i18n.t('edit.undo'),
        role: 'undo',
      },
      {
        label: i18n.t('edit.redo'),
        role: 'redo',
      },
      {
        type: 'separator',
      },
      {
        label: i18n.t('edit.cut'),
        role: 'cut',
      },
      {
        label: i18n.t('edit.copy'),
        role: 'copy',
      },
      {
        label: i18n.t('edit.paste'),
        role: 'paste',
      },
      process.platform === 'darwin' ? {
        label: i18n.t('edit.pasteAndMatchStyle'),
        role: 'pasteandmatchstyle',
      } : {},
      {
        label: i18n.t('edit.delete'),
        role: 'delete',
      },
      {
        label: i18n.t('edit.selectAll'),
        role: 'selectall',
      },
      {
        type: 'separator',
      },
      {
        label: i18n.t('edit.find'),
        accelerator: 'CmdOrCtrl+F',
        click: () => BrowserWindow.fromId(global.wid).webContents.send('startFindInPage'),
      },
      {
        label: i18n.t('edit.speech.title'),
        submenu: [
          {
            label: i18n.t('edit.speech.startSpeaking'),
            role: 'startspeaking',
          },
          {
            label: i18n.t('edit.speech.stopSpeaking'),
            role: 'stopspeaking',
          },
        ],
      },
    ],
  },
  {
    label: i18n.t('view.title'),
    submenu: [
      {
        label: i18n.t('view.reload'),
        accelerator: 'CmdOrCtrl+R',
        click: () => BrowserWindow.fromId(global.wid).webContents.send('reload'),
      },
      {
        label: i18n.t('view.forceReload'),
        role: 'forcereload',
      },
      {
        label: i18n.t('view.toggleDevTools'),
        role: 'toggledevtools',
      },
      {
        type: 'separator',
      },
      {
        label: i18n.t('view.resetZoom'),
        role: 'resetzoom',
      },
      {
        label: i18n.t('view.zoomIn'),
        role: 'zoomin',
      },
      {
        label: i18n.t('view.zoomOut'),
        role: 'zoomout',
      },
      {
        type: 'separator',
      },
      {
        label: i18n.t('view.toggleFullscreen'),
        role: 'togglefullscreen',
      },
    ],
  },
  {
    label: i18n.t('window.title'),
    role: 'window',
    submenu: [
      {
        label: i18n.t('window.minimize'),
        role: 'minimize',
      },
      {
        label: i18n.t('window.close'),
        role: 'close',
      },
      process.platform === 'darwin' ? {
        type: 'separator',
      } : {},
      process.platform === 'darwin' ? {
        label: i18n.t('window.front'),
        role: 'front',
      } : {},
    ],
  },
  {
    label: i18n.t('help.title'),
    role: 'help',
    submenu: [
      {
        label: i18n.t('help.reportIssue'),
        click: () => BrowserWindow.fromId(global.wid).webContents.send('new-tab', {
          location: 'https://github.com/qazbnm456/lulumi-browser/issues',
          follow: true,
        }),
      },
    ],
  },
];

if (process.platform === 'darwin') {
  const appName = app.getName();
  template.unshift({
    label: appName,
    submenu: [
      {
        label: i18n.t('app.about', { appName }),
        click: () => BrowserWindow.fromId(global.wid).webContents.send('new-tab', {
          location: 'about:lulumi',
          follow: true,
        }),
      },
      {
        type: 'separator',
      },
      {
        label: i18n.t('app.services.title'),
        role: 'services',
        submenu: [],
      },
      {
        type: 'separator',
      },
      {
        label: i18n.t('app.hide', { appName }),
        role: 'hide',
      },
      {
        label: i18n.t('app.hideOthers'),
        role: 'hideothers',
      },
      {
        label: i18n.t('app.unhide'),
        role: 'unhide',
      },
      {
        type: 'separator',
      },
      {
        label: i18n.t('app.quit', { appName }),
        role: 'quit',
      },
    ],
  });
}

const menu = Menu.buildFromTemplate(template);

export default {
  init() {
    Menu.setApplicationMenu(menu);
  },
};
