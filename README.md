# Zombietron - CEP skeleton template

This is my personal boilerplate and build system for creating Adobe Extension Panels.

It is based on [Adam Plouff's excellent Skeletor template](https://github.com/adamplouff/CEP-Skelotron).

## Features/Overview

### Most of the Original Skeletor Features

- Transferring data as JSON from panel to be used within an extendscript function.
- Modal popup.
- Automatic detection of host app brightness to match panel - updating with JavaScript.
- Context and flyout menus.

### New Features

- Rewritten .gulpfile, using Gulp 4.
- Added development feature to .gulpfile, allowing for quicker panel development with quicker code.
- Gulp setup for creating certificate for the extension.
- A "Make New Composition" example feature so there was something besides a blank panel in there.

### RIP

- Removed Vue and Vue-dependent features 😢

## How to set up automatically using Videotools

[Videotools](https://github.com/andrewrbrady/videotools) is a set of Python scripts I wrote to support video pipeline workflows, including some tools to assist with panel development.

The [Zombietron Cloner](https://github.com/andrewrbrady/videotools/blob/master/zombietron-cloner.py) (zombietron-cloner.py) will automatically download the project and configure it correctly.

## Manual Setup

If you do not want to use the Zombietron Cloner, you can download and set up manually.

1. Clone Zombietron from Github.

```shell
git clone https://github.com/andrewrbrady/zombietron.git
```

2. Rename the **_Zombietron_** project folder.
3. cd into the new project folder.
4. Install the necessary packages with npm.

```shell
npm install
```

5. Do a search and replace for all the files in the renamed **Zombietron** folder for **_YourNewToolName_**.

- You can try the following shell command. OSX users-please note the blank input for the sed command. This was necessary during testing.

```shell
cd ../
grep -rl Zombietron . --exclude-dir=.git | xargs sed -i '' 's/Zombietron/YourNewToolName/g'
```

6. Create a symlink between the src folder in your new directory. Change 'username' in the command below to match your system username.

```shell
ln -s /Users/${USER}/Development/YourNewToolName/src /Users/username/Library/Application Support/Adobe/CEP/extensions/YourNewToolName
```

7. Download [ZXP Installer][799ff035]. Open it and navigate to settings. In here you can **enable extension debugging** which allows you to open and use unsigned (in progress) extensions.

8. Open After Effects and navigate to Window > Extensions > **YourNewToolName**

9. Follow the instructions in the "Development" section to use Gulp to develop your panel.

10. [Debugging][799ff033] may be done in Chrome at http://localhost:8073/

- This address may be set to anything you want in the invisible **debug** file

## Development

I personally find breaking projects down to a more granular level makes them easier to manage and less prone to mistakes. Gulp makes it easy to work on projects in many smaller files, ultimately compiling them into a single file.

### How to use the development build feature:

1. Use Gulp to watch for project changes.

```shell
gulp dev
```

2. Gulp will begin watching all files the 'dev' directory for changes.
3. Make changes to your HTML, JS, and/or JSX files in the "dev" folder.
4. Save your changes.

### What does this do?

1. Gulp combines all files in the dev/jsx folder into one jsx file. It then wraps this .jsx file in an anonymous function.
2. Gulp combines all files in the dev/js folder into one js file. It then wraps the code within this .js file in an anonymous function.
3. Gulp builds all the files from the 'dev' directory into the 'src' directory.

Your changes will now be visible in your After Effects panel by right clicking the panel and selecting "Reload", or closing and relaunching from the Window > Extensions menu.

## Using Gulp to sign and build a panel for distribution

Once you're all done and want to share with someone else you need to sign the extension. This is for security and means it can't be edited. You need to create a certificate but you only need to do this once. Reuse this certificate for future tools too.

1. Download [ZXPSignCmd][799ff037] and place it in your Applications folder.

- Type **gulp** and hit enter
- A brand new **BrutalNameTool.zxp** will now be the **Zombietron/Install** folder
- Install this new zxp file with ZXP Installer to make sure it works

## Thanks

Obviously [Adam Plouff](https://github.com/adamplouff), for releasing this to the public, and everyone else in the After Effects development community.

## License

Apache 2.0

[799ff023]: https://github.com/Adobe-CEP "Adobe CEP"
[799ff025]: http://htmlpanelsbook.com/ "HTML Panels"
[799ff027]: https://atom.io/ "Atom"
[799ff029]: https://www.howtogeek.com/297721/how-to-create-and-use-symbolic-links-aka-symlinks-on-a-mac/ "OS X Symlink"
[799ff031]: https://www.howtogeek.com/howto/16226/complete-guide-to-symbolic-links-symlinks-on-windows-or-linux/ "Windows Symlink"
[799ff033]: https://github.com/Adobe-CEP/Getting-Started-guides/tree/master/Client-side%20Debugging "Client side debugging"
[799ff035]: https://aescripts.com/learn/zxp-installer/ "ZXP Installer"
[799ff037]: https://github.com/Adobe-CEP/CEP-Resources/tree/master/ZXPSignCMD "ZXPSignCmd"
[799ff041]: https://nodejs.org/en/download/ "Node.js"
[799ff041]: https://nodejs.org/en/download/ "Node.js"
