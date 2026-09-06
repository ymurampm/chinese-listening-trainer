import json, sys
sys.stdout.reconfigure(encoding='utf-8')

levels_map = [
    ('hsk1', 'HSK1 (入門)', 'HSK1語彙・基本文型のみ。短く単純な文でリスニングの基礎を作る。', 'data/hsk1.json'),
    ('hsk2', 'HSK2 (初級)', 'HSK2語彙中心。日常会話でよく使う表現を含む。', 'data/hsk2.json'),
    ('bridge', 'HSK2-3 (橋渡し)', 'HSK2からHSK3-4への橋渡し。やや長めの文・复合語を含む。', 'data/bridge.json'),
    ('hsk3-4', 'HSK3-4 (中級)', '従来からの問題セット。HSK3-4語彙が混在する中級レベル。', 'data/hsk3-4.json')
]

out_dialogues = []

for lid, label, desc, fpath in levels_map:
    with open(fpath, encoding='utf-8') as fp:
        d = json.load(fp)
        study_data = d.get('studyData', [])
        
        lines = []
        for idx, item in enumerate(study_data):
            full_sentence = item.get('full_sentence', '')
            ja = item.get('japanese_translation', '')
            tip = item.get('tip', '')
            chunks = item.get('chunks', [])
            vulnerable = item.get('vulnerable_targets', [])
            html_content = item.get('html_content', '')
            
            # Map words to notes
            notes = []
            if chunks:
                for c in chunks:
                    for w in c.get('words', []):
                        notes.append({
                            'word': w.get('word', ''),
                            'pinyin': '',
                            'meaning': f"[HSK{w.get('level', '')}] {w.get('meaning', '')}"
                        })
            
            lines.append({
                'id': f'{lid}_{idx+1}',
                'speaker': 'narrator',
                'zh': full_sentence,
                'pinyin': '',
                'ja': ja,
                'tip': tip,
                'html_content': html_content,
                'segments': [c.get('text', '') for c in chunks] if chunks else [full_sentence],
                'notes': notes,
                'vulnerable_targets': vulnerable
            })
            
        out_dialogues.append({
            'id': lid,
            'title': f'🎯 単文特訓: {label}',
            'level': label,
            'topic': desc,
            'characters': [
                {'id': 'narrator', 'name': 'ナレーション', 'gender': 'female', 'avatar': '📖', 'pitch': 1.0, 'rate': 0.95}
            ],
            'lines': lines
        })

final_data = {
    'id': 'hsk_drills',
    'title': '🎯 HSK単文・天敵ピンイン特訓 (全160文)',
    'description': '日本人学習者の12大天敵ピンインを克服する短文・リスニング特訓ドリル',
    'dialogues': out_dialogues
}

with open('data/hsk_drills.json', 'w', encoding='utf-8') as fp:
    json.dump(final_data, fp, ensure_ascii=False, indent=2)

print('Successfully generated data/hsk_drills.json!')
