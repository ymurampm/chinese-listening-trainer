/**
 * Personalized Listening Trainer - Chinese Pinyin Static Data
 */

// 12大天敵ピンインマスターDB
const pinyinMasterDB = {
    "ROM-ian": "⚠️ ローマ字の『ティアン』は嘘！中国語の -ian は【イェン】と発音します。",
    "ROM-e":   "⚠️ ローマ字の『へ』ではない！中国語の e は喉の奥から出すこもった【ウ／オ】（フーォ）になります。",
    "ROM-ü":   "⚠️ üの罠！j, q, x, y の後ろでは点々が省略された【丸口のü】。口を尖らせてください。",
    "ROM-ui":  "⚠️ 省略トラップ！本来は uei なので、耳には【ウェイ】と聴こえます。",
    "ROM-un":  "⚠️ 省略トラップ！本来は uen なので、耳には【ウェン】と聴こえます。",
    "VOW-si":  "⚠️ i は無視して、舌先を下歯茎に近づけ、隙間から鋭く息を出す【ス】の音です。",
    "VOW-shi": "⚠️ 日本語の『シ』とは完全別物！巻き舌で出すこもった【シュ／シ】の音です。",
    "VOW-xi":  "⚠️ 前舌面の『シー』。口を少し横に引き、舌の真ん前を上顎にグッと近づけます。",
    "VOW-zi":  "⚠️ 空母音の罠！口の形を変えずに、子音の濁りだけをそのまま響かせる【ズ】に近い音です。",
    "VOW-zhi": "⚠️ 巻き舌の『ヂ』！舌先を上顎に向けて反らせた状態でこもらせて出す【ヂュ／ジ】です。",
    "VOW-ji":  "⚠️ 摩擦のない綺麗な『ジー』。実は全く息が漏れない無声音（チーに近い）です。",
    "VOW-ng":  "⚠️ 鼻音終わり！舌をどこにもつけず、喉の奥のゲートを閉じて鼻に抜く【ン】です。"
};

