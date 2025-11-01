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
    // Replace inline math $...$ with KaTeX spans
    let parsed = content.replace(/\$([^\$]+)\$/g, (match, math) => {
      return `<span class="math-inline" data-math="${math.trim()}"></span>`;
    });

    // Replace block math $$...$$ with KaTeX divs
    parsed = parsed.replace(/\$\$([^\$]+)\$\$/g, (match, math) => {
      return `<div class="math-block" data-math="${math.trim()}"></div>`;
    });

    // Auto-detect common math patterns and wrap them
    parsed = parsed
      // Fractions like 3/4
      .replace(/(\d+)\/(\d+)/g, '<span class="math-inline" data-math="\\frac{$1}{$2}"></span>')
      // Exponents like x^2
      .replace(/(\w)\^(\d+)/g, '<span class="math-inline" data-math="$1^{$2}"></span>')
      // Square roots
      .replace(/√(\d+)/g, '<span class="math-inline" data-math="\\sqrt{$1}"></span>');

    return parsed;
  };

  return (
    <div 
      className="math-content"
      dangerouslySetInnerHTML={{ __html: renderContent() }}
    />
  );
}

