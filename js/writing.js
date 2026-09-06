/**
 * HSK 3 Writing Master Application Logic
 * Interactive word ordering puzzle, blank fill-in with character想起, and Japanese-Chinese kanji trap comparison.
 */

document.addEventListener('DOMContentLoaded', () => {
    let writingDB = null;
    let currentSection = 'ordering'; // 'ordering' | 'fill' | 'traps'

    // Ordering Puzzle State
    let currentCategory = 'all';
    let filteredOrderQuestions = [];
    let currentOrderIdx = 0;
    let placedChips = [];
    let availableChips = [];

    // Fill in Blank State
    let currentFillIdx = 0;

    // Speech Synthesis
    let defaultVoice = null;
    function initTTS() {
        const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices();
            const zhVoices = voices.filter(v => v.lang.startsWith('zh'));
            defaultVoice = zhVoices.find(v => v.lang === 'zh-CN') || zhVoices[0] || null;
        };
        loadVoices();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
    }

    function speakText(text) {
        if (!text) return;
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'zh-CN';
        if (defaultVoice) u.voice = defaultVoice;
        u.rate = 0.95;
        window.speechSynthesis.speak(u);
    }

    // Load Data
    async function loadData() {
        try {
            const res = await fetch(`./data/hsk3_writing.json?v=${Date.now()}`);
            if (!res.ok) throw new Error('Failed to load data/hsk3_writing.json');
            writingDB = await res.json();
            initApp();
        } catch (err) {
            console.error('Error loading writing data:', err);
            alert('データの読み込みに失敗しました: ' + err.message);
        }
    }

    function initApp() {
        initTTS();
        setupTabs();
        setupOrderingCategoryFilters();
        loadOrderQuestion(0);
        loadFillQuestion(0);
        renderKanjiTraps();
        setupKeyboardShortcuts();
    }

    // Tab Navigation
    function setupTabs() {
        const tabs = document.querySelectorAll('.tab-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const target = e.currentTarget.dataset.section;
                currentSection = target;
                tabs.forEach(t => t.classList.remove('active'));
                e.currentTarget.classList.add('active');

                document.getElementById('section-ordering').style.display = target === 'ordering' ? 'flex' : 'none';
                document.getElementById('section-fill').style.display = target === 'fill' ? 'flex' : 'none';
                document.getElementById('section-traps').style.display = target === 'traps' ? 'flex' : 'none';
            });
        });
    }

    // SECTION 1: 語順整序パズル
    function setupOrderingCategoryFilters() {
        const container = document.getElementById('category-filter-pills');
        container.innerHTML = '';
        writingDB.categories.forEach(cat => {
            const pill = document.createElement('button');
            pill.className = `filter-pill ${cat.id === currentCategory ? 'active' : ''}`;
            pill.textContent = cat.name;
            pill.dataset.catId = cat.id;
            pill.addEventListener('click', () => {
                currentCategory = cat.id;
                document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                filterOrderQuestions();
            });
            container.appendChild(pill);
        });
        filterOrderQuestions();
    }

    function filterOrderQuestions() {
        if (currentCategory === 'all') {
            filteredOrderQuestions = [...writingDB.order_questions];
        } else {
            filteredOrderQuestions = writingDB.order_questions.filter(q => q.category === currentCategory);
        }
        currentOrderIdx = 0;
        loadOrderQuestion(currentOrderIdx);
    }

    function loadOrderQuestion(idx) {
        if (!filteredOrderQuestions || filteredOrderQuestions.length === 0) return;
        currentOrderIdx = Math.max(0, Math.min(idx, filteredOrderQuestions.length - 1));
        const q = filteredOrderQuestions[currentOrderIdx];

        document.getElementById('order-category-badge').textContent = q.category_name;
        document.getElementById('order-counter').textContent = `問 ${currentOrderIdx + 1} / ${filteredOrderQuestions.length}`;

        // Reset answer tray and hide explanation
        placedChips = [];
        document.getElementById('order-explanation').style.display = 'none';

        // Shuffle words
        const shuffled = [...q.words].sort(() => Math.random() - 0.5);
        availableChips = shuffled.map((text, i) => ({ id: `chip_${i}`, text }));

        renderOrderChips();
    }

    function renderOrderChips() {
        const slot = document.getElementById('answer-slot');
        const pool = document.getElementById('chip-pool');

        // Render placed chips in Answer Slot
        slot.innerHTML = '';
        if (placedChips.length === 0) {
            slot.classList.add('empty');
        } else {
            slot.classList.remove('empty');
            placedChips.forEach((chip, i) => {
                const el = document.createElement('div');
                el.className = 'word-chip in-answer';
                el.innerHTML = `<span class="chip-key-badge">${i + 1}</span> <span>${chip.text}</span>`;
                el.addEventListener('click', () => returnChipToPool(chip));
                slot.appendChild(el);
            });
        }

        // Render available chips in Pool
        pool.innerHTML = '';
        availableChips.forEach((chip, i) => {
            const el = document.createElement('div');
            el.className = 'word-chip';
            el.innerHTML = `<span class="chip-key-badge">${i + 1}</span> <span>${chip.text}</span>`;
            el.addEventListener('click', () => placeChipInAnswer(chip));
            pool.appendChild(el);
        });
    }

    function placeChipInAnswer(chip) {
        availableChips = availableChips.filter(c => c.id !== chip.id);
        placedChips.push(chip);
        renderOrderChips();
    }

    function returnChipToPool(chip) {
        placedChips = placedChips.filter(c => c.id !== chip.id);
        availableChips.push(chip);
        renderOrderChips();
    }

    function resetOrder() {
        const q = filteredOrderQuestions[currentOrderIdx];
        if (!q) return;
        placedChips = [];
        availableChips = q.words.map((text, i) => ({ id: `chip_${i}`, text })).sort(() => Math.random() - 0.5);
        document.getElementById('order-explanation').style.display = 'none';
        renderOrderChips();
    }

    function checkOrder() {
        const q = filteredOrderQuestions[currentOrderIdx];
        if (!q) return;

        const currentAnswer = placedChips.map(c => c.text).join('');
        const correctAnswer = q.correct_order.join('');
        const isCorrect = currentAnswer === correctAnswer;

        const exp = document.getElementById('order-explanation');
        const fb = document.getElementById('order-feedback');
        const fullZh = document.getElementById('order-full-zh');
        const fullPy = document.getElementById('order-full-pinyin');
        const fullJa = document.getElementById('order-full-ja');
        const details = document.getElementById('order-grammar-details');

        exp.style.display = 'flex';
        if (isCorrect) {
            fb.className = 'feedback-badge correct';
            fb.textContent = '✓ 正解！ 正しい語順です';
        } else {
            fb.className = 'feedback-badge incorrect';
            fb.textContent = '✕ 不正解（もう一度チャレンジするか、解説を確認しましょう）';
        }

        fullZh.textContent = q.correct_order.join(' ');
        fullPy.textContent = q.pinyin;
        fullJa.textContent = q.translation;
        details.innerHTML = q.grammar_point;

        speakText(correctAnswer);
    }

    // SECTION 2: 看拼音写汉字
    function loadFillQuestion(idx) {
        if (!writingDB || !writingDB.fill_questions) return;
        currentFillIdx = Math.max(0, Math.min(idx, writingDB.fill_questions.length - 1));
        const q = writingDB.fill_questions[currentFillIdx];

        document.getElementById('fill-counter').textContent = `問 ${currentFillIdx + 1} / ${writingDB.fill_questions.length}`;
        document.getElementById('fill-explanation').style.display = 'none';

        const promptEl = document.getElementById('fill-prompt');
        promptEl.innerHTML = `
            ${q.sentence_before}
            <div class="blank-slot">
                <span class="blank-pinyin">${q.pinyin}</span>
                <input type="text" id="blank-input" class="blank-char-input" maxlength="2" placeholder="？" autocomplete="off" />
            </div>
            ${q.sentence_after}
        `;

        const input = document.getElementById('blank-input');
        input.focus();
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                checkFillAnswer();
            }
        });
    }

    function checkFillAnswer() {
        const q = writingDB.fill_questions[currentFillIdx];
        if (!q) return;

        const input = document.getElementById('blank-input');
        const userVal = input ? input.value.trim() : '';
        const isCorrect = userVal === q.answer;

        const exp = document.getElementById('fill-explanation');
        const fb = document.getElementById('fill-feedback');
        const trap = document.getElementById('fill-trap-alert');
        const trans = document.getElementById('fill-translation');

        exp.style.display = 'flex';
        if (isCorrect) {
            fb.className = 'feedback-badge correct';
            fb.textContent = `✓ 正解！ [ ${q.answer} ]`;
        } else {
            fb.className = 'feedback-badge incorrect';
            fb.textContent = `✕ 正解は [ ${q.answer} ] です（入力: ${userVal || '未入力'}）`;
        }

        trap.innerHTML = q.trap_warning;
        trans.textContent = `日本語訳: ${q.meaning}`;

        speakText(q.sentence_before + q.answer + q.sentence_after);
    }

    function revealFillAnswer() {
        const q = writingDB.fill_questions[currentFillIdx];
        if (!q) return;
        const input = document.getElementById('blank-input');
        if (input) input.value = q.answer;
        checkFillAnswer();
    }

    // SECTION 3: 日中漢字トラップ図鑑
    function renderKanjiTraps() {
        const grid = document.getElementById('trap-grid');
        if (!grid || !writingDB || !writingDB.kanji_traps) return;
        grid.innerHTML = '';

        writingDB.kanji_traps.forEach(trap => {
            const card = document.createElement('div');
            card.className = 'trap-card';
            card.innerHTML = `
                <div class="trap-header">
                    <span style="font-weight:700; color:var(--accent); font-size:1.05rem;">【${trap.pinyin}】 ${trap.meaning}</span>
                    <span style="font-size:0.75rem; background:rgba(255,255,255,0.1); padding:0.2rem 0.5rem; border-radius:6px;">HSK ${trap.hsk}</span>
                </div>
                <div class="trap-compare-box">
                    <div class="char-cell zh">
                        <span class="char-big">${trap.zh}</span>
                        <span class="char-label">簡体字 (正解)</span>
                    </div>
                    <div style="font-size: 1.2rem; color: var(--text-muted);">vs</div>
                    <div class="char-cell ja">
                        <span class="char-big">${trap.ja}</span>
                        <span class="char-label">日本漢字 (減点)</span>
                    </div>
                </div>
                <div class="trap-tip-text">${trap.tip}</div>
                <button class="nav-link-btn" style="align-self:flex-start; margin-top:0.2rem;" onclick="speakTrap('${trap.zh}')">🔊 発音を聞く</button>
            `;
            grid.appendChild(card);
        });
    }

    window.speakTrap = (text) => speakText(text);

    // Button Click Listeners
    document.getElementById('btn-check-order').addEventListener('click', checkOrder);
    document.getElementById('btn-reset-order').addEventListener('click', resetOrder);
    document.getElementById('btn-play-order-audio').addEventListener('click', () => {
        const q = filteredOrderQuestions[currentOrderIdx];
        if (q) speakText(q.correct_order.join(''));
    });
    document.getElementById('btn-next-order').addEventListener('click', () => loadOrderQuestion(currentOrderIdx + 1));
    document.getElementById('btn-prev-order').addEventListener('click', () => loadOrderQuestion(currentOrderIdx - 1));

    document.getElementById('btn-check-fill').addEventListener('click', checkFillAnswer);
    document.getElementById('btn-reveal-fill').addEventListener('click', revealFillAnswer);
    document.getElementById('btn-play-fill-audio').addEventListener('click', () => {
        const q = writingDB.fill_questions[currentFillIdx];
        if (q) speakText(q.sentence_before + q.answer + q.sentence_after);
    });
    document.getElementById('btn-next-fill').addEventListener('click', () => loadFillQuestion(currentFillIdx + 1));
    document.getElementById('btn-prev-fill').addEventListener('click', () => loadFillQuestion(currentFillIdx - 1));

    // Keyboard Shortcuts
    function setupKeyboardShortcuts() {
        window.addEventListener('keydown', (e) => {
            // Ignore if input is actively focused
            if (e.target && e.target.tagName === 'INPUT') {
                return;
            }

            const lowerKey = e.key.toLowerCase();

            if (currentSection === 'ordering') {
                // Number keys 1-9 to move available chips into answer slot
                if (/^[1-9]$/.test(e.key)) {
                    const num = parseInt(e.key) - 1;
                    if (num < availableChips.length) {
                        e.preventDefault();
                        placeChipInAnswer(availableChips[num]);
                    }
                } else if (e.key === 'Backspace') {
                    e.preventDefault();
                    if (placedChips.length > 0) {
                        returnChipToPool(placedChips[placedChips.length - 1]);
                    }
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    checkOrder();
                } else if (e.key === 'Escape') {
                    e.preventDefault();
                    resetOrder();
                } else if (lowerKey === 'j') {
                    e.preventDefault();
                    loadOrderQuestion(currentOrderIdx + 1);
                } else if (lowerKey === 'k') {
                    e.preventDefault();
                    loadOrderQuestion(currentOrderIdx - 1);
                } else if (e.code === 'Space') {
                    e.preventDefault();
                    const q = filteredOrderQuestions[currentOrderIdx];
                    if (q) speakText(q.correct_order.join(''));
                }
            } else if (currentSection === 'fill') {
                if (lowerKey === 'j') {
                    e.preventDefault();
                    loadFillQuestion(currentFillIdx + 1);
                } else if (lowerKey === 'k') {
                    e.preventDefault();
                    loadFillQuestion(currentFillIdx - 1);
                } else if (e.code === 'Space') {
                    e.preventDefault();
                    const q = writingDB.fill_questions[currentFillIdx];
                    if (q) speakText(q.sentence_before + q.answer + q.sentence_after);
                }
            }
        });
    }

    loadData();
});
