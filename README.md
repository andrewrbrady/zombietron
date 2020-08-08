# Zombietron - CEP skeleton template

This is my personal boilerplate and build system for creating Adobe Extension Panels.

It is based on [Adam Plouff's excellent Skeletor template](https://github.com/adamplouff/CEP-Skelotron).

## Features

### ~~All~~ Most of the Original Skeletor Features

- Transferring data as JSON from panel to be used within an extendscript function
- Modal popup
- Automatic detection of host app brightness to match panel - updating with JavaScript
- Context and flyout menus

### New Features

- Rewritten gulpfile, using Gulp 4.
- Added Gulp development build, allowing for quicker panel development with quicker code.
- Gulp setup for packaging up the extension.

### RIP

- Removed Vue and Vue-dependent features 😢

### Work in Progress

- Using Gulp Shell to generate a certificate file.

## Setup

1. Clone Zombietron from Github using the following command

```shell
git clone https://github.com/andrewrbrady/zombietron.git
```

2. Rename the **_Zombietron_** project folder to match your brutal new tool name
3. cd into the new project folder
4. Install the necessary packages with npm.

```shell
npm install
```

5. Do a search and replace for all the files in the **Zombietron** folder for **_Zombietron_** and name it something brutal.

- You can try the following shell command. OSX users-please note the blank input for the sed command. This was necessary during testing.

```shell
cd ../
grep -rl Zombietron . --exclude-dir=.git | xargs sed -i '' 's/Zombietron/BrutalNameTool/g'
```

Mac: /Users/**username**/Library/Application Support/Adobe/CEP/extensions/

Win: C:/Users/**username**/AppData/Roaming/Adobe/CEP/extensions/

```shell
 ln -s /Users/${USER}/Development/BrutalNameTool/src BrutlaNameTool
```

6. Download [ZXP Installer][799ff035]. Open it and navigate to settings. In here you can **enable extension debugging** which allows you to open and use unsigned (in progress) extensions.

7. Open After Effects and navigate to Window > Extensions > **Brutal tool name**
8. Follow the instructions in the "Development" section to use Gulp to develop your panel.

9 [Debugging][799ff033] may be done in Chrome at http://localhost:8073/

- This address may be set to anything you want in the invisible **debug** file

## Development

```shell
gulp dev
```

Typing the above into the termianl will create a development build for this panel.

What does this do?

1. Combines all files in the dev/jsx folder into one jsx file. It then wraps this .jsx file in an anonymous function.
2. Combines all files in the dev/js folder into one js file. It then wraps the code within this .js file in an anonymous function.

How to use the development build feature:

1. Make changes to your HTML, JS, and/or JSX files in the "dev" folder.
2. Type the following command into the command line below.

```shell
gulp dev
```

3. Open or right click and reload the panel in the Adobe Create Suite program you are working in to test/see your changes.

## Building

Once you're all done and want to share with someone else you need to sign the extension. This is for security and means it can't be edited. You need to create a certificate but you only need to do this once. Reuse this certificate for future tools too.

1. Download [ZXPSignCmd][799ff037] and place it in your Applications folder.

- Type **gulp** and hit enter
- A brand new **BrutalNameTool.zxp** will now be the **Zombietron/Install** folder
- Install this new zxp file with ZXP Installer to make sure it works

Obviously Adam Plouff, for releasing this to the public under the Apache 2.0 license. Also Zack and the rest of the people in the Motion Design Artists Dev channel.

This package would have been a mess without the guidance and ongoing support of [Zack Lovatt][799ff039]. He came up with the really lean `evalScript()` func that is changing the way I build tools and so many other real-boy coder tips. Zack is light in the dark world of Adobe tool dev.

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
[799ff039]: http://zacklovatt.com/ "Zack Lovatt"
[799ff041]: https://nodejs.org/en/download/ "Node.js"
[799ff041]: https://nodejs.org/en/download/ "Node.js"
