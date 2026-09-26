/**
 * HSK 3級 文法マスター (grammar.js)
 * Interactive Formula Textbook with Teacher Mentoring, Audio TTS, and Active Recall
 */

document.addEventListener('DOMContentLoaded', () => {
    let grammarData = null;
    let allItems = [];
    let currentItemIndex = 0;
    let masteredItems = new Set();
    let isMaskActive = false;
    let isPinyinVisible = true;
    let isJaVisible = true;
    let activeFilterCat = 'all';

    // Local Storage for Mastered Grammar Items
    const STORAGE_KEY = 'hsk3_grammar_mastered_ids';
    function loadMasteredState() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                masteredItems = new Set(JSON.parse(raw));
            }
        } catch (e) {
            masteredItems = new Set();
        }
    }

    function saveMasteredState() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify([...masteredItems]));
        } catch (e) {
            console.error('Failed to save mastered state:', e);
        }
    }

    // TTS Audio Engine
    let chineseVoice = null;
    function initTTS() {
        if (!('speechSynthesis' in window)) return;
        const findVoice = () => {
            const voices = window.speechSynthesis.getVoices();
            chineseVoice = voices.find(v => v.lang === 'zh-CN') ||
                           voices.find(v => v.lang.startsWith('zh')) || null;
        };
        findVoice();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = findVoice;
        }
    }

    function speakText(text) {
        if (!('speechSynthesis' in window) || !text) return;
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        if (chineseVoice) utter.voice = chineseVoice;
        utter.lang = 'zh-CN';
        utter.rate = 0.95;
        window.speechSynthesis.speak(utter);
    }

    // Load Grammar JSON Data
    async function loadData() {
        try {
            const res = await fetch(`./data/hsk3_grammar.json?v=${Date.now()}`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            grammarData = await res.json();

            // Flatten all items
            allItems = [];
            grammarData.categories.forEach(cat => {
                cat.items.forEach(item => {
                    allItems.push({
                        ...item,
                        categoryId: cat.id,
                        categoryNumber: cat.number,
                        categoryTitle: cat.title,
                        categoryIcon: cat.icon
                    });
                });
            });

            loadMasteredState();
            initTTS();
            initUI();
        } catch (err) {
            console.error('Failed to load grammar data:', err);
            const content = document.getElementById('main-content-area');
            if (content) {
                content.innerHTML = `<div style="color:var(--danger); padding:2rem;">データの読み込みに失敗しました (${err.message})</div>`;
            }
        }
    }

    function initUI() {
        renderSidebar();
        renderChapterSheet();
        renderMasteryProgress();
        renderCurrentGrammar();
        setupEventListeners();
        setupKeyboardShortcuts();
        setupTouchGestures();
    }

    // Mastery Progress Bar & Teacher Feedback
    function renderMasteryProgress() {
        const total = allItems.length;
        const count = masteredItems.size;
        const pct = total > 0 ? Math.round((count / total) * 100) : 0;

        const fillEl = document.getElementById('progress-fill');
        const labelEl = document.getElementById('progress-label');
        const teacherMsgEl = document.getElementById('teacher-status-msg');

        if (fillEl) fillEl.style.width = `${pct}%`;
        if (labelEl) labelEl.textContent = `制覇率: ${count} / ${total} 構文 (${pct}%)`;

        if (teacherMsgEl) {
            if (count === 0) {
                teacherMsgEl.textContent = '「まずは第1章の把構文から始めてみましょう！」';
            } else if (count < 8) {
                teacherMsgEl.textContent = `「いいペースです！すでに ${count} 構文をマスターしましたね！」`;
            } else if (count < 16) {
                teacherMsgEl.textContent = `「素晴らしい！3級文法の半分近くまで到達しましたよ！」`;
            } else if (count < total) {
                teacherMsgEl.textContent = `「あと少し！残り ${total - count} 構文で全制覇です！」`;
            } else {
                teacherMsgEl.textContent = '「🎉 太棒了！HSK 3級の全構文を完全制覇しました！」';
            }
        }
    }

    // Left Sidebar Navigation
    function renderSidebar() {
        const listEl = document.getElementById('category-nav-list');
        if (!listEl || !grammarData) return;

        listEl.innerHTML = '';
        grammarData.categories.forEach(cat => {
            const item = document.createElement('div');
            item.className = `cat-nav-item ${cat.id === allItems[currentItemIndex]?.categoryId ? 'active' : ''}`;
            item.dataset.catId = cat.id;

            // Count mastered in this cat
            const catItems = allItems.filter(i => i.categoryId === cat.id);
            const catMastered = catItems.filter(i => masteredItems.has(i.id)).length;
            const isAllDone = catMastered === catItems.length && catItems.length > 0;

            item.innerHTML = `
                <div class="cat-nav-left">
                    <span class="cat-nav-num">${cat.number}</span>
                    <span class="cat-nav-title">${cat.icon} ${cat.title}</span>
                </div>
                <span class="cat-nav-count">${isAllDone ? '✓' : `${catMastered}/${catItems.length}`}</span>
            `;

            item.addEventListener('click', () => {
                // Find first item in this category
                const targetIdx = allItems.findIndex(i => i.categoryId === cat.id);
                if (targetIdx !== -1) {
                    goToItem(targetIdx);
                }
            });

            listEl.appendChild(item);
        });

        // Also update mobile chapter bottom sheet
        renderChapterSheet();
    }

    // Mobile Chapter Bottom Sheet (Drawer for iPhone 15 Plus)
    function renderChapterSheet() {
        const sheetListEl = document.getElementById('sheet-category-list');
        if (!sheetListEl || !grammarData) return;

        sheetListEl.innerHTML = '';
        grammarData.categories.forEach(cat => {
            const item = document.createElement('div');
            item.className = `sheet-cat-item ${cat.id === allItems[currentItemIndex]?.categoryId ? 'active' : ''}`;

            const catItems = allItems.filter(i => i.categoryId === cat.id);
            const catMastered = catItems.filter(i => masteredItems.has(i.id)).length;
            const isAllDone = catMastered === catItems.length && catItems.length > 0;

            item.innerHTML = `
                <div class="sheet-cat-left">
                    <span class="sheet-cat-num">${cat.number}</span>
                    <span class="sheet-cat-title">${cat.icon} ${cat.title}</span>
                </div>
                <span class="sheet-cat-count">${isAllDone ? '✓' : `${catMastered}/${catItems.length}`}</span>
            `;

            item.addEventListener('click', () => {
                const targetIdx = allItems.findIndex(i => i.categoryId === cat.id);
                if (targetIdx !== -1) {
                    goToItem(targetIdx);
                    closeChapterSheet();
                }
            });

            sheetListEl.appendChild(item);
        });
    }

    function openChapterSheet() {
        renderChapterSheet();
        const sheet = document.getElementById('chapter-sheet-overlay');
        if (sheet) {
            sheet.style.display = 'block';
            requestAnimationFrame(() => sheet.classList.remove('hidden'));
        }
    }

    function closeChapterSheet() {
        const sheet = document.getElementById('chapter-sheet-overlay');
        if (sheet) {
            sheet.classList.add('hidden');
            setTimeout(() => {
                if (sheet.classList.contains('hidden')) {
                    sheet.style.display = 'none';
                }
            }, 280);
        }
    }

    // Render Current Grammar Card
    function renderCurrentGrammar() {
        const cardContainer = document.getElementById('main-content-area');
        if (!cardContainer || allItems.length === 0) return;

        const item = allItems[currentItemIndex];
        const isMastered = masteredItems.has(item.id);

        // Build Formula Chips HTML
        let formulaChipsHtml = '';
        if (item.formula_chips && grammarData.syntax_chip_types) {
            formulaChipsHtml = item.formula_chips.map((chip, idx) => {
                const typeInfo = grammarData.syntax_chip_types[chip.type] || {
                    color: '#ffd32a',
                    bg: 'rgba(255, 211, 42, 0.2)'
                };
                const plus = idx < item.formula_chips.length - 1 ? '<span class="formula-plus">+</span>' : '';
                return `
                    <span class="formula-chip" style="color: ${typeInfo.color}; background: ${typeInfo.bg}; border-color: ${typeInfo.color}44;">
                        ${chip.text}
                    </span>
                    ${plus}
                `;
            }).join('');
        }

        // Build Examples HTML
        let examplesHtml = item.examples.map((ex, exIdx) => {
            let zhDisplay = ex.zh;
            if (isMaskActive && ex.mask_target) {
                const regex = new RegExp(ex.mask_target, 'g');
                zhDisplay = zhDisplay.replace(regex, `<span class="mask-slot" data-reveal="${ex.mask_target}">[ ??? ]</span>`);
            }

            return `
                <div class="example-card" data-example-index="${exIdx}">
                    <button class="example-speaker-btn" data-zh="${ex.zh}" title="発音を聞く (数字キー ${exIdx + 1})">
                        🔊
                    </button>
                    <div class="example-text-content">
                        <div class="example-zh-row" lang="zh-CN">${zhDisplay}</div>
                        <div class="example-pinyin-row ${isPinyinVisible ? '' : 'hidden'}">${ex.pinyin}</div>
                        <div class="example-ja-row ${isJaVisible ? '' : 'hidden'}">${ex.ja}</div>
                    </div>
                </div>
            `;
        }).join('');

        cardContainer.innerHTML = `
            <div class="grammar-card">
                <!-- Header -->
                <div class="grammar-card-header">
                    <div class="grammar-title-group">
                        <div class="category-breadcrumb">
                            <span>${item.categoryIcon} 第 ${item.categoryNumber} 章：${item.categoryTitle}</span>
                        </div>
                        <h2 class="grammar-title">
                            ${item.title}
                            <span class="level-badge">${item.level}</span>
                        </h2>
                    </div>
                    <button id="btn-toggle-mastered" class="mastered-btn ${isMastered ? 'mastered' : ''}">
                        ${isMastered ? '✓ 習得済み！' : '○ 覚えたらチェック (M)'}
                    </button>
                </div>

                <!-- Meaning & Purpose (構文の意味・使いどころ) -->
                ${item.meaning ? `
                    <div class="meaning-section">
                        <div class="meaning-hero">
                            <span class="meaning-badge">🎯 この構文で言えること</span>
                            <div class="meaning-headline">${item.meaning}</div>
                        </div>
                        ${item.purpose ? `
                            <div class="purpose-container">
                                <div class="purpose-label">💡 どういう文章を作ろうとするときに使う構文？</div>
                                <div class="purpose-text">${item.purpose}</div>
                            </div>
                        ` : ''}
                    </div>
                ` : ''}

                <!-- Formula Block -->
                <div class="formula-section">
                    <div class="formula-label">📐 語順公式（言葉の並べ方）</div>
                    <div class="formula-chips-container">
                        ${formulaChipsHtml}
                    </div>
                    <div class="formula-text-raw">${item.formula}</div>
                    ${item.formula_meaning ? `
                        <div class="formula-meaning-box">
                            <span class="formula-meaning-badge">語順の日本語訳</span>
                            <span class="formula-meaning-text">${item.formula_meaning}</span>
                        </div>
                    ` : ''}
                </div>

                <!-- Teacher Advice Bubble -->
                <div class="teacher-advice-box">
                    <div class="teacher-avatar-big">
                        <img src="./img/teacher_wang.jpg" alt="王老师" />
                    </div>
                    <div class="teacher-bubble-content">
                        <div class="teacher-bubble-title">王老师（ワン先生）のツボ押しアドバイス</div>
                        <div class="teacher-bubble-body">${item.teacher_tip}</div>
                    </div>
                </div>

                <!-- Trap Warning Box (NG vs OK) -->
                ${item.trap_warning ? `
                    <div class="trap-warning-box">
                        <div class="trap-warning-title">⚠️ 日本人あるある減点トラップ（減点防止！）</div>
                        <div class="trap-compare-grid">
                            <div class="trap-cell bad" lang="zh-CN">${item.trap_warning.bad}</div>
                            <div class="trap-cell good" lang="zh-CN">${item.trap_warning.good}</div>
                        </div>
                        <div class="trap-exp-text">💡 <strong>解説:</strong> ${item.trap_warning.explanation}</div>
                    </div>
                ` : ''}

                <!-- Examples Section -->
                <div class="examples-section">
                    <div class="examples-header">
                        <div class="examples-title">🔊 実戦例文（全音声付き）</div>
                        <span style="font-size:0.78rem; color:var(--text-muted);">
                            キーボード [1]〜[${item.examples.length}] または [Space] で発音
                        </span>
                    </div>
                    ${examplesHtml}
                </div>

                <!-- Footer Navigation & Puzzle Jump -->
                <div class="grammar-footer">
                    <div class="footer-nav-group">
                        <button id="btn-prev-grammar" class="btn-secondary" title="前の文法 (P)">
                            ⬅ 前の文法 (P)
                        </button>
                        <button id="btn-next-grammar" class="btn-secondary" title="次の文法 (N)">
                            次の文法 (N) ➡
                        </button>
                    </div>

                    ${item.puzzle_category ? `
                        <a href="writing.html" class="btn-puzzle-jump" title="語順整序パズルでこの文法を実践">
                            🧩 この構文のパズルを解く (W) ↗
                        </a>
                    ` : ''}
                </div>
            </div>
        `;

        // Attach Example Speaker Listeners
        cardContainer.querySelectorAll('.example-speaker-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                speakText(btn.dataset.zh);
            });
        });

        // Attach Reveal Mask Listener
        cardContainer.querySelectorAll('.mask-slot').forEach(slot => {
            slot.addEventListener('click', (e) => {
                e.stopPropagation();
                slot.textContent = slot.dataset.reveal;
                slot.style.border = 'none';
                slot.style.background = 'transparent';
                slot.style.color = '#ffd32a';
            });
        });

        // Attach Example Card Tap Listeners (Tap anywhere on card to play audio on mobile)
        cardContainer.querySelectorAll('.example-card').forEach(card => {
            card.addEventListener('click', (e) => {
                // Ignore if clicked on mask slot
                if (e.target.closest('.mask-slot')) return;
                const exIdx = parseInt(card.dataset.exampleIndex, 10);
                if (!isNaN(exIdx) && item.examples[exIdx]) {
                    speakText(item.examples[exIdx].zh);
                }
            });
        });

        // Attach Mastered Button Listener
        const masterBtn = document.getElementById('btn-toggle-mastered');
        if (masterBtn) {
            masterBtn.addEventListener('click', toggleMastered);
        }

        // Sync Mobile Bottom Dock Mastered State
        const dockMasteredBtn = document.getElementById('dock-btn-mastered');
        if (dockMasteredBtn) {
            dockMasteredBtn.classList.toggle('mastered', isMastered);
            const iconEl = dockMasteredBtn.querySelector('.dock-icon');
            const labelEl = dockMasteredBtn.querySelector('.dock-label');
            if (iconEl) iconEl.textContent = isMastered ? '✓' : '○';
            if (labelEl) labelEl.textContent = isMastered ? '習得済' : '覚えた';
        }

        // Attach Prev/Next Listeners
        const prevBtn = document.getElementById('btn-prev-grammar');
        if (prevBtn) prevBtn.addEventListener('click', () => goToItem(currentItemIndex - 1));

        const nextBtn = document.getElementById('btn-next-grammar');
        if (nextBtn) nextBtn.addEventListener('click', () => goToItem(currentItemIndex + 1));

        // Update Sidebar Active Class
        renderSidebar();
    }

    function goToItem(index) {
        if (allItems.length === 0) return;
        currentItemIndex = (index + allItems.length) % allItems.length;
        renderCurrentGrammar();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function toggleMastered() {
        const item = allItems[currentItemIndex];
        if (!item) return;

        if (masteredItems.has(item.id)) {
            masteredItems.delete(item.id);
        } else {
            masteredItems.add(item.id);
        }

        saveMasteredState();
        renderMasteryProgress();
        renderCurrentGrammar();
    }

    // Block-level Navigation within the current card (N / P / ArrowDown / ArrowUp)
    function getScrollBlocks() {
        const selectors = [
            '.grammar-card-header',
            '.meaning-section',
            '.formula-section',
            '.teacher-advice-box',
            '.trap-warning-box',
            '.example-card',
            '.action-footer'
        ];
        const card = document.querySelector('.grammar-card');
        if (!card) return [];
        return Array.from(card.querySelectorAll(selectors.join(', ')));
    }

    function highlightBlock(el) {
        if (!el) return;
        el.classList.add('block-focused');
        setTimeout(() => el.classList.remove('block-focused'), 750);
    }

    function scrollToNextBlock() {
        const blocks = getScrollBlocks();
        if (blocks.length === 0) {
            window.scrollBy({ top: 220, behavior: 'smooth' });
            return;
        }

        // Find the first block that starts below viewport top threshold
        const threshold = 50;
        const nextBlock = blocks.find(b => {
            const rect = b.getBoundingClientRect();
            return rect.top > threshold;
        });

        if (nextBlock) {
            const targetY = window.scrollY + nextBlock.getBoundingClientRect().top - 20;
            window.scrollTo({ top: targetY, behavior: 'smooth' });
            highlightBlock(nextBlock);
        } else {
            // Reached near bottom, scroll down slightly
            window.scrollBy({ top: 220, behavior: 'smooth' });
        }
    }

    function scrollToPrevBlock() {
        const blocks = getScrollBlocks();
        if (blocks.length === 0) {
            window.scrollBy({ top: -220, behavior: 'smooth' });
            return;
        }

        // Find the last block whose top is above the current viewport
        const threshold = -30;
        const prevBlocks = blocks.filter(b => {
            const rect = b.getBoundingClientRect();
            return rect.top < threshold;
        });

        if (prevBlocks.length > 0) {
            const prevBlock = prevBlocks[prevBlocks.length - 1];
            const targetY = window.scrollY + prevBlock.getBoundingClientRect().top - 20;
            window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
            highlightBlock(prevBlock);
        } else {
            // Already at or near top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // Event Listeners for Top Toolbar & Controls
    function setupEventListeners() {
        // Mobile Bottom Action Dock Listeners (iPhone 15 Plus Ergonomics)
        const dockNext = document.getElementById('dock-btn-next');
        if (dockNext) dockNext.addEventListener('click', () => goToItem(currentItemIndex + 1));

        const dockPrev = document.getElementById('dock-btn-prev');
        if (dockPrev) dockPrev.addEventListener('click', () => goToItem(currentItemIndex - 1));

        const dockAudio = document.getElementById('dock-btn-audio');
        if (dockAudio) {
            dockAudio.addEventListener('click', () => {
                const item = allItems[currentItemIndex];
                if (item && item.examples.length > 0) {
                    speakText(item.examples[0].zh);
                }
            });
        }

        const dockMastered = document.getElementById('dock-btn-mastered');
        if (dockMastered) dockMastered.addEventListener('click', toggleMastered);

        const dockChapters = document.getElementById('dock-btn-chapters');
        if (dockChapters) dockChapters.addEventListener('click', openChapterSheet);

        const sheetClose = document.getElementById('sheet-close-btn');
        if (sheetClose) sheetClose.addEventListener('click', closeChapterSheet);

        const sheetBackdrop = document.getElementById('chapter-sheet-backdrop');
        if (sheetBackdrop) sheetBackdrop.addEventListener('click', closeChapterSheet);

        // Floating Block Scroll Buttons (P / N)
        const btnScrollPrev = document.getElementById('btn-scroll-prev-block');
        if (btnScrollPrev) {
            btnScrollPrev.addEventListener('click', scrollToPrevBlock);
        }
        const btnScrollNext = document.getElementById('btn-scroll-next-block');
        if (btnScrollNext) {
            btnScrollNext.addEventListener('click', scrollToNextBlock);
        }

        // Mask Button (Q)
        const btnMask = document.getElementById('btn-toggle-mask');
        if (btnMask) {
            btnMask.addEventListener('click', () => {
                isMaskActive = !isMaskActive;
                btnMask.classList.toggle('active', isMaskActive);
                renderCurrentGrammar();
            });
        }

        // Pinyin Button (T)
        const btnPinyin = document.getElementById('btn-toggle-pinyin');
        if (btnPinyin) {
            btnPinyin.addEventListener('click', () => {
                isPinyinVisible = !isPinyinVisible;
                btnPinyin.classList.toggle('active', isPinyinVisible);
                renderCurrentGrammar();
            });
        }

        // Translation Button (H)
        const btnJa = document.getElementById('btn-toggle-ja');
        if (btnJa) {
            btnJa.addEventListener('click', () => {
                isJaVisible = !isJaVisible;
                btnJa.classList.toggle('active', isJaVisible);
                renderCurrentGrammar();
            });
        }

        // Random Shuffle Button (S)
        const btnShuffle = document.getElementById('btn-shuffle-item');
        if (btnShuffle) {
            btnShuffle.addEventListener('click', () => {
                const randomIdx = Math.floor(Math.random() * allItems.length);
                goToItem(randomIdx);
            });
        }

        // Help Modal Toggle
        const btnHelp = document.getElementById('btn-key-help');
        const modal = document.getElementById('keyboard-modal');
        const closeBtn = document.getElementById('close-modal-btn');

        if (btnHelp && modal) {
            btnHelp.addEventListener('click', () => modal.classList.remove('hidden'));
        }
        if (closeBtn && modal) {
            closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
        }
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.classList.add('hidden');
            });
        }

        // Search Input
        const searchInput = document.getElementById('grammar-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.trim().toLowerCase();
                if (!query) {
                    renderSidebar();
                    return;
                }

                // Filter sidebar items
                const navItems = document.querySelectorAll('.cat-nav-item');
                navItems.forEach(nav => {
                    const text = nav.textContent.toLowerCase();
                    if (text.includes(query)) {
                        nav.style.display = 'flex';
                    } else {
                        nav.style.display = 'none';
                    }
                });
            });

            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const query = searchInput.value.trim().toLowerCase();
                    const foundIdx = allItems.findIndex(i =>
                        i.title.toLowerCase().includes(query) ||
                        i.formula.toLowerCase().includes(query) ||
                        i.categoryTitle.toLowerCase().includes(query)
                    );
                    if (foundIdx !== -1) {
                        goToItem(foundIdx);
                        searchInput.blur();
                    }
                }
            });
        }
    }

    // Keyboard Shortcuts
    function setupKeyboardShortcuts() {
        window.addEventListener('keydown', (e) => {
            // Ignore if input is actively focused
            if (e.target && e.target.tagName === 'INPUT') {
                if (e.key === 'Escape') {
                    e.target.blur();
                }
                return;
            }

            const lowerKey = e.key.toLowerCase();
            const currentItem = allItems[currentItemIndex];

            if (lowerKey === 'n' || e.key === 'ArrowRight') {
                e.preventDefault();
                goToItem(currentItemIndex + 1);
            } else if (lowerKey === 'p' || e.key === 'ArrowLeft') {
                e.preventDefault();
                goToItem(currentItemIndex - 1);
            } else if (lowerKey === 'j' || e.key === 'ArrowDown') {
                e.preventDefault();
                scrollToNextBlock();
            } else if (lowerKey === 'k' || e.key === 'ArrowUp') {
                e.preventDefault();
                scrollToPrevBlock();
            } else if (lowerKey === 'w') {
                e.preventDefault();
                window.location.href = 'writing.html';
            } else if (e.code === 'Space' || lowerKey === 'r') {
                e.preventDefault();
                if (currentItem && currentItem.examples.length > 0) {
                    speakText(currentItem.examples[0].zh);
                }
            } else if (/^[1-9]$/.test(e.key)) {
                const num = parseInt(e.key) - 1;
                if (currentItem && num < currentItem.examples.length) {
                    e.preventDefault();
                    speakText(currentItem.examples[num].zh);
                }
            } else if (lowerKey === 'q') {
                e.preventDefault();
                isMaskActive = !isMaskActive;
                const btnMask = document.getElementById('btn-toggle-mask');
                if (btnMask) btnMask.classList.toggle('active', isMaskActive);
                renderCurrentGrammar();
            } else if (lowerKey === 't') {
                e.preventDefault();
                isPinyinVisible = !isPinyinVisible;
                const btnPinyin = document.getElementById('btn-toggle-pinyin');
                if (btnPinyin) btnPinyin.classList.toggle('active', isPinyinVisible);
                renderCurrentGrammar();
            } else if (lowerKey === 'h') {
                e.preventDefault();
                isJaVisible = !isJaVisible;
                const btnJa = document.getElementById('btn-toggle-ja');
                if (btnJa) btnJa.classList.toggle('active', isJaVisible);
                renderCurrentGrammar();
            } else if (lowerKey === 'm') {
                e.preventDefault();
                toggleMastered();
            } else if (lowerKey === 's') {
                e.preventDefault();
                const randomIdx = Math.floor(Math.random() * allItems.length);
                goToItem(randomIdx);
            } else if (e.key === '/') {
                e.preventDefault();
                const search = document.getElementById('grammar-search-input');
                if (search) search.focus();
            } else if (e.key === '?') {
                e.preventDefault();
                const modal = document.getElementById('keyboard-modal');
                if (modal) modal.classList.toggle('hidden');
            } else if (e.key === 'Escape') {
                const modal = document.getElementById('keyboard-modal');
                if (modal && !modal.classList.contains('hidden')) {
                    modal.classList.add('hidden');
                }
            }
        });
    }

    // Touch Gestures: Horizontal Swipe for iPhone 15 Plus & Mobile
    function setupTouchGestures() {
        let touchStartX = 0;
        let touchStartY = 0;
        let touchStartTime = 0;

        window.addEventListener('touchstart', (e) => {
            if (e.touches.length !== 1) return;
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            touchStartTime = Date.now();
        }, { passive: true });

        window.addEventListener('touchend', (e) => {
            if (e.changedTouches.length !== 1) return;
            // Ignore if bottom sheet or modal is open
            const sheet = document.getElementById('chapter-sheet-overlay');
            if (sheet && !sheet.classList.contains('hidden')) return;
            const modal = document.getElementById('keyboard-modal');
            if (modal && !modal.classList.contains('hidden')) return;

            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const dx = touchEndX - touchStartX;
            const dy = touchEndY - touchStartY;
            const dt = Date.now() - touchStartTime;

            // Horizontal flick: within 500ms, dx > 45px, and primarily horizontal (|dx| > |dy| * 1.5)
            if (dt < 500 && Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) {
                if (dx < 0) {
                    // Swipe Left (Flick left with thumb) -> Next Item (N)
                    goToItem(currentItemIndex + 1);
                } else {
                    // Swipe Right (Flick right with thumb) -> Prev Item (P)
                    goToItem(currentItemIndex - 1);
                }
            }
        }, { passive: true });
    }

    loadData();
});
