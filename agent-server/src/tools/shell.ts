import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { SANDBOX_ROOT } from './filesystem.js';

const execAsync = promisify(exec);

export async function shellExec(args: { command: string }): Promise<string> {
  const cmd = args.command;

  // Basic safety checks — the policy engine is the real guard,
  // but these prevent obvious sandbox escapes
  const forbidden = [/\.\.\//,  /sudo\s/, /\bsu\s/];
  for (const pattern of forbidden) {
    if (pattern.test(cmd)) {
      return `Error: Command rejected by sandbox. Pattern "${pattern.source}" is not allowed.`;
    }
  }

  try {
    const { stdout, stderr } = await execAsync(cmd, {
      cwd: SANDBOX_ROOT,
      timeout: 10_000,
      maxBuffer: 1024 * 1024,
      env: { ...process.env, HOME: SANDBOX_ROOT },
    });

    let output = stdout;
    if (stderr) output += `\nSTDERR: ${stderr}`;
    return output || '(no output)';
  } catch (err: any) {
    if (err.killed) return 'Error: Command timed out (10s limit)';
    return `Command failed: ${err.message}`;
  }
}
