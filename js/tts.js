/**
 * Speech Synthesis (TTS) Engine for Chinese Listening & Dialogue Training
 * 100% Exact Pure Engine from Listening Training (trainer.html).
 * Zero extra voice dropdown overrides. Unlocks browser audio context with dummy utterance.
 */

class DialogueTTSEngine {
    constructor() {
        this.synth = window.speechSynthesis;
        this.selectedVoice = null;
        this.femaleVoice = null;
        this.maleVoice = null;
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
        this.onFinish = null;         // () => {}

        this.init();
    }

    init() {
        // Unlock browser audio context with dummy utterance (exact trainer.html mechanism)
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            try {
                window.speechSynthesis.speak(new SpeechSynthesisUtterance(""));
            } catch (e) {}
        }

        this.autoSelectVoice();
        if (typeof window !== 'undefined' && window.speechSynthesis && window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = () => this.autoSelectVoice();
        }
    }

    autoSelectVoice() {
        if (typeof window === 'undefined' || !window.speechSynthesis) return;
        const voices = window.speechSynthesis.getVoices();
        if (!voices || voices.length === 0) return;

        const isChineseVoice = (v) => {
            const lang = (v.lang || '').toLowerCase().replace(/_/g, '-');
            const name = (v.name || '').toLowerCase();
            return lang.startsWith('zh') ||
                   lang.startsWith('cmn') ||
                   /chinese|mandarin|普通话|国语|國語|中文/i.test(name) ||
                   /xiaoxiao|yunxi|yunyang|xiaoyi|huihui|yaoyao|kangkang|hanhan/i.test(name);
        };

        const zhVoices = voices.filter(isChineseVoice);

        if (zhVoices.length === 0) {
            // NEVER fallback to non-Chinese voices (prevent reading Chinese in Japanese)
            this.selectedVoice = null;
            this.femaleVoice = null;
            this.maleVoice = null;
            return;
        }

        // Rank voices: prioritize Natural / Online voices (Edge/Chrome) and zh-CN
        const rankVoice = (v) => {
            let score = 0;
            const lang = (v.lang || '').toLowerCase().replace(/_/g, '-');
            const name = (v.name || '').toLowerCase();

            if (lang === 'zh-cn' || lang.startsWith('zh-cn') || lang.startsWith('cmn-hans')) score += 30;
            else if (lang.startsWith('zh')) score += 15;

            if (name.includes('natural') || name.includes('online')) score += 50;
            if (name.includes('google')) score += 40;
            if (/xiaoxiao|yunxi|huihui|yaoyao|kangkang/.test(name)) score += 20;

            return score;
        };

        const sorted = [...zhVoices].sort((a, b) => rankVoice(b) - rankVoice(a));
        this.selectedVoice = sorted[0];

        // Differentiate male and female voices if present
        this.femaleVoice = sorted.find(v => /female|女|xiaoxiao|xiaoyi|huihui|yaoyao|tingting|meijia/i.test(v.name)) ||
                           sorted.find(v => !/male|男|yunxi|yunyang|kangkang/i.test(v.name)) ||
                           this.selectedVoice;

        this.maleVoice = sorted.find(v => /male|男|yunxi|yunyang|kangkang/i.test(v.name)) || null;
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

        if (this.userRole && line.speaker === this.userRole) {
            if (this.onRoleTurn) this.onRoleTurn(lineIndex, line);
            return;
        }

        if (this.onLineStart) this.onLineStart(lineIndex, line);

        const charObj = dialogue.characters?.find(c => c.id === line.speaker);
        const lineRate = charObj?.rate ? (this.rate * charObj.rate) : this.rate;

        if (this.segmentMode && line.segments && line.segments.length > 1) {
            this.playSegmentsSequentially(line.segments, () => {
                if (this.onLineEnd) this.onLineEnd(lineIndex);
                if (this.loopSingleLine && this.isPlaying) {
                    setTimeout(() => this.playLine(dialogue, lineIndex, onDone), 500);
                } else if (onDone) {
                    onDone();
                }
            }, lineRate, charObj);
        } else {
            this.speakText(line.zh, lineRate, () => {
                if (this.onLineEnd) this.onLineEnd(lineIndex);
                if (this.loopSingleLine && this.isPlaying) {
                    setTimeout(() => this.playLine(dialogue, lineIndex, onDone), 500);
                } else if (onDone) {
                    onDone();
                }
            }, charObj);
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
    playSegmentsSequentially(segments, onComplete, rate = null, charObj = null) {
        let segIdx = 0;
        const currentRate = rate || this.rate;

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

            this.speakText(segText, currentRate, () => {
                segIdx++;
                if (segIdx < segments.length && this.isPlaying) {
                    setTimeout(playNextSeg, this.segmentPauseMs || 350);
                } else if (onComplete) {
                    onComplete();
                }
            }, charObj);
        };

        playNextSeg();
    }

    /**
     * Exact speakText function from Listening Training (trainer.html)
     */
    speakText(text, rate = 0.85, onEnd = null, charObj = null) {
        if (!('speechSynthesis' in window)) {
            alert('お使いのブラウザは音声合成（Web Speech API）に対応していません。');
            if (onEnd) onEnd();
            return;
        }

        if (!this.selectedVoice && window.speechSynthesis) {
            this.autoSelectVoice();
        }

        window.speechSynthesis.cancel();

        const cleanText = text.replace(/[\(\)（）]/g, '');
        const utterance = new SpeechSynthesisUtterance(cleanText);
        
        let voiceToUse = this.selectedVoice;
        if (charObj) {
            if (charObj.gender === 'male' && this.maleVoice) {
                voiceToUse = this.maleVoice;
            } else if (charObj.gender === 'female' && this.femaleVoice) {
                voiceToUse = this.femaleVoice;
            }
        }

        if (voiceToUse) {
            utterance.voice = voiceToUse;
        }
        utterance.lang = 'zh-CN';
        utterance.rate = Math.max(0.4, Math.min(1.5, parseFloat(rate)));
        utterance.pitch = (charObj && typeof charObj.pitch === 'number') ? charObj.pitch : 1.0;

        utterance.onend = () => {
            if (onEnd) onEnd();
        };

        utterance.onerror = (e) => {
            console.error('SpeechSynthesis error:', e);
            if (onEnd) onEnd();
        };

        window.speechSynthesis.speak(utterance);
    }
}