// 演習データセット
const studyData = [
  {
    "full_sentence": "我明天想和朋友一起去电影院看电影。",
    "japanese_translation": "私は明日、友達と一緒に映画館へ映画を見に行きたいです。",
    "tip": "天(tiān)の『イェン』音、和(hé)の『ウ』の混ざったこもる母音など、見た目と実際の音のギャップが激しいフレーズです。",
    "html_content": `<div class="chunk-box" data-chunk-index="0">
      <div class="char-box"><span class="pinyin">wǒ</span><span class="hanzi">我</span></div>
      <div class="char-box"><span class="pinyin bad-ing">míng</span><span class="hanzi">明</span></div>
      <div class="char-box"><span class="pinyin bad-an">tiān</span><span class="hanzi">天</span></div>
      <div class="char-box"><span class="pinyin bad-ing">xiǎng</span><span class="hanzi">想</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="1">
      <div class="char-box"><span class="pinyin bad-e">hé</span><span class="hanzi">和</span></div>
      <div class="char-box"><span class="pinyin bad-ing">péng</span><span class="hanzi">朋</span></div>
      <div class="char-box"><span class="pinyin">you</span><span class="hanzi">友</span></div>
      <div class="char-box"><span class="pinyin">yì</span><span class="hanzi">一</span></div>
      <div class="char-box"><span class="pinyin">qǐ</span><span class="hanzi">起</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="2">
      <div class="char-box"><span class="pinyin bad-retro">qù</span><span class="hanzi">去</span></div>
      <div class="char-box"><span class="pinyin bad-an">diàn</span><span class="hanzi">电</span></div>
      <div class="char-box"><span class="pinyin bad-ing">yǐng</span><span class="hanzi">影</span></div>
      <div class="char-box"><span class="pinyin bad-retro bad-an">yuàn</span><span class="hanzi">院</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="3">
      <div class="char-box"><span class="pinyin">kàn</span><span class="hanzi">看</span></div>
      <div class="char-box"><span class="pinyin bad-an">diàn</span><span class="hanzi">电</span></div>
      <div class="char-box"><span class="pinyin bad-ing">yǐng</span><span class="hanzi">影</span></div>
    </div>`,
    "chunks": [
      { "text": "我明天想", "words": [{"word": "明天", "level": 2, "meaning": "明日"}] },
      { "text": "和朋友一起", "words": [{"word": "朋友", "level": 1, "meaning": "友達"}] },
      { "text": "去电影院", "words": [{"word": "电影院", "level": 3, "meaning": "映画館"}] },
      { "text": "看电影", "words": [{"word": "电影", "level": 1, "meaning": "映画"}] }
    ],
    "vulnerable_targets": [
      { 
        "text": "明天", 
        "enemy_id": "VOW-ng,ROM-ian", 
        "html": `<div class="char-box"><span class="pinyin bad-ing">míng</span><span class="hanzi">明</span></div>
                 <div class="char-box"><span class="pinyin bad-an">tiān</span><span class="hanzi">天</span></div>` 
      },
      { 
        "text": "想", 
        "enemy_id": "VOW-ng", 
        "html": `<div class="char-box"><span class="pinyin bad-ing">xiǎng</span><span class="hanzi">想</span></div>` 
      },
      { 
        "text": "和", 
        "enemy_id": "ROM-e", 
        "html": `<div class="char-box"><span class="pinyin bad-e">hé</span><span class="hanzi">和</span></div>` 
      },
      { 
        "text": "朋友", 
        "enemy_id": "VOW-ng", 
        "html": `<div class="char-box"><span class="pinyin bad-ing">péng</span><span class="hanzi">朋</span></div>
                 <div class="char-box"><span class="pinyin">you</span><span class="hanzi">友</span></div>` 
      },
      { 
        "text": "去电影院", 
        "enemy_id": "ROM-ü,ROM-ian,VOW-ng", 
        "html": `<div class="char-box"><span class="pinyin bad-retro">qù</span><span class="hanzi">去</span></div>
                 <div class="char-box"><span class="pinyin bad-an">diàn</span><span class="hanzi">电</span></div>
                 <div class="char-box"><span class="pinyin bad-ing">yǐng</span><span class="hanzi">影</span></div>
                 <div class="char-box"><span class="pinyin bad-retro bad-an">yuàn</span><span class="hanzi">院</span></div>` 
      },
      { 
        "text": "看电影", 
        "enemy_id": "ROM-ian,VOW-ng", 
        "html": `<div class="char-box"><span class="pinyin">kàn</span><span class="hanzi">看</span></div>
                 <div class="char-box"><span class="pinyin bad-an">diàn</span><span class="hanzi">电</span></div>
                 <div class="char-box"><span class="pinyin bad-ing">yǐng</span><span class="hanzi">影</span></div>` 
      }
    ]
  },
  {
    "full_sentence": "他最近在学习汉语，进步非常快。",
    "japanese_translation": "彼は最近中国語を勉強していて、上達がとても早いです。",
    "tip": "最(zuì)の『ウェイ』省略音、学(xué)・漢語(yǔ)の『ü』の罠、常(cháng)の巻き舌＋鼻音など、重要ピンインが凝縮されています。",
    "html_content": `<div class="chunk-box" data-chunk-index="0">
      <div class="char-box"><span class="pinyin">tā</span><span class="hanzi">他</span></div>
      <div class="char-box"><span class="pinyin bad-an">zuì</span><span class="hanzi">最</span></div>
      <div class="char-box"><span class="pinyin bad-retro">jìn</span><span class="hanzi">近</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="1">
      <div class="char-box"><span class="pinyin">zài</span><span class="hanzi">在</span></div>
      <div class="char-box"><span class="pinyin bad-front">xué</span><span class="hanzi">学</span></div>
      <div class="char-box"><span class="pinyin bad-front">xí</span><span class="hanzi">习</span></div>
      <div class="char-box"><span class="pinyin">hàn</span><span class="hanzi">汉</span></div>
      <div class="char-box"><span class="pinyin bad-retro">yǔ</span><span class="hanzi">语</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="2">
      <div class="char-box"><span class="pinyin bad-retro">jìn</span><span class="hanzi">进</span></div>
      <div class="char-box"><span class="pinyin">bù</span><span class="hanzi">步</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="3">
      <div class="char-box"><span class="pinyin">fēi</span><span class="hanzi">非</span></div>
      <div class="char-box"><span class="pinyin bad-retro bad-ing">cháng</span><span class="hanzi">常</span></div>
      <div class="char-box"><span class="pinyin">kuài</span><span class="hanzi">快</span></div>
    </div>`,
    "chunks": [
      { "text": "他最近", "words": [{"word": "最近", "level": 2, "meaning": "最近"}] },
      { "text": "在学习汉语", "words": [{"word": "学习", "level": 1, "meaning": "勉強する"}, {"word": "汉语", "level": 1, "meaning": "中国語"}] },
      { "text": "进步", "words": [{"word": "进步", "level": 3, "meaning": "進歩する/上達する"}] },
      { "text": "非常快", "words": [{"word": "非常", "level": 2, "meaning": "非常に"}] }
    ],
    "vulnerable_targets": [
      { 
        "text": "最近", 
        "enemy_id": "ROM-ui,VOW-ji", 
        "html": `<div class="char-box"><span class="pinyin bad-an">zuì</span><span class="hanzi">最</span></div>
                 <div class="char-box"><span class="pinyin bad-retro">jìn</span><span class="hanzi">近</span></div>` 
      },
      { 
        "text": "学习", 
        "enemy_id": "ROM-ü,VOW-xi", 
        "html": `<div class="char-box"><span class="pinyin bad-front">xué</span><span class="hanzi">学</span></div>
                 <div class="char-box"><span class="pinyin bad-front">xí</span><span class="hanzi">习</span></div>` 
      },
      { 
        "text": "汉语", 
        "enemy_id": "ROM-ü", 
        "html": `<div class="char-box"><span class="pinyin">hàn</span><span class="hanzi">汉</span></div>
                 <div class="char-box"><span class="pinyin bad-retro">yǔ</span><span class="hanzi">语</span></div>` 
      },
      { 
        "text": "进步", 
        "enemy_id": "VOW-ji", 
        "html": `<div class="char-box"><span class="pinyin bad-retro">jìn</span><span class="hanzi">进</span></div>
                 <div class="char-box"><span class="pinyin">bù</span><span class="hanzi">步</span></div>` 
      },
      { 
        "text": "非常", 
        "enemy_id": "VOW-ng,VOW-shi", 
        "html": `<div class="char-box"><span class="pinyin">fēi</span><span class="hanzi">非</span></div>
                 <div class="char-box"><span class="pinyin bad-retro bad-ing">cháng</span><span class="hanzi">常</span></div>` 
      }
    ]
  },
  {
    "full_sentence": "请问，去火车站怎么走？",
    "japanese_translation": "お尋ねしますが、鉄道駅へはどう行けばいいですか？",
    "tip": "問(wèn)の『ウェン』省略、駅(zhàn)・車(chē)の強烈な巻き舌、怎(zěn)の空母音とこもる『e』の連続が難所です。",
    "html_content": `<div class="chunk-box" data-chunk-index="0">
      <div class="char-box"><span class="pinyin bad-retro bad-ing">qǐng</span><span class="hanzi">请</span></div>
      <div class="char-box"><span class="pinyin bad-an">wèn</span><span class="hanzi">问</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="1">
      <div class="char-box"><span class="pinyin bad-retro">qù</span><span class="hanzi">去</span></div>
      <div class="char-box"><span class="pinyin">huǒ</span><span class="hanzi">火</span></div>
      <div class="char-box"><span class="pinyin bad-retro bad-e">chē</span><span class="hanzi">车</span></div>
      <div class="char-box"><span class="pinyin bad-retro">zhàn</span><span class="hanzi">站</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="2">
      <div class="char-box"><span class="pinyin bad-retro bad-e">zěn</span><span class="hanzi">怎</span></div>
      <div class="char-box"><span class="pinyin bad-e">me</span><span class="hanzi">么</span></div>
      <div class="char-box"><span class="pinyin">zǒu</span><span class="hanzi">走</span></div>
    </div>`,
    "chunks": [
      { "text": "请问", "words": [{"word": "请问", "level": 1, "meaning": "お尋ねします"}] },
      { "text": "去火车站", "words": [{"word": "火车站", "level": 1, "meaning": "鉄道駅"}] },
      { "text": "怎么走", "words": [{"word": "怎么", "level": 1, "meaning": "どうやって"}, {"word": "走", "level": 1, "meaning": "行く/歩く"}] }
    ],
    "vulnerable_targets": [
      { 
        "text": "请问", 
        "enemy_id": "VOW-ng,ROM-un,VOW-ji", 
        "html": `<div class="char-box"><span class="pinyin bad-retro bad-ing">qǐng</span><span class="hanzi">请</span></div>
                 <div class="char-box"><span class="pinyin bad-an">wèn</span><span class="hanzi">问</span></div>` 
      },
      { 
        "text": "去", 
        "enemy_id": "ROM-ü", 
        "html": `<div class="char-box"><span class="pinyin bad-retro">qù</span><span class="hanzi">去</span></div>` 
      },
      { 
        "text": "火车站", 
        "enemy_id": "ROM-e,VOW-zhi,VOW-shi", 
        "html": `<div class="char-box"><span class="pinyin">huǒ</span><span class="hanzi">火</span></div>
                 <div class="char-box"><span class="pinyin bad-retro bad-e">chē</span><span class="hanzi">车</span></div>
                 <div class="char-box"><span class="pinyin bad-retro">zhàn</span><span class="hanzi">站</span></div>` 
      },
      { 
        "text": "怎么", 
        "enemy_id": "VOW-zi,ROM-e", 
        "html": `<div class="char-box"><span class="pinyin bad-retro bad-e">zěn</span><span class="hanzi">怎</span></div>
                 <div class="char-box"><span class="pinyin bad-e">me</span><span class="hanzi">么</span></div>` 
      }
    ]
  },
  {
    "full_sentence": "医生说他需要多喝热水，少吃辣。",
    "japanese_translation": "医者は彼に、白湯（温かい水）を多く飲み、辛いものは控えるように言いました。",
    "tip": "喝(hē)や熱(rè)のこもる『e』、水(shuǐ)の巻き舌＋『ウェイ』省略音、吃(chī)の巻き舌など、脳内バグが多発する発音が集まっています。",
    "html_content": `<div class="chunk-box" data-chunk-index="0">
      <div class="char-box"><span class="pinyin">yī</span><span class="hanzi">医</span></div>
      <div class="char-box"><span class="pinyin bad-retro bad-ing">shēng</span><span class="hanzi">生</span></div>
      <div class="char-box"><span class="pinyin bad-retro">shuō</span><span class="hanzi">说</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="1">
      <div class="char-box"><span class="pinyin">tā</span><span class="hanzi">他</span></div>
      <div class="char-box"><span class="pinyin bad-front">xū</span><span class="hanzi">需</span></div>
      <div class="char-box"><span class="pinyin">yào</span><span class="hanzi">要</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="2">
      <div class="char-box"><span class="pinyin">duō</span><span class="hanzi">多</span></div>
      <div class="char-box"><span class="pinyin bad-e">hē</span><span class="hanzi">喝</span></div>
      <div class="char-box"><span class="pinyin bad-retro bad-e">rè</span><span class="hanzi">热</span></div>
      <div class="char-box"><span class="pinyin bad-retro bad-an">shuǐ</span><span class="hanzi">水</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="3">
      <div class="char-box"><span class="pinyin bad-retro">shǎo</span><span class="hanzi">少</span></div>
      <div class="char-box"><span class="pinyin bad-retro">chī</span><span class="hanzi">吃</span></div>
      <div class="char-box"><span class="pinyin">là</span><span class="hanzi">辣</span></div>
    </div>`,
    "chunks": [
      { "text": "医生说", "words": [{"word": "医生", "level": 1, "meaning": "医師"}] },
      { "text": "他需要", "words": [{"word": "需要", "level": 3, "meaning": "〜する必要がある"}] },
      { "text": "多喝热水", "words": [{"word": "热水", "level": 2, "meaning": "お湯"}] },
      { "text": "少吃辣", "words": [{"word": "少", "level": 1, "meaning": "少なく"}, {"word": "吃", "level": 1, "meaning": "食べる"}] }
    ],
    "vulnerable_targets": [
      {
        "text": "医生",
        "enemy_id": "VOW-ng,ROM-e,VOW-shi",
        "html": `<div class="char-box"><span class="pinyin">yī</span><span class="hanzi">医</span></div>
                 <div class="char-box"><span class="pinyin bad-retro bad-ing">shēng</span><span class="hanzi">生</span></div>`
      },
      {
        "text": "说",
        "enemy_id": "VOW-shi",
        "html": `<div class="char-box"><span class="pinyin bad-retro">shuō</span><span class="hanzi">说</span></div>`
      },
      { 
        "text": "需要", 
        "enemy_id": "ROM-ü,VOW-xi", 
        "html": `<div class="char-box"><span class="pinyin bad-front">xū</span><span class="hanzi">需</span></div>
                 <div class="char-box"><span class="pinyin">yào</span><span class="hanzi">要</span></div>` 
      },
      { 
        "text": "喝", 
        "enemy_id": "ROM-e", 
        "html": `<div class="char-box"><span class="pinyin bad-e">hē</span><span class="hanzi">喝</span></div>` 
      },
      { 
        "text": "热水", 
        "enemy_id": "ROM-e,VOW-shi,ROM-ui", 
        "html": `<div class="char-box"><span class="pinyin bad-retro bad-e">rè</span><span class="hanzi">热</span></div>
                 <div class="char-box"><span class="pinyin bad-retro bad-an">shuǐ</span><span class="hanzi">水</span></div>` 
      },
      {
        "text": "少",
        "enemy_id": "VOW-shi",
        "html": `<div class="char-box"><span class="pinyin bad-retro">shǎo</span><span class="hanzi">少</span></div>`
      },
      { 
        "text": "吃", 
        "enemy_id": "VOW-shi", 
        "html": `<div class="char-box"><span class="pinyin bad-retro">chī</span><span class="hanzi">吃</span></div>` 
      }
    ]
  },
  {
    "full_sentence": "今天是星期天，天气非常好。",
    "japanese_translation": "今日は日曜日で、天気が非常に良いです。",
    "tip": "今(jīn)・天(tiān)・星(xīng)・期(qī)におけるローマ字『ティアン』や『ジー』『シー』などの舌面音のクリアな聞き分けが要求されます。",
    "html_content": `<div class="chunk-box" data-chunk-index="0">
      <div class="char-box"><span class="pinyin bad-retro">jīn</span><span class="hanzi">今</span></div>
      <div class="char-box"><span class="pinyin bad-an">tiān</span><span class="hanzi">天</span></div>
      <div class="char-box"><span class="pinyin bad-retro">shì</span><span class="hanzi">是</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="1">
      <div class="char-box"><span class="pinyin bad-front bad-ing">xīng</span><span class="hanzi">星</span></div>
      <div class="char-box"><span class="pinyin">qī</span><span class="hanzi">期</span></div>
      <div class="char-box"><span class="pinyin bad-an">tiān</span><span class="hanzi">天</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="2">
      <div class="char-box"><span class="pinyin bad-an">tiān</span><span class="hanzi">天</span></div>
      <div class="char-box"><span class="pinyin">qì</span><span class="hanzi">气</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="3">
      <div class="char-box"><span class="pinyin">fēi</span><span class="hanzi">非</span></div>
      <div class="char-box"><span class="pinyin bad-retro bad-ing">cháng</span><span class="hanzi">常</span></div>
      <div class="char-box"><span class="pinyin">hǎo</span><span class="hanzi">好</span></div>
    </div>`,
    "chunks": [
      { "text": "今天是", "words": [{"word": "今天", "level": 1, "meaning": "今日"}] },
      { "text": "星期天", "words": [{"word": "星期天", "level": 1, "meaning": "日曜日"}] },
      { "text": "天气", "words": [{"word": "天气", "level": 1, "meaning": "天気"}] },
      { "text": "非常好", "words": [{"word": "非常", "level": 2, "meaning": "非常に"}] }
    ],
    "vulnerable_targets": [
      { 
        "text": "今天", 
        "enemy_id": "VOW-ji,ROM-ian", 
        "html": `<div class="char-box"><span class="pinyin bad-retro">jīn</span><span class="hanzi">今</span></div>
                 <div class="char-box"><span class="pinyin bad-an">tiān</span><span class="hanzi">天</span></div>` 
      },
      {
        "text": "是",
        "enemy_id": "VOW-shi",
        "html": `<div class="char-box"><span class="pinyin bad-retro">shì</span><span class="hanzi">是</span></div>`
      },
      { 
        "text": "星期天", 
        "enemy_id": "VOW-xi,VOW-ng,ROM-ian", 
        "html": `<div class="char-box"><span class="pinyin bad-front bad-ing">xīng</span><span class="hanzi">星</span></div>
                 <div class="char-box"><span class="pinyin">qī</span><span class="hanzi">期</span></div>
                 <div class="char-box"><span class="pinyin bad-an">tiān</span><span class="hanzi">天</span></div>` 
      },
      {
        "text": "天气",
        "enemy_id": "ROM-ian",
        "html": `<div class="char-box"><span class="pinyin bad-an">tiān</span><span class="hanzi">天</span></div>
                 <div class="char-box"><span class="pinyin">qì</span><span class="hanzi">气</span></div>`
      },
      {
        "text": "非常",
        "enemy_id": "VOW-ng",
        "html": `<div class="char-box"><span class="pinyin">fēi</span><span class="hanzi">非</span></div>
                 <div class="char-box"><span class="pinyin bad-retro bad-ing">cháng</span><span class="hanzi">常</span></div>`
      }
    ]
  },
  {
    "full_sentence": "你可以帮我买一杯热咖啡吗？",
    "japanese_translation": "私に温かいコーヒーを一杯買ってきてくれませんか？",
    "tip": "可(kě)・熱(rè)の『e』、杯(bēi)の『ei』音、および帮(bāng)の鼻音といった耳残りしやすい特徴的な音が満載です。",
    "html_content": `<div class="chunk-box" data-chunk-index="0">
      <div class="char-box"><span class="pinyin">nǐ</span><span class="hanzi">你</span></div>
      <div class="char-box"><span class="pinyin bad-e">kě</span><span class="hanzi">可</span></div>
      <div class="char-box"><span class="pinyin bad-retro">yǐ</span><span class="hanzi">以</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="1">
      <div class="char-box"><span class="pinyin bad-ing">bāng</span><span class="hanzi">帮</span></div>
      <div class="char-box"><span class="pinyin">wǒ</span><span class="hanzi">我</span></div>
      <div class="char-box"><span class="pinyin">mǎi</span><span class="hanzi">買</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="2">
      <div class="char-box"><span class="pinyin">yì</span><span class="hanzi">一</span></div>
      <div class="char-box"><span class="pinyin">bēi</span><span class="hanzi">杯</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="3">
      <div class="char-box"><span class="pinyin bad-retro bad-e">rè</span><span class="hanzi">热</span></div>
      <div class="char-box"><span class="pinyin">kā</span><span class="hanzi">咖</span></div>
      <div class="char-box"><span class="pinyin">fēi</span><span class="hanzi">啡</span></div>
      <div class="char-box"><span class="pinyin">ma</span><span class="hanzi">吗</span></div>
    </div>`,
    "chunks": [
      { "text": "你可以", "words": [{"word": "可以", "level": 1, "meaning": "〜できる"}] },
      { "text": "帮我买", "words": [{"word": "帮", "level": 2, "meaning": "手伝う/〜のために"}] },
      { "text": "一杯", "words": [{"word": "一杯", "level": 1, "meaning": "一杯"}] },
      { "text": "热咖啡吗", "words": [{"word": "热", "level": 2, "meaning": "熱い/温かい"}, {"word": "咖啡", "level": 1, "meaning": "コーヒー"}] }
    ],
    "vulnerable_targets": [
      { 
        "text": "可以", 
        "enemy_id": "ROM-e", 
        "html": `<div class="char-box"><span class="pinyin bad-e">kě</span><span class="hanzi">可</span></div>
                 <div class="char-box"><span class="pinyin bad-retro">yǐ</span><span class="hanzi">以</span></div>` 
      },
      {
        "text": "帮",
        "enemy_id": "VOW-ng",
        "html": `<div class="char-box"><span class="pinyin bad-ing">bāng</span><span class="hanzi">帮</span></div>`
      },
      { 
        "text": "热", 
        "enemy_id": "ROM-e,VOW-shi", 
        "html": `<div class="char-box"><span class="pinyin bad-retro bad-e">rè</span><span class="hanzi">热</span></div>` 
      }
    ]
  },
  {
    "full_sentence": "我喜欢在图书馆听音乐和看书。",
    "japanese_translation": "私は図書館で音楽を聴いたり本を読んだりするのが好きです。",
    "tip": "喜(xǐ)の『シー』音、書(shū)の強烈な巻き舌、楽(yuè)の『ü』省略などのトラップを順番に攻略します。",
    "html_content": `<div class="chunk-box" data-chunk-index="0">
      <div class="char-box"><span class="pinyin">wǒ</span><span class="hanzi">我</span></div>
      <div class="char-box"><span class="pinyin bad-front">xǐ</span><span class="hanzi">喜</span></div>
      <div class="char-box"><span class="pinyin">huan</span><span class="hanzi">欢</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="1">
      <div class="char-box"><span class="pinyin">zài</span><span class="hanzi">在</span></div>
      <div class="char-box"><span class="pinyin">tú</span><span class="hanzi">图</span></div>
      <div class="char-box"><span class="pinyin bad-retro">shū</span><span class="hanzi">书</span></div>
      <div class="char-box"><span class="pinyin">guǎn</span><span class="hanzi">馆</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="2">
      <div class="char-box"><span class="pinyin bad-ing">tīng</span><span class="hanzi">听</span></div>
      <div class="char-box"><span class="pinyin">yīn</span><span class="hanzi">音</span></div>
      <div class="char-box"><span class="pinyin bad-retro">yuè</span><span class="hanzi">乐</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="3">
      <div class="char-box"><span class="pinyin bad-e">hé</span><span class="hanzi">和</span></div>
      <div class="char-box"><span class="pinyin">kàn</span><span class="hanzi">看</span></div>
      <div class="char-box"><span class="pinyin bad-retro">shū</span><span class="hanzi">书</span></div>
    </div>`,
    "chunks": [
      { "text": "我喜欢", "words": [{"word": "喜欢", "level": 1, "meaning": "好む/好き"}] },
      { "text": "在图书馆", "words": [{"word": "图书馆", "level": 2, "meaning": "図書館"}] },
      { "text": "听音乐", "words": [{"word": "听", "level": 1, "meaning": "聴く"}, {"word": "音乐", "level": 2, "meaning": "音楽"}] },
      { "text": "和看书", "words": [{"word": "看书", "level": 1, "meaning": "読書する"}] }
    ],
    "vulnerable_targets": [
      { 
        "text": "喜欢", 
        "enemy_id": "VOW-xi", 
        "html": `<div class="char-box"><span class="pinyin bad-front">xǐ</span><span class="hanzi">喜</span></div>
                 <div class="char-box"><span class="pinyin">huan</span><span class="hanzi">欢</span></div>` 
      },
      {
        "text": "图书馆",
        "enemy_id": "VOW-shi",
        "html": `<div class="char-box"><span class="pinyin">tú</span><span class="hanzi">图</span></div>
                 <div class="char-box"><span class="pinyin bad-retro">shū</span><span class="hanzi">书</span></div>
                 <div class="char-box"><span class="pinyin">guǎn</span><span class="hanzi">馆</span></div>`
      },
      { 
        "text": "听音乐", 
        "enemy_id": "VOW-ng,ROM-ü", 
        "html": `<div class="char-box"><span class="pinyin bad-ing">tīng</span><span class="hanzi">听</span></div>
                 <div class="char-box"><span class="pinyin">yīn</span><span class="hanzi">音</span></div>
                 <div class="char-box"><span class="pinyin bad-retro">yuè</span><span class="hanzi">乐</span></div>` 
      },
      {
        "text": "和",
        "enemy_id": "ROM-e",
        "html": `<div class="char-box"><span class="pinyin bad-e">hé</span><span class="hanzi">和</span></div>`
      },
      { 
        "text": "看书", 
        "enemy_id": "VOW-shi", 
        "html": `<div class="char-box"><span class="pinyin">kàn</span><span class="hanzi">看</span></div>
                 <div class="char-box"><span class="pinyin bad-retro">shū</span><span class="hanzi">书</span></div>` 
      }
    ]
  },
  {
    "full_sentence": "这个汉字怎么写？我不太清楚。",
    "japanese_translation": "この漢字はどう書きますか？私はあまりよく分かりません。",
    "tip": "這(zhè)の巻き舌＋『e』、字(zì)の『ズ』に近い空母音、写(xiě)の『イェン』音、清(qīng)の『チー』に近い無気音と鼻音の組み合わせなど、高難度の罠ピンイン満載です。",
    "html_content": `<div class="chunk-box" data-chunk-index="0">
      <div class="char-box"><span class="pinyin bad-retro bad-e">zhè</span><span class="hanzi">这</span></div>
      <div class="char-box"><span class="pinyin bad-e">ge</span><span class="hanzi">个</span></div>
      <div class="char-box"><span class="pinyin">hàn</span><span class="hanzi">汉</span></div>
      <div class="char-box"><span class="pinyin bad-retro">zì</span><span class="hanzi">字</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="1">
      <div class="char-box"><span class="pinyin bad-retro bad-e">zěn</span><span class="hanzi">怎</span></div>
      <div class="char-box"><span class="pinyin bad-e">me</span><span class="hanzi">么</span></div>
      <div class="char-box"><span class="pinyin bad-front bad-an">xiě</span><span class="hanzi">写</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="2">
      <div class="char-box"><span class="pinyin">wǒ</span><span class="hanzi">我</span></div>
      <div class="char-box"><span class="pinyin">bú</span><span class="hanzi">不</span></div>
      <div class="char-box"><span class="pinyin">tài</span><span class="hanzi">太</span></div>
      <div class="char-box"><span class="pinyin bad-retro bad-ing">qīng</span><span class="hanzi">清</span></div>
      <div class="char-box"><span class="pinyin bad-retro">chu</span><span class="hanzi">楚</span></div>
    </div>`,
    "chunks": [
      { "text": "这个汉字", "words": [{"word": "汉字", "level": 3, "meaning": "漢字"}] },
      { "text": "怎么写", "words": [{"word": "怎么", "level": 1, "meaning": "どうやって"}, {"word": "写", "level": 1, "meaning": "書く"}] },
      { "text": "我不太清楚", "words": [{"word": "清楚", "level": 3, "meaning": "はっきりと理解している"}] }
    ],
    "vulnerable_targets": [
      { 
        "text": "这个", 
        "enemy_id": "ROM-e,VOW-zhi", 
        "html": `<div class="char-box"><span class="pinyin bad-retro bad-e">zhè</span><span class="hanzi">这</span></div>
                 <div class="char-box"><span class="pinyin bad-e">ge</span><span class="hanzi">个</span></div>` 
      },
      { 
        "text": "汉字", 
        "enemy_id": "VOW-zi", 
        "html": `<div class="char-box"><span class="pinyin">hàn</span><span class="hanzi">汉</span></div>
                 <div class="char-box"><span class="pinyin bad-retro">zì</span><span class="hanzi">字</span></div>` 
      },
      { 
        "text": "怎么", 
        "enemy_id": "VOW-zi,ROM-e", 
        "html": `<div class="char-box"><span class="pinyin bad-retro bad-e">zěn</span><span class="hanzi">怎</span></div>
                 <div class="char-box"><span class="pinyin bad-e">me</span><span class="hanzi">么</span></div>` 
      },
      {
        "text": "写",
        "enemy_id": "ROM-ian,VOW-xi",
        "html": `<div class="char-box"><span class="pinyin bad-front bad-an">xiě</span><span class="hanzi">写</span></div>`
      },
      { 
        "text": "清楚", 
        "enemy_id": "VOW-ng,VOW-shi", 
        "html": `<div class="char-box"><span class="pinyin bad-retro bad-ing">qīng</span><span class="hanzi">清</span></div>
                 <div class="char-box"><span class="pinyin bad-retro">chu</span><span class="hanzi">楚</span></div>` 
      }
    ]
  },
  {
    "full_sentence": "我每天早上喝一杯热咖啡。",
    "japanese_translation": "私は毎朝、コーヒーを一杯飲みます。",
    "tip": "天(tiān)の『イェン』音、上(shàng)の巻き舌＋鼻音、喝(hē)と热(rè)の両方にこもる『e』の罠が集中しています。",
    "html_content": `<div class="chunk-box" data-chunk-index="0">
      <div class="char-box"><span class="pinyin">wǒ</span><span class="hanzi">我</span></div>
      <div class="char-box"><span class="pinyin">měi</span><span class="hanzi">每</span></div>
      <div class="char-box"><span class="pinyin bad-an">tiān</span><span class="hanzi">天</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="1">
      <div class="char-box"><span class="pinyin">zǎo</span><span class="hanzi">早</span></div>
      <div class="char-box"><span class="pinyin bad-retro bad-ing">shàng</span><span class="hanzi">上</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="2">
      <div class="char-box"><span class="pinyin bad-e">hē</span><span class="hanzi">喝</span></div>
      <div class="char-box"><span class="pinyin">yì</span><span class="hanzi">一</span></div>
      <div class="char-box"><span class="pinyin">bēi</span><span class="hanzi">杯</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="3">
      <div class="char-box"><span class="pinyin bad-retro bad-e">rè</span><span class="hanzi">热</span></div>
      <div class="char-box"><span class="pinyin">kā</span><span class="hanzi">咖</span></div>
      <div class="char-box"><span class="pinyin">fēi</span><span class="hanzi">啡</span></div>
    </div>`,
    "chunks": [
      { "text": "我每天", "words": [{"word": "每天", "level": 1, "meaning": "毎日"}] },
      { "text": "早上", "words": [{"word": "早上", "level": 1, "meaning": "朝"}] },
      { "text": "喝一杯", "words": [{"word": "喝", "level": 1, "meaning": "飲む"}] },
      { "text": "热咖啡", "words": [{"word": "咖啡", "level": 1, "meaning": "コーヒー"}, {"word": "热", "level": 2, "meaning": "熱い/温かい"}] }
    ],
    "vulnerable_targets": [
      {
        "text": "每天",
        "enemy_id": "ROM-ian",
        "html": `<div class="char-box"><span class="pinyin">měi</span><span class="hanzi">每</span></div>
                 <div class="char-box"><span class="pinyin bad-an">tiān</span><span class="hanzi">天</span></div>`
      },
      {
        "text": "早上",
        "enemy_id": "VOW-shi,VOW-ng",
        "html": `<div class="char-box"><span class="pinyin">zǎo</span><span class="hanzi">早</span></div>
                 <div class="char-box"><span class="pinyin bad-retro bad-ing">shàng</span><span class="hanzi">上</span></div>`
      },
      {
        "text": "喝",
        "enemy_id": "ROM-e",
        "html": `<div class="char-box"><span class="pinyin bad-e">hē</span><span class="hanzi">喝</span></div>`
      },
      {
        "text": "热咖啡",
        "enemy_id": "ROM-e,VOW-shi",
        "html": `<div class="char-box"><span class="pinyin bad-retro bad-e">rè</span><span class="hanzi">热</span></div>
                 <div class="char-box"><span class="pinyin">kā</span><span class="hanzi">咖</span></div>
                 <div class="char-box"><span class="pinyin">fēi</span><span class="hanzi">啡</span></div>`
      }
    ]
  },
  {
    "full_sentence": "他学了两年中文，说得非常好。",
    "japanese_translation": "彼は2年間中国語を学んで、とても上手に話せます。",
    "tip": "学(xué)の前舌音、年(nián)の『イェン』省略、中(zhōng)の巻き舌＋鼻音、说(shuō)と得(de)の発音のギャップが難所です。",
    "html_content": `<div class="chunk-box" data-chunk-index="0">
      <div class="char-box"><span class="pinyin">tā</span><span class="hanzi">他</span></div>
      <div class="char-box"><span class="pinyin bad-front">xué</span><span class="hanzi">学</span></div>
      <div class="char-box"><span class="pinyin">le</span><span class="hanzi">了</span></div>
      <div class="char-box"><span class="pinyin">liǎng</span><span class="hanzi">两</span></div>
      <div class="char-box"><span class="pinyin bad-an">nián</span><span class="hanzi">年</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="1">
      <div class="char-box"><span class="pinyin bad-retro bad-ing">zhōng</span><span class="hanzi">中</span></div>
      <div class="char-box"><span class="pinyin">wén</span><span class="hanzi">文</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="2">
      <div class="char-box"><span class="pinyin bad-retro">shuō</span><span class="hanzi">说</span></div>
      <div class="char-box"><span class="pinyin bad-e">de</span><span class="hanzi">得</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="3">
      <div class="char-box"><span class="pinyin">fēi</span><span class="hanzi">非</span></div>
      <div class="char-box"><span class="pinyin bad-retro bad-ing">cháng</span><span class="hanzi">常</span></div>
      <div class="char-box"><span class="pinyin">hǎo</span><span class="hanzi">好</span></div>
    </div>`,
    "chunks": [
      { "text": "他学了两年", "words": [{"word": "两年", "level": 2, "meaning": "2年間"}, {"word": "学", "level": 1, "meaning": "学ぶ"}] },
      { "text": "中文", "words": [{"word": "中文", "level": 1, "meaning": "中国語"}] },
      { "text": "说得", "words": [{"word": "说", "level": 1, "meaning": "話す"}] },
      { "text": "非常好", "words": [{"word": "非常", "level": 2, "meaning": "非常に"}] }
    ],
    "vulnerable_targets": [
      {
        "text": "学",
        "enemy_id": "ROM-ü,VOW-xi",
        "html": `<div class="char-box"><span class="pinyin bad-front">xué</span><span class="hanzi">学</span></div>`
      },
      {
        "text": "两年",
        "enemy_id": "ROM-ian",
        "html": `<div class="char-box"><span class="pinyin">liǎng</span><span class="hanzi">两</span></div>
                 <div class="char-box"><span class="pinyin bad-an">nián</span><span class="hanzi">年</span></div>`
      },
      {
        "text": "中文",
        "enemy_id": "VOW-zhi,VOW-ng",
        "html": `<div class="char-box"><span class="pinyin bad-retro bad-ing">zhōng</span><span class="hanzi">中</span></div>
                 <div class="char-box"><span class="pinyin bad-retro">wén</span><span class="hanzi">文</span></div>`
      },
      {
        "text": "说得",
        "enemy_id": "VOW-shi,ROM-e",
        "html": `<div class="char-box"><span class="pinyin bad-retro">shuō</span><span class="hanzi">说</span></div>
                 <div class="char-box"><span class="pinyin bad-e">de</span><span class="hanzi">得</span></div>`
      },
      {
        "text": "非常",
        "enemy_id": "VOW-ng,VOW-shi",
        "html": `<div class="char-box"><span class="pinyin">fēi</span><span class="hanzi">非</span></div>
                 <div class="char-box"><span class="pinyin bad-retro bad-ing">cháng</span><span class="hanzi">常</span></div>`
      }
    ]
  },
  {
    "full_sentence": "这件事很重要，请认真考虑。",
    "japanese_translation": "この件はとても重要です、真剣に考えてください。",
    "tip": "这(zhè)の巻き舌＋e、件(jiàn)の『イェン』、重(zhòng)の巻き舌＋鼻音、请(qǐng)の鼻音終わりと虑(lǜ)のüが難所です。",
    "html_content": `<div class="chunk-box" data-chunk-index="0">
      <div class="char-box"><span class="pinyin bad-retro bad-e">zhè</span><span class="hanzi">这</span></div>
      <div class="char-box"><span class="pinyin bad-retro bad-an">jiàn</span><span class="hanzi">件</span></div>
      <div class="char-box"><span class="pinyin bad-retro">shì</span><span class="hanzi">事</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="1">
      <div class="char-box"><span class="pinyin">hěn</span><span class="hanzi">很</span></div>
      <div class="char-box"><span class="pinyin bad-retro bad-ing">zhòng</span><span class="hanzi">重</span></div>
      <div class="char-box"><span class="pinyin">yào</span><span class="hanzi">要</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="2">
      <div class="char-box"><span class="pinyin bad-retro bad-ing">qǐng</span><span class="hanzi">请</span></div>
      <div class="char-box"><span class="pinyin bad-retro">rèn</span><span class="hanzi">认</span></div>
      <div class="char-box"><span class="pinyin bad-retro">zhēn</span><span class="hanzi">真</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="3">
      <div class="char-box"><span class="pinyin">kǎo</span><span class="hanzi">考</span></div>
      <div class="char-box"><span class="pinyin bad-retro">lǜ</span><span class="hanzi">虑</span></div>
    </div>`,
    "chunks": [
      { "text": "这件事", "words": [{"word": "件事", "level": 2, "meaning": "この件"}] },
      { "text": "很重要", "words": [{"word": "重要", "level": 2, "meaning": "重要である"}] },
      { "text": "请认真", "words": [{"word": "认真", "level": 2, "meaning": "真剣に"}] },
      { "text": "考虑", "words": [{"word": "考虑", "level": 3, "meaning": "考える/検討する"}] }
    ],
    "vulnerable_targets": [
      {
        "text": "这件",
        "enemy_id": "ROM-e,VOW-zhi,ROM-ian,VOW-ji",
        "html": `<div class="char-box"><span class="pinyin bad-retro bad-e">zhè</span><span class="hanzi">这</span></div>
                 <div class="char-box"><span class="pinyin bad-retro bad-an">jiàn</span><span class="hanzi">件</span></div>`
      },
      {
        "text": "事",
        "enemy_id": "VOW-shi",
        "html": `<div class="char-box"><span class="pinyin bad-retro">shì</span><span class="hanzi">事</span></div>`
      },
      {
        "text": "重要",
        "enemy_id": "VOW-zhi,VOW-ng",
        "html": `<div class="char-box"><span class="pinyin bad-retro bad-ing">zhòng</span><span class="hanzi">重</span></div>
                 <div class="char-box"><span class="pinyin">yào</span><span class="hanzi">要</span></div>`
      },
      {
        "text": "请",
        "enemy_id": "VOW-ng,VOW-ji",
        "html": `<div class="char-box"><span class="pinyin bad-retro bad-ing">qǐng</span><span class="hanzi">请</span></div>`
      },
      {
        "text": "认真",
        "enemy_id": "VOW-shi",
        "html": `<div class="char-box"><span class="pinyin bad-retro">rèn</span><span class="hanzi">认</span></div>
                 <div class="char-box"><span class="pinyin bad-retro">zhēn</span><span class="hanzi">真</span></div>`
      },
      {
        "text": "考虑",
        "enemy_id": "ROM-ü",
        "html": `<div class="char-box"><span class="pinyin">kǎo</span><span class="hanzi">考</span></div>
                 <div class="char-box"><span class="pinyin bad-retro">lǜ</span><span class="hanzi">虑</span></div>`
      }
    ]
  },
  {
    "full_sentence": "我想买一条新裤子，有便宜的吗？",
    "japanese_translation": "新しいズボンを買いたいのですが、安いものはありますか？",
    "tip": "想(xiǎng)の前舌面音＋鼻音、裤(kù)のüに近い発音、子(zi)の空母音、便(pián)の『イェン』が混在します。",
    "html_content": `<div class="chunk-box" data-chunk-index="0">
      <div class="char-box"><span class="pinyin">wǒ</span><span class="hanzi">我</span></div>
      <div class="char-box"><span class="pinyin bad-front bad-ing">xiǎng</span><span class="hanzi">想</span></div>
      <div class="char-box"><span class="pinyin">mǎi</span><span class="hanzi">买</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="1">
      <div class="char-box"><span class="pinyin">yì</span><span class="hanzi">一</span></div>
      <div class="char-box"><span class="pinyin">tiáo</span><span class="hanzi">条</span></div>
      <div class="char-box"><span class="pinyin bad-front">xīn</span><span class="hanzi">新</span></div>
      <div class="char-box"><span class="pinyin">kù</span><span class="hanzi">裤</span></div>
      <div class="char-box"><span class="pinyin bad-retro">zi</span><span class="hanzi">子</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="2">
      <div class="char-box"><span class="pinyin">yǒu</span><span class="hanzi">有</span></div>
      <div class="char-box"><span class="pinyin bad-an">pián</span><span class="hanzi">便</span></div>
      <div class="char-box"><span class="pinyin">yí</span><span class="hanzi">宜</span></div>
      <div class="char-box"><span class="pinyin bad-e">de</span><span class="hanzi">的</span></div>
      <div class="char-box"><span class="pinyin">ma</span><span class="hanzi">吗</span></div>
    </div>`,
    "chunks": [
      { "text": "我想买", "words": [{"word": "想", "level": 1, "meaning": "〜したい"}] },
      { "text": "一条新裤子", "words": [{"word": "裤子", "level": 2, "meaning": "ズボン"}, {"word": "新", "level": 1, "meaning": "新しい"}] },
      { "text": "有便宜的吗", "words": [{"word": "便宜", "level": 2, "meaning": "安い"}] }
    ],
    "vulnerable_targets": [
      {
        "text": "想",
        "enemy_id": "VOW-xi,VOW-ng",
        "html": `<div class="char-box"><span class="pinyin bad-front bad-ing">xiǎng</span><span class="hanzi">想</span></div>`
      },
      {
        "text": "新",
        "enemy_id": "VOW-xi",
        "html": `<div class="char-box"><span class="pinyin bad-front">xīn</span><span class="hanzi">新</span></div>`
      },
      {
        "text": "子",
        "enemy_id": "VOW-zi",
        "html": `<div class="char-box"><span class="pinyin bad-retro">zi</span><span class="hanzi">子</span></div>`
      },
      {
        "text": "便宜",
        "enemy_id": "ROM-ian",
        "html": `<div class="char-box"><span class="pinyin bad-an">pián</span><span class="hanzi">便</span></div>
                 <div class="char-box"><span class="pinyin">yí</span><span class="hanzi">宜</span></div>`
      }
    ]
  },
  {
    "full_sentence": "今年冬天特别冷，要多穿衣服。",
    "japanese_translation": "今年の冬は特に寒いので、たくさん着こんでください。",
    "tip": "年(nián)の『イェン』、冬(dōng)と冷(lěng)の鼻音終わり、天(tiān)の『イェン』が重なる鼻音＋ian頻出文です。",
    "html_content": `<div class="chunk-box" data-chunk-index="0">
      <div class="char-box"><span class="pinyin bad-retro">jīn</span><span class="hanzi">今</span></div>
      <div class="char-box"><span class="pinyin bad-an">nián</span><span class="hanzi">年</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="1">
      <div class="char-box"><span class="pinyin bad-ing">dōng</span><span class="hanzi">冬</span></div>
      <div class="char-box"><span class="pinyin bad-an">tiān</span><span class="hanzi">天</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="2">
      <div class="char-box"><span class="pinyin">tè</span><span class="hanzi">特</span></div>
      <div class="char-box"><span class="pinyin">bié</span><span class="hanzi">别</span></div>
      <div class="char-box"><span class="pinyin bad-ing">lěng</span><span class="hanzi">冷</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="3">
      <div class="char-box"><span class="pinyin">yào</span><span class="hanzi">要</span></div>
      <div class="char-box"><span class="pinyin">duō</span><span class="hanzi">多</span></div>
      <div class="char-box"><span class="pinyin bad-retro">chuān</span><span class="hanzi">穿</span></div>
      <div class="char-box"><span class="pinyin">yī</span><span class="hanzi">衣</span></div>
      <div class="char-box"><span class="pinyin">fu</span><span class="hanzi">服</span></div>
    </div>`,
    "chunks": [
      { "text": "今年", "words": [{"word": "今年", "level": 1, "meaning": "今年"}] },
      { "text": "冬天", "words": [{"word": "冬天", "level": 1, "meaning": "冬"}] },
      { "text": "特别冷", "words": [{"word": "特别", "level": 2, "meaning": "特に"}] },
      { "text": "要多穿衣服", "words": [{"word": "穿", "level": 2, "meaning": "着る"}, {"word": "衣服", "level": 1, "meaning": "服"}] }
    ],
    "vulnerable_targets": [
      {
        "text": "今年",
        "enemy_id": "VOW-ji,ROM-ian",
        "html": `<div class="char-box"><span class="pinyin bad-retro">jīn</span><span class="hanzi">今</span></div>
                 <div class="char-box"><span class="pinyin bad-an">nián</span><span class="hanzi">年</span></div>`
      },
      {
        "text": "冬天",
        "enemy_id": "VOW-ng,ROM-ian",
        "html": `<div class="char-box"><span class="pinyin bad-ing">dōng</span><span class="hanzi">冬</span></div>
                 <div class="char-box"><span class="pinyin bad-an">tiān</span><span class="hanzi">天</span></div>`
      },
      {
        "text": "冷",
        "enemy_id": "VOW-ng",
        "html": `<div class="char-box"><span class="pinyin bad-ing">lěng</span><span class="hanzi">冷</span></div>`
      },
      {
        "text": "穿",
        "enemy_id": "VOW-shi",
        "html": `<div class="char-box"><span class="pinyin bad-retro">chuān</span><span class="hanzi">穿</span></div>`
      }
    ]
  },
  {
    "full_sentence": "她学汉语已经三年了，进步很快。",
    "japanese_translation": "彼女は中国語を学び始めてもう3年が経ち、上達がとても速いです。",
    "tip": "学(xué)の前舌音、语(yǔ)のü、年(nián)の『イェン』、进(jìn)のj音に要注意。「学」と「习」の違いにも注目です。",
    "html_content": `<div class="chunk-box" data-chunk-index="0">
      <div class="char-box"><span class="pinyin">tā</span><span class="hanzi">她</span></div>
      <div class="char-box"><span class="pinyin bad-front">xué</span><span class="hanzi">学</span></div>
      <div class="char-box"><span class="pinyin">hàn</span><span class="hanzi">汉</span></div>
      <div class="char-box"><span class="pinyin bad-retro">yǔ</span><span class="hanzi">语</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="1">
      <div class="char-box"><span class="pinyin">yǐ</span><span class="hanzi">已</span></div>
      <div class="char-box"><span class="pinyin bad-retro bad-ing">jīng</span><span class="hanzi">经</span></div>
      <div class="char-box"><span class="pinyin">sān</span><span class="hanzi">三</span></div>
      <div class="char-box"><span class="pinyin bad-an">nián</span><span class="hanzi">年</span></div>
      <div class="char-box"><span class="pinyin">le</span><span class="hanzi">了</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="2">
      <div class="char-box"><span class="pinyin bad-retro">jìn</span><span class="hanzi">进</span></div>
      <div class="char-box"><span class="pinyin">bù</span><span class="hanzi">步</span></div>
      <div class="char-box"><span class="pinyin">hěn</span><span class="hanzi">很</span></div>
      <div class="char-box"><span class="pinyin">kuài</span><span class="hanzi">快</span></div>
    </div>`,
    "chunks": [
      { "text": "她学汉语", "words": [{"word": "学", "level": 1, "meaning": "学ぶ"}, {"word": "汉语", "level": 1, "meaning": "中国語"}] },
      { "text": "已经三年了", "words": [{"word": "已经", "level": 2, "meaning": "すでに"}] },
      { "text": "进步很快", "words": [{"word": "进步", "level": 3, "meaning": "上達する"}] }
    ],
    "vulnerable_targets": [
      {
        "text": "学",
        "enemy_id": "ROM-ü,VOW-xi",
        "html": `<div class="char-box"><span class="pinyin bad-front">xué</span><span class="hanzi">学</span></div>`
      },
      {
        "text": "汉语",
        "enemy_id": "ROM-ü",
        "html": `<div class="char-box"><span class="pinyin">hàn</span><span class="hanzi">汉</span></div>
                 <div class="char-box"><span class="pinyin bad-retro">yǔ</span><span class="hanzi">语</span></div>`
      },
      {
        "text": "已经",
        "enemy_id": "VOW-ji,VOW-ng",
        "html": `<div class="char-box"><span class="pinyin">yǐ</span><span class="hanzi">已</span></div>
                 <div class="char-box"><span class="pinyin bad-retro bad-ing">jīng</span><span class="hanzi">经</span></div>`
      },
      {
        "text": "三年",
        "enemy_id": "ROM-ian",
        "html": `<div class="char-box"><span class="pinyin">sān</span><span class="hanzi">三</span></div>
                 <div class="char-box"><span class="pinyin bad-an">nián</span><span class="hanzi">年</span></div>`
      },
      {
        "text": "进步",
        "enemy_id": "VOW-ji",
        "html": `<div class="char-box"><span class="pinyin bad-retro">jìn</span><span class="hanzi">进</span></div>
                 <div class="char-box"><span class="pinyin">bù</span><span class="hanzi">步</span></div>`
      }
    ]
  },
  {
    "full_sentence": "我们的教室在二楼，容易找到。",
    "japanese_translation": "私たちの教室は2階にあり、見つけやすいです。",
    "tip": "教(jiào)のj音、室(shì)の巻き舌、容(róng)の鼻音終わりが揃う文です。易(yì)と楼(lóu)は比較的素直な発音です。",
    "html_content": `<div class="chunk-box" data-chunk-index="0">
      <div class="char-box"><span class="pinyin">wǒ</span><span class="hanzi">我</span></div>
      <div class="char-box"><span class="pinyin">men</span><span class="hanzi">们</span></div>
      <div class="char-box"><span class="pinyin bad-e">de</span><span class="hanzi">的</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="1">
      <div class="char-box"><span class="pinyin bad-retro">jiào</span><span class="hanzi">教</span></div>
      <div class="char-box"><span class="pinyin bad-retro">shì</span><span class="hanzi">室</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="2">
      <div class="char-box"><span class="pinyin">zài</span><span class="hanzi">在</span></div>
      <div class="char-box"><span class="pinyin">èr</span><span class="hanzi">二</span></div>
      <div class="char-box"><span class="pinyin">lóu</span><span class="hanzi">楼</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="3">
      <div class="char-box"><span class="pinyin bad-ing">róng</span><span class="hanzi">容</span></div>
      <div class="char-box"><span class="pinyin">yì</span><span class="hanzi">易</span></div>
      <div class="char-box"><span class="pinyin bad-retro">zhǎo</span><span class="hanzi">找</span></div>
      <div class="char-box"><span class="pinyin">dào</span><span class="hanzi">到</span></div>
    </div>`,
    "chunks": [
      { "text": "我们的", "words": [{"word": "我们", "level": 1, "meaning": "私たち"}] },
      { "text": "教室", "words": [{"word": "教室", "level": 1, "meaning": "教室"}] },
      { "text": "在二楼", "words": [{"word": "楼", "level": 2, "meaning": "階"}] },
      { "text": "容易找到", "words": [{"word": "容易", "level": 2, "meaning": "簡単な/易しい"}] }
    ],
    "vulnerable_targets": [
      {
        "text": "教室",
        "enemy_id": "VOW-ji,VOW-shi",
        "html": `<div class="char-box"><span class="pinyin bad-retro">jiào</span><span class="hanzi">教</span></div>
                 <div class="char-box"><span class="pinyin bad-retro">shì</span><span class="hanzi">室</span></div>`
      },
      {
        "text": "容易",
        "enemy_id": "VOW-ng",
        "html": `<div class="char-box"><span class="pinyin bad-ing">róng</span><span class="hanzi">容</span></div>
                 <div class="char-box"><span class="pinyin">yì</span><span class="hanzi">易</span></div>`
      },
      {
        "text": "找",
        "enemy_id": "VOW-zhi",
        "html": `<div class="char-box"><span class="pinyin bad-retro">zhǎo</span><span class="hanzi">找</span></div>`
      }
    ]
  },
  {
    "full_sentence": "他每天骑自行车去上班。",
    "japanese_translation": "彼は毎日自転車で通勤します。",
    "tip": "自(zì)と行(xíng)の空母音・前舌音、车(chē)の巻き舌＋e、去(qù)のü、上(shàng)の巻き舌＋鼻音が凝縮された一文です。",
    "html_content": `<div class="chunk-box" data-chunk-index="0">
      <div class="char-box"><span class="pinyin">tā</span><span class="hanzi">他</span></div>
      <div class="char-box"><span class="pinyin">měi</span><span class="hanzi">每</span></div>
      <div class="char-box"><span class="pinyin bad-an">tiān</span><span class="hanzi">天</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="1">
      <div class="char-box"><span class="pinyin">qí</span><span class="hanzi">骑</span></div>
      <div class="char-box"><span class="pinyin bad-retro">zì</span><span class="hanzi">自</span></div>
      <div class="char-box"><span class="pinyin bad-front bad-ing">xíng</span><span class="hanzi">行</span></div>
      <div class="char-box"><span class="pinyin bad-retro bad-e">chē</span><span class="hanzi">车</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="2">
      <div class="char-box"><span class="pinyin bad-retro">qù</span><span class="hanzi">去</span></div>
      <div class="char-box"><span class="pinyin bad-retro bad-ing">shàng</span><span class="hanzi">上</span></div>
      <div class="char-box"><span class="pinyin">bān</span><span class="hanzi">班</span></div>
    </div>`,
    "chunks": [
      { "text": "他每天", "words": [{"word": "每天", "level": 1, "meaning": "毎日"}] },
      { "text": "骑自行车", "words": [{"word": "自行车", "level": 2, "meaning": "自転車"}] },
      { "text": "去上班", "words": [{"word": "上班", "level": 2, "meaning": "出勤する"}] }
    ],
    "vulnerable_targets": [
      {
        "text": "每天",
        "enemy_id": "ROM-ian",
        "html": `<div class="char-box"><span class="pinyin">měi</span><span class="hanzi">每</span></div>
                 <div class="char-box"><span class="pinyin bad-an">tiān</span><span class="hanzi">天</span></div>`
      },
      {
        "text": "自行车",
        "enemy_id": "VOW-zi,VOW-xi,VOW-ng,ROM-e,VOW-shi",
        "html": `<div class="char-box"><span class="pinyin bad-retro">zì</span><span class="hanzi">自</span></div>
                 <div class="char-box"><span class="pinyin bad-front bad-ing">xíng</span><span class="hanzi">行</span></div>
                 <div class="char-box"><span class="pinyin bad-retro bad-e">chē</span><span class="hanzi">车</span></div>`
      },
      {
        "text": "去",
        "enemy_id": "ROM-ü",
        "html": `<div class="char-box"><span class="pinyin bad-retro">qù</span><span class="hanzi">去</span></div>`
      },
      {
        "text": "上班",
        "enemy_id": "VOW-ng,VOW-shi",
        "html": `<div class="char-box"><span class="pinyin bad-retro bad-ing">shàng</span><span class="hanzi">上</span></div>
                 <div class="char-box"><span class="pinyin">bān</span><span class="hanzi">班</span></div>`
      }
    ]
  },
  {
    "full_sentence": "你知道这家店的名字吗？",
    "japanese_translation": "あなたはこのお店の名前を知っていますか？",
    "tip": "知(zhī)の巻き舌、这(zhè)の巻き舌＋e、店(diàn)の『イェン』、名(míng)の鼻音、字(zì)の空母音が揃う濃縮文です。",
    "html_content": `<div class="chunk-box" data-chunk-index="0">
      <div class="char-box"><span class="pinyin">nǐ</span><span class="hanzi">你</span></div>
      <div class="char-box"><span class="pinyin bad-retro">zhī</span><span class="hanzi">知</span></div>
      <div class="char-box"><span class="pinyin">dào</span><span class="hanzi">道</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="1">
      <div class="char-box"><span class="pinyin bad-retro bad-e">zhè</span><span class="hanzi">这</span></div>
      <div class="char-box"><span class="pinyin">jiā</span><span class="hanzi">家</span></div>
      <div class="char-box"><span class="pinyin bad-an">diàn</span><span class="hanzi">店</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="2">
      <div class="char-box"><span class="pinyin bad-e">de</span><span class="hanzi">的</span></div>
      <div class="char-box"><span class="pinyin bad-ing">míng</span><span class="hanzi">名</span></div>
      <div class="char-box"><span class="pinyin bad-retro">zì</span><span class="hanzi">字</span></div>
      <div class="char-box"><span class="pinyin">ma</span><span class="hanzi">吗</span></div>
    </div>`,
    "chunks": [
      { "text": "你知道", "words": [{"word": "知道", "level": 1, "meaning": "知っている"}] },
      { "text": "这家店", "words": [{"word": "家", "level": 1, "meaning": "（量詞）軒"}] },
      { "text": "的名字吗", "words": [{"word": "名字", "level": 1, "meaning": "名前"}] }
    ],
    "vulnerable_targets": [
      {
        "text": "知道",
        "enemy_id": "VOW-zhi",
        "html": `<div class="char-box"><span class="pinyin bad-retro">zhī</span><span class="hanzi">知</span></div>
                 <div class="char-box"><span class="pinyin">dào</span><span class="hanzi">道</span></div>`
      },
      {
        "text": "这",
        "enemy_id": "ROM-e,VOW-zhi",
        "html": `<div class="char-box"><span class="pinyin bad-retro bad-e">zhè</span><span class="hanzi">这</span></div>`
      },
      {
        "text": "店",
        "enemy_id": "ROM-ian",
        "html": `<div class="char-box"><span class="pinyin bad-an">diàn</span><span class="hanzi">店</span></div>`
      },
      {
        "text": "名字",
        "enemy_id": "VOW-ng,VOW-zi",
        "html": `<div class="char-box"><span class="pinyin bad-ing">míng</span><span class="hanzi">名</span></div>
                 <div class="char-box"><span class="pinyin bad-retro">zì</span><span class="hanzi">字</span></div>`
      }
    ]
  },
  {
    "full_sentence": "我喜欢在周末爬山看风景。",
    "japanese_translation": "私は週末に山登りをして景色を見るのが好きです。",
    "tip": "喜(xǐ)の前舌音、周(zhōu)の巻き舌、风(fēng)と景(jǐng)の鼻音終わりが頻出。风景が両方とも鼻音なのに注意。",
    "html_content": `<div class="chunk-box" data-chunk-index="0">
      <div class="char-box"><span class="pinyin">wǒ</span><span class="hanzi">我</span></div>
      <div class="char-box"><span class="pinyin bad-front">xǐ</span><span class="hanzi">喜</span></div>
      <div class="char-box"><span class="pinyin">huan</span><span class="hanzi">欢</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="1">
      <div class="char-box"><span class="pinyin">zài</span><span class="hanzi">在</span></div>
      <div class="char-box"><span class="pinyin bad-retro bad-ing">zhōu</span><span class="hanzi">周</span></div>
      <div class="char-box"><span class="pinyin">mò</span><span class="hanzi">末</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="2">
      <div class="char-box"><span class="pinyin">pá</span><span class="hanzi">爬</span></div>
      <div class="char-box"><span class="pinyin bad-ing">shān</span><span class="hanzi">山</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="3">
      <div class="char-box"><span class="pinyin">kàn</span><span class="hanzi">看</span></div>
      <div class="char-box"><span class="pinyin bad-ing">fēng</span><span class="hanzi">风</span></div>
      <div class="char-box"><span class="pinyin bad-retro bad-ing">jǐng</span><span class="hanzi">景</span></div>
    </div>`,
    "chunks": [
      { "text": "我喜欢", "words": [{"word": "喜欢", "level": 1, "meaning": "好き"}] },
      { "text": "在周末", "words": [{"word": "周末", "level": 2, "meaning": "週末"}] },
      { "text": "爬山", "words": [{"word": "爬山", "level": 3, "meaning": "山登りをする"}] },
      { "text": "看风景", "words": [{"word": "风景", "level": 2, "meaning": "景色"}] }
    ],
    "vulnerable_targets": [
      {
        "text": "喜欢",
        "enemy_id": "VOW-xi",
        "html": `<div class="char-box"><span class="pinyin bad-front">xǐ</span><span class="hanzi">喜</span></div>
                 <div class="char-box"><span class="pinyin">huan</span><span class="hanzi">欢</span></div>`
      },
      {
        "text": "周末",
        "enemy_id": "VOW-zhi",
        "html": `<div class="char-box"><span class="pinyin bad-retro bad-ing">zhōu</span><span class="hanzi">周</span></div>
                 <div class="char-box"><span class="pinyin">mò</span><span class="hanzi">末</span></div>`
      },
      {
        "text": "风景",
        "enemy_id": "VOW-ng,VOW-ji",
        "html": `<div class="char-box"><span class="pinyin bad-ing">fēng</span><span class="hanzi">风</span></div>
                 <div class="char-box"><span class="pinyin bad-retro bad-ing">jǐng</span><span class="hanzi">景</span></div>`
      }
    ]
  },
  {
    "full_sentence": "这个问题不难，需要仔细思考。",
    "japanese_translation": "この問題は難しくありません、よく考える必要があります。",
    "tip": "这(zhè)のe＋巻き舌、问(wèn)の『ウェン』省略、需(xū)の前舌音、思(sī)の空母音が核となるトラップ文です。",
    "html_content": `<div class="chunk-box" data-chunk-index="0">
      <div class="char-box"><span class="pinyin bad-retro bad-e">zhè</span><span class="hanzi">这</span></div>
      <div class="char-box"><span class="pinyin bad-e">ge</span><span class="hanzi">个</span></div>
      <div class="char-box"><span class="pinyin bad-an">wèn</span><span class="hanzi">问</span></div>
      <div class="char-box"><span class="pinyin">tí</span><span class="hanzi">题</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="1">
      <div class="char-box"><span class="pinyin">bù</span><span class="hanzi">不</span></div>
      <div class="char-box"><span class="pinyin">nán</span><span class="hanzi">难</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="2">
      <div class="char-box"><span class="pinyin bad-front">xū</span><span class="hanzi">需</span></div>
      <div class="char-box"><span class="pinyin">yào</span><span class="hanzi">要</span></div>
      <div class="char-box"><span class="pinyin bad-retro">zǐ</span><span class="hanzi">仔</span></div>
      <div class="char-box"><span class="pinyin">xì</span><span class="hanzi">细</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="3">
      <div class="char-box"><span class="pinyin bad-retro">sī</span><span class="hanzi">思</span></div>
      <div class="char-box"><span class="pinyin">kǎo</span><span class="hanzi">考</span></div>
    </div>`,
    "chunks": [
      { "text": "这个问题", "words": [{"word": "问题", "level": 1, "meaning": "問題"}] },
      { "text": "不难", "words": [{"word": "难", "level": 2, "meaning": "難しい"}] },
      { "text": "需要仔细", "words": [{"word": "需要", "level": 3, "meaning": "必要がある"}, {"word": "仔细", "level": 3, "meaning": "丁寧に/よく"}] },
      { "text": "思考", "words": [{"word": "思考", "level": 3, "meaning": "考える"}] }
    ],
    "vulnerable_targets": [
      {
        "text": "这个",
        "enemy_id": "ROM-e,VOW-zhi",
        "html": `<div class="char-box"><span class="pinyin bad-retro bad-e">zhè</span><span class="hanzi">这</span></div>
                 <div class="char-box"><span class="pinyin bad-e">ge</span><span class="hanzi">个</span></div>`
      },
      {
        "text": "问题",
        "enemy_id": "ROM-un",
        "html": `<div class="char-box"><span class="pinyin bad-an">wèn</span><span class="hanzi">问</span></div>
                 <div class="char-box"><span class="pinyin">tí</span><span class="hanzi">题</span></div>`
      },
      {
        "text": "需要",
        "enemy_id": "ROM-ü,VOW-xi",
        "html": `<div class="char-box"><span class="pinyin bad-front">xū</span><span class="hanzi">需</span></div>
                 <div class="char-box"><span class="pinyin">yào</span><span class="hanzi">要</span></div>`
      },
      {
        "text": "思考",
        "enemy_id": "VOW-si",
        "html": `<div class="char-box"><span class="pinyin bad-retro">sī</span><span class="hanzi">思</span></div>
                 <div class="char-box"><span class="pinyin">kǎo</span><span class="hanzi">考</span></div>`
      }
    ]
  },
  {
    "full_sentence": "她是我最好的同学，认识了十年。",
    "japanese_translation": "彼女は私の一番仲の良いクラスメートで、知り合って10年になります。",
    "tip": "是(shì)の巻き舌、最(zuì)の『ウェイ』省略音、同(tóng)の鼻音、识(shí)の巻き舌、年(nián)の『イェン』と罠が連続します。",
    "html_content": `<div class="chunk-box" data-chunk-index="0">
      <div class="char-box"><span class="pinyin">tā</span><span class="hanzi">她</span></div>
      <div class="char-box"><span class="pinyin bad-retro">shì</span><span class="hanzi">是</span></div>
      <div class="char-box"><span class="pinyin">wǒ</span><span class="hanzi">我</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="1">
      <div class="char-box"><span class="pinyin bad-an">zuì</span><span class="hanzi">最</span></div>
      <div class="char-box"><span class="pinyin">hǎo</span><span class="hanzi">好</span></div>
      <div class="char-box"><span class="pinyin bad-e">de</span><span class="hanzi">的</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="2">
      <div class="char-box"><span class="pinyin bad-ing">tóng</span><span class="hanzi">同</span></div>
      <div class="char-box"><span class="pinyin bad-front">xué</span><span class="hanzi">学</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="3">
      <div class="char-box"><span class="pinyin bad-retro">rèn</span><span class="hanzi">认</span></div>
      <div class="char-box"><span class="pinyin bad-retro">shí</span><span class="hanzi">识</span></div>
      <div class="char-box"><span class="pinyin">le</span><span class="hanzi">了</span></div>
      <div class="char-box"><span class="pinyin bad-retro">shí</span><span class="hanzi">十</span></div>
      <div class="char-box"><span class="pinyin bad-an">nián</span><span class="hanzi">年</span></div>
    </div>`,
    "chunks": [
      { "text": "她是我", "words": [{"word": "是", "level": 1, "meaning": "〜です"}] },
      { "text": "最好的", "words": [{"word": "最", "level": 2, "meaning": "最も"}] },
      { "text": "同学", "words": [{"word": "同学", "level": 1, "meaning": "クラスメート"}] },
      { "text": "认识了十年", "words": [{"word": "认识", "level": 2, "meaning": "知り合い/知っている"}] }
    ],
    "vulnerable_targets": [
      {
        "text": "是",
        "enemy_id": "VOW-shi",
        "html": `<div class="char-box"><span class="pinyin bad-retro">shì</span><span class="hanzi">是</span></div>`
      },
      {
        "text": "最",
        "enemy_id": "ROM-ui",
        "html": `<div class="char-box"><span class="pinyin bad-an">zuì</span><span class="hanzi">最</span></div>`
      },
      {
        "text": "同学",
        "enemy_id": "VOW-ng,VOW-xi",
        "html": `<div class="char-box"><span class="pinyin bad-ing">tóng</span><span class="hanzi">同</span></div>
                 <div class="char-box"><span class="pinyin bad-front">xué</span><span class="hanzi">学</span></div>`
      },
      {
        "text": "认识",
        "enemy_id": "VOW-shi",
        "html": `<div class="char-box"><span class="pinyin bad-retro">rèn</span><span class="hanzi">认</span></div>
                 <div class="char-box"><span class="pinyin bad-retro">shí</span><span class="hanzi">识</span></div>`
      },
      {
        "text": "十年",
        "enemy_id": "VOW-shi,ROM-ian",
        "html": `<div class="char-box"><span class="pinyin bad-retro">shí</span><span class="hanzi">十</span></div>
                 <div class="char-box"><span class="pinyin bad-an">nián</span><span class="hanzi">年</span></div>`
      }
    ]
  },
  {
    "full_sentence": "请你帮我把窗户关上。",
    "japanese_translation": "窓を閉めてください。",
    "tip": "请(qǐng)・窗(chuāng)の両方が巻き舌＋鼻音で、帮(bāng)も鼻音、上(shàng)も巻き舌＋鼻音と、鼻音が4連続するハイレベル文です。",
    "html_content": `<div class="chunk-box" data-chunk-index="0">
      <div class="char-box"><span class="pinyin bad-retro bad-ing">qǐng</span><span class="hanzi">请</span></div>
      <div class="char-box"><span class="pinyin">nǐ</span><span class="hanzi">你</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="1">
      <div class="char-box"><span class="pinyin bad-ing">bāng</span><span class="hanzi">帮</span></div>
      <div class="char-box"><span class="pinyin">wǒ</span><span class="hanzi">我</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="2">
      <div class="char-box"><span class="pinyin">bǎ</span><span class="hanzi">把</span></div>
      <div class="char-box"><span class="pinyin bad-retro bad-ing">chuāng</span><span class="hanzi">窗</span></div>
      <div class="char-box"><span class="pinyin">hu</span><span class="hanzi">户</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="3">
      <div class="char-box"><span class="pinyin">guān</span><span class="hanzi">关</span></div>
      <div class="char-box"><span class="pinyin bad-retro bad-ing">shàng</span><span class="hanzi">上</span></div>
    </div>`,
    "chunks": [
      { "text": "请你", "words": [{"word": "请", "level": 1, "meaning": "〜してください"}] },
      { "text": "帮我", "words": [{"word": "帮", "level": 2, "meaning": "手伝う"}] },
      { "text": "把窗户", "words": [{"word": "窗户", "level": 2, "meaning": "窓"}] },
      { "text": "关上", "words": [{"word": "关上", "level": 2, "meaning": "閉める"}] }
    ],
    "vulnerable_targets": [
      {
        "text": "请",
        "enemy_id": "VOW-ng,VOW-ji",
        "html": `<div class="char-box"><span class="pinyin bad-retro bad-ing">qǐng</span><span class="hanzi">请</span></div>`
      },
      {
        "text": "帮",
        "enemy_id": "VOW-ng",
        "html": `<div class="char-box"><span class="pinyin bad-ing">bāng</span><span class="hanzi">帮</span></div>`
      },
      {
        "text": "窗户",
        "enemy_id": "VOW-ng,VOW-shi",
        "html": `<div class="char-box"><span class="pinyin bad-retro bad-ing">chuāng</span><span class="hanzi">窗</span></div>
                 <div class="char-box"><span class="pinyin">hu</span><span class="hanzi">户</span></div>`
      },
      {
        "text": "关上",
        "enemy_id": "VOW-ng,VOW-shi",
        "html": `<div class="char-box"><span class="pinyin">guān</span><span class="hanzi">关</span></div>
                 <div class="char-box"><span class="pinyin bad-retro bad-ing">shàng</span><span class="hanzi">上</span></div>`
      }
    ]
  },
  {
    "full_sentence": "他在银行工作了五年。",
    "japanese_translation": "彼は銀行で5年間働いています。",
    "tip": "行(háng)と工(gōng)の両方に鼻音終わり、年(nián)の『イェン』省略。シンプルに見えて鼻音の嵐です。",
    "html_content": `<div class="chunk-box" data-chunk-index="0">
      <div class="char-box"><span class="pinyin">tā</span><span class="hanzi">他</span></div>
      <div class="char-box"><span class="pinyin">zài</span><span class="hanzi">在</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="1">
      <div class="char-box"><span class="pinyin bad-ing">yín</span><span class="hanzi">银</span></div>
      <div class="char-box"><span class="pinyin bad-ing">háng</span><span class="hanzi">行</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="2">
      <div class="char-box"><span class="pinyin bad-ing">gōng</span><span class="hanzi">工</span></div>
      <div class="char-box"><span class="pinyin">zuò</span><span class="hanzi">作</span></div>
      <div class="char-box"><span class="pinyin">le</span><span class="hanzi">了</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="3">
      <div class="char-box"><span class="pinyin">wǔ</span><span class="hanzi">五</span></div>
      <div class="char-box"><span class="pinyin bad-an">nián</span><span class="hanzi">年</span></div>
    </div>`,
    "chunks": [
      { "text": "他在", "words": [{"word": "在", "level": 1, "meaning": "〜で/〜にいる"}] },
      { "text": "银行", "words": [{"word": "银行", "level": 1, "meaning": "銀行"}] },
      { "text": "工作了", "words": [{"word": "工作", "level": 1, "meaning": "仕事をする"}] },
      { "text": "五年", "words": [{"word": "五年", "level": 1, "meaning": "5年間"}] }
    ],
    "vulnerable_targets": [
      {
        "text": "银行",
        "enemy_id": "VOW-ng",
        "html": `<div class="char-box"><span class="pinyin bad-ing">yín</span><span class="hanzi">银</span></div>
                 <div class="char-box"><span class="pinyin bad-ing">háng</span><span class="hanzi">行</span></div>`
      },
      {
        "text": "工作",
        "enemy_id": "VOW-ng",
        "html": `<div class="char-box"><span class="pinyin bad-ing">gōng</span><span class="hanzi">工</span></div>
                 <div class="char-box"><span class="pinyin">zuò</span><span class="hanzi">作</span></div>`
      },
      {
        "text": "五年",
        "enemy_id": "ROM-ian",
        "html": `<div class="char-box"><span class="pinyin">wǔ</span><span class="hanzi">五</span></div>
                 <div class="char-box"><span class="pinyin bad-an">nián</span><span class="hanzi">年</span></div>`
      }
    ]
  },
  {
    "full_sentence": "我家附近有一个大超市。",
    "japanese_translation": "私の家の近くに大きなスーパーマーケットがあります。",
    "tip": "近(jìn)のj音、超(chāo)の巻き舌、市(shì)の巻き舌が並ぶ文。「超市」の両音が巻き舌同士なので聴き分けに注意。",
    "html_content": `<div class="chunk-box" data-chunk-index="0">
      <div class="char-box"><span class="pinyin">wǒ</span><span class="hanzi">我</span></div>
      <div class="char-box"><span class="pinyin">jiā</span><span class="hanzi">家</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="1">
      <div class="char-box"><span class="pinyin">fù</span><span class="hanzi">附</span></div>
      <div class="char-box"><span class="pinyin bad-retro">jìn</span><span class="hanzi">近</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="2">
      <div class="char-box"><span class="pinyin">yǒu</span><span class="hanzi">有</span></div>
      <div class="char-box"><span class="pinyin">yí</span><span class="hanzi">一</span></div>
      <div class="char-box"><span class="pinyin bad-e">ge</span><span class="hanzi">个</span></div>
      <div class="char-box"><span class="pinyin">dà</span><span class="hanzi">大</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="3">
      <div class="char-box"><span class="pinyin bad-retro">chāo</span><span class="hanzi">超</span></div>
      <div class="char-box"><span class="pinyin bad-retro">shì</span><span class="hanzi">市</span></div>
    </div>`,
    "chunks": [
      { "text": "我家", "words": [{"word": "家", "level": 1, "meaning": "家"}] },
      { "text": "附近", "words": [{"word": "附近", "level": 2, "meaning": "近く"}] },
      { "text": "有一个大", "words": [{"word": "有", "level": 1, "meaning": "ある/いる"}] },
      { "text": "超市", "words": [{"word": "超市", "level": 2, "meaning": "スーパーマーケット"}] }
    ],
    "vulnerable_targets": [
      {
        "text": "附近",
        "enemy_id": "VOW-ji",
        "html": `<div class="char-box"><span class="pinyin">fù</span><span class="hanzi">附</span></div>
                 <div class="char-box"><span class="pinyin bad-retro">jìn</span><span class="hanzi">近</span></div>`
      },
      {
        "text": "超市",
        "enemy_id": "VOW-shi",
        "html": `<div class="char-box"><span class="pinyin bad-retro">chāo</span><span class="hanzi">超</span></div>
                 <div class="char-box"><span class="pinyin bad-retro">shì</span><span class="hanzi">市</span></div>`
      }
    ]
  },
  {
    "full_sentence": "这件衣服太贵了，有便宜一点的吗？",
    "japanese_translation": "この服は高すぎます、もう少し安いものはありますか？",
    "tip": "这(zhè)のe＋巻き舌、件(jiàn)の『イェン』、贵(guì)の『ウェイ』省略、便(pián)と点(diǎn)の『イェン』が3連続します。",
    "html_content": `<div class="chunk-box" data-chunk-index="0">
      <div class="char-box"><span class="pinyin bad-retro bad-e">zhè</span><span class="hanzi">这</span></div>
      <div class="char-box"><span class="pinyin bad-retro bad-an">jiàn</span><span class="hanzi">件</span></div>
      <div class="char-box"><span class="pinyin">yī</span><span class="hanzi">衣</span></div>
      <div class="char-box"><span class="pinyin">fu</span><span class="hanzi">服</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="1">
      <div class="char-box"><span class="pinyin">tài</span><span class="hanzi">太</span></div>
      <div class="char-box"><span class="pinyin bad-an">guì</span><span class="hanzi">贵</span></div>
      <div class="char-box"><span class="pinyin">le</span><span class="hanzi">了</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="2">
      <div class="char-box"><span class="pinyin">yǒu</span><span class="hanzi">有</span></div>
      <div class="char-box"><span class="pinyin bad-an">pián</span><span class="hanzi">便</span></div>
      <div class="char-box"><span class="pinyin">yí</span><span class="hanzi">宜</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="3">
      <div class="char-box"><span class="pinyin">yì</span><span class="hanzi">一</span></div>
      <div class="char-box"><span class="pinyin bad-an">diǎn</span><span class="hanzi">点</span></div>
      <div class="char-box"><span class="pinyin bad-e">de</span><span class="hanzi">的</span></div>
      <div class="char-box"><span class="pinyin">ma</span><span class="hanzi">吗</span></div>
    </div>`,
    "chunks": [
      { "text": "这件衣服", "words": [{"word": "衣服", "level": 1, "meaning": "服"}] },
      { "text": "太贵了", "words": [{"word": "太...了", "level": 2, "meaning": "〜すぎる"}] },
      { "text": "有便宜", "words": [{"word": "便宜", "level": 2, "meaning": "安い"}] },
      { "text": "一点的吗", "words": [{"word": "一点", "level": 1, "meaning": "少し"}] }
    ],
    "vulnerable_targets": [
      {
        "text": "这件",
        "enemy_id": "ROM-e,VOW-zhi,ROM-ian,VOW-ji",
        "html": `<div class="char-box"><span class="pinyin bad-retro bad-e">zhè</span><span class="hanzi">这</span></div>
                 <div class="char-box"><span class="pinyin bad-retro bad-an">jiàn</span><span class="hanzi">件</span></div>`
      },
      {
        "text": "贵",
        "enemy_id": "ROM-ui",
        "html": `<div class="char-box"><span class="pinyin bad-an">guì</span><span class="hanzi">贵</span></div>`
      },
      {
        "text": "便宜",
        "enemy_id": "ROM-ian",
        "html": `<div class="char-box"><span class="pinyin bad-an">pián</span><span class="hanzi">便</span></div>
                 <div class="char-box"><span class="pinyin">yí</span><span class="hanzi">宜</span></div>`
      },
      {
        "text": "一点",
        "enemy_id": "ROM-ian",
        "html": `<div class="char-box"><span class="pinyin">yì</span><span class="hanzi">一</span></div>
                 <div class="char-box"><span class="pinyin bad-an">diǎn</span><span class="hanzi">点</span></div>`
      }
    ]
  },
  {
    "full_sentence": "我的手机没电了，需要充电。",
    "japanese_translation": "私のスマホの電池が切れてしまいました、充電が必要です。",
    "tip": "手(shǒu)の巻き舌、机(jī)のj音、电(diàn)の『イェン』が2回、需(xū)の前舌音、充(chōng)の巻き舌＋鼻音が連続します。",
    "html_content": `<div class="chunk-box" data-chunk-index="0">
      <div class="char-box"><span class="pinyin">wǒ</span><span class="hanzi">我</span></div>
      <div class="char-box"><span class="pinyin bad-e">de</span><span class="hanzi">的</span></div>
      <div class="char-box"><span class="pinyin bad-retro">shǒu</span><span class="hanzi">手</span></div>
      <div class="char-box"><span class="pinyin bad-retro">jī</span><span class="hanzi">机</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="1">
      <div class="char-box"><span class="pinyin">méi</span><span class="hanzi">没</span></div>
      <div class="char-box"><span class="pinyin bad-an">diàn</span><span class="hanzi">电</span></div>
      <div class="char-box"><span class="pinyin">le</span><span class="hanzi">了</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="2">
      <div class="char-box"><span class="pinyin bad-front">xū</span><span class="hanzi">需</span></div>
      <div class="char-box"><span class="pinyin">yào</span><span class="hanzi">要</span></div>
      <div class="char-box"><span class="pinyin bad-retro bad-ing">chōng</span><span class="hanzi">充</span></div>
      <div class="char-box"><span class="pinyin bad-an">diàn</span><span class="hanzi">电</span></div>
    </div>`,
    "chunks": [
      { "text": "我的手机", "words": [{"word": "手机", "level": 1, "meaning": "スマートフォン"}] },
      { "text": "没电了", "words": [{"word": "没电", "level": 2, "meaning": "電池が切れる"}] },
      { "text": "需要充电", "words": [{"word": "充电", "level": 2, "meaning": "充電する"}] }
    ],
    "vulnerable_targets": [
      {
        "text": "手机",
        "enemy_id": "VOW-shi,VOW-ji",
        "html": `<div class="char-box"><span class="pinyin bad-retro">shǒu</span><span class="hanzi">手</span></div>
                 <div class="char-box"><span class="pinyin bad-retro">jī</span><span class="hanzi">机</span></div>`
      },
      {
        "text": "没电",
        "enemy_id": "ROM-ian",
        "html": `<div class="char-box"><span class="pinyin">méi</span><span class="hanzi">没</span></div>
                 <div class="char-box"><span class="pinyin bad-an">diàn</span><span class="hanzi">电</span></div>`
      },
      {
        "text": "需要",
        "enemy_id": "ROM-ü,VOW-xi",
        "html": `<div class="char-box"><span class="pinyin bad-front">xū</span><span class="hanzi">需</span></div>
                 <div class="char-box"><span class="pinyin">yào</span><span class="hanzi">要</span></div>`
      },
      {
        "text": "充电",
        "enemy_id": "VOW-ng,ROM-ian",
        "html": `<div class="char-box"><span class="pinyin bad-retro bad-ing">chōng</span><span class="hanzi">充</span></div>
                 <div class="char-box"><span class="pinyin bad-an">diàn</span><span class="hanzi">电</span></div>`
      }
    ]
  },
  {
    "full_sentence": "他特别喜欢听中国音乐。",
    "japanese_translation": "彼は中国の音楽を聴くのが特に好きです。",
    "tip": "喜(xǐ)の前舌音、听(tīng)の鼻音、中(zhōng)の巻き舌＋鼻音と重要な天敵ピンインが凝縮されています。",
    "html_content": `<div class="chunk-box" data-chunk-index="0">
      <div class="char-box"><span class="pinyin">tā</span><span class="hanzi">他</span></div>
      <div class="char-box"><span class="pinyin">tè</span><span class="hanzi">特</span></div>
      <div class="char-box"><span class="pinyin">bié</span><span class="hanzi">别</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="1">
      <div class="char-box"><span class="pinyin bad-front">xǐ</span><span class="hanzi">喜</span></div>
      <div class="char-box"><span class="pinyin">huan</span><span class="hanzi">欢</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="2">
      <div class="char-box"><span class="pinyin bad-ing">tīng</span><span class="hanzi">听</span></div>
      <div class="char-box"><span class="pinyin bad-retro bad-ing">zhōng</span><span class="hanzi">中</span></div>
      <div class="char-box"><span class="pinyin bad-retro bad-an">guó</span><span class="hanzi">国</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="3">
      <div class="char-box"><span class="pinyin">yīn</span><span class="hanzi">音</span></div>
      <div class="char-box"><span class="pinyin bad-retro">yuè</span><span class="hanzi">乐</span></div>
    </div>`,
    "chunks": [
      { "text": "他特别", "words": [{"word": "特别", "level": 2, "meaning": "特に"}] },
      { "text": "喜欢", "words": [{"word": "喜欢", "level": 1, "meaning": "好き"}] },
      { "text": "听中国", "words": [{"word": "中国", "level": 1, "meaning": "中国"}] },
      { "text": "音乐", "words": [{"word": "音乐", "level": 2, "meaning": "音楽"}] }
    ],
    "vulnerable_targets": [
      {
        "text": "喜欢",
        "enemy_id": "VOW-xi",
        "html": `<div class="char-box"><span class="pinyin bad-front">xǐ</span><span class="hanzi">喜</span></div>
                 <div class="char-box"><span class="pinyin">huan</span><span class="hanzi">欢</span></div>`
      },
      {
        "text": "听",
        "enemy_id": "VOW-ng",
        "html": `<div class="char-box"><span class="pinyin bad-ing">tīng</span><span class="hanzi">听</span></div>`
      },
      {
        "text": "中国",
        "enemy_id": "VOW-zhi,VOW-ng",
        "html": `<div class="char-box"><span class="pinyin bad-retro bad-ing">zhōng</span><span class="hanzi">中</span></div>
                 <div class="char-box"><span class="pinyin bad-retro bad-an">guó</span><span class="hanzi">国</span></div>`
      },
      {
        "text": "音乐",
        "enemy_id": "ROM-ü",
        "html": `<div class="char-box"><span class="pinyin">yīn</span><span class="hanzi">音</span></div>
                 <div class="char-box"><span class="pinyin bad-retro">yuè</span><span class="hanzi">乐</span></div>`
      }
    ]
  },
  {
    "full_sentence": "今天作业很多，我需要认真做好。",
    "japanese_translation": "今日は宿題がたくさんあるので、しっかりやらないといけません。",
    "tip": "今(jīn)のj音、天(tiān)の『イェン』、需(xū)の前舌音、认(rèn)の巻き舌が並ぶ文です。作业の業(yè)も注意。",
    "html_content": `<div class="chunk-box" data-chunk-index="0">
      <div class="char-box"><span class="pinyin bad-retro">jīn</span><span class="hanzi">今</span></div>
      <div class="char-box"><span class="pinyin bad-an">tiān</span><span class="hanzi">天</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="1">
      <div class="char-box"><span class="pinyin bad-retro">zuò</span><span class="hanzi">作</span></div>
      <div class="char-box"><span class="pinyin bad-e">yè</span><span class="hanzi">业</span></div>
      <div class="char-box"><span class="pinyin">hěn</span><span class="hanzi">很</span></div>
      <div class="char-box"><span class="pinyin">duō</span><span class="hanzi">多</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="2">
      <div class="char-box"><span class="pinyin">wǒ</span><span class="hanzi">我</span></div>
      <div class="char-box"><span class="pinyin bad-front">xū</span><span class="hanzi">需</span></div>
      <div class="char-box"><span class="pinyin">yào</span><span class="hanzi">要</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="3">
      <div class="char-box"><span class="pinyin bad-retro">rèn</span><span class="hanzi">认</span></div>
      <div class="char-box"><span class="pinyin bad-retro">zhēn</span><span class="hanzi">真</span></div>
      <div class="char-box"><span class="pinyin bad-retro">zuò</span><span class="hanzi">做</span></div>
      <div class="char-box"><span class="pinyin">hǎo</span><span class="hanzi">好</span></div>
    </div>`,
    "chunks": [
      { "text": "今天", "words": [{"word": "今天", "level": 1, "meaning": "今日"}] },
      { "text": "作业很多", "words": [{"word": "作业", "level": 2, "meaning": "宿題"}] },
      { "text": "我需要", "words": [{"word": "需要", "level": 3, "meaning": "必要がある"}] },
      { "text": "认真做好", "words": [{"word": "认真", "level": 2, "meaning": "真剣に/しっかり"}] }
    ],
    "vulnerable_targets": [
      {
        "text": "今天",
        "enemy_id": "VOW-ji,ROM-ian",
        "html": `<div class="char-box"><span class="pinyin bad-retro">jīn</span><span class="hanzi">今</span></div>
                 <div class="char-box"><span class="pinyin bad-an">tiān</span><span class="hanzi">天</span></div>`
      },
      {
        "text": "作业",
        "enemy_id": "ROM-e",
        "html": `<div class="char-box"><span class="pinyin bad-retro">zuò</span><span class="hanzi">作</span></div>
                 <div class="char-box"><span class="pinyin bad-e">yè</span><span class="hanzi">业</span></div>`
      },
      {
        "text": "需要",
        "enemy_id": "ROM-ü,VOW-xi",
        "html": `<div class="char-box"><span class="pinyin bad-front">xū</span><span class="hanzi">需</span></div>
                 <div class="char-box"><span class="pinyin">yào</span><span class="hanzi">要</span></div>`
      },
      {
        "text": "认真",
        "enemy_id": "VOW-shi",
        "html": `<div class="char-box"><span class="pinyin bad-retro">rèn</span><span class="hanzi">认</span></div>
                 <div class="char-box"><span class="pinyin bad-retro">zhēn</span><span class="hanzi">真</span></div>`
      }
    ]
  },
  {
    "full_sentence": "昨天晚上我学习到十一点半。",
    "japanese_translation": "昨晩、私は11時半まで勉強しました。",
    "tip": "天(tiān)の『イェン』、上(shàng)の巻き舌＋鼻音、学(xué)と习(xí)の前舌音、十(shí)の巻き舌、点(diǎn)の『イェン』と難所が連続。",
    "html_content": `<div class="chunk-box" data-chunk-index="0">
      <div class="char-box"><span class="pinyin bad-retro">zuó</span><span class="hanzi">昨</span></div>
      <div class="char-box"><span class="pinyin bad-an">tiān</span><span class="hanzi">天</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="1">
      <div class="char-box"><span class="pinyin">wǎn</span><span class="hanzi">晚</span></div>
      <div class="char-box"><span class="pinyin bad-retro bad-ing">shàng</span><span class="hanzi">上</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="2">
      <div class="char-box"><span class="pinyin">wǒ</span><span class="hanzi">我</span></div>
      <div class="char-box"><span class="pinyin bad-front">xué</span><span class="hanzi">学</span></div>
      <div class="char-box"><span class="pinyin bad-front">xí</span><span class="hanzi">习</span></div>
      <div class="char-box"><span class="pinyin">dào</span><span class="hanzi">到</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="3">
      <div class="char-box"><span class="pinyin bad-retro">shí</span><span class="hanzi">十</span></div>
      <div class="char-box"><span class="pinyin">yī</span><span class="hanzi">一</span></div>
      <div class="char-box"><span class="pinyin bad-an">diǎn</span><span class="hanzi">点</span></div>
      <div class="char-box"><span class="pinyin">bàn</span><span class="hanzi">半</span></div>
    </div>`,
    "chunks": [
      { "text": "昨天", "words": [{"word": "昨天", "level": 1, "meaning": "昨日"}] },
      { "text": "晚上", "words": [{"word": "晚上", "level": 1, "meaning": "夜/晩"}] },
      { "text": "我学习到", "words": [{"word": "学习", "level": 1, "meaning": "勉強する"}] },
      { "text": "十一点半", "words": [{"word": "一点半", "level": 1, "meaning": "1時半"}] }
    ],
    "vulnerable_targets": [
      {
        "text": "昨天",
        "enemy_id": "ROM-ian",
        "html": `<div class="char-box"><span class="pinyin bad-retro">zuó</span><span class="hanzi">昨</span></div>
                 <div class="char-box"><span class="pinyin bad-an">tiān</span><span class="hanzi">天</span></div>`
      },
      {
        "text": "晚上",
        "enemy_id": "VOW-ng,VOW-shi",
        "html": `<div class="char-box"><span class="pinyin">wǎn</span><span class="hanzi">晚</span></div>
                 <div class="char-box"><span class="pinyin bad-retro bad-ing">shàng</span><span class="hanzi">上</span></div>`
      },
      {
        "text": "学习",
        "enemy_id": "ROM-ü,VOW-xi",
        "html": `<div class="char-box"><span class="pinyin bad-front">xué</span><span class="hanzi">学</span></div>
                 <div class="char-box"><span class="pinyin bad-front">xí</span><span class="hanzi">习</span></div>`
      },
      {
        "text": "十一点",
        "enemy_id": "VOW-shi,ROM-ian",
        "html": `<div class="char-box"><span class="pinyin bad-retro">shí</span><span class="hanzi">十</span></div>
                 <div class="char-box"><span class="pinyin">yī</span><span class="hanzi">一</span></div>
                 <div class="char-box"><span class="pinyin bad-an">diǎn</span><span class="hanzi">点</span></div>`
      }
    ]
  },
  {
    "full_sentence": "你最近身体怎么样？一切都好吗？",
    "japanese_translation": "最近、体の具合はどうですか？全て順調ですか？",
    "tip": "最(zuì)の『ウェイ』省略、近(jìn)のj音、身(shēn)の巻き舌、怎(zěn)の空母音＋e、么(me)のe、样(yàng)の鼻音が詰まっています。",
    "html_content": `<div class="chunk-box" data-chunk-index="0">
      <div class="char-box"><span class="pinyin">nǐ</span><span class="hanzi">你</span></div>
      <div class="char-box"><span class="pinyin bad-an">zuì</span><span class="hanzi">最</span></div>
      <div class="char-box"><span class="pinyin bad-retro">jìn</span><span class="hanzi">近</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="1">
      <div class="char-box"><span class="pinyin bad-retro">shēn</span><span class="hanzi">身</span></div>
      <div class="char-box"><span class="pinyin">tǐ</span><span class="hanzi">体</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="2">
      <div class="char-box"><span class="pinyin bad-retro bad-e">zěn</span><span class="hanzi">怎</span></div>
      <div class="char-box"><span class="pinyin bad-e">me</span><span class="hanzi">么</span></div>
      <div class="char-box"><span class="pinyin bad-ing">yàng</span><span class="hanzi">样</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="3">
      <div class="char-box"><span class="pinyin">yí</span><span class="hanzi">一</span></div>
      <div class="char-box"><span class="pinyin">qiè</span><span class="hanzi">切</span></div>
      <div class="char-box"><span class="pinyin">dōu</span><span class="hanzi">都</span></div>
      <div class="char-box"><span class="pinyin">hǎo</span><span class="hanzi">好</span></div>
      <div class="char-box"><span class="pinyin">ma</span><span class="hanzi">吗</span></div>
    </div>`,
    "chunks": [
      { "text": "你最近", "words": [{"word": "最近", "level": 2, "meaning": "最近"}] },
      { "text": "身体", "words": [{"word": "身体", "level": 2, "meaning": "体"}] },
      { "text": "怎么样", "words": [{"word": "怎么样", "level": 1, "meaning": "どうですか"}] },
      { "text": "一切都好吗", "words": [{"word": "一切", "level": 3, "meaning": "全て"}] }
    ],
    "vulnerable_targets": [
      {
        "text": "最近",
        "enemy_id": "ROM-ui,VOW-ji",
        "html": `<div class="char-box"><span class="pinyin bad-an">zuì</span><span class="hanzi">最</span></div>
                 <div class="char-box"><span class="pinyin bad-retro">jìn</span><span class="hanzi">近</span></div>`
      },
      {
        "text": "身体",
        "enemy_id": "VOW-shi",
        "html": `<div class="char-box"><span class="pinyin bad-retro">shēn</span><span class="hanzi">身</span></div>
                 <div class="char-box"><span class="pinyin">tǐ</span><span class="hanzi">体</span></div>`
      },
      {
        "text": "怎么样",
        "enemy_id": "VOW-zi,ROM-e,VOW-ng",
        "html": `<div class="char-box"><span class="pinyin bad-retro bad-e">zěn</span><span class="hanzi">怎</span></div>
                 <div class="char-box"><span class="pinyin bad-e">me</span><span class="hanzi">么</span></div>
                 <div class="char-box"><span class="pinyin bad-ing">yàng</span><span class="hanzi">样</span></div>`
      }
    ]
  },
  {
    "full_sentence": "我想吃一碗热汤面。",
    "japanese_translation": "温かいスープ麺を一杯食べたいです。",
    "tip": "想(xiǎng)の前舌音＋鼻音、吃(chī)の巻き舌、热(rè)のe＋巻き舌、汤(tāng)の鼻音、面(miàn)の『イェン』が全て揃う密度の高い文です。",
    "html_content": `<div class="chunk-box" data-chunk-index="0">
      <div class="char-box"><span class="pinyin">wǒ</span><span class="hanzi">我</span></div>
      <div class="char-box"><span class="pinyin bad-front bad-ing">xiǎng</span><span class="hanzi">想</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="1">
      <div class="char-box"><span class="pinyin bad-retro">chī</span><span class="hanzi">吃</span></div>
      <div class="char-box"><span class="pinyin">yì</span><span class="hanzi">一</span></div>
      <div class="char-box"><span class="pinyin">wǎn</span><span class="hanzi">碗</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="2">
      <div class="char-box"><span class="pinyin bad-retro bad-e">rè</span><span class="hanzi">热</span></div>
      <div class="char-box"><span class="pinyin bad-ing">tāng</span><span class="hanzi">汤</span></div>
      <div class="char-box"><span class="pinyin bad-an">miàn</span><span class="hanzi">面</span></div>
    </div>`,
    "chunks": [
      { "text": "我想", "words": [{"word": "想", "level": 1, "meaning": "〜したい"}] },
      { "text": "吃一碗", "words": [{"word": "碗", "level": 2, "meaning": "（量詞）杯/椀"}] },
      { "text": "热汤面", "words": [{"word": "汤面", "level": 3, "meaning": "スープ麺"}, {"word": "热", "level": 2, "meaning": "温かい"}] }
    ],
    "vulnerable_targets": [
      {
        "text": "想",
        "enemy_id": "VOW-xi,VOW-ng",
        "html": `<div class="char-box"><span class="pinyin bad-front bad-ing">xiǎng</span><span class="hanzi">想</span></div>`
      },
      {
        "text": "吃",
        "enemy_id": "VOW-shi",
        "html": `<div class="char-box"><span class="pinyin bad-retro">chī</span><span class="hanzi">吃</span></div>`
      },
      {
        "text": "热",
        "enemy_id": "ROM-e,VOW-shi",
        "html": `<div class="char-box"><span class="pinyin bad-retro bad-e">rè</span><span class="hanzi">热</span></div>`
      },
      {
        "text": "汤面",
        "enemy_id": "VOW-ng,ROM-ian",
        "html": `<div class="char-box"><span class="pinyin bad-ing">tāng</span><span class="hanzi">汤</span></div>
                 <div class="char-box"><span class="pinyin bad-an">miàn</span><span class="hanzi">面</span></div>`
      }
    ]
  },
  {
    "full_sentence": "她的名字很好听，叫李小英。",
    "japanese_translation": "彼女の名前はとても素敵で、李小英といいます。",
    "tip": "名(míng)・字(zì)・听(tīng)・英(yīng)の鼻音、小(xiǎo)の前舌音、字(zì)の空母音が組み合わさった文です。",
    "html_content": `<div class="chunk-box" data-chunk-index="0">
      <div class="char-box"><span class="pinyin">tā</span><span class="hanzi">她</span></div>
      <div class="char-box"><span class="pinyin bad-e">de</span><span class="hanzi">的</span></div>
      <div class="char-box"><span class="pinyin bad-ing">míng</span><span class="hanzi">名</span></div>
      <div class="char-box"><span class="pinyin bad-retro">zì</span><span class="hanzi">字</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="1">
      <div class="char-box"><span class="pinyin">hěn</span><span class="hanzi">很</span></div>
      <div class="char-box"><span class="pinyin">hǎo</span><span class="hanzi">好</span></div>
      <div class="char-box"><span class="pinyin bad-ing">tīng</span><span class="hanzi">听</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="2">
      <div class="char-box"><span class="pinyin">jiào</span><span class="hanzi">叫</span></div>
      <div class="char-box"><span class="pinyin">lǐ</span><span class="hanzi">李</span></div>
      <div class="char-box"><span class="pinyin bad-front">xiǎo</span><span class="hanzi">小</span></div>
      <div class="char-box"><span class="pinyin bad-ing">yīng</span><span class="hanzi">英</span></div>
    </div>`,
    "chunks": [
      { "text": "她的名字", "words": [{"word": "名字", "level": 1, "meaning": "名前"}] },
      { "text": "很好听", "words": [{"word": "好听", "level": 2, "meaning": "聴き心地がいい"}] },
      { "text": "叫李小英", "words": [{"word": "叫", "level": 1, "meaning": "〜という名前だ"}] }
    ],
    "vulnerable_targets": [
      {
        "text": "名字",
        "enemy_id": "VOW-ng,VOW-zi",
        "html": `<div class="char-box"><span class="pinyin bad-ing">míng</span><span class="hanzi">名</span></div>
                 <div class="char-box"><span class="pinyin bad-retro">zì</span><span class="hanzi">字</span></div>`
      },
      {
        "text": "好听",
        "enemy_id": "VOW-ng",
        "html": `<div class="char-box"><span class="pinyin">hǎo</span><span class="hanzi">好</span></div>
                 <div class="char-box"><span class="pinyin bad-ing">tīng</span><span class="hanzi">听</span></div>`
      },
      {
        "text": "小英",
        "enemy_id": "VOW-xi,VOW-ng",
        "html": `<div class="char-box"><span class="pinyin bad-front">xiǎo</span><span class="hanzi">小</span></div>
                 <div class="char-box"><span class="pinyin bad-ing">yīng</span><span class="hanzi">英</span></div>`
      }
    ]
  },
  {
    "full_sentence": "请进来，坐在这里就好。",
    "japanese_translation": "どうぞお入りください、ここに座っていただければ結構です。",
    "tip": "请(qǐng)の鼻音＋巻き舌、进(jìn)のj音、这(zhè)の巻き舌＋eが三つの天敵ピンインをコンパクトに体験できる文です。",
    "html_content": `<div class="chunk-box" data-chunk-index="0">
      <div class="char-box"><span class="pinyin bad-retro bad-ing">qǐng</span><span class="hanzi">请</span></div>
      <div class="char-box"><span class="pinyin bad-retro">jìn</span><span class="hanzi">进</span></div>
      <div class="char-box"><span class="pinyin">lái</span><span class="hanzi">来</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="1">
      <div class="char-box"><span class="pinyin bad-retro">zuò</span><span class="hanzi">坐</span></div>
      <div class="char-box"><span class="pinyin">zài</span><span class="hanzi">在</span></div>
      <div class="char-box"><span class="pinyin bad-retro bad-e">zhè</span><span class="hanzi">这</span></div>
      <div class="char-box"><span class="pinyin">lǐ</span><span class="hanzi">里</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="2">
      <div class="char-box"><span class="pinyin">jiù</span><span class="hanzi">就</span></div>
      <div class="char-box"><span class="pinyin">hǎo</span><span class="hanzi">好</span></div>
    </div>`,
    "chunks": [
      { "text": "请进来", "words": [{"word": "进来", "level": 2, "meaning": "入ってくる"}] },
      { "text": "坐在这里", "words": [{"word": "坐", "level": 1, "meaning": "座る"}] },
      { "text": "就好", "words": [{"word": "就好", "level": 2, "meaning": "〜すればいい"}] }
    ],
    "vulnerable_targets": [
      {
        "text": "请",
        "enemy_id": "VOW-ng,VOW-ji",
        "html": `<div class="char-box"><span class="pinyin bad-retro bad-ing">qǐng</span><span class="hanzi">请</span></div>`
      },
      {
        "text": "进来",
        "enemy_id": "VOW-ji",
        "html": `<div class="char-box"><span class="pinyin bad-retro">jìn</span><span class="hanzi">进</span></div>
                 <div class="char-box"><span class="pinyin">lái</span><span class="hanzi">来</span></div>`
      },
      {
        "text": "这里",
        "enemy_id": "ROM-e,VOW-zhi",
        "html": `<div class="char-box"><span class="pinyin bad-retro bad-e">zhè</span><span class="hanzi">这</span></div>
                 <div class="char-box"><span class="pinyin">lǐ</span><span class="hanzi">里</span></div>`
      }
    ]
  },
  {
    "full_sentence": "我每周末都去超市买东西。",
    "japanese_translation": "私は毎週末にスーパーへ買い物に行きます。",
    "tip": "周(zhōu)の巻き舌、去(qù)のü、超(chāo)と市(shì)の巻き舌同士、东(dōng)・西(xī)の鼻音・前舌音コンビが面白い文です。",
    "html_content": `<div class="chunk-box" data-chunk-index="0">
      <div class="char-box"><span class="pinyin">wǒ</span><span class="hanzi">我</span></div>
      <div class="char-box"><span class="pinyin">měi</span><span class="hanzi">每</span></div>
      <div class="char-box"><span class="pinyin bad-retro bad-ing">zhōu</span><span class="hanzi">周</span></div>
      <div class="char-box"><span class="pinyin">mò</span><span class="hanzi">末</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="1">
      <div class="char-box"><span class="pinyin">dōu</span><span class="hanzi">都</span></div>
      <div class="char-box"><span class="pinyin bad-retro">qù</span><span class="hanzi">去</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="2">
      <div class="char-box"><span class="pinyin bad-retro">chāo</span><span class="hanzi">超</span></div>
      <div class="char-box"><span class="pinyin bad-retro">shì</span><span class="hanzi">市</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="3">
      <div class="char-box"><span class="pinyin">mǎi</span><span class="hanzi">买</span></div>
      <div class="char-box"><span class="pinyin bad-ing">dōng</span><span class="hanzi">东</span></div>
      <div class="char-box"><span class="pinyin bad-front">xī</span><span class="hanzi">西</span></div>
    </div>`,
    "chunks": [
      { "text": "我每周末", "words": [{"word": "周末", "level": 2, "meaning": "週末"}] },
      { "text": "都去", "words": [{"word": "都", "level": 1, "meaning": "いずれも/全て"}] },
      { "text": "超市", "words": [{"word": "超市", "level": 2, "meaning": "スーパーマーケット"}] },
      { "text": "买东西", "words": [{"word": "东西", "level": 1, "meaning": "もの/買い物"}] }
    ],
    "vulnerable_targets": [
      {
        "text": "周末",
        "enemy_id": "VOW-zhi",
        "html": `<div class="char-box"><span class="pinyin bad-retro bad-ing">zhōu</span><span class="hanzi">周</span></div>
                 <div class="char-box"><span class="pinyin">mò</span><span class="hanzi">末</span></div>`
      },
      {
        "text": "去",
        "enemy_id": "ROM-ü",
        "html": `<div class="char-box"><span class="pinyin bad-retro">qù</span><span class="hanzi">去</span></div>`
      },
      {
        "text": "超市",
        "enemy_id": "VOW-shi",
        "html": `<div class="char-box"><span class="pinyin bad-retro">chāo</span><span class="hanzi">超</span></div>
                 <div class="char-box"><span class="pinyin bad-retro">shì</span><span class="hanzi">市</span></div>`
      },
      {
        "text": "东西",
        "enemy_id": "VOW-ng,VOW-xi",
        "html": `<div class="char-box"><span class="pinyin bad-ing">dōng</span><span class="hanzi">东</span></div>
                 <div class="char-box"><span class="pinyin bad-front">xī</span><span class="hanzi">西</span></div>`
      }
    ]
  },
  {
    "full_sentence": "他每天练习写字，进步越来越快。",
    "japanese_translation": "彼は毎日文字を書く練習をしていて、どんどん上達しています。",
    "tip": "练(liàn)の『イェン』、习(xí)の前舌音、写(xiě)の前舌音＋ian、字(zì)の空母音、进(jìn)のj音と難所が続きます。",
    "html_content": `<div class="chunk-box" data-chunk-index="0">
      <div class="char-box"><span class="pinyin">tā</span><span class="hanzi">他</span></div>
      <div class="char-box"><span class="pinyin">měi</span><span class="hanzi">每</span></div>
      <div class="char-box"><span class="pinyin bad-an">tiān</span><span class="hanzi">天</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="1">
      <div class="char-box"><span class="pinyin bad-an">liàn</span><span class="hanzi">练</span></div>
      <div class="char-box"><span class="pinyin bad-front">xí</span><span class="hanzi">习</span></div>
      <div class="char-box"><span class="pinyin bad-front bad-an">xiě</span><span class="hanzi">写</span></div>
      <div class="char-box"><span class="pinyin bad-retro">zì</span><span class="hanzi">字</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="2">
      <div class="char-box"><span class="pinyin bad-retro">jìn</span><span class="hanzi">进</span></div>
      <div class="char-box"><span class="pinyin">bù</span><span class="hanzi">步</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="3">
      <div class="char-box"><span class="pinyin">yuè</span><span class="hanzi">越</span></div>
      <div class="char-box"><span class="pinyin">lái</span><span class="hanzi">来</span></div>
      <div class="char-box"><span class="pinyin">yuè</span><span class="hanzi">越</span></div>
      <div class="char-box"><span class="pinyin">kuài</span><span class="hanzi">快</span></div>
    </div>`,
    "chunks": [
      { "text": "他每天", "words": [{"word": "每天", "level": 1, "meaning": "毎日"}] },
      { "text": "练习写字", "words": [{"word": "练习", "level": 2, "meaning": "練習する"}, {"word": "写字", "level": 2, "meaning": "文字を書く"}] },
      { "text": "进步", "words": [{"word": "进步", "level": 3, "meaning": "上達する"}] },
      { "text": "越来越快", "words": [{"word": "越来越", "level": 2, "meaning": "どんどん〜"}] }
    ],
    "vulnerable_targets": [
      {
        "text": "每天",
        "enemy_id": "ROM-ian",
        "html": `<div class="char-box"><span class="pinyin">měi</span><span class="hanzi">每</span></div>
                 <div class="char-box"><span class="pinyin bad-an">tiān</span><span class="hanzi">天</span></div>`
      },
      {
        "text": "练习",
        "enemy_id": "ROM-ian,VOW-xi",
        "html": `<div class="char-box"><span class="pinyin bad-an">liàn</span><span class="hanzi">练</span></div>
                 <div class="char-box"><span class="pinyin bad-front">xí</span><span class="hanzi">习</span></div>`
      },
      {
        "text": "写字",
        "enemy_id": "ROM-ian,VOW-xi,VOW-zi",
        "html": `<div class="char-box"><span class="pinyin bad-front bad-an">xiě</span><span class="hanzi">写</span></div>
                 <div class="char-box"><span class="pinyin bad-retro">zì</span><span class="hanzi">字</span></div>`
      },
      {
        "text": "进步",
        "enemy_id": "VOW-ji",
        "html": `<div class="char-box"><span class="pinyin bad-retro">jìn</span><span class="hanzi">进</span></div>
                 <div class="char-box"><span class="pinyin">bù</span><span class="hanzi">步</span></div>`
      }
    ]
  },
  {
    "full_sentence": "你需要多运动，少吃甜食。",
    "japanese_translation": "もっと運動して、甘いものを少なく食べる必要があります。",
    "tip": "需(xū)の前舌音、运(yùn)の『ウェン』省略、动(dòng)の鼻音、少(shǎo)と吃(chī)の巻き舌、甜(tián)の『イェン』が詰まっています。",
    "html_content": `<div class="chunk-box" data-chunk-index="0">
      <div class="char-box"><span class="pinyin">nǐ</span><span class="hanzi">你</span></div>
      <div class="char-box"><span class="pinyin bad-front">xū</span><span class="hanzi">需</span></div>
      <div class="char-box"><span class="pinyin">yào</span><span class="hanzi">要</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="1">
      <div class="char-box"><span class="pinyin">duō</span><span class="hanzi">多</span></div>
      <div class="char-box"><span class="pinyin bad-an">yùn</span><span class="hanzi">运</span></div>
      <div class="char-box"><span class="pinyin bad-ing">dòng</span><span class="hanzi">动</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="2">
      <div class="char-box"><span class="pinyin bad-retro">shǎo</span><span class="hanzi">少</span></div>
      <div class="char-box"><span class="pinyin bad-retro">chī</span><span class="hanzi">吃</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="3">
      <div class="char-box"><span class="pinyin bad-an">tián</span><span class="hanzi">甜</span></div>
      <div class="char-box"><span class="pinyin bad-retro">shí</span><span class="hanzi">食</span></div>
    </div>`,
    "chunks": [
      { "text": "你需要", "words": [{"word": "需要", "level": 3, "meaning": "必要がある"}] },
      { "text": "多运动", "words": [{"word": "运动", "level": 2, "meaning": "運動する"}] },
      { "text": "少吃", "words": [{"word": "少", "level": 1, "meaning": "少なく"}] },
      { "text": "甜食", "words": [{"word": "甜食", "level": 3, "meaning": "甘いもの/スイーツ"}] }
    ],
    "vulnerable_targets": [
      {
        "text": "需要",
        "enemy_id": "ROM-ü,VOW-xi",
        "html": `<div class="char-box"><span class="pinyin bad-front">xū</span><span class="hanzi">需</span></div>
                 <div class="char-box"><span class="pinyin">yào</span><span class="hanzi">要</span></div>`
      },
      {
        "text": "运动",
        "enemy_id": "ROM-un,VOW-ng",
        "html": `<div class="char-box"><span class="pinyin bad-an">yùn</span><span class="hanzi">运</span></div>
                 <div class="char-box"><span class="pinyin bad-ing">dòng</span><span class="hanzi">动</span></div>`
      },
      {
        "text": "少吃",
        "enemy_id": "VOW-shi",
        "html": `<div class="char-box"><span class="pinyin bad-retro">shǎo</span><span class="hanzi">少</span></div>
                 <div class="char-box"><span class="pinyin bad-retro">chī</span><span class="hanzi">吃</span></div>`
      },
      {
        "text": "甜食",
        "enemy_id": "ROM-ian,VOW-shi",
        "html": `<div class="char-box"><span class="pinyin bad-an">tián</span><span class="hanzi">甜</span></div>
                 <div class="char-box"><span class="pinyin bad-retro">shí</span><span class="hanzi">食</span></div>`
      }
    ]
  },
  {
    "full_sentence": "我的汉语老师说话很清楚。",
    "japanese_translation": "私の中国語の先生は話し方がとても明瞭です。",
    "tip": "语(yǔ)のü、师(shī)の巻き舌、说(shuō)の巻き舌、清(qīng)の巻き舌＋鼻音、楚(chǔ)の巻き舌と、巻き舌が全文を支配します。",
    "html_content": `<div class="chunk-box" data-chunk-index="0">
      <div class="char-box"><span class="pinyin">wǒ</span><span class="hanzi">我</span></div>
      <div class="char-box"><span class="pinyin bad-e">de</span><span class="hanzi">的</span></div>
      <div class="char-box"><span class="pinyin">hàn</span><span class="hanzi">汉</span></div>
      <div class="char-box"><span class="pinyin bad-retro">yǔ</span><span class="hanzi">语</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="1">
      <div class="char-box"><span class="pinyin">lǎo</span><span class="hanzi">老</span></div>
      <div class="char-box"><span class="pinyin bad-retro">shī</span><span class="hanzi">师</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="2">
      <div class="char-box"><span class="pinyin bad-retro">shuō</span><span class="hanzi">说</span></div>
      <div class="char-box"><span class="pinyin">huà</span><span class="hanzi">话</span></div>
      <div class="char-box"><span class="pinyin">hěn</span><span class="hanzi">很</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="3">
      <div class="char-box"><span class="pinyin bad-retro bad-ing">qīng</span><span class="hanzi">清</span></div>
      <div class="char-box"><span class="pinyin bad-retro">chǔ</span><span class="hanzi">楚</span></div>
    </div>`,
    "chunks": [
      { "text": "我的汉语", "words": [{"word": "汉语", "level": 1, "meaning": "中国語"}] },
      { "text": "老师", "words": [{"word": "老师", "level": 1, "meaning": "先生"}] },
      { "text": "说话很", "words": [{"word": "说话", "level": 2, "meaning": "話す"}] },
      { "text": "清楚", "words": [{"word": "清楚", "level": 3, "meaning": "はっきりしている"}] }
    ],
    "vulnerable_targets": [
      {
        "text": "汉语",
        "enemy_id": "ROM-ü",
        "html": `<div class="char-box"><span class="pinyin">hàn</span><span class="hanzi">汉</span></div>
                 <div class="char-box"><span class="pinyin bad-retro">yǔ</span><span class="hanzi">语</span></div>`
      },
      {
        "text": "老师",
        "enemy_id": "VOW-shi",
        "html": `<div class="char-box"><span class="pinyin">lǎo</span><span class="hanzi">老</span></div>
                 <div class="char-box"><span class="pinyin bad-retro">shī</span><span class="hanzi">师</span></div>`
      },
      {
        "text": "说话",
        "enemy_id": "VOW-shi",
        "html": `<div class="char-box"><span class="pinyin bad-retro">shuō</span><span class="hanzi">说</span></div>
                 <div class="char-box"><span class="pinyin">huà</span><span class="hanzi">话</span></div>`
      },
      {
        "text": "清楚",
        "enemy_id": "VOW-ng,VOW-shi",
        "html": `<div class="char-box"><span class="pinyin bad-retro bad-ing">qīng</span><span class="hanzi">清</span></div>
                 <div class="char-box"><span class="pinyin bad-retro">chǔ</span><span class="hanzi">楚</span></div>`
      }
    ]
  },
  {
    "full_sentence": "她去书店买了几本新书回来看。",
    "japanese_translation": "彼女は本屋へ行き、何冊か新しい本を買って帰ってきて読んでいます。",
    "tip": "去(qù)のü、书(shū)の巻き舌が2回、店(diàn)の『イェン』、几(jǐ)のj音、新(xīn)の前舌音、回(huí)の『ウェイ』省略と宝庫のような文です。",
    "html_content": `<div class="chunk-box" data-chunk-index="0">
      <div class="char-box"><span class="pinyin">tā</span><span class="hanzi">她</span></div>
      <div class="char-box"><span class="pinyin bad-retro">qù</span><span class="hanzi">去</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="1">
      <div class="char-box"><span class="pinyin bad-retro">shū</span><span class="hanzi">书</span></div>
      <div class="char-box"><span class="pinyin bad-an">diàn</span><span class="hanzi">店</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="2">
      <div class="char-box"><span class="pinyin">mǎi</span><span class="hanzi">买</span></div>
      <div class="char-box"><span class="pinyin">le</span><span class="hanzi">了</span></div>
      <div class="char-box"><span class="pinyin bad-retro">jǐ</span><span class="hanzi">几</span></div>
      <div class="char-box"><span class="pinyin">běn</span><span class="hanzi">本</span></div>
      <div class="char-box"><span class="pinyin bad-front">xīn</span><span class="hanzi">新</span></div>
      <div class="char-box"><span class="pinyin bad-retro">shū</span><span class="hanzi">书</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="3">
      <div class="char-box"><span class="pinyin bad-an">huí</span><span class="hanzi">回</span></div>
      <div class="char-box"><span class="pinyin">lái</span><span class="hanzi">来</span></div>
      <div class="char-box"><span class="pinyin">kàn</span><span class="hanzi">看</span></div>
    </div>`,
    "chunks": [
      { "text": "她去", "words": [{"word": "去", "level": 1, "meaning": "行く"}] },
      { "text": "书店", "words": [{"word": "书店", "level": 2, "meaning": "本屋"}] },
      { "text": "买了几本新书", "words": [{"word": "几本", "level": 2, "meaning": "何冊か"}, {"word": "新书", "level": 2, "meaning": "新しい本"}] },
      { "text": "回来看", "words": [{"word": "回来", "level": 2, "meaning": "戻ってくる"}] }
    ],
    "vulnerable_targets": [
      {
        "text": "去",
        "enemy_id": "ROM-ü",
        "html": `<div class="char-box"><span class="pinyin bad-retro">qù</span><span class="hanzi">去</span></div>`
      },
      {
        "text": "书店",
        "enemy_id": "VOW-shi,ROM-ian",
        "html": `<div class="char-box"><span class="pinyin bad-retro">shū</span><span class="hanzi">书</span></div>
                 <div class="char-box"><span class="pinyin bad-an">diàn</span><span class="hanzi">店</span></div>`
      },
      {
        "text": "几本新书",
        "enemy_id": "VOW-ji,VOW-xi,VOW-shi",
        "html": `<div class="char-box"><span class="pinyin bad-retro">jǐ</span><span class="hanzi">几</span></div>
                 <div class="char-box"><span class="pinyin">běn</span><span class="hanzi">本</span></div>
                 <div class="char-box"><span class="pinyin bad-front">xīn</span><span class="hanzi">新</span></div>
                 <div class="char-box"><span class="pinyin bad-retro">shū</span><span class="hanzi">书</span></div>`
      },
      {
        "text": "回来",
        "enemy_id": "ROM-ui",
        "html": `<div class="char-box"><span class="pinyin bad-an">huí</span><span class="hanzi">回</span></div>
                 <div class="char-box"><span class="pinyin">lái</span><span class="hanzi">来</span></div>`
      }
    ]
  },
  {
    "full_sentence": "今天是我的生日，谢谢你来。",
    "japanese_translation": "今日は私の誕生日です、来てくれてありがとう。",
    "tip": "今(jīn)のj音、天(tiān)の『イェン』、是(shì)の巻き舌、生(shēng)の巻き舌＋鼻音、日(rì)の巻き舌、谢(xiè)の前舌音と多彩な天敵の文です。",
    "html_content": `<div class="chunk-box" data-chunk-index="0">
      <div class="char-box"><span class="pinyin bad-retro">jīn</span><span class="hanzi">今</span></div>
      <div class="char-box"><span class="pinyin bad-an">tiān</span><span class="hanzi">天</span></div>
      <div class="char-box"><span class="pinyin bad-retro">shì</span><span class="hanzi">是</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="1">
      <div class="char-box"><span class="pinyin">wǒ</span><span class="hanzi">我</span></div>
      <div class="char-box"><span class="pinyin bad-e">de</span><span class="hanzi">的</span></div>
      <div class="char-box"><span class="pinyin bad-retro bad-ing">shēng</span><span class="hanzi">生</span></div>
      <div class="char-box"><span class="pinyin bad-retro">rì</span><span class="hanzi">日</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="2">
      <div class="char-box"><span class="pinyin bad-front bad-an">xiè</span><span class="hanzi">谢</span></div>
      <div class="char-box"><span class="pinyin bad-front bad-an">xiè</span><span class="hanzi">谢</span></div>
      <div class="char-box"><span class="pinyin">nǐ</span><span class="hanzi">你</span></div>
      <div class="char-box"><span class="pinyin">lái</span><span class="hanzi">来</span></div>
    </div>`,
    "chunks": [
      { "text": "今天是", "words": [{"word": "今天", "level": 1, "meaning": "今日"}] },
      { "text": "我的生日", "words": [{"word": "生日", "level": 1, "meaning": "誕生日"}] },
      { "text": "谢谢你来", "words": [{"word": "谢谢", "level": 1, "meaning": "ありがとう"}] }
    ],
    "vulnerable_targets": [
      {
        "text": "今天",
        "enemy_id": "VOW-ji,ROM-ian",
        "html": `<div class="char-box"><span class="pinyin bad-retro">jīn</span><span class="hanzi">今</span></div>
                 <div class="char-box"><span class="pinyin bad-an">tiān</span><span class="hanzi">天</span></div>`
      },
      {
        "text": "是",
        "enemy_id": "VOW-shi",
        "html": `<div class="char-box"><span class="pinyin bad-retro">shì</span><span class="hanzi">是</span></div>`
      },
      {
        "text": "生日",
        "enemy_id": "VOW-ng,VOW-shi",
        "html": `<div class="char-box"><span class="pinyin bad-retro bad-ing">shēng</span><span class="hanzi">生</span></div>
                 <div class="char-box"><span class="pinyin bad-retro">rì</span><span class="hanzi">日</span></div>`
      },
      {
        "text": "谢谢",
        "enemy_id": "ROM-ian,VOW-xi",
        "html": `<div class="char-box"><span class="pinyin bad-front bad-an">xiè</span><span class="hanzi">谢</span></div>
                 <div class="char-box"><span class="pinyin bad-front bad-an">xiè</span><span class="hanzi">谢</span></div>`
      }
    ]
  },
  {
    "full_sentence": "请问，最近的地铁站在哪个方向？",
    "japanese_translation": "すみません、最寄りの地下鉄駅はどの方向にありますか？",
    "tip": "请(qǐng)の鼻音、问(wèn)の『ウェン』省略、最(zuì)の『ウェイ』省略、近(jìn)のj音、站(zhàn)の巻き舌、向(xiàng)の前舌音＋鼻音が凝縮。",
    "html_content": `<div class="chunk-box" data-chunk-index="0">
      <div class="char-box"><span class="pinyin bad-retro bad-ing">qǐng</span><span class="hanzi">请</span></div>
      <div class="char-box"><span class="pinyin bad-an">wèn</span><span class="hanzi">问</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="1">
      <div class="char-box"><span class="pinyin bad-an">zuì</span><span class="hanzi">最</span></div>
      <div class="char-box"><span class="pinyin bad-retro">jìn</span><span class="hanzi">近</span></div>
      <div class="char-box"><span class="pinyin bad-e">de</span><span class="hanzi">的</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="2">
      <div class="char-box"><span class="pinyin">dì</span><span class="hanzi">地</span></div>
      <div class="char-box"><span class="pinyin">tiě</span><span class="hanzi">铁</span></div>
      <div class="char-box"><span class="pinyin bad-retro">zhàn</span><span class="hanzi">站</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="3">
      <div class="char-box"><span class="pinyin">zài</span><span class="hanzi">在</span></div>
      <div class="char-box"><span class="pinyin">nǎ</span><span class="hanzi">哪</span></div>
      <div class="char-box"><span class="pinyin bad-e">ge</span><span class="hanzi">个</span></div>
      <div class="char-box"><span class="pinyin bad-ing">fāng</span><span class="hanzi">方</span></div>
      <div class="char-box"><span class="pinyin bad-front bad-ing">xiàng</span><span class="hanzi">向</span></div>
    </div>`,
    "chunks": [
      { "text": "请问", "words": [{"word": "请问", "level": 1, "meaning": "すみません/お尋ねします"}] },
      { "text": "最近的", "words": [{"word": "最近", "level": 2, "meaning": "一番近くの"}] },
      { "text": "地铁站", "words": [{"word": "地铁站", "level": 2, "meaning": "地下鉄の駅"}] },
      { "text": "在哪个方向", "words": [{"word": "方向", "level": 2, "meaning": "方向"}] }
    ],
    "vulnerable_targets": [
      {
        "text": "请问",
        "enemy_id": "VOW-ng,ROM-un,VOW-ji",
        "html": `<div class="char-box"><span class="pinyin bad-retro bad-ing">qǐng</span><span class="hanzi">请</span></div>
                 <div class="char-box"><span class="pinyin bad-an">wèn</span><span class="hanzi">问</span></div>`
      },
      {
        "text": "最近",
        "enemy_id": "ROM-ui,VOW-ji",
        "html": `<div class="char-box"><span class="pinyin bad-an">zuì</span><span class="hanzi">最</span></div>
                 <div class="char-box"><span class="pinyin bad-retro">jìn</span><span class="hanzi">近</span></div>`
      },
      {
        "text": "地铁站",
        "enemy_id": "VOW-zhi",
        "html": `<div class="char-box"><span class="pinyin">dì</span><span class="hanzi">地</span></div>
                 <div class="char-box"><span class="pinyin">tiě</span><span class="hanzi">铁</span></div>
                 <div class="char-box"><span class="pinyin bad-retro">zhàn</span><span class="hanzi">站</span></div>`
      },
      {
        "text": "方向",
        "enemy_id": "VOW-ng,VOW-xi",
        "html": `<div class="char-box"><span class="pinyin bad-ing">fāng</span><span class="hanzi">方</span></div>
                 <div class="char-box"><span class="pinyin bad-front bad-ing">xiàng</span><span class="hanzi">向</span></div>`
      }
    ]
  },
  {
    "full_sentence": "我认识一个中国朋友，他汉语说得很好。",
    "japanese_translation": "私は中国人の友達がいて、彼は中国語をとても上手に話します。",
    "tip": "认识(rèn shí)の巻き舌連続、中(zhōng)の巻き舌＋鼻音、朋(péng)の鼻音、语(yǔ)のü、说得(shuō de)の巻き舌＋e。難所が全文を覆う総仕上げ文です。",
    "html_content": `<div class="chunk-box" data-chunk-index="0">
      <div class="char-box"><span class="pinyin">wǒ</span><span class="hanzi">我</span></div>
      <div class="char-box"><span class="pinyin bad-retro">rèn</span><span class="hanzi">认</span></div>
      <div class="char-box"><span class="pinyin bad-retro">shí</span><span class="hanzi">识</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="1">
      <div class="char-box"><span class="pinyin">yí</span><span class="hanzi">一</span></div>
      <div class="char-box"><span class="pinyin bad-e">ge</span><span class="hanzi">个</span></div>
      <div class="char-box"><span class="pinyin bad-retro bad-ing">zhōng</span><span class="hanzi">中</span></div>
      <div class="char-box"><span class="pinyin bad-retro bad-an">guó</span><span class="hanzi">国</span></div>
      <div class="char-box"><span class="pinyin bad-ing">péng</span><span class="hanzi">朋</span></div>
      <div class="char-box"><span class="pinyin">you</span><span class="hanzi">友</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="2">
      <div class="char-box"><span class="pinyin">tā</span><span class="hanzi">他</span></div>
      <div class="char-box"><span class="pinyin">hàn</span><span class="hanzi">汉</span></div>
      <div class="char-box"><span class="pinyin bad-retro">yǔ</span><span class="hanzi">语</span></div>
    </div>
    <div class="chunk-box" data-chunk-index="3">
      <div class="char-box"><span class="pinyin bad-retro">shuō</span><span class="hanzi">说</span></div>
      <div class="char-box"><span class="pinyin bad-e">de</span><span class="hanzi">得</span></div>
      <div class="char-box"><span class="pinyin">hěn</span><span class="hanzi">很</span></div>
      <div class="char-box"><span class="pinyin">hǎo</span><span class="hanzi">好</span></div>
    </div>`,
    "chunks": [
      { "text": "我认识", "words": [{"word": "认识", "level": 2, "meaning": "知り合っている"}] },
      { "text": "一个中国朋友", "words": [{"word": "中国", "level": 1, "meaning": "中国"}, {"word": "朋友", "level": 1, "meaning": "友達"}] },
      { "text": "他汉语", "words": [{"word": "汉语", "level": 1, "meaning": "中国語"}] },
      { "text": "说得很好", "words": [{"word": "说得", "level": 2, "meaning": "話すのが〜"}] }
    ],
    "vulnerable_targets": [
      {
        "text": "认识",
        "enemy_id": "VOW-shi",
        "html": `<div class="char-box"><span class="pinyin bad-retro">rèn</span><span class="hanzi">认</span></div>
                 <div class="char-box"><span class="pinyin bad-retro">shí</span><span class="hanzi">识</span></div>`
      },
      {
        "text": "中国",
        "enemy_id": "VOW-zhi,VOW-ng",
        "html": `<div class="char-box"><span class="pinyin bad-retro bad-ing">zhōng</span><span class="hanzi">中</span></div>
                 <div class="char-box"><span class="pinyin bad-retro bad-an">guó</span><span class="hanzi">国</span></div>`
      },
      {
        "text": "朋友",
        "enemy_id": "VOW-ng",
        "html": `<div class="char-box"><span class="pinyin bad-ing">péng</span><span class="hanzi">朋</span></div>
                 <div class="char-box"><span class="pinyin">you</span><span class="hanzi">友</span></div>`
      },
      {
        "text": "汉语",
        "enemy_id": "ROM-ü",
        "html": `<div class="char-box"><span class="pinyin">hàn</span><span class="hanzi">汉</span></div>
                 <div class="char-box"><span class="pinyin bad-retro">yǔ</span><span class="hanzi">语</span></div>`
      },
      {
        "text": "说得",
        "enemy_id": "VOW-shi,ROM-e",
        "html": `<div class="char-box"><span class="pinyin bad-retro">shuō</span><span class="hanzi">说</span></div>
                 <div class="char-box"><span class="pinyin bad-e">de</span><span class="hanzi">得</span></div>`
      }
    ]
  }
];
