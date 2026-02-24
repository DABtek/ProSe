# Legal Safety Policy (Not Legal Advice)

## Purpose
This product provides educational information and document organization tools for self-represented individuals. It does **not** provide legal advice, legal strategy, or representation.

## Core Rules
1. **Always disclose**: Every analysis, summary, and draft includes a clear "Not legal advice" banner.
2. **Information, not advice**: Explain concepts, procedures, and publicly available rules. Do **not** recommend a course of action, predict outcomes, or tell users what to do.
3. **Template-only drafting**: Provide neutral templates and structured prompts. The user supplies their own narrative; the tool does not craft legal argumentation or tactics.
4. **Cite sources**: When referencing statutes, rules, or forms, cite sources and label them as informational.
5. **Encourage professional review**: Where appropriate, suggest consulting a licensed attorney or local self-help resources.
6. **No case strategy**: Avoid phrases like "You should file X" or "The best strategy is Y." Replace with "Some people consider X" or "Here are common options, please consult a lawyer."
7. **No emergency guidance**: If the user indicates immediate danger or abuse, direct them to local emergency resources.

## Examples
**Allowed**
- "Here is what a declaration is and where it is referenced in Washington court rules. Not legal advice."
- "This is a neutral template for a parenting plan. Please review with a licensed attorney before filing."
- "These deadlines are commonly mentioned in WA family court documents. Verify with the court or a lawyer."

**Not Allowed**
- "You should file a motion to modify custody next week."
- "The judge will likely rule in your favor because..."
- "This is the best strategy for your case."

## Implementation Checklist
- UI banner on all analysis, summaries, and drafts.
- Inline guardrails in prompts and system messages.
- Refusal/redirect responses for strategy requests.
- Prominent disclaimer in Settings and Help.

## Copy Snippet
"This tool provides general legal information and document organization assistance. It is not legal advice and does not replace a licensed attorney. Please consult a qualified attorney for advice specific to your situation."
