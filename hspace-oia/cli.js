#!/usr/bin/env node
"use strict";

Object.defineProperty(exports, "__esModule", {value: true});
const tslib = require("tslib");
require("reflect-metadata");
const {NewAdminRunCommand} = require("./src/infrastructure/commands/NewAdmin");
const {SeedRunCommand} = require("./src/infrastructure/commands/Seed");

const yargs = tslib.__importDefault(require("yargs"));


yargs.default
    .usage("Usage: $0 <command> [options]")
    .command(new SeedRunCommand())
    .command(new NewAdminRunCommand())
    .recommendCommands()
    .demandCommand(1)
    .strict()
    .alias("v", "version")
    .help("h")
    .alias("h", "help")
    .argv;

require("yargonaut")
    .style("blue")
    .style("yellow", "required")
    .helpStyle("green")
    .errorsStyle("red");
