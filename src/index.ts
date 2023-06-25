import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

/**
 * Initialization data for the sample_extension extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'sample_extension:plugin',
  description: 'ponpori extension',
  autoStart: true,
  optional: [ISettingRegistry],
  activate: (app: JupyterFrontEnd, settingRegistry: ISettingRegistry | null) => {
    console.log('JupyterLab extension sample_extension is activated!');

    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          console.log('sample_extension settings loaded:', settings.composite);
        })
        .catch(reason => {
          console.error('Failed to load settings for sample_extension.', reason);
        });
    }
  }
};

export default plugin;
