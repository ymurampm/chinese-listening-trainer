/**
 * Main Application Logic for Chinese Dialogue Listening Trainer
 */

document.addEventListener('DOMContentLoaded', () => {
    let currentData = null;
    let currentDialogue = null;
    let tts = new DialogueTTSEngine();
    let currentMode = 'listening'; // 'listening' | 'roleplay' | 'quiz'
    let selectedLineIndex = 0;

    // Vocab Note Tracking
    let currentNoteIndex = 0;
    let currentNoteWord = null;

    // DOM Elements
    const dialogueSelect = document.getElementById('dialogue-select');
    const chatContainer = document.getElementById('chat-container');
    const playFullBtn = document.getElementById('btn-play-full');
    const stopBtn = document.getElementById('btn-stop');
    const speedSelect = document.getElementById('speed-select');
    const pinyinToggle = document.getElementById('pinyin-toggle');
    const jaToggle = document.getElementById('ja-toggle');
    const segmentToggle = document.getElementById('segment-toggle');
    const loopToggle = document.getElementById('loop-toggle');
    
    // Mode Buttons
    const modeListeningBtn = document.getElementById('mode-listening');
    const modeRoleplayBtn = document.getElementById('mode-roleplay');
    const modeQuizBtn = document.getElementById('mode-quiz');
    
    // Sub-bars & Panels
    const roleplayBar = document.getElementById('roleplay-bar');
    const roleSelect = document.getElementById('role-select');
    const quizPanel = document.getElementById('quiz-panel');
    const notesDrawer = document.getElementById('notes-drawer');
    const notesContent = document.getElementById('notes-content');
    const closeNotesBtn = document.getElementById('close-notes');

    // Fetch and Load Data
    async function loadData() {
        try {
            const response = await fetch('./data/homework_20260727.json');
            if (!response.ok) throw new Error('Data file not found');
            currentData = await response.json();
            initApp();
        } catch (err) {
            console.error('Failed to load JSON data:', err);
            chatContainer.innerHTML = `<div class="error-msg">データの読み込みに失敗しました (${err.message})</div>`;
        }
    }

    function initApp() {
        if (!currentData || !currentData.dialogues.length) return;

        // Populate Dialogue Select
        dialogueSelect.innerHTML = currentData.dialogues.map((d, idx) => 
            `<option value="${d.id}">${d.title} [${d.level}]</option>`
        ).join('');

        dialogueSelect.addEventListener('change', (e) => {
            selectDialogue(e.target.value);
        });

        // Set default dialogue
        selectDialogue(currentData.dialogues[0].id);
        setupEvents();
        setupKeyboardShortcuts();
    }

    function selectDialogue(id) {
        tts.stop();
        currentDialogue = currentData.dialogues.find(d => d.id === id) || currentData.dialogues[0];
        selectedLineIndex = 0;
        currentNoteIndex = 0;
        currentNoteWord = null;

        // Update Title / Info Header
        document.getElementById('dialogue-header-title').textContent = currentDialogue.title;
        document.getElementById('dialogue-header-topic').textContent = `💡 ${currentDialogue.topic} • ${currentDialogue.level}`;

        // Populate Role Selection Options for Role-Play Mode
        if (currentDialogue.characters) {
            roleSelect.innerHTML = `<option value="">-- あなたが担当する役を選択 --</option>` +
                currentDialogue.characters.map(c => `<option value="${c.id}">${c.avatar} ${c.name}</option>`).join('');
        }

        renderDialogue();
    }

    function renderDialogue() {
        if (!currentDialogue) return;
        chatContainer.innerHTML = '';

        currentDialogue.lines.forEach((line, idx) => {
            const isNarrator = line.speaker === 'narrator';
            const charObj = currentDialogue.characters?.find(c => c.id === line.speaker) || {
                name: isNarrator ? 'ナレーション' : line.speaker,
                avatar: isNarrator ? '📖' : '👤'
            };

            const bubble = document.createElement('div');
            bubble.className = `chat-bubble ${isNarrator ? 'narrator-bubble' : ''} ${line.speaker === 'jieming' ? 'align-right' : 'align-left'}`;
            bubble.dataset.lineIndex = idx;
            bubble.dataset.speaker = line.speaker;

            if (idx === selectedLineIndex) {
                bubble.classList.add('focused-line');
            }

            // Generate Pinyin Ruby HTML
            const rubyContent = PinyinUtils.buildRubyHTML(line.zh, line.pinyin);

            // Highlight vocabulary notes in text
            let formattedContent = rubyContent;
            if (line.notes && line.notes.length > 0) {
                line.notes.forEach(note => {
                    const safeWord = note.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    const regex = new RegExp(safeWord, 'g');
                    formattedContent = formattedContent.replace(regex, `<span class="vocab-highlight" data-word="${note.word}" data-py="${note.pinyin}" data-meaning="${note.meaning}">${note.word}</span>`);
                });
            }

            bubble.innerHTML = `
                <div class="avatar">${charObj.avatar}</div>
                <div class="bubble-content">
                    <div class="speaker-name">${charObj.name}</div>
                    <div class="text-zh">${formattedContent}</div>
                    <div class="text-ja">${line.ja || ''}</div>
                    ${line.notes && line.notes.length > 0 ? `
                        <div class="vocab-chips">
                            ${line.notes.map(n => `<button class="chip-btn" data-word="${n.word}" data-py="${n.pinyin}" data-meaning="${n.meaning}">💡 ${n.word}</button>`).join('')}
                        </div>
                    ` : ''}
                    <div class="bubble-actions">
                        <button class="btn-line-play" data-index="${idx}">▶️ 発音を聞く</button>
                    </div>
                </div>
            `;

            bubble.addEventListener('click', () => {
                selectLine(idx, false);
            });

            chatContainer.appendChild(bubble);
        });

        // Add Click handlers for Vocab Highlights & Chips
        document.querySelectorAll('.vocab-highlight, .chip-btn').forEach(elem => {
            elem.addEventListener('click', (e) => {
                e.stopPropagation();
                const word = e.currentTarget.dataset.word;
                const py = e.currentTarget.dataset.py;
                const meaning = e.currentTarget.dataset.meaning;
                showNoteDrawer(word, py, meaning);
            });
        });

        // Add Line Play handlers
        document.querySelectorAll('.btn-line-play').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const idx = parseInt(e.currentTarget.dataset.index);
                selectLine(idx, true);
            });
        });
    }

    function selectLine(idx, autoPlay = true) {
        if (!currentDialogue || idx < 0 || idx >= currentDialogue.lines.length) return;
        selectedLineIndex = idx;
        currentNoteIndex = 0; // Reset note cycle index for new line

        document.querySelectorAll('.chat-bubble').forEach((b, i) => {
            if (i === idx) {
                b.classList.add('focused-line');
                b.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                b.classList.remove('focused-line');
            }
        });

        if (autoPlay) {
            highlightActiveLine(idx);
            tts.playLine(currentDialogue, idx);
        }
    }

    function highlightActiveLine(idx) {
        selectedLineIndex = idx;
        document.querySelectorAll('.chat-bubble').forEach((b, i) => {
            if (i === idx) {
                b.classList.add('playing');
                b.classList.add('focused-line');
                b.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                b.classList.remove('playing');
                b.classList.remove('focused-line');
            }
        });
    }

    function showNoteDrawer(word, py, meaning, currentIdx = 1, totalCount = 1) {
        currentNoteWord = word;
        notesContent.innerHTML = `
            <div class="note-card">
                ${totalCount > 1 ? `<div class="note-badge">単語解説 (${currentIdx}/${totalCount}) [Nキーで次へ]</div>` : ''}
                <h3 class="note-word">${word}</h3>
                <div class="note-pinyin">【${py}】</div>
                <p class="note-meaning">${meaning}</p>
                <div class="note-audio-btn">
                    <button id="btn-play-vocab">🔊 発音を聞く (M)</button>
                </div>
            </div>
        `;
        notesDrawer.classList.add('open');

        document.getElementById('btn-play-vocab').addEventListener('click', () => {
            playCurrentVocabAudio();
        });
    }

    function playCurrentVocabAudio() {
        if (currentNoteWord) {
            tts.speakText(currentNoteWord, 1.0, 0.85);
        }
    }

    function setupEvents() {
        // Controls
        playFullBtn.addEventListener('click', () => {
            highlightActiveLine(0);
            tts.playFullDialogue(currentDialogue, 0);
        });

        stopBtn.addEventListener('click', () => {
            tts.stop();
            document.querySelectorAll('.chat-bubble').forEach(b => b.classList.remove('playing'));
        });

        const voiceSelect = document.getElementById('voice-select');
        tts.onVoicesUpdated = (voices) => {
            if (voiceSelect && voices.length > 0) {
                voiceSelect.innerHTML = voices.map(v => 
                    `<option value="${v.name}" ${v.name === tts.selectedVoice?.name ? 'selected' : ''}>${v.name}</option>`
                ).join('');
            }
        };
        if (voiceSelect) {
            voiceSelect.addEventListener('change', (e) => {
                tts.setVoiceByName(e.target.value);
            });
        }

        speedSelect.addEventListener('change', (e) => {
            tts.setRate(e.target.value);
        });

        pinyinToggle.addEventListener('change', (e) => {
            PinyinUtils.setMode(e.target.value);
        });

        jaToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                chatContainer.classList.remove('hide-ja');
            } else {
                chatContainer.classList.add('hide-ja');
            }
        });

        segmentToggle.addEventListener('change', (e) => {
            tts.setSegmentMode(e.target.checked);
        });

        loopToggle.addEventListener('change', (e) => {
            tts.setLoopSingleLine(e.target.checked);
        });

        closeNotesBtn.addEventListener('click', () => {
            notesDrawer.classList.remove('open');
            currentNoteWord = null;
        });

        // Mode Switching
        modeListeningBtn.addEventListener('click', () => setMode('listening'));
        modeRoleplayBtn.addEventListener('click', () => setMode('roleplay'));
        modeQuizBtn.addEventListener('click', () => setMode('quiz'));

        roleSelect.addEventListener('change', (e) => {
            tts.setUserRole(e.target.value);
            updateRoleplayVisibility(e.target.value);
        });

        // Shortcut Help Modal Toggle
        const openHelpBtn = document.getElementById('btn-open-help');
        const helpModal = document.getElementById('help-modal');
        const closeHelpBtn = document.getElementById('close-help');

        if (openHelpBtn && helpModal) {
            openHelpBtn.addEventListener('click', () => helpModal.classList.remove('hidden'));
            closeHelpBtn.addEventListener('click', () => helpModal.classList.add('hidden'));
        }

        // TTS Callbacks
        tts.onLineStart = (idx, line) => {
            highlightActiveLine(idx);
        };

        tts.onRoleTurn = (idx, line, onDone) => {
            highlightActiveLine(idx);
            const bubble = document.querySelector(`.chat-bubble[data-line-index="${idx}"]`);
            if (bubble) {
                bubble.classList.add('user-turn');
                let prompt = bubble.querySelector('.user-turn-prompt');
                if (!prompt) {
                    prompt = document.createElement('div');
                    prompt.className = 'user-turn-prompt';
                    prompt.innerHTML = `🗣️ <strong>あなたの番です！</strong> セリフを発音してください <button class="btn-skip-turn">次へ (J) ▶</button>`;
                    bubble.appendChild(prompt);
                }
                
                const skipBtn = bubble.querySelector('.btn-skip-turn');
                skipBtn.onclick = () => {
                    bubble.classList.remove('user-turn');
                    if (prompt) prompt.remove();
                    if (onDone) onDone();
                };
            }
        };

        tts.onFinish = () => {
            document.querySelectorAll('.chat-bubble').forEach(b => b.classList.remove('playing'));
        };
    }

    /**
     * Keyboard Shortcut Listener
     */
    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ignore shortcuts if user is typing in an input/select field
            const targetTag = e.target.tagName.toUpperCase();
            if (targetTag === 'INPUT' || targetTag === 'TEXTAREA' || targetTag === 'SELECT') {
                return;
            }

            const key = e.key.toLowerCase();

            // P or Space: Play/Pause current line or full dialogue
            if (key === 'p' || e.code === 'Space') {
                e.preventDefault();
                if (tts.isPlaying) {
                    tts.stop();
                    document.querySelectorAll('.chat-bubble').forEach(b => b.classList.remove('playing'));
                } else {
                    selectLine(selectedLineIndex, true);
                }
            }
            // J: Next Sentence
            else if (key === 'j') {
                e.preventDefault();
                if (selectedLineIndex < currentDialogue.lines.length - 1) {
                    selectLine(selectedLineIndex + 1, true);
                }
            }
            // K: Previous Sentence
            else if (key === 'k') {
                e.preventDefault();
                if (selectedLineIndex > 0) {
                    selectLine(selectedLineIndex - 1, true);
                }
            }
            // R: Repeat Current Sentence
            else if (key === 'r') {
                e.preventDefault();
                selectLine(selectedLineIndex, true);
            }
            // S or Escape: Stop Audio
            else if (key === 's' || e.key === 'Escape') {
                e.preventDefault();
                tts.stop();
                document.querySelectorAll('.chat-bubble').forEach(b => b.classList.remove('playing'));
            }
            // Y: Toggle Pinyin Mode (Always -> Hover -> Hidden -> Always)
            else if (key === 'y') {
                e.preventDefault();
                const modes = ['always', 'hover', 'hidden'];
                const nextMode = modes[(modes.indexOf(pinyinToggle.value) + 1) % modes.length];
                pinyinToggle.value = nextMode;
                PinyinUtils.setMode(nextMode);
            }
            // T: Toggle Japanese Translation
            else if (key === 't') {
                e.preventDefault();
                jaToggle.checked = !jaToggle.checked;
                if (jaToggle.checked) {
                    chatContainer.classList.remove('hide-ja');
                } else {
                    chatContainer.classList.add('hide-ja');
                }
            }
            // [ : Slower speed
            else if (key === '[') {
                e.preventDefault();
                const rates = ['0.5', '0.7', '0.85', '1.0', '1.2'];
                const idx = Math.max(0, rates.indexOf(speedSelect.value) - 1);
                speedSelect.value = rates[idx];
                tts.setRate(rates[idx]);
            }
            // ] : Faster speed
            else if (key === ']') {
                e.preventDefault();
                const rates = ['0.5', '0.7', '0.85', '1.0', '1.2'];
                const idx = Math.min(rates.length - 1, rates.indexOf(speedSelect.value) + 1);
                speedSelect.value = rates[idx];
                tts.setRate(rates[idx]);
            }
            // N: Cycle through Vocab Notes for current line
            else if (key === 'n') {
                e.preventDefault();
                const currentLine = currentDialogue.lines[selectedLineIndex];
                if (currentLine && currentLine.notes && currentLine.notes.length > 0) {
                    if (!notesDrawer.classList.contains('open')) {
                        // Open drawer with first note
                        currentNoteIndex = 0;
                        const n = currentLine.notes[0];
                        showNoteDrawer(n.word, n.pinyin, n.meaning, 1, currentLine.notes.length);
                    } else {
                        // Cycle to next note
                        currentNoteIndex = (currentNoteIndex + 1) % currentLine.notes.length;
                        const n = currentLine.notes[currentNoteIndex];
                        showNoteDrawer(n.word, n.pinyin, n.meaning, currentNoteIndex + 1, currentLine.notes.length);
                    }
                } else {
                    notesDrawer.classList.toggle('open');
                }
            }
            // M: Pronounce current vocabulary word
            else if (key === 'm') {
                e.preventDefault();
                if (currentNoteWord) {
                    playCurrentVocabAudio();
                } else {
                    const currentLine = currentDialogue.lines[selectedLineIndex];
                    if (currentLine && currentLine.notes && currentLine.notes.length > 0) {
                        const n = currentLine.notes[0];
                        showNoteDrawer(n.word, n.pinyin, n.meaning, 1, currentLine.notes.length);
                        playCurrentVocabAudio();
                    }
                }
            }
            // 1, 2, 3: Learning Modes
            else if (key === '1') {
                setMode('listening');
            } else if (key === '2') {
                setMode('roleplay');
            } else if (key === '3') {
                setMode('quiz');
            }
        });
    }

    function setMode(mode) {
        currentMode = mode;
        [modeListeningBtn, modeRoleplayBtn, modeQuizBtn].forEach(btn => btn.classList.remove('active'));

        if (mode === 'listening') {
            modeListeningBtn.classList.add('active');
            roleplayBar.classList.add('hidden');
            quizPanel.classList.add('hidden');
            chatContainer.classList.remove('quiz-mode-active');
            tts.setUserRole(null);
            renderDialogue();
        } else if (mode === 'roleplay') {
            modeRoleplayBtn.classList.add('active');
            roleplayBar.classList.remove('hidden');
            quizPanel.classList.add('hidden');
            chatContainer.classList.remove('quiz-mode-active');
            renderDialogue();
        } else if (mode === 'quiz') {
            modeQuizBtn.classList.add('active');
            roleplayBar.classList.add('hidden');
            quizPanel.classList.remove('hidden');
            chatContainer.classList.add('quiz-mode-active');
            startQuizMode();
        }
    }

    function updateRoleplayVisibility(userRoleId) {
        document.querySelectorAll('.chat-bubble').forEach(bubble => {
            if (bubble.dataset.speaker === userRoleId) {
                bubble.classList.add('user-role-bubble');
            } else {
                bubble.classList.remove('user-role-bubble');
            }
        });
    }

    // Quiz Mode Logic
    let quizScore = 0;
    let quizIndex = 0;
    let quizLines = [];

    function startQuizMode() {
        if (!currentDialogue) return;
        quizLines = currentDialogue.lines.filter(l => l.speaker !== 'narrator');
        quizIndex = 0;
        quizScore = 0;
        renderQuizQuestion();
    }

    function renderQuizQuestion() {
        if (quizIndex >= quizLines.length) {
            quizPanel.innerHTML = `
                <div class="quiz-complete">
                    🎉 <strong>クイズ完了！</strong><br>
                    正解率: ${quizScore} / ${quizLines.length}<br>
                    <button id="btn-restart-quiz">もう一度チャレンジ</button>
                </div>
            `;
            document.getElementById('btn-restart-quiz').addEventListener('click', startQuizMode);
            return;
        }

        const line = quizLines[quizIndex];
        const charObj = currentDialogue.characters?.find(c => c.id === line.speaker) || { avatar: '👤', name: line.speaker };

        quizPanel.innerHTML = `
            <div class="quiz-card">
                <div class="quiz-progress">問題 ${quizIndex + 1} / ${quizLines.length}</div>
                <div class="quiz-speaker">${charObj.avatar} ${charObj.name}</div>
                <div class="quiz-audio-box">
                    <button id="btn-quiz-audio" class="btn-primary">🔊 音声を聞く</button>
                </div>
                <div class="quiz-question">【日本語訳】${line.ja}</div>
                <div class="quiz-input-box">
                    <input type="text" id="quiz-user-input" placeholder="聞き取ったピンインまたは中国語を入力..." autocomplete="off">
                    <button id="btn-quiz-submit">判定</button>
                </div>
                <div id="quiz-feedback" class="quiz-feedback hidden"></div>
            </div>
        `;

        document.getElementById('btn-quiz-audio').addEventListener('click', () => {
            tts.speakText(line.zh, 1.0, 0.85);
        });

        const submitBtn = document.getElementById('btn-quiz-submit');
        const inputElem = document.getElementById('quiz-user-input');
        const feedbackElem = document.getElementById('quiz-feedback');

        const checkAnswer = () => {
            const val = inputElem.value.trim().toLowerCase();
            const targetZh = line.zh.replace(/[^\u4e00-\u9fa5]/g, '');
            const targetPy = line.pinyin.toLowerCase().replace(/[^\w]/g, '');
            const userClean = val.replace(/[^\w\u4e00-\u9fa5]/g, '');

            feedbackElem.classList.remove('hidden');

            if (userClean === targetZh || userClean === targetPy || (userClean.length > 2 && (targetZh.includes(userClean) || targetPy.includes(userClean)))) {
                quizScore++;
                feedbackElem.className = 'quiz-feedback correct';
                feedbackElem.innerHTML = `正解！👏<br>中国語: <strong>${line.zh}</strong><br>ピンイン: <i>${line.pinyin}</i>`;
            } else {
                feedbackElem.className = 'quiz-feedback incorrect';
                feedbackElem.innerHTML = `惜しい！<br>正解: <strong>${line.zh}</strong><br>ピンイン: <i>${line.pinyin}</i>`;
            }

            setTimeout(() => {
                quizIndex++;
                renderQuizQuestion();
            }, 2500);
        };

        submitBtn.addEventListener('click', checkAnswer);
        inputElem.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkAnswer();
        });
    }

    // Load Data
    loadData();
});
