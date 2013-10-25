synology-nodejs-bin
===================

NodeJS binary build for Synology DiskStation. Only one for the moment.

Supported Models
================
mv6282_node-0.8.9
-----------------
NodeJS 0.8.9 built on DS211+ (Marvell Kirkwood mv6282 1.6Ghz ARM (Marvell ARMADA 300)) with DSM 4.3.
It has to work on other mv6282-based models.

[What kind of CPU does my NAS have](http://forum.synology.com/wiki/index.php/What_kind_of_CPU_does_my_NAS_have)

HOWTO Use
=========
1. Get package
2. Run commands
`tar -xzf mv6282_node-0.8.9.tar.gz`
`cd mv6282_node-0.8.9`
`make install`
