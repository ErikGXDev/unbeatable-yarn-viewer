# UNBEATABLE Yarn Viewer

> A Tool for editing UNBEATABLE (or any Yarn-related project) Dialog Programs and Lines.

## "What is Yarn?"

Yarn (full name "Yarn Spinner") is a tool primarily used in Unity games to create dialogue easily. This dialogue can be extracted by getting the "compiled" Yarn Programs found in game files. This tool is supposed to be a semi-user-friendly interface for working with these compiled programs.

## How to use (UNBEATABLE DEMO specific)

Extract Translation files used in the game using [My (ErikGXDev's) Unbeatable Mod](https://github.com/ErikGXDev/unbeatable-demo-song-hack) (able to extract yarn projects and lines) or [Taco's Translation Mod](https://github.com/TacoDogUnbeatableThing/CustomTranslations) (only able to extract lines).

### Using ErikGXDev's Mod

Open the Game after installing the mod according to its [Installation Instructions](https://github.com/ErikGXDev/unbeatable-demo-song-hack/releases/latest) and open its dev menu on the top left. Wait until you reached the Main Menu. Press the `Dump Translations` button. Yarn Projects and Lines will be saved as json in the game's directory inside a `dumped` folder. To apply modified translations, put these files in a `Translation` folder in the game directory and press "Reload Translations" in-game. You may also have to reload the current scene.

## Using the interface (boring guide)

Load dumped projects and lines using the respective buttons in the top left. Select a dialog (aka "Node" or "Yarn Node") you want to edit using the "Select a node" Selector.

Edit values used in Nodes using the left editor panel. Change from "Viewer" to "Editor" to switch to a JSON editor, which allows for adding and also removing individual instructions. Make sure to press the Save button to apply your changes.

Lines can be edited using the panel on the right. Click on the pencil icon to switch to edit mode. Make sure to press that button again to save your changes.

Use the Save buttons to Save your changes to a new file. Add these modified files to the game according to the instructions above.

## Disclaimer

This project has been made without thinking about proper state management or data structures. Expect lags and bugs.

## Contributing

PRs are welcome 👍
