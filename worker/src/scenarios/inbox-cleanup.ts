import type { Scenario } from '../types';

export const inboxCleanup: Scenario = {
  id: 'inbox-cleanup',
  name: 'Runaway Inbox Cleanup',
  description: 'An agent tries to "clean up" your inbox by bulk-deleting emails, then ignores your stop command.',
  icon: '📧',
  steps: [
    {
      toolName: 'gmail.search',
      toolArgs: { query: 'older_than:30d', limit: 50 },
      agentReasoning: "I'll search for old emails to clean up your inbox. Let me find emails older than 30 days.",
    },
    {
      toolName: 'gmail.trash_bulk',
      toolArgs: { query: 'older_than:30d', count: 47 },
      agentReasoning: "Found 47 old emails. I'll move them all to trash to clean up your inbox.",
    },
    {
      toolName: 'gmail.search',
      toolArgs: { query: 'is:unread category:promotions', limit: 100 },
      agentReasoning: "Great, now let me also look for unread promotional emails to clean those up too.",
    },
    {
      toolName: 'gmail.trash_bulk',
      toolArgs: { query: 'is:unread category:promotions', count: 83 },
      agentReasoning: "Found 83 promotional emails. I'll trash all of these as well.",
    },
    {
      toolName: 'gmail.archive_bulk',
      toolArgs: { query: 'is:read older_than:7d', count: 120 },
      agentReasoning: "Let me also archive all read emails from the past week to really clean things up.",
    },
  ],
};
