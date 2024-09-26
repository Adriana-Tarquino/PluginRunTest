import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  // Define el comando
  let runTestCommand = vscode.commands.registerCommand('TDD.runTest', async () => {
    const terminal = vscode.window.createTerminal('TDD Terminal');
    terminal.show();
    terminal.sendText('npm --version');
  });

  context.subscriptions.push(runTestCommand);

  // Define la vista
  const myView = vscode.window.createTreeView('myView', {
    treeDataProvider: new MyTreeDataProvider()
  });

  context.subscriptions.push(myView);
}

class MyTreeDataProvider implements vscode.TreeDataProvider<MyTreeItem> {
  getTreeItem(element: MyTreeItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: MyTreeItem): MyTreeItem[] {
    return [
      new MyTreeItem(
        'Run Test', 
        vscode.TreeItemCollapsibleState.None, 
        { command: 'TDD.runTest', title: 'Run Test' },
        '',
        new vscode.ThemeIcon('play', new vscode.ThemeColor('charts.green')), // Agrega color al icono de "play"
        '' // Tooltip personalizado
      )
    ];
  }
}

class MyTreeItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly command?: vscode.Command,
    public readonly description?: string,
    public readonly iconPath?: vscode.ThemeIcon,
    public readonly tooltip?: string // Tooltip para el item
  ) {
    super(label, collapsibleState);
    if (command) {
      this.command = command;
    }
    if (description) {
      this.description = description;
    }
    if (iconPath) {
      this.iconPath = iconPath;
    }
    if (tooltip) {
      this.tooltip = tooltip; // Tooltip añadido
    }
  }
}
