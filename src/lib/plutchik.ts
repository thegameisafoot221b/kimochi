export type PluBaseId = 'joy' | 'trust' | 'anticipation' | 'surprise' | 'sadness' | 'disgust' | 'anger' | 'fear';

export interface PluLevel {
  level: 1 | 2 | 3;
  id: string;
  name: string;
  desc: string;
  imagePath: string;
  scenes: { text: string }[];
}

export interface PluEmotion {
  id: PluBaseId;
  baseLabel: string;
  color: string;
  levels: [PluLevel, PluLevel, PluLevel];
}

export const PLU_EMOTIONS: PluEmotion[] = [
  {
    id: 'joy',
    baseLabel: '喜《よろこ》び',
    color: '#F5A623',
    levels: [
      {
        level: 1,
        id: 'joy-1',
        name: 'にこにこ',
        desc: 'ちょっとうれしい気《き》持《も》ち',
        imagePath: '/plutchik/joy-1.png',
        scenes: [
          { text: '好《す》きなものを食《た》べた' },
          { text: 'いい天気《てんき》だった' },
          { text: 'ゆっくりできた' },
        ],
      },
      {
        level: 2,
        id: 'joy-2',
        name: 'うれしい',
        desc: 'うれしい・たのしい気《き》持《も》ち',
        imagePath: '/plutchik/joy-2.png',
        scenes: [
          { text: 'いいことがあった' },
          { text: '友《とも》だちとあそんだ' },
          { text: 'ほめられた' },
          { text: 'たんじょうびだった' },
          { text: '好《す》きなものを食《た》べた' },
        ],
      },
      {
        level: 3,
        id: 'joy-3',
        name: '大《おお》よろこび',
        desc: '最《さい》高《こう》にうれしい気《き》持《も》ち',
        imagePath: '/plutchik/joy-3.png',
        scenes: [
          { text: 'とても楽《たの》しいことがあった' },
          { text: 'ずっと待《ま》っていたことができた' },
          { text: 'すごくほめられた' },
        ],
      },
    ],
  },
  {
    id: 'trust',
    baseLabel: '信《しん》頼《らい》',
    color: '#7BC67E',
    levels: [
      {
        level: 1,
        id: 'trust-1',
        name: 'すきだよ',
        desc: 'ちょっと安心《あんしん》できる気《き》持《も》ち',
        imagePath: '/plutchik/trust-1.png',
        scenes: [
          { text: 'やさしくしてもらった' },
          { text: '話《はな》しかけてもらった' },
        ],
      },
      {
        level: 2,
        id: 'trust-2',
        name: '安心《あんしん》',
        desc: 'たよれる・安心《あんしん》できる気《き》持《も》ち',
        imagePath: '/plutchik/trust-2.png',
        scenes: [
          { text: '助《たす》けてもらった' },
          { text: '一緒《いっしょ》にいてもらった' },
          { text: '話《はな》を聞《き》いてもらった' },
          { text: 'そばにいてくれた' },
        ],
      },
      {
        level: 3,
        id: 'trust-3',
        name: '大《だい》好《す》き',
        desc: 'すごくたよれて大《だい》好《す》きな気《き》持《も》ち',
        imagePath: '/plutchik/trust-3.png',
        scenes: [
          { text: '大切《たいせつ》にしてもらえた' },
          { text: 'ずっと一緒《いっしょ》にいたい' },
          { text: 'この人《ひと》が大《だい》好《す》き' },
        ],
      },
    ],
  },
  {
    id: 'anticipation',
    baseLabel: '期待《きたい》',
    color: '#FF9A3C',
    levels: [
      {
        level: 1,
        id: 'anticipation-1',
        name: 'たのしみ',
        desc: 'ちょっとたのしみな気《き》持《も》ち',
        imagePath: '/plutchik/anticipation-1.png',
        scenes: [
          { text: 'あした何《なに》かある' },
          { text: 'ちょっとたのしみなことがある' },
        ],
      },
      {
        level: 2,
        id: 'anticipation-2',
        name: 'わくわく',
        desc: 'たのしいことを待《ま》っている気《き》持《も》ち',
        imagePath: '/plutchik/anticipation-2.png',
        scenes: [
          { text: 'たのしいことが待《ま》っている' },
          { text: 'お出《で》かけが楽《たの》しみ' },
          { text: 'イベントがある' },
          { text: 'プレゼントが楽《たの》しみ' },
        ],
      },
      {
        level: 3,
        id: 'anticipation-3',
        name: 'めちゃくちゃたのしみ',
        desc: '待《ま》ちきれないくらいたのしみな気《き》持《も》ち',
        imagePath: '/plutchik/anticipation-3.png',
        scenes: [
          { text: 'ずっと待《ま》っていたことがもうすぐ' },
          { text: '最高《さいこう》にたのしいことがある' },
        ],
      },
    ],
  },
  {
    id: 'surprise',
    baseLabel: '驚《おどろ》き',
    color: '#5BC8C8',
    levels: [
      {
        level: 1,
        id: 'surprise-1',
        name: 'あれ？',
        desc: 'ちょっと不思議《ふしぎ》に思《おも》った',
        imagePath: '/plutchik/surprise-1.png',
        scenes: [
          { text: '知《し》らないことがあった' },
          { text: 'なんか変《へん》だと思《おも》った' },
        ],
      },
      {
        level: 2,
        id: 'surprise-2',
        name: 'びっくり',
        desc: '思《おも》いがけないことがあった気《き》持《も》ち',
        imagePath: '/plutchik/surprise-2.png',
        scenes: [
          { text: '急《きゅう》に大《おお》きな音《おと》がした' },
          { text: '突然《とつぜん》話《はな》しかけられた' },
          { text: '予想外《よそうがい》のことがあった' },
          { text: '知《し》らない人《ひと》が来《き》た' },
        ],
      },
      {
        level: 3,
        id: 'surprise-3',
        name: '信《しん》じられない',
        desc: 'ありえないくらいびっくりした気《き》持《も》ち',
        imagePath: '/plutchik/surprise-3.png',
        scenes: [
          { text: '全《まった》く予想《よそう》していなかった' },
          { text: 'ものすごく驚《おどろ》くことがあった' },
        ],
      },
    ],
  },
  {
    id: 'sadness',
    baseLabel: '悲《かな》しみ',
    color: '#5B8DEF',
    levels: [
      {
        level: 1,
        id: 'sadness-1',
        name: 'しょんぼり',
        desc: 'ちょっと元気《げんき》がない気《き》持《も》ち',
        imagePath: '/plutchik/sadness-1.png',
        scenes: [
          { text: 'うまくいかなかった' },
          { text: 'つかれている' },
          { text: '思《おも》い通《どお》りにならなかった' },
        ],
      },
      {
        level: 2,
        id: 'sadness-2',
        name: 'かなしい',
        desc: '悲《かな》しい・つらい気《き》持《も》ち',
        imagePath: '/plutchik/sadness-2.png',
        scenes: [
          { text: '仲良《なかよ》しの人《ひと》と会《あ》えなかった' },
          { text: 'いやなことを言《い》われた' },
          { text: 'たいせつなものをなくした' },
          { text: 'ひとりぼっちだった' },
        ],
      },
      {
        level: 3,
        id: 'sadness-3',
        name: 'なきたい',
        desc: 'とても悲《かな》しくて泣《な》きたい気《き》持《も》ち',
        imagePath: '/plutchik/sadness-3.png',
        scenes: [
          { text: 'とてもつらいことがあった' },
          { text: 'だれもわかってくれない' },
          { text: 'とても大切《たいせつ》なものがなくなった' },
        ],
      },
    ],
  },
  {
    id: 'disgust',
    baseLabel: '嫌悪《けんお》',
    color: '#9B59B6',
    levels: [
      {
        level: 1,
        id: 'disgust-1',
        name: 'いやだな',
        desc: 'ちょっといやな気《き》持《も》ち',
        imagePath: '/plutchik/disgust-1.png',
        scenes: [
          { text: '苦手《にがて》なことをした' },
          { text: 'いやなにおいがした' },
          { text: 'きらいなものを食《た》べた' },
        ],
      },
      {
        level: 2,
        id: 'disgust-2',
        name: 'きもちわるい',
        desc: 'いやで気持《きも》ち悪《わる》い',
        imagePath: '/plutchik/disgust-2.png',
        scenes: [
          { text: 'すごくいやなことがあった' },
          { text: '気持《きも》ち悪《わる》いものを見《み》た' },
          { text: 'いじわるをされた' },
          { text: 'お腹《なか》の具合《ぐあい》が悪《わる》い' },
        ],
      },
      {
        level: 3,
        id: 'disgust-3',
        name: 'ぜったいいやだ',
        desc: '絶対《ぜったい》にいやな気《き》持《も》ち',
        imagePath: '/plutchik/disgust-3.png',
        scenes: [
          { text: 'どうしてもいやなことをされた' },
          { text: '我慢《がまん》できないくらいいやだった' },
        ],
      },
    ],
  },
  {
    id: 'anger',
    baseLabel: '怒《いか》り',
    color: '#E74C3C',
    levels: [
      {
        level: 1,
        id: 'anger-1',
        name: 'ちょっとムカつく',
        desc: 'ちょっとイライラする気《き》持《も》ち',
        imagePath: '/plutchik/anger-1.png',
        scenes: [
          { text: 'うまくいかなかった' },
          { text: '待《ま》たされた' },
          { text: '思《おも》い通《どお》りにならなかった' },
        ],
      },
      {
        level: 2,
        id: 'anger-2',
        name: 'おこった',
        desc: '怒《おこ》った・頭《あたま》にきた気《き》持《も》ち',
        imagePath: '/plutchik/anger-2.png',
        scenes: [
          { text: 'いじわるをされた' },
          { text: 'ひどいことを言《い》われた' },
          { text: 'ずっとイライラしている' },
          { text: 'ものをこわされた' },
        ],
      },
      {
        level: 3,
        id: 'anger-3',
        name: '大激怒《だいげきど》',
        desc: 'ものすごく怒《おこ》っている気《き》持《も》ち',
        imagePath: '/plutchik/anger-3.png',
        scenes: [
          { text: '絶対《ぜったい》にゆるせないことがあった' },
          { text: '頭《あたま》が真《ま》っ白《しろ》になるくらい怒《おこ》った' },
        ],
      },
    ],
  },
  {
    id: 'fear',
    baseLabel: '恐怖《きょうふ》',
    color: '#27AE60',
    levels: [
      {
        level: 1,
        id: 'fear-1',
        name: 'ドキドキ',
        desc: 'ちょっとドキドキする気《き》持《も》ち',
        imagePath: '/plutchik/fear-1.png',
        scenes: [
          { text: 'いつもと違《ちが》うことがあった' },
          { text: '知《し》らない場所《ばしょ》に行《い》った' },
          { text: '大勢《おおぜい》の人《ひと》がいた' },
        ],
      },
      {
        level: 2,
        id: 'fear-2',
        name: 'こわい',
        desc: 'こわい・不安《ふあん》な気《き》持《も》ち',
        imagePath: '/plutchik/fear-2.png',
        scenes: [
          { text: '暗《くら》いところにいた' },
          { text: '大《おお》きな音《おと》がした' },
          { text: 'ひとりになった' },
          { text: '怒《おこ》っている人《ひと》がいた' },
        ],
      },
      {
        level: 3,
        id: 'fear-3',
        name: 'パニック',
        desc: '怖《こわ》くてどうしていいかわからない気《き》持《も》ち',
        imagePath: '/plutchik/fear-3.png',
        scenes: [
          { text: 'とても怖《こわ》いことがあった' },
          { text: 'どうしたらいいかわからなくなった' },
          { text: '頭《あたま》が真《ま》っ白《しろ》になった' },
        ],
      },
    ],
  },
];
