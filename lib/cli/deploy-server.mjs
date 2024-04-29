#!/usr/bin/env node
import shell from "shelljs";

const logPrefix = 'CDK Nuxt Deployment';
shell.echo(`${logPrefix}: Starting deployment for dynamic Nuxt app...`);

const deploymentSourceFolder = '.output/server';

// Refresh the cdk output folder to have a clean state and prevent persisting outdated outputs
shell.echo(`${logPrefix}: Deleting outdated CDK files...`);
shell.rm('-rf', 'cdk.out');

// Build the Nuxt app
shell.echo(`${logPrefix}: Building app...`);
if (shell.exec('bun run build').code !== 0) {
    shell.echo(`${logPrefix} Error: Building app failed.`);
    shell.exit(1);
}

// Copy the custom Nuxt app Lambda entry point files
if (shell.test('-d', 'server')) {
    shell.echo(`${logPrefix}: Copying custom Lambda handler files from 'server' directory...`);
    shell.cp('-r', 'server/.', deploymentSourceFolder);
}

// Run the deployment
shell.echo(`${logPrefix}: Deploying to AWS via CDK...`);
if (shell.exec('bunx cdk deploy --require-approval never --app="bun run ./stack/index.ts" ' + process.argv.slice(2)).code !== 0) {
    shell.echo(`${logPrefix} Error: CDK deployment failed.`);
    shell.exit(1);
}

shell.echo(`${logPrefix}: CDK deployment successful.`);

