import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { homedir } from 'node:os';

export const SANDBOX_ROOT = path.join(homedir(), 'agentfence-sandbox');

function resolveSandboxPath(userPath: string): string {
  // Strip leading ~/ or / and resolve relative to sandbox
  const cleaned = userPath.replace(/^[~./]+/, '');
  const resolved = path.resolve(SANDBOX_ROOT, cleaned);
  if (!resolved.startsWith(SANDBOX_ROOT)) {
    throw new Error(`Access denied: path "${userPath}" is outside the sandbox`);
  }
  return resolved;
}

export async function listFiles(args: { directory: string }): Promise<string> {
  const dir = resolveSandboxPath(args.directory);
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(entries.map(async (e) => {
      const fullPath = path.join(dir, e.name);
      const stats = await fs.stat(fullPath);
      return {
        name: e.name,
        type: e.isDirectory() ? 'directory' : 'file',
        size: stats.size,
        modified: stats.mtime.toISOString(),
      };
    }));
    return JSON.stringify({ directory: args.directory, files }, null, 2);
  } catch (err: any) {
    return JSON.stringify({ error: err.message });
  }
}

export async function readFile(args: { path: string }): Promise<string> {
  const filePath = resolveSandboxPath(args.path);
  try {
    return await fs.readFile(filePath, 'utf-8');
  } catch (err: any) {
    return JSON.stringify({ error: err.message });
  }
}

export async function writeFile(args: { path: string; content: string }): Promise<string> {
  const filePath = resolveSandboxPath(args.path);
  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, args.content, 'utf-8');
    return `File written: ${args.path} (${args.content.length} bytes)`;
  } catch (err: any) {
    return JSON.stringify({ error: err.message });
  }
}

export async function deleteFile(args: { path: string }): Promise<string> {
  const filePath = resolveSandboxPath(args.path);
  try {
    await fs.unlink(filePath);
    return `File deleted: ${args.path}`;
  } catch (err: any) {
    return JSON.stringify({ error: err.message });
  }
}
