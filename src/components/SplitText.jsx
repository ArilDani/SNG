import React from 'react';

/**
 * SplitText: Renders text broken into individual characters with staggered CSS animation.
 * Enables kinetic typography ("muncul huruf per huruf") on scroll and page load.
 */
export default function SplitText({ text, className = '', baseDelay = 0, speed = 0.025, wordClassName = '' }) {
  if (!text) return null;

  // Split into words first to preserve natural word wrapping
  const words = text.split(' ');
  let charCounter = 0;

  return (
    <span className={`split-text-root ${className}`}>
      {words.map((word, wIdx) => {
        const chars = word.split('');
        return (
          <span key={wIdx} className={`split-word ${wordClassName}`} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            {chars.map((ch, cIdx) => {
              const currentIdx = charCounter++;
              const delay = baseDelay + currentIdx * speed;
              return (
                <span
                  key={cIdx}
                  className="split-char"
                  style={{
                    '--char-idx': currentIdx,
                    animationDelay: `${delay}s`,
                    transitionDelay: `${delay}s`
                  }}
                >
                  {ch}
                </span>
              );
            })}
            {/* Space between words */}
            {wIdx < words.length - 1 && <span className="split-space">&nbsp;</span>}
          </span>
        );
      })}
    </span>
  );
}

