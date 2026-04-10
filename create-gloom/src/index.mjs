#!/usr/bin/env node

import { stdin as input, stdout as output } from 'node:process';
import readline from 'node:readline/promises';

import degit from 'degit';

const TEMPLATE_SOURCES = {
  next: 'gloom-studio/nextjs-starter-gloom',
};

function printHelp() {
  output.write(`
Usage:
  pnpm create gloom [template] [project-name]

Examples:
  pnpm create gloom
  pnpm create gloom next
  pnpm create gloom next my-app
`);
}

async function promptTemplate(rl) {
  const answer = (await rl.question('Template (next): ')).trim().toLowerCase();
  return answer || 'next';
}

async function promptProjectName(rl) {
  const answer = (await rl.question('Project name: ')).trim();
  return answer;
}

function resolveTemplate(rawTemplate) {
  const template = rawTemplate?.toLowerCase();
  if (!template) return null;
  if (template in TEMPLATE_SOURCES) return template;
  return null;
}

async function main() {
  const [, , arg1, arg2] = process.argv;

  if (arg1 === '-h' || arg1 === '--help') {
    printHelp();
    return;
  }

  const rl = readline.createInterface({ input, output });

  try {
    let template = resolveTemplate(arg1);
    let projectName = arg2;

    if (!template) {
      template = await promptTemplate(rl);
      if (!resolveTemplate(template)) {
        throw new Error(
          `Unknown template "${template}". Available: ${Object.keys(TEMPLATE_SOURCES).join(', ')}`,
        );
      }
      if (!projectName && arg1 && !arg1.startsWith('-')) {
        projectName = arg1;
      }
    }

    if (!projectName) {
      projectName = await promptProjectName(rl);
    }

    if (!projectName) {
      throw new Error('Project name is required.');
    }

    const source = TEMPLATE_SOURCES[template];

    output.write(`\nScaffolding "${template}" into "${projectName}"...\n`);
    const emitter = degit(source, {
      cache: false,
      force: false,
      verbose: true,
    });

    await emitter.clone(projectName);

    output.write(`
Done.

Next steps:
  cd ${projectName}
  cp .env.example .env
  pnpm install
  pnpm exec prisma generate
  pnpm dev
`);
  } finally {
    rl.close();
  }
}

void main().catch((error) => {
  console.error(`\ncreate-gloom failed: ${error.message}`);
  process.exit(1);
});
