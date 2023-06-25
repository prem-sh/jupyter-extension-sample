import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

// import { ISettingRegistry } from '@jupyterlab/settingregistry';

/**
 * Initialization data for the sample_extension extension.
 */
// const plugin2: JupyterFrontEndPlugin<void> = {
//   id: 'sample_extension:plugin',
//   description: 'ponpori extension',
//   autoStart: true,
//   optional: [ISettingRegistry],
//   activate: (app: JupyterFrontEnd, settingRegistry: ISettingRegistry | null) => {
//     console.log('JupyterLab extension sample_extension is activated!');

//     if (settingRegistry) {
//       settingRegistry
//         .load(plugin.id)
//         .then(settings => {
//           console.log('sample_extension settings loaded:', settings.composite);
//         })
//         .catch(reason => {
//           console.error('Failed to load settings for sample_extension.', reason);
//         });
//     }
//   }
// };

import { ICommandPalette, MainAreaWidget } from '@jupyterlab/apputils';

import { Widget } from '@lumino/widgets';

const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-apod',
  description: 'Show a random NASA Astronomy Picture of the Day in a JupyterLab panel.',
  autoStart: true,
  requires: [ICommandPalette],
  activate: (app: JupyterFrontEnd, palette: ICommandPalette) => {
    console.log('JupyterLab extension jupyterlab_apod is activated!');

    // Define a widget creator function,
    // then call it to make a new widget
    const newWidget = () => {
      // Create a blank content widget inside of a MainAreaWidget
      const content = new Widget();
      const widget = new MainAreaWidget({ content });
      widget.id = 'apod-jupyterlab';
      widget.title.label = 'Astronomy Picture';
      widget.title.closable = true;
      return widget;
    }
    let widget = newWidget();

    // Add an application command
    const command: string = 'apod:open';
    app.commands.addCommand(command, {
      label: 'Random Astronomy Picture',
      execute: () => {
        // Regenerate the widget if disposed
        if (widget.isDisposed) {
          widget = newWidget();
        }
        if (!widget.isAttached) {
          // Attach the widget to the main work area if it's not there
          app.shell.add(widget, 'main');
        }
        // Activate the widget
        app.shell.activateById(widget.id);
      }
    });

    // Add the command to the palette.
    palette.addItem({ command, category: 'Tutorial' });
  }
};

export default plugin;
