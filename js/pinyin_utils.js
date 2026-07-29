/**
 * Pinyin Utility Module
 * Formats Chinese text and Pinyin into HTML <ruby> structures and handles Pinyin display modes.
 * Ensures clean Chinese punctuation (，, 。, ！, ？) without duplicate Western punctuation.
 */

window.PinyinUtils = {
    // Current display mode: 'always' | 'hover' | 'hidden'
    currentMode: 'always',

    setMode(mode) {
        this.currentMode = mode;
        const container = document.getElementById('chat-container');
        if (container) {
            container.setAttribute('data-pinyin-mode', mode);
        }
    },

    /**
     * Splits Chinese characters and Pinyin words into aligned ruby elements
     * @param {string} zhText - e.g. "早上好！李丽。"
     * @param {string} pinyinText - e.g. "Zǎoshang hǎo! Lǐ Lì."
     * @returns {string} HTML string with <ruby> tags
     */
    buildRubyHTML(zhText, pinyinText) {
        if (!zhText) return '';
        if (!pinyinText) return `<span>${zhText}</span>`;

        // Tokenize pinyin words (strip punctuation from pinyin)
        const pyWords = pinyinText.split(/\s+/).filter(w => w.length > 0);
        
        let zhIdx = 0;
        let html = '';

        for (let i = 0; i < pyWords.length; i++) {
            const pyWord = pyWords[i];
            
            // Extract clean pinyin (strip trailing/leading punctuation in Pinyin)
            const cleanPy = pyWord.replace(/[^\wāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜĀÁǍÀĒÉĚÈĪÍǏÌŌÓǑÒŪÚǓÙǕǗǙǛ]/g, '');
            if (!cleanPy) continue;

            // Consume characters from zhText matching length of cleanPy or until punctuation
            let wordZh = '';
            while (zhIdx < zhText.length) {
                const char = zhText[zhIdx];
                
                // If character is Chinese/Western punctuation
                if (/[\s！？，。；：…（）“”、！,!\?\.:;]/.test(char)) {
                    if (wordZh.length === 0) {
                        // Render clean Chinese punctuation from zhText
                        const cleanPunct = this.normalizePunctuation(char);
                        html += `<span class="punct">${cleanPunct}</span>`;
                        zhIdx++;
                        continue;
                    } else {
                        break;
                    }
                }
                wordZh += char;
                zhIdx++;

                const syllableEst = this.estimateSyllableCount(cleanPy);
                if (wordZh.length >= syllableEst) {
                    break;
                }
            }

            if (wordZh) {
                html += `<ruby class="pinyin-ruby">${wordZh}<rt>${cleanPy}</rt></ruby>`;
            }
        }

        // Catch any remaining Chinese characters and punctuation
        while (zhIdx < zhText.length) {
            const char = zhText[zhIdx];
            if (/[\s！？，。；：…（）“”、！,!\?\.:;]/.test(char)) {
                html += `<span class="punct">${this.normalizePunctuation(char)}</span>`;
            } else {
                html += char;
            }
            zhIdx++;
        }

        return html;
    },

    /**
     * Normalizes punctuation to clean Chinese standard (，, 。, ！, ？)
     */
    normalizePunctuation(char) {
        if (char === '.' || char === '。') return '。';
        if (char === ',' || char === '，' || char === '、') return '，';
        if (char === '!' || char === '！') return '！';
        if (char === '?' || char === '？') return '？';
        if (char === ';' || char === '；') return '；';
        if (char === ':' || char === '：') return '：';
        return char;
    },

    /**
     * Estimates syllable count in a clean Pinyin string
     */
    estimateSyllableCount(cleanPy) {
        if (!cleanPy) return 1;
        let count = 0;
        let inVowel = false;
        for (let i = 0; i < cleanPy.length; i++) {
            const isV = /[aeiouüāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/i.test(cleanPy[i]);
            if (isV && !inVowel) {
                count++;
                inVowel = true;
            } else if (!isV) {
                inVowel = false;
            }
        }
        return Math.max(1, count);
    }
};
