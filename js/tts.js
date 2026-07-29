/**
 * Speech Synthesis (TTS) Engine for Chinese Listening & Dialogue Training
 * Uses Browser Web Speech API (zh-CN) with multi-character tone differentiation,
 * speed control, segment pause control, and role-play automation.
 */

class DialogueTTSEngine {
    constructor() {
        this.synth = window.speechSynthesis;
        this.voices = [];
        this.selectedVoice = null;
        this.rate = 0.9;            // Global playback rate (0.5 to 1.5)
        this.segmentPauseMs = 800;  // Pause duration between line segments in ms
        
        this.isPlaying = false;
        this.isPaused = false;
        this.currentDialogue = null;
        this.currentLineIndex = -1;
        this.currentSegmentIndex = -1;
        this.loopSingleLine = false;
        this.segmentMode = false;   // Play segment by segment
        this.userRole = null;       // Role-play: e.g. 'lili' or 'jieming'

        // Callbacks
        this.onLineStart = null;    // (lineIndex, lineData) => {}
        this.onLineEnd = null;      // (lineIndex) => {}
        this.onSegmentStart = null; // (lineIndex, segmentIndex, segmentText) => {}
        this.onRoleTurn = null;     // (lineIndex, lineData) => {}
        this.onFinish = null;       // () => {}

        this.initVoices();
    }

    initVoices() {
        const update = () => {
            this.voices = this.synth.getVoices().filter(v => v.lang.includes('zh') || v.lang.includes('cmn'));
            if (this.voices.length > 0) {
                // Prefer Google 普通话 / Microsoft Yaoyao / Kangkang / Huihui or default zh-CN
                this.selectedVoice = this.voices.find(v => v.lang === 'zh-CN') || this.voices[0];
            }
        };

        update();
        if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = update;
        }
    }

    setRate(rate) {
        this.rate = parseFloat(rate);
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

        const character = dialogue.characters.find(c => c.id === line.speaker) || {};
        const pitch = character.pitch || 1.0;

        if (this.segmentMode && line.segments && line.segments.length > 1) {
            this.playSegmentsSequentially(line.segments, pitch, () => {
                if (this.onLineEnd) this.onLineEnd(lineIndex);
                if (this.loopSingleLine && this.isPlaying) {
                    setTimeout(() => this.playLine(dialogue, lineIndex, onDone), 500);
                } else if (onDone) {
                    onDone();
                }
            });
        } else {
            this.speakText(line.zh, pitch, this.rate, () => {
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

            // If user's role turn in role-play mode
            if (this.userRole && line.speaker === this.userRole) {
                if (this.onLineStart) this.onLineStart(idx, line);
                if (this.onRoleTurn) {
                    this.onRoleTurn(idx, line, () => {
                        // User finished turn, proceed to next
                        playNext(idx + 1);
                    });
                }
                return;
            }

            this.playLine(dialogue, idx, () => {
                if (!this.isPlaying) return;
                // Brief pause between dialogue turns
                setTimeout(() => playNext(idx + 1), 600);
            });
        };

        playNext(startIdx);
    }

    /**
     * Plays segments of a sentence with short pauses between them
     */
    playSegmentsSequentially(segments, pitch, onComplete) {
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

            this.speakText(segText, pitch, this.rate, () => {
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
     * Helper to wrap SpeechSynthesisUtterance
     */
    speakText(text, pitch = 1.0, rate = 1.0, onEnd = null) {
        if (!('speechSynthesis' in window)) {
            alert('お使いのブラウザは音声合成（Web Speech API）に対応していません。');
            if (onEnd) onEnd();
            return;
        }

        const cleanText = text.replace(/[\(\)（）]/g, ''); // Strip parentheses for audio
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'zh-CN';
        if (this.selectedVoice) {
            utterance.voice = this.selectedVoice;
        }

        utterance.pitch = pitch;
        utterance.rate = rate;

        utterance.onend = () => {
            if (onEnd) onEnd();
        };

        utterance.onerror = (e) => {
            console.warn('TTS Speech Synthesis error:', e);
            if (onEnd) onEnd();
        };

        this.synth.speak(utterance);
    }
}
