export type FaceType =
  | 'happy' | 'excited' | 'proud' | 'relieved' | 'grateful' | 'hopeful' | 'loving' | 'calm'
  | 'sad' | 'lonely' | 'tired' | 'bored' | 'content'
  | 'angry' | 'frustrated' | 'jealous' | 'disgusted'
  | 'scared' | 'anxious' | 'worried' | 'nervous' | 'shocked' | 'confused';

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
      { id: 'happy',    name: 'うれしい',     desc: 'ハッピーなきもち',    scenes: [{ key: 'gift', text: 'プレゼントをもらった' }, { key: 'praise', text: 'ほめてもらった' }, { key: 'food', text: 'おいしいものを食べた' }, { key: 'friends', text: '友達と遊んだ' }] },
      { id: 'excited',  name: 'わくわく',     desc: 'たのしみなきもち',    scenes: [{ key: 'star', text: '楽しいことを待っている' }, { key: 'friends', text: '旅行や遠足がある' }, { key: 'gift', text: '好きなものが来る' }, { key: 'trophy', text: 'やりたいことができる' }] },
      { id: 'proud',    name: 'じまんしたい', desc: 'できた！というきもち', scenes: [{ key: 'trophy', text: 'うまくできた' }, { key: 'praise', text: 'みんなにほめられた' }, { key: 'star', text: 'むずかしいことができた' }, { key: 'trophy', text: 'がんばった成果が出た' }] },
      { id: 'relieved', name: 'ほっとした',   desc: 'やれやれというきもち', scenes: [{ key: 'sun', text: '心配なことが終わった' }, { key: 'praise', text: 'うまくいった' }, { key: 'hug', text: '助けてもらえた' }, { key: 'food', text: 'やっと休めた' }] },
      { id: 'grateful', name: 'ありがとう',   desc: 'かんしゃのきもち',    scenes: [{ key: 'hug', text: 'やさしくしてもらった' }, { key: 'gift', text: '助けてもらった' }, { key: 'friends', text: '一緒にいてくれた' }, { key: 'praise', text: '気にかけてもらった' }] },
      { id: 'hopeful',  name: 'きたいしてる', desc: 'いいことが来るきもち', scenes: [{ key: 'sun', text: '明日いいことがありそう' }, { key: 'star', text: '目標に向かっている' }, { key: 'trophy', text: '夢が近づいている' }, { key: 'sun', text: '今日はいい日になりそう' }] },
      { id: 'loving',   name: 'だいすき',     desc: 'あいのきもち',        scenes: [{ key: 'heart', text: '大事な人がいる' }, { key: 'hug', text: '一緒にいたい人がいる' }, { key: 'friends', text: '家族と過ごした' }, { key: 'heart', text: '大切なものがある' }] },
      { id: 'calm',     name: 'おちついてる', desc: 'やすらかなきもち',    scenes: [{ key: 'music', text: '好きな音楽を聴いた' }, { key: 'bed', text: 'ゆっくり休んだ' }, { key: 'sun', text: 'のんびりした時間' }, { key: 'food', text: 'ごはんを食べてのんびり' }] },
    ],
  },
  {
    id: 'negative',
    label: 'ネガティブ',
    color: '#85B7EB',
    feelings: [
      { id: 'sad',       name: 'かなしい', desc: 'なきたいきもち',      scenes: [{ key: 'cry', text: 'うまくできなかった' }, { key: 'broken', text: '好きなものがなくなった' }, { key: 'alone', text: '一人になった' }, { key: 'cry', text: 'つらいことがあった' }] },
      { id: 'lonely',    name: 'さみしい', desc: 'ひとりぼっちのきもち', scenes: [{ key: 'alone', text: 'だれもいなかった' }, { key: 'friends', text: '友達と遊べなかった' }, { key: 'phone', text: 'だれとも話せなかった' }, { key: 'alone', text: '一人で待っていた' }] },
      { id: 'tired',     name: 'つかれた', desc: 'ぐったりしたきもち',   scenes: [{ key: 'bed2', text: 'たくさん動いた' }, { key: 'book', text: 'いっぱいがんばった' }, { key: 'sick', text: '体がつらい' }, { key: 'wait', text: '長い時間待った' }] },
      { id: 'bored',     name: 'たいくつ', desc: 'することがないきもち', scenes: [{ key: 'wait', text: 'やることがない' }, { key: 'phone', text: '一人でいる時間が長い' }, { key: 'book', text: '同じことが続いている' }, { key: 'alone', text: '刺激がない' }] },
      { id: 'content',   name: 'もやもや', desc: 'すっきりしないきもち', scenes: [{ key: 'question', text: 'なんかへんな感じ' }, { key: 'fight', text: 'うまく言えないことがある' }, { key: 'wait', text: 'どうすればいいかわからない' }, { key: 'alone', text: '気持ちが整理できない' }] },
    ],
  },
  {
    id: 'angry',
    label: 'イライラ',
    color: '#F09595',
    feelings: [
      { id: 'angry',      name: 'おこっている', desc: 'イライラするきもち',  scenes: [{ key: 'no', text: 'したいことができなかった' }, { key: 'shout', text: 'うまく伝わらなかった' }, { key: 'wait', text: '待たされた' }, { key: 'fight', text: 'じゃまをされた' }] },
      { id: 'frustrated', name: 'もどかしい',   desc: 'うまくいかないきもち', scenes: [{ key: 'mistake', text: '何度やってもうまくいかない' }, { key: 'no', text: '思い通りにならない' }, { key: 'shout', text: '言いたいことが言えない' }, { key: 'wait', text: '時間がかかりすぎる' }] },
      { id: 'jealous',    name: 'ずるい！',     desc: 'くやしいきもち',       scenes: [{ key: 'envy', text: '自分だけできなかった' }, { key: 'friends', text: '友達だけほめられた' }, { key: 'gift', text: '自分だけもらえなかった' }, { key: 'trophy', text: '他の人が先だった' }] },
      { id: 'disgusted',  name: 'いやだ',       desc: 'きらいというきもち',   scenes: [{ key: 'food', text: '苦手なものがある' }, { key: 'no', text: 'やりたくないことをさせられた' }, { key: 'sick', text: '気持ちが悪い' }, { key: 'crowd', text: '不快な場所にいる' }] },
    ],
  },
  {
    id: 'fear',
    label: 'ドキドキ',
    color: '#9FE1CB',
    feelings: [
      { id: 'scared',    name: 'こわい',        desc: 'ドキドキするきもち',   scenes: [{ key: 'thunder', text: '大きい音がした' }, { key: 'dark', text: '暗いところにいった' }, { key: 'crowd', text: '知らない人がいた' }, { key: 'new_place', text: '知らない場所に行った' }] },
      { id: 'anxious',   name: 'ふあん',        desc: '心配なきもち',         scenes: [{ key: 'wait', text: 'これからどうなるかわからない' }, { key: 'new_place', text: 'はじめてのことがある' }, { key: 'question', text: '失敗するかもしれない' }, { key: 'alone', text: '一人でできるか心配' }] },
      { id: 'worried',   name: 'しんぱい',      desc: '気になるきもち',       scenes: [{ key: 'question', text: '大事な人のことが気になる' }, { key: 'mistake', text: 'まちがえてしまうかも' }, { key: 'phone', text: '連絡がない' }, { key: 'alone', text: 'うまくいくかな' }] },
      { id: 'nervous',   name: 'きんちょう',    desc: 'ガチガチなきもち',     scenes: [{ key: 'crowd', text: 'みんなの前で話す' }, { key: 'new_place', text: 'はじめての場所' }, { key: 'trophy', text: '大事なことがある' }, { key: 'praise', text: '見られている気がする' }] },
      { id: 'shocked',   name: 'びっくり',      desc: 'おどろいたきもち',     scenes: [{ key: 'thunder', text: '急に大きい音がした' }, { key: 'gift', text: '予想外のことがおきた' }, { key: 'shout', text: '突然話しかけられた' }, { key: 'star', text: 'すごいものを見た' }] },
      { id: 'confused',  name: 'こんがらがった', desc: 'わからないきもち',    scenes: [{ key: 'question', text: '何をすればいいかわからない' }, { key: 'book', text: '説明がわからない' }, { key: 'wait', text: 'どうすればよかった？' }, { key: 'mistake', text: 'まちがっているかも' }] },
    ],
  },
  {
    id: 'body',
    label: 'からだ',
    color: '#97C459',
    feelings: [
      { id: 'calm',      name: 'きもちいい', desc: 'からだが楽なきもち',   scenes: [{ key: 'food', text: 'おいしいものを食べた' }, { key: 'sun', text: '外があたたかい' }, { key: 'music', text: '好きなことをしている' }, { key: 'bed', text: 'ゆっくり寝た' }] },
      { id: 'tired',     name: 'しんどい',   desc: 'つらいからだのきもち', scenes: [{ key: 'sick', text: '体が痛い' }, { key: 'bed2', text: 'ねむい' }, { key: 'wait', text: 'お腹がすいた' }, { key: 'book', text: '頭が痛い' }] },
      { id: 'disgusted', name: 'きもちわるい', desc: 'からだのきもちわるさ', scenes: [{ key: 'sick', text: 'お腹が気持ち悪い' }, { key: 'food', text: '苦手なものを食べた' }, { key: 'crowd', text: 'においがきつかった' }, { key: 'thunder', text: '音がうるさい' }] },
      { id: 'angry',     name: 'いたい',     desc: 'からだがいたいきもち',  scenes: [{ key: 'sick', text: '頭が痛い' }, { key: 'broken', text: 'けがをした' }, { key: 'fight', text: 'ぶつかった' }, { key: 'bed2', text: '疲れて体が重い' }] },
    ],
  },
];

export const INTENSITY_WORDS = ['ちょっと', 'すこし', 'まあまあ', 'けっこう', 'すごく'];
