export type FaceType =
  | 'happy' | 'excited' | 'proud' | 'relieved' | 'grateful' | 'hopeful' | 'loving' | 'calm'
  | 'sad' | 'lonely' | 'tired' | 'bored' | 'content'
  | 'angry' | 'frustrated' | 'jealous' | 'disgusted'
  | 'scared' | 'anxious' | 'worried' | 'nervous' | 'shocked' | 'surprised' | 'confused';

export type SceneKey =
  | 'gift' | 'star' | 'heart' | 'sun' | 'friends' | 'praise' | 'music' | 'food' | 'hug'
  | 'cry' | 'alone' | 'broken' | 'thunder' | 'wait' | 'no' | 'fight' | 'shout' | 'envy'
  | 'question' | 'bed' | 'dark' | 'sick' | 'phone' | 'book' | 'trophy' | 'new_place'
  | 'crowd' | 'mistake' | 'bed2';

export interface Scene {
  key: SceneKey;
  text: string;
}

export interface Feeling {
  id: FaceType;
  name: string;
  desc: string;
  scenes: Scene[];
}

export interface Category {
  id: string;
  label: string;
  color: string;
  feelings: Feeling[];
}

export const CATEGORIES: Category[] = [
  {
    id: 'positive',
    label: 'ポジティブ',
    color: '#FAC775',
    feelings: [
      {
        id: 'happy',
        name: '嬉《うれ》しい',
        desc: 'ハッピーな気持《きも》ち',
        scenes: [
          { key: 'gift',    text: 'プレゼントをもらった' },
          { key: 'praise',  text: '褒《ほ》めてもらった' },
          { key: 'food',    text: '美味《おい》しいものを食《た》べた' },
          { key: 'friends', text: '友達《ともだち》と遊《あそ》んだ' },
        ],
      },
      {
        id: 'excited',
        name: 'わくわく',
        desc: '楽《たの》しみな気持《きも》ち',
        scenes: [
          { key: 'star',    text: '楽《たの》しいことを待《ま》っている' },
          { key: 'friends', text: '旅行《りょこう》や遠足《えんそく》がある' },
          { key: 'gift',    text: '好《す》きなものが来《く》る' },
          { key: 'trophy',  text: 'やりたいことができる' },
        ],
      },
      {
        id: 'proud',
        name: '自慢《じまん》したい',
        desc: 'できた！という気持《きも》ち',
        scenes: [
          { key: 'trophy',  text: 'うまくできた' },
          { key: 'praise',  text: 'みんなに褒《ほ》められた' },
          { key: 'star',    text: '難《むずか》しいことができた' },
          { key: 'trophy',  text: 'がんばった成果《せいか》が出《で》た' },
        ],
      },
      {
        id: 'relieved',
        name: 'ほっとした',
        desc: 'やれやれという気持《きも》ち',
        scenes: [
          { key: 'sun',    text: '心配《しんぱい》なことが終《お》わった' },
          { key: 'praise', text: 'うまくいった' },
          { key: 'hug',    text: '助《たす》けてもらえた' },
          { key: 'food',   text: 'やっと休《やす》めた' },
        ],
      },
      {
        id: 'grateful',
        name: 'ありがとう',
        desc: '感謝《かんしゃ》の気持《きも》ち',
        scenes: [
          { key: 'hug',     text: '優《やさ》しくしてもらった' },
          { key: 'gift',    text: '助《たす》けてもらった' },
          { key: 'friends', text: '一緒《いっしょ》にいてくれた' },
          { key: 'praise',  text: '気《き》にかけてもらった' },
        ],
      },
      {
        id: 'hopeful',
        name: '期待《きたい》してる',
        desc: 'いいことが来《く》る気持《きも》ち',
        scenes: [
          { key: 'sun',    text: '明日《あした》いいことがありそう' },
          { key: 'star',   text: '目標《もくひょう》に向《む》かっている' },
          { key: 'trophy', text: '夢《ゆめ》が近《ちか》づいている' },
          { key: 'sun',    text: '今日《きょう》はいい日《ひ》になりそう' },
        ],
      },
      {
        id: 'loving',
        name: '大好《だいす》き',
        desc: '愛《あい》の気持《きも》ち',
        scenes: [
          { key: 'heart',   text: '大事《だいじ》な人《ひと》がいる' },
          { key: 'hug',     text: '一緒《いっしょ》にいたい人《ひと》がいる' },
          { key: 'friends', text: '家族《かぞく》と過《す》ごした' },
          { key: 'heart',   text: '大切《たいせつ》なものがある' },
        ],
      },
      {
        id: 'calm',
        name: '落《お》ち着《つ》いてる',
        desc: '安《やす》らかな気持《きも》ち',
        scenes: [
          { key: 'music', text: '好《す》きな音楽《おんがく》を聴《き》いた' },
          { key: 'bed',   text: 'ゆっくり休《やす》んだ' },
          { key: 'sun',   text: 'のんびりした時間《じかん》' },
          { key: 'food',  text: 'ごはんを食《た》べてのんびり' },
        ],
      },
    ],
  },
  {
    id: 'negative',
    label: 'ネガティブ',
    color: '#85B7EB',
    feelings: [
      {
        id: 'sad',
        name: '悲《かな》しい',
        desc: '泣《な》きたい気持《きも》ち',
        scenes: [
          { key: 'cry',    text: 'うまくできなかった' },
          { key: 'broken', text: '好《す》きなものがなくなった' },
          { key: 'alone',  text: '一人《ひとり》になった' },
          { key: 'cry',    text: 'つらいことがあった' },
        ],
      },
      {
        id: 'lonely',
        name: '寂《さみ》しい',
        desc: '一人《ひとり》ぼっちの気持《きも》ち',
        scenes: [
          { key: 'alone',   text: '誰《だれ》もいなかった' },
          { key: 'friends', text: '友達《ともだち》と遊《あそ》べなかった' },
          { key: 'phone',   text: '誰《だれ》とも話《はな》せなかった' },
          { key: 'alone',   text: '一人《ひとり》で待《ま》っていた' },
        ],
      },
      {
        id: 'tired',
        name: '疲《つか》れた',
        desc: 'ぐったりした気持《きも》ち',
        scenes: [
          { key: 'bed2', text: 'たくさん動《うご》いた' },
          { key: 'book', text: 'いっぱいがんばった' },
          { key: 'sick', text: '体《からだ》がつらい' },
          { key: 'wait', text: '長《なが》い時間《じかん》待《ま》った' },
        ],
      },
      {
        id: 'bored',
        name: '退屈《たいくつ》',
        desc: 'することがない気持《きも》ち',
        scenes: [
          { key: 'wait',  text: 'やることがない' },
          { key: 'phone', text: '一人《ひとり》でいる時間《じかん》が長《なが》い' },
          { key: 'book',  text: '同《おな》じことが続《つづ》いている' },
          { key: 'alone', text: '刺激《しげき》がない' },
        ],
      },
      {
        id: 'content',
        name: 'もやもや',
        desc: 'すっきりしない気持《きも》ち',
        scenes: [
          { key: 'question', text: 'なんかへんな感《かん》じ' },
          { key: 'fight',    text: 'うまく言《い》えないことがある' },
          { key: 'wait',     text: 'どうすればいいかわからない' },
          { key: 'alone',    text: '気持《きも》ちが整理《せいり》できない' },
        ],
      },
    ],
  },
  {
    id: 'angry',
    label: 'イライラ',
    color: '#F09595',
    feelings: [
      {
        id: 'angry',
        name: '怒《おこ》っている',
        desc: 'イライラする気持《きも》ち',
        scenes: [
          { key: 'no',    text: 'したいことができなかった' },
          { key: 'shout', text: 'うまく伝《つた》わらなかった' },
          { key: 'wait',  text: '待《ま》たされた' },
          { key: 'fight', text: '邪魔《じゃま》をされた' },
        ],
      },
      {
        id: 'frustrated',
        name: 'もどかしい',
        desc: 'うまくいかない気持《きも》ち',
        scenes: [
          { key: 'mistake', text: '何度《なんど》やってもうまくいかない' },
          { key: 'no',      text: '思《おも》い通《とお》りにならない' },
          { key: 'shout',   text: '言《い》いたいことが言《い》えない' },
          { key: 'wait',    text: '時間《じかん》がかかりすぎる' },
        ],
      },
      {
        id: 'jealous',
        name: 'ずるい！',
        desc: '悔《くや》しい気持《きも》ち',
        scenes: [
          { key: 'envy',    text: '自分《じぶん》だけできなかった' },
          { key: 'friends', text: '友達《ともだち》だけ褒《ほ》められた' },
          { key: 'gift',    text: '自分《じぶん》だけもらえなかった' },
          { key: 'trophy',  text: '他《ほか》の人《ひと》が先《さき》だった' },
        ],
      },
      {
        id: 'disgusted',
        name: 'いやだ',
        desc: '嫌《きら》いという気持《きも》ち',
        scenes: [
          { key: 'food',  text: '苦手《にがて》なものがある' },
          { key: 'no',    text: 'やりたくないことをさせられた' },
          { key: 'sick',  text: '気持《きも》ちが悪《わる》い' },
          { key: 'crowd', text: '不快《ふかい》な場所《ばしょ》にいる' },
        ],
      },
    ],
  },
  {
    id: 'fear',
    label: 'ドキドキ',
    color: '#9FE1CB',
    feelings: [
      {
        id: 'scared',
        name: '怖《こわ》い',
        desc: 'ドキドキする気持《きも》ち',
        scenes: [
          { key: 'thunder',   text: '大《おお》きい音《おと》がした' },
          { key: 'dark',      text: '暗《くら》いところに行《い》った' },
          { key: 'crowd',     text: '知《し》らない人《ひと》がいた' },
          { key: 'new_place', text: '知《し》らない場所《ばしょ》に行《い》った' },
        ],
      },
      {
        id: 'anxious',
        name: '不安《ふあん》',
        desc: '心配《しんぱい》な気持《きも》ち',
        scenes: [
          { key: 'wait',      text: 'これからどうなるかわからない' },
          { key: 'new_place', text: 'はじめてのことがある' },
          { key: 'question',  text: '失敗《しっぱい》するかもしれない' },
          { key: 'alone',     text: '一人《ひとり》でできるか心配《しんぱい》' },
        ],
      },
      {
        id: 'worried',
        name: '心配《しんぱい》',
        desc: '気《き》になる気持《きも》ち',
        scenes: [
          { key: 'question', text: '大事《だいじ》な人《ひと》のことが気《き》になる' },
          { key: 'mistake',  text: 'まちがえてしまうかも' },
          { key: 'phone',    text: '連絡《れんらく》がない' },
          { key: 'alone',    text: 'うまくいくかな' },
        ],
      },
      {
        id: 'nervous',
        name: '緊張《きんちょう》',
        desc: 'ガチガチな気持《きも》ち',
        scenes: [
          { key: 'crowd',     text: 'みんなの前《まえ》で話《はな》す' },
          { key: 'new_place', text: 'はじめての場所《ばしょ》' },
          { key: 'trophy',    text: '大事《だいじ》なことがある' },
          { key: 'praise',    text: '見《み》られている気《き》がする' },
        ],
      },
      {
        id: 'shocked',
        name: 'びっくり',
        desc: '驚《おどろ》いた気持《きも》ち',
        scenes: [
          { key: 'thunder', text: '急《きゅう》に大《おお》きい音《おと》がした' },
          { key: 'gift',    text: '予想外《よそうがい》のことがおきた' },
          { key: 'shout',   text: '突然《とつぜん》話《はな》しかけられた' },
          { key: 'star',    text: 'すごいものを見《み》た' },
        ],
      },
      {
        id: 'confused',
        name: 'こんがらがった',
        desc: 'わからない気持《きも》ち',
        scenes: [
          { key: 'question', text: '何《なに》をすればいいかわからない' },
          { key: 'book',     text: '説明《せつめい》がわからない' },
          { key: 'wait',     text: 'どうすればよかった？' },
          { key: 'mistake',  text: 'まちがっているかも' },
        ],
      },
    ],
  },
  {
    id: 'body',
    label: 'からだ',
    color: '#97C459',
    feelings: [
      {
        id: 'calm',
        name: '気持《きも》ちいい',
        desc: '体《からだ》が楽《らく》な気持《きも》ち',
        scenes: [
          { key: 'food',  text: '美味《おい》しいものを食《た》べた' },
          { key: 'sun',   text: '外《そと》があたたかい' },
          { key: 'music', text: '好《す》きなことをしている' },
          { key: 'bed',   text: 'ゆっくり寝《ね》た' },
        ],
      },
      {
        id: 'tired',
        name: 'しんどい',
        desc: 'つらい体《からだ》の気持《きも》ち',
        scenes: [
          { key: 'sick', text: '体《からだ》が痛《いた》い' },
          { key: 'bed2', text: '眠《ねむ》い' },
          { key: 'wait', text: 'お腹《なか》がすいた' },
          { key: 'book', text: '頭《あたま》が痛《いた》い' },
        ],
      },
      {
        id: 'disgusted',
        name: '気持《きも》ち悪《わる》い',
        desc: '体《からだ》の気持《きも》ち悪《わる》さ',
        scenes: [
          { key: 'sick',  text: 'お腹《なか》が気持《きも》ち悪《わる》い' },
          { key: 'food',  text: '苦手《にがて》なものを食《た》べた' },
          { key: 'crowd', text: 'においがきつかった' },
          { key: 'thunder', text: '音《おと》がうるさい' },
        ],
      },
      {
        id: 'angry',
        name: '痛《いた》い',
        desc: '体《からだ》が痛《いた》い気持《きも》ち',
        scenes: [
          { key: 'sick',   text: '頭《あたま》が痛《いた》い' },
          { key: 'broken', text: '怪我《けが》をした' },
          { key: 'fight',  text: 'ぶつかった' },
          { key: 'bed2',   text: '疲《つか》れて体《からだ》が重《おも》い' },
        ],
      },
    ],
  },
];

export const INTENSITY_WORDS = ['ちょっと', 'すこし', 'まあまあ', 'けっこう', 'すごく'];
