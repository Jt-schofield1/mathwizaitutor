/**
 * Math Renderer Component - Displays math equations properly
 * Supports LaTeX notation for fractions, exponents, etc.
 */

'use client';

import { useEffect } from 'react';
import 'katex/dist/katex.min.css';

interface MathRendererProps {
  content: string;
}

const HTML_ESCAPE_LOOKUP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

const HTML_DECODE_LOOKUP: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => HTML_ESCAPE_LOOKUP[char] ?? char);
}

function decodeHtmlEntities(value: string): string {
  return value.replace(/&(amp|lt|gt|quot|#39);/g, (match) => HTML_DECODE_LOOKUP[match] ?? match);
}

function createMathElement(math: string, block: boolean): string {
  const rawMath = decodeHtmlEntities(math.trim());
  const safeMath = escapeHtml(rawMath);
  const tag = block ? 'div' : 'span';
  const className = block ? 'math-block' : 'math-inline';
  return `<${tag} class="${className}" data-math="${safeMath}"></${tag}>`;
}

type Token =
  | { type: 'text'; content: string }
  | { type: 'inline'; content: string }
  | { type: 'block'; content: string };

function tokenizeMath(input: string): Token[] {
  const tokens: Token[] = [];
  const pattern = /\$\$([\s\S]+?)\$\$|\$([^\$]+?)\$/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(input)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: 'text', content: input.slice(lastIndex, match.index) });
    }

    if (match[1] !== undefined) {
      tokens.push({ type: 'block', content: match[1] });
    } else if (match[2] !== undefined) {
      tokens.push({ type: 'inline', content: match[2] });
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < input.length) {
    tokens.push({ type: 'text', content: input.slice(lastIndex) });
  }

  return tokens;
}

function autoDetectMath(segment: string): string {
  const placeholders: Array<{ token: string; math: string }> = [];
  let working = segment;

  const register = (math: string) => {
    const token = `__MATH_PLACEHOLDER_${placeholders.length}__`;
    placeholders.push({ token, math });
    return token;
  };

  working = working.replace(/(\d+)\/(\d+)/g, (_match, numerator: string, denominator: string) =>
    register(`\\frac{${numerator}}{${denominator}}`),
  );

  working = working.replace(/(\w)\^(\d+)/g, (_match, base: string, exponent: string) =>
    register(`${base}^{${exponent}}`),
  );

  working = working.replace(/√(\d+)/g, (_match, value: string) => register(`\\sqrt{${value}}`));

  return placeholders.reduce(
    (acc, { token, math }) => acc.replace(token, createMathElement(math, false)),
    working,
  );
}

export function MathRenderer({ content }: MathRendererProps) {
  useEffect(() => {
    // Dynamically import KaTeX for rendering
    import('katex').then((katex) => {
      const elements = document.querySelectorAll('.math-inline, .math-block');
      elements.forEach((element) => {
        const math = element.getAttribute('data-math');
        if (math) {
          try {
            katex.default.render(math, element as HTMLElement, {
              displayMode: element.classList.contains('math-block'),
              throwOnError: false,
            });
          } catch (e) {
            console.error('KaTeX rendering error:', e);
          }
        }
      });
    });
  }, [content]);

  // Parse content for math expressions
  const renderContent = () => {
    const sanitized = escapeHtml(content);
    const tokens = tokenizeMath(sanitized);

    return tokens
      .map((token) => {
        if (token.type === 'text') {
          return autoDetectMath(token.content);
        }

        const isBlock = token.type === 'block';
        return createMathElement(token.content, isBlock);
      })
      .join('');
  };

  return (
    <div 
      className="math-content"
      dangerouslySetInnerHTML={{ __html: renderContent() }}
    />
  );
}

