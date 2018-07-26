# strider-ssh-deploy 

[![Greenkeeper badge](https://badges.greenkeeper.io/Strider-CD/strider-ssh-deploy.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/Strider-CD/strider-ssh-deploy.svg?branch=master)](https://travis-ci.org/Strider-CD/strider-ssh-deploy) [![Dependency Status][dep-img]][dep-link] [![devDependency Status][dev-dep-img]][dev-dep-link]

[![NPM][npm-badge-img]][npm-badge-link]


### install

cd into strider deployment and run `npm install strider-ssh-deploy`

restart strider and check out the web ui -- you'll see a new plugin

please provide feedback in the issues and/or in IRC

thanks!

![screenshot][screenshot1]

### usage

configure the plugin with the deployment username, one or more hosts, and shell script to run on the hosts.

In the shell script input field you can use metadata information from the job document. For example to set environment variables on the remote server or hand over information to a script.

`./deploy.sh <%= ref.branch %>`

Have a look at the [metadata plugin](https://github.com/Strider-CD/strider-metadata) for all fields of the job document.

**Note on _Transfer bundle?_ flag**

Currently, "bundling" is provided by npm-pack which turns a directory into a tarball for npm, this happens to work pretty nicely for any project, not just node.js projects. Anyway it is npm-pack that is respecting the `.npmignore` file. *Additionally* and **most importantly**, if no `.npmignore` file is found, the `.gitignore` file is used!

Simply remember that with _Transfer bundle?_ flag enable all files and folder listed in your `.gitignore` **will not be transfered**. Check [this](https://github.com/Strider-CD/strider-ssh-deploy/issues/17) issue for more information.

If you want to work around this issue, create an empty `.npmignore` file in your project.


[dev-dep-img]: https://david-dm.org/Strider-CD/strider-ssh-deploy/dev-status.svg
[dev-dep-link]: https://david-dm.org/Strider-CD/strider-ssh-deploy#info=devDependencies
[dep-img]: https://david-dm.org/Strider-CD/strider-ssh-deploy.svg
[dep-link]: https://david-dm.org/Strider-CD/strider-ssh-deploy
[npm-badge-img]: https://nodei.co/npm/strider-ssh-deploy.png?downloads=true&stars=true
[npm-badge-link]: https://nodei.co/npm/strider-ssh-deploy/

[screenshot1]: http://cl.ly/image/1t2W2r0E0G0p/Screen%20Shot%202014-07-10%20at%205.38.31%20PM.png
