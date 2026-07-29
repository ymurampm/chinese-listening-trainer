/**
 * Speech Synthesis (TTS) Engine for Chinese Listening & Dialogue Training
 * Uses Browser Web Speech API (zh-CN) with intelligent Voice-Matching,
 * pristine pitch locking (1.0) to prevent Edge/Chrome audio degradation,
 * speed control, segment pause control, and role-play automation.
 */

class DialogueTTSEngine {
    constructor() {
        this.synth = window.speechSynthesis;
        this.voices = [];
        this.selectedVoice = null;
        this.rate = 0.9;              // Global playback rate (0.5 to 1.5)
        this.segmentPauseMs = 800;    // Pause duration between line segments in ms
        this.naturalPitchMode = true; // Lock pitch to 1.0 for maximum audio quality & Neural AI voices
        
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

    initVoices() {
        const update = () => {
            this.voices = this.synth.getVoices().filter(v => 
                v.lang.includes('zh') || v.lang.includes('cmn') || v.lang.includes('CN')
            );
            if (this.voices.length > 0) {
                // Priority ranking for natural sound across Windows / Chrome / Edge:
                // 1. Natural / Online Neural voices (Xiaoxiao, Yunxi, Yunyang)
                // 2. Google 普通话
                // 3. Microsoft Kangkang / Huihui / Yaoyao
                // 4. Any zh-CN voice
                this.selectedVoice = this.voices.find(v => v.name.includes('Natural') || v.name.includes('Neural'))
                    || this.voices.find(v => v.name.includes('Google') || v.name.includes('Xiaoxiao') || v.name.includes('Yunxi'))
                    || this.voices.find(v => v.lang === 'zh-CN')
                    || this.voices[0];
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

    setNaturalPitchMode(enabled) {
        this.naturalPitchMode = !!enabled;
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
     * Finds character-specific voice if installed in system (e.g. Male vs Female voice)
     */
    getCharacterVoice(character) {
        if (!character || !this.voices.length) return this.selectedVoice;

        if (character.gender === 'male') {
            const maleVoice = this.voices.find(v => 
                v.name.includes('Yunxi') || v.name.includes('Yunyang') || v.name.includes('Kangkang') || v.name.toLowerCase().includes('male')
            );
            if (maleVoice) return maleVoice;
        } else if (character.gender === 'female') {
            const femaleVoice = this.voices.find(v => 
                v.name.includes('Xiaoxiao') || v.name.includes('Huihui') || v.name.includes('Yaoyao') || v.name.includes('Google')
            );
            if (femaleVoice) return femaleVoice;
        }

        return this.selectedVoice;
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
        const voice = this.getCharacterVoice(character);
        const pitch = this.naturalPitchMode ? 1.0 : (character.pitch || 1.0);

        if (this.segmentMode && line.segments && line.segments.length > 1) {
            this.playSegmentsSequentially(line.segments, pitch, voice, () => {
                if (this.onLineEnd) this.onLineEnd(lineIndex);
                if (this.loopSingleLine && this.isPlaying) {
                    setTimeout(() => this.playLine(dialogue, lineIndex, onDone), 500);
                } else if (onDone) {
                    onDone();
                }
            });
        } else {
            this.speakText(line.zh, pitch, this.rate, voice, () => {
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
    playSegmentsSequentially(segments, pitch, voice, onComplete) {
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

            this.speakText(segText, pitch, this.rate, voice, () => {
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
    speakText(text, pitch = 1.0, rate = 1.0, voice = null, onEnd = null) {
        if (!('speechSynthesis' in window)) {
            alert('お使いのブラウザは音声合成（Web Speech API）に対応していません。');
            if (typeof voice === 'function') voice();
            else if (onEnd) onEnd();
            return;
        }

        if (typeof voice === 'function') {
            onEnd = voice;
            voice = null;
        }

        const cleanText = text.replace(/[\(\)（）]/g, '');
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'zh-CN';
        
        const targetVoice = voice || this.selectedVoice;
        if (targetVoice) {
            utterance.voice = targetVoice;
        }

        // Force pitch 1.0 if naturalPitchMode is enabled to preserve Edge Neural voices
        utterance.pitch = this.naturalPitchMode ? 1.0 : pitch;
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
