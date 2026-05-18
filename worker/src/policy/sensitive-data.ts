// Sensitive data detection — PII, medical, financial patterns

const SENSITIVE_FILE_NAMES = [
  'medical_record', 'patient', 'diagnosis', 'health',
  'transactions', 'financial', 'bank_statement', 'tax_return',
  'passwords', 'credentials', 'secrets', 'api_keys', '.env',
  'ssn', 'social_security',
];

const PII_PATTERNS = [
  /\b\d{3}-\d{2}-\d{4}\b/,              // SSN
  /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/, // Credit card
  /\b[A-Z]{2}\d{6,8}\b/,                // Passport-like
];

const MEDICAL_PATTERNS = [
  /\bdiagnos[ie]s?\b/i,
  /\bmedication\b/i,
  /\bpatient\b/i,
  /\bprescription\b/i,
  /\bblood\s+type\b/i,
  /\bmedical\s+record\b/i,
  /\bHIPAA\b/,
];

const FINANCIAL_PATTERNS = [
  /\baccount\s*#?\s*\d+/i,
  /\brouting\s*number\b/i,
  /\bbalance[\s:]+\$[\d,.]+/i,
  /\btransaction\b/i,
  /\bwire\s+transfer\b/i,
];

export interface SensitivityResult {
  isSensitive: boolean;
  categories: string[];
  matchedPatterns: string[];
}

export function checkFileName(fileName: string): SensitivityResult {
  const lower = fileName.toLowerCase();
  const categories: string[] = [];
  const matched: string[] = [];

  for (const name of SENSITIVE_FILE_NAMES) {
    if (lower.includes(name)) {
      matched.push(name);
      if (['medical_record', 'patient', 'diagnosis', 'health'].includes(name)) {
        categories.push('medical');
      } else if (['transactions', 'financial', 'bank_statement', 'tax_return'].includes(name)) {
        categories.push('financial');
      } else if (['passwords', 'credentials', 'secrets', 'api_keys', '.env'].includes(name)) {
        categories.push('credentials');
      } else {
        categories.push('pii');
      }
    }
  }

  return {
    isSensitive: categories.length > 0,
    categories: [...new Set(categories)],
    matchedPatterns: matched,
  };
}

export function checkContent(content: string): SensitivityResult {
  const categories: string[] = [];
  const matched: string[] = [];

  for (const pattern of PII_PATTERNS) {
    if (pattern.test(content)) {
      categories.push('pii');
      matched.push(pattern.source);
    }
  }

  for (const pattern of MEDICAL_PATTERNS) {
    if (pattern.test(content)) {
      categories.push('medical');
      matched.push(pattern.source);
    }
  }

  for (const pattern of FINANCIAL_PATTERNS) {
    if (pattern.test(content)) {
      categories.push('financial');
      matched.push(pattern.source);
    }
  }

  return {
    isSensitive: categories.length > 0,
    categories: [...new Set(categories)],
    matchedPatterns: matched,
  };
}
