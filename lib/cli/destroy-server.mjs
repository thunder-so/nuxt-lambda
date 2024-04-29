#!/usr/bin/env node
import shell from "shelljs";
const logPrefix = 'CDK Nuxt Destroy';

shell.echo(`${logPrefix}: Destroying stack on AWS via CDK...`);
if (shell.exec('bunx cdk destroy --require-approval never --app="bun run ./stack/index.ts" ' + process.argv.slice(2)).code !== 0) {
    shell.echo(`${logPrefix} Error: CDK destroy failed.`);
    shell.exit(1);
}

shell.echo(`${logPrefix}: CDK destroy successful.`);
