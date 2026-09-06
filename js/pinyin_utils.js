/**
 * Pinyin Utility Module
 * Formats Chinese text and Pinyin into HTML <ruby> structures with 12 Enemy Pinyin Color Highlights.
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
     * Determines 12 Enemy Pinyin Trap Classes for Japanese Learners
     */
    getEnemyClasses(py) {
        if (!py) return '';
        const clean = py.toLowerCase().replace(/[^\wāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/g, '');
        const classes = [];

        // 1. bad-an: -ian (イェン), -ui (ウェイ), -un (ウェン), ü (丸口ü)
        if (/ian|ui|un|ü|ǖ|ǘ|ǚ|ǜ/i.test(clean)) {
            classes.push('bad-an');
        }
        // 2. bad-e: こもる e (excluding ie, ei)
        if (/[eēéěè]/i.test(clean) && !/ie|ei/i.test(clean)) {
            classes.push('bad-e');
        }
        // 3. bad-retro: 巻き舌・無気音 zh, ch, sh, r, zi, ci, si
        if (/^(zh|ch|sh|r)|(zi|ci|si)$/i.test(clean)) {
            classes.push('bad-retro');
        }
        // 4. bad-ing: 鼻音 -ng
        if (/ng$/i.test(clean) || /[āáǎàēéěèīíǐìōóǒòūúǔù]ng/i.test(clean)) {
            classes.push('bad-ing');
        }
        // 5. bad-front: 前舌面 j, q, x
        if (/^(j|q|x)/i.test(clean)) {
            classes.push('bad-front');
        }

        return classes.join(' ');
    },

    /**
     * Splits Chinese characters and Pinyin words into aligned ruby elements with Enemy Pinyin colors
     * @param {string} zhText - e.g. "早上好！李丽。"
     * @param {string} pinyinText - e.g. "Zǎoshang hǎo! Lǐ Lì."
     * @returns {string} HTML string with <ruby> tags
     */
    buildRubyHTML(zhText, pinyinText) {
        if (!zhText) return '';
        if (!pinyinText) return `<span>${zhText}</span>`;

        const pyWords = pinyinText.split(/\s+/).filter(w => w.length > 0);
        let zhIdx = 0;
        let html = '';

        for (let i = 0; i < pyWords.length; i++) {
            const pyWord = pyWords[i];
            const cleanPy = pyWord.replace(/[^\wāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜĀÁǍÀĒÉĚÈĪÍǏÌŌÓǑÒŪÚǓÙǕǗǙǛ]/g, '');
            if (!cleanPy) continue;

            let wordZh = '';
            while (zhIdx < zhText.length) {
                const char = zhText[zhIdx];
                if (/[\s！？，。；：…（）“”、！,!\?\.:;]/.test(char)) {
                    if (wordZh.length === 0) {
                        html += `<span class="punct">${this.normalizePunctuation(char)}</span>`;
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
                const enemyClass = this.getEnemyClasses(cleanPy);
                const rtAttr = enemyClass ? ` class="${enemyClass}"` : '';
                html += `<ruby class="pinyin-ruby">${wordZh}<rt${rtAttr}>${cleanPy}</rt></ruby>`;
            }
        }

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

    normalizePunctuation(char) {
        if (char === '.' || char === '。') return '。';
        if (char === ',' || char === '，' || char === '、') return '，';
        if (char === '!' || char === '！') return '！';
        if (char === '?' || char === '？') return '？';
        if (char === ';' || char === '；') return '；';
        if (char === ':' || char === '：') return '：';
        return char;
    },

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
