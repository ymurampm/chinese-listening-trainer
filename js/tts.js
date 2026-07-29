/**
 * Speech Synthesis (TTS) Engine for Chinese Listening & Dialogue Training
 * Proven exact voice binding algorithm from Listening Training (trainer.html).
 * Ensures identical natural Chinese speech across Windows Edge, Chrome, and all environments.
 */

class DialogueTTSEngine {
    constructor() {
        this.synth = window.speechSynthesis;
        this.voices = [];
        this.selectedVoice = null;
        this.rate = 0.85;             // Global playback rate (0.5 to 1.5)
        
        this.isPlaying = false;
        this.isPaused = false;
        this.currentDialogue = null;
        this.currentLineIndex = -1;
        this.currentSegmentIndex = -1;
        this.loopSingleLine = false;
        this.segmentMode = false;     // Play segment by segment
        this.userRole = null;         // Role-play: e.g. 'lili' or 'jieming'

        // Callbacks
        this.onLineStart = null;      // (lineIndex, lineData) => {}
        this.onLineEnd = null;        // (lineIndex) => {}
        this.onSegmentStart = null;   // (lineIndex, segmentIndex, segmentText) => {}
        this.onRoleTurn = null;       // (lineIndex, lineData) => {}
        this.onVoicesUpdated = null;  // (voices) => {}
        this.onFinish = null;         // () => {}

        this.initVoices();
    }

    /**
     * Auto voice selection - Identical to trainer.html algorithm
     */
    initVoices() {
        const update = () => {
            const allVoices = this.synth.getVoices();
            const zhVoices = allVoices.filter(v => v.lang && (v.lang.startsWith('zh') || v.lang.includes('CN')));
            
            // Priority: Exact 'zh-CN' match -> First Chinese voice -> First available voice
            const defaultVoice = zhVoices.find(v => v.lang === 'zh-CN') 
                || zhVoices.find(v => v.lang.toLowerCase().startsWith('zh'))
                || zhVoices[0];

            if (defaultVoice) {
                this.selectedVoice = defaultVoice;
                this.voices = zhVoices.length > 0 ? zhVoices : allVoices;
            } else if (allVoices.length > 0) {
                this.selectedVoice = allVoices[0];
                this.voices = allVoices;
            }

            if (this.onVoicesUpdated) {
                this.onVoicesUpdated(this.voices);
            }
        };

        update();
        if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = update;
        }
    }

    setVoiceByName(name) {
        if (!name) {
            this.initVoices();
            return;
        }
        const found = this.voices.find(v => v.name === name);
        if (found) {
            this.selectedVoice = found;
        }
    }

    setRate(rate) {
        this.rate = Math.max(0.4, Math.min(1.5, parseFloat(rate)));
    }

    setSegmentMode(enabled) {
        this.segmentMode = !!enabled;
    }

    setLoopSingleLine(enabled) {
        this.loopSingleLine = !!enabled;
    }

    setUserRole(roleId) {
        this.userRole = roleId || null;
    }

    stop() {
        this.isPlaying = false;
        this.isPaused = false;
        if (this.synth) {
            this.synth.cancel();
        }
    }

    /**
     * Play a specific line from current dialogue
     */
    playLine(dialogue, lineIndex, onDone = null) {
        this.stop();
        this.currentDialogue = dialogue;
        this.currentLineIndex = lineIndex;
        this.isPlaying = true;

        const line = dialogue.lines[lineIndex];
        if (!line) return;

        // Check if it's user's turn in Role Play mode
        if (this.userRole && line.speaker === this.userRole) {
            if (this.onRoleTurn) this.onRoleTurn(lineIndex, line);
            return;
        }

        if (this.onLineStart) this.onLineStart(lineIndex, line);

        if (this.segmentMode && line.segments && line.segments.length > 1) {
            this.playSegmentsSequentially(line.segments, () => {
                if (this.onLineEnd) this.onLineEnd(lineIndex);
                if (this.loopSingleLine && this.isPlaying) {
                    setTimeout(() => this.playLine(dialogue, lineIndex, onDone), 500);
                } else if (onDone) {
                    onDone();
                }
            });
        } else {
            this.speakText(line.zh, this.rate, () => {
                if (this.onLineEnd) this.onLineEnd(lineIndex);
                if (this.loopSingleLine && this.isPlaying) {
                    setTimeout(() => this.playLine(dialogue, lineIndex, onDone), 500);
                } else if (onDone) {
                    onDone();
                }
            });
        }
    }

    /**
     * Play entire dialogue from start or specified line index
     */
    playFullDialogue(dialogue, startIdx = 0) {
        this.stop();
        this.currentDialogue = dialogue;
        this.isPlaying = true;

        const playNext = (idx) => {
            if (!this.isPlaying) return;
            if (idx >= dialogue.lines.length) {
                this.isPlaying = false;
                if (this.onFinish) this.onFinish();
                return;
            }

            this.currentLineIndex = idx;
            const line = dialogue.lines[idx];

            if (this.userRole && line.speaker === this.userRole) {
                if (this.onLineStart) this.onLineStart(idx, line);
                if (this.onRoleTurn) {
                    this.onRoleTurn(idx, line, () => {
                        playNext(idx + 1);
                    });
                }
                return;
            }

            this.playLine(dialogue, idx, () => {
                if (!this.isPlaying) return;
                setTimeout(() => playNext(idx + 1), 600);
            });
        };

        playNext(startIdx);
    }

    /**
     * Plays segments of a sentence with short pauses between them
     */
    playSegmentsSequentially(segments, onComplete) {
        let segIdx = 0;

        const playNextSeg = () => {
            if (!this.isPlaying) return;
            if (segIdx >= segments.length) {
                if (onComplete) onComplete();
                return;
            }

            const segText = segments[segIdx];
            this.currentSegmentIndex = segIdx;
            if (this.onSegmentStart) {
                this.onSegmentStart(this.currentLineIndex, segIdx, segText);
            }

            this.speakText(segText, this.rate, () => {
                segIdx++;
                if (segIdx < segments.length && this.isPlaying) {
                    setTimeout(playNextSeg, this.segmentPauseMs);
                } else if (onComplete) {
                    onComplete();
                }
            });
        };

        playNextSeg();
    }

    /**
     * Exact speech synthesis logic from Listening Training trainer.html
     */
    speakText(text, rate = 0.85, onEnd = null) {
        if (!('speechSynthesis' in window)) {
            alert('お使いのブラウザは音声合成（Web Speech API）に対応していません。');
            if (onEnd) onEnd();
            return;
        }

        this.synth.cancel();

        const cleanText = text.replace(/[\(\)（）]/g, '');
        const utterance = new SpeechSynthesisUtterance(cleanText);
        
        if (this.selectedVoice) {
            utterance.voice = this.selectedVoice;
        }
        utterance.lang = 'zh-CN';
        utterance.rate = Math.max(0.4, Math.min(1.5, parseFloat(rate)));

        utterance.onend = () => {
            if (onEnd) onEnd();
        };

        utterance.onerror = (e) => {
            console.error('SpeechSynthesis error:', e);
            if (onEnd) onEnd();
        };

        this.synth.speak(utterance);
    }
}
