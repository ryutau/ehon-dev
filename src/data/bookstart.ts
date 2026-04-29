/**
 * ブックスタートおすすめ30冊のデータ。
 *
 * 画像を差し替えるときは、`public/images/bookstart-current/` または
 * `public/images/bookstart-old/` に画像（推奨: 600x800 程度のwebp/jpg）を置き、
 * 各エントリの `cover` を更新してください。
 *
 * `cover` を空文字列にしておくと、placeholder（タイトルだけのカード）が表示されます。
 */
export type BookEntry = {
  no: number;
  title: string;
  author?: string;
  publisher?: string;
  cover: string;
  comment: string;
};

const placeholderComment =
  "コメントは後ほど追記予定です。";

/** 現在版（2024・2025・2026年度）NPOブックスタート選書に対応する30冊 */
export const currentBookstartBooks: BookEntry[] = [
  { no: 1, title: "つみき", author: "", publisher: "", cover: "", comment: placeholderComment },
  { no: 2, title: "あいうえおはなし", author: "", publisher: "", cover: "", comment: placeholderComment },
  { no: 3, title: "プレゼント", author: "", publisher: "", cover: "", comment: placeholderComment },
  { no: 4, title: "うさちゃん", author: "", publisher: "", cover: "", comment: placeholderComment },
  { no: 5, title: "おふとん", author: "", publisher: "", cover: "", comment: placeholderComment },
  { no: 6, title: "クリスマス", author: "", publisher: "", cover: "", comment: placeholderComment },
  { no: 7, title: "つみき・かさねて", author: "", publisher: "", cover: "", comment: placeholderComment },
  { no: 8, title: "プチケーキ", author: "", publisher: "", cover: "", comment: placeholderComment },
  { no: 9, title: "ぎゃおー", author: "", publisher: "", cover: "", comment: placeholderComment },
  { no: 10, title: "くだもの", author: "", publisher: "", cover: "", comment: placeholderComment },
  { no: 11, title: "パンツ", author: "", publisher: "", cover: "", comment: placeholderComment },
  { no: 12, title: "フルーツ", author: "", publisher: "", cover: "", comment: placeholderComment },
  { no: 13, title: "のぼる", author: "", publisher: "", cover: "", comment: placeholderComment },
  { no: 14, title: "ぼちぼち", author: "", publisher: "", cover: "", comment: placeholderComment },
  { no: 15, title: "つぎはぼく", author: "", publisher: "", cover: "", comment: placeholderComment },
  { no: 16, title: "ちょきちょき", author: "", publisher: "", cover: "", comment: placeholderComment },
  { no: 17, title: "もちつき", author: "", publisher: "", cover: "", comment: placeholderComment },
  { no: 18, title: "バナナ", author: "", publisher: "", cover: "", comment: placeholderComment },
  { no: 19, title: "はらぺこあおむし", author: "", publisher: "", cover: "", comment: placeholderComment },
  { no: 20, title: "ぴょーん", author: "", publisher: "", cover: "", comment: placeholderComment },
  { no: 21, title: "ねんねんよー", author: "", publisher: "", cover: "", comment: placeholderComment },
  { no: 22, title: "グランパ", author: "", publisher: "", cover: "", comment: placeholderComment },
  { no: 23, title: "ぞうのプッシュキン", author: "", publisher: "", cover: "", comment: placeholderComment },
  { no: 24, title: "もくもく", author: "", publisher: "", cover: "", comment: placeholderComment },
  { no: 25, title: "あめふり", author: "", publisher: "", cover: "", comment: placeholderComment },
  { no: 26, title: "おはよう", author: "", publisher: "", cover: "", comment: placeholderComment },
  { no: 27, title: "おふろ", author: "", publisher: "", cover: "", comment: placeholderComment },
  { no: 28, title: "ぼうし", author: "", publisher: "", cover: "", comment: placeholderComment },
  { no: 29, title: "あいうえおの本", author: "", publisher: "", cover: "", comment: placeholderComment },
  { no: 30, title: "おやすみ", author: "", publisher: "", cover: "", comment: placeholderComment },
];

/** 旧版（2021・2022・2023年度） */
export const oldBookstartBooks: BookEntry[] = [
  {
    no: 1,
    title: "あ・あ",
    author: "三浦太郎",
    publisher: "童心社",
    cover: "",
    comment:
      "赤ちゃんが最初に発する音「あ」。シンプルな絵とともに、身近なものが「あ」「あ」と現れます。読み手と目を合わせ、声を合わせて楽しめる絵本です。",
  },
  {
    no: 2,
    title: "あっ！",
    author: "新井洋行",
    publisher: "金の星社",
    cover: "",
    comment:
      "指さして「あっ！」。くるま、電車、船と赤ちゃんの大好きな乗物が次々と現れます。ことばを発する少し前の時期にぴったりの絵本。",
  },
  {
    no: 3,
    title: "あっぷっぷ",
    author: "中川ひろたか／村上康成",
    publisher: "ひかりのくに",
    cover: "",
    comment:
      "わらべうた絵本。「だるまさん にーらめっこしましょ」と歌いながら、ほっぺをふくらませて顔を見合わせて遊びます。",
  },
  {
    no: 4,
    title: "いないいないばあ",
    author: "松谷みよ子／瀬川康男",
    publisher: "童心社",
    cover: "",
    comment:
      "「ばあ」の楽しさがページめくりで倍増。50年以上読み継がれている、ママもおばあちゃんも読んだ定番のロングセラー絵本。",
  },
  {
    no: 5,
    title: "いろいろ ばあ",
    author: "新井洋行",
    publisher: "えほんの杜",
    cover: "",
    comment:
      "「いないいないばあ」を連想させる「いろいろばあ」。形と色にぴったりのオノマトペや、2色が混ざりあう驚きが楽しめます。",
  },
  {
    no: 6,
    title: "おつきさまこんばんは",
    author: "林明子",
    publisher: "福音館書店",
    cover: "",
    comment:
      "濃紺の夜空に現れるまんまるいお月さま。黒雲の意外な一面と、にっこり笑顔のお月さまに、読む人もほっとします。",
  },
  {
    no: 7,
    title: "おひさま あはは",
    author: "前川かずお",
    publisher: "こぐま社",
    cover: "",
    comment:
      "笑顔があふれる絵本。黄色がメインの画面で、おひさま、木、小鳥、ひまわり…とみんなが「あはは」と大きな口を開けて笑います。",
  },
  {
    no: 8,
    title: "おひさま さんさん おはようさん",
    author: "なかじまかおり",
    publisher: "岩崎書店",
    cover: "",
    comment:
      "「おひさま さんさん おはようさん」とリズミカルな言葉を口にするだけで自然と笑顔に。読む大人も元気をもらえます。",
  },
  {
    no: 9,
    title: "かん かん かん",
    author: "のむらさやか／川本幸（制作）／塩田正幸（写真）",
    publisher: "福音館書店",
    cover: "",
    comment:
      "真っ黒な背景に鮮やかな黄色の踏切。子どもの好きなものが「かん　かん　かん」の音とともに汽車に乗って次々と現れては去っていきます。",
  },
  {
    no: 10,
    title: "ぎったん ばっこん",
    author: "なかえよしを／上野紀子",
    publisher: "文化出版局",
    cover: "",
    comment:
      "シーソー遊びの絵本。動物たちが次々シーソーに乗り、左へ右へと傾きます。パパママのおひざに子どもを乗せてのシーソー遊びも楽しそう。",
  },
  {
    no: 11,
    title: "ぎゅう ぎゅう ぎゅう",
    author: "おーなり由子／はたこうしろう",
    publisher: "講談社",
    cover: "",
    comment:
      "おててを「ぎゅう」、おなかを「ぎゅう」、お母さんもお父さんも一緒に「ぎゅう」。抱きしめ、抱きしめられて、心があたたまります。",
  },
  {
    no: 12,
    title: "くだもの",
    author: "平山和子",
    publisher: "福音館書店",
    cover: "",
    comment:
      "本物と見まごうほど写実的に描かれる果物。「さあ どうぞ」と差し出されて、子どもは思わず手を伸ばし「あっぷん」と食べます。",
  },
  {
    no: 13,
    title: "ごぶごぶ ごぼごぼ",
    author: "駒形克己",
    publisher: "福音館書店",
    cover: "",
    comment:
      "赤ちゃんの好きな「ぷ」の音とたくさんの丸が歌うように呼応。高低や調子を変えて歌うように読んでも楽しい絵本。",
  },
  {
    no: 14,
    title: "さわらせて",
    author: "みやまつともみ",
    publisher: "アリス館",
    cover: "",
    comment:
      "「ちょっとさわらせて」の繰り返しが耳に心地よく、動物たちの表情と返答もそれぞれに味わい深い、目でも手でもあたたかさを感じる絵本。",
  },
  {
    no: 15,
    title: "じゃあじゃあ びりびり",
    author: "まついのりこ",
    publisher: "偕成社",
    cover: "",
    comment:
      "はっきりした色使いとオノマトペの文字配置。赤ちゃんの肩幅と同じ小さなサイズで、自分でめくって繰り返し遊べます。",
  },
  {
    no: 16,
    title: "だっだあー",
    author: "ナムーラミチヨ",
    publisher: "主婦の友社",
    cover: "",
    comment:
      "粘土で作られたかいじゅうと赤ちゃんの顔。口の形と音がぴったりあっていることに赤ちゃんは気づくでしょう。",
  },
  {
    no: 17,
    title: "どうぶつのおかあさん",
    author: "小森厚／薮内正幸",
    publisher: "福音館書店",
    cover: "",
    comment:
      "毛並みの一本一本まで写実的に描かれた動物の母子。どのお母さんも穏やかな表情で、それぞれの運び方で子どもを運びます。",
  },
  {
    no: 18,
    title: "ととけっこう よがあけた",
    author: "こばやしえみこ（案）／ましませつこ（絵）",
    publisher: "こぐま社",
    cover: "",
    comment:
      "おはなし会の始まりによく使われるわらべうた絵本。子どもの名前にしてひとりずつ呼んで歌うと、どの子も笑顔がひろがります。",
  },
  {
    no: 19,
    title: "はなび ドーン！",
    author: "カズコ G・ストーン",
    publisher: "童心社",
    cover: "",
    comment:
      "濃紺の夜空に彩り鮮やかな花火が打ち上がります。「シューッ」「パーン」「ドーン」の繰り返しと、ラストの笑顔で明るい気持ちに。",
  },
  {
    no: 20,
    title: "バナナです",
    author: "川端誠",
    publisher: "文化出版局",
    cover: "",
    comment:
      "皮をむく前のバナナ、途中、むき終えたバナナ、木になっているバナナ…様々なバナナが登場。どれもすべて「バナナ」。",
  },
  {
    no: 21,
    title: "ぴょーん",
    author: "まつおかたつひで",
    publisher: "ポプラ社",
    cover: "",
    comment:
      "「ぴょーん」で動物が飛び跳ねます。縦長の画面下から上へと絵が動き、手足を広げて跳ねる姿が楽しい絵本。",
  },
  {
    no: 22,
    title: "へっこ ぷっと たれた",
    author: "こがようこ（構成・文）／降矢なな（絵）",
    publisher: "童心社",
    cover: "",
    comment:
      "赤ちゃんと一緒に遊ぶわらべうた。膝の上で抱っこしてポンポンとリズムをとりながらうたに合わせて赤ちゃんを弾ませます。",
  },
  {
    no: 23,
    title: "べろ べろ べろ",
    author: "長新太",
    publisher: "BL出版",
    cover: "",
    comment:
      "ナンセンス絵本は体もほぐします。「ぺろぺろぺろ」を繰り返しページをめくるごとに予想を上回る展開で進みます。",
  },
  {
    no: 24,
    title: "ぽんぽん ポコポコ",
    author: "長谷川義史",
    publisher: "BL出版",
    cover: "",
    comment:
      "ぽんぽん（おなか）を出して「ぽんぽん ポコポコ」。次は誰かな？のページめくりが楽しく、見る子も思わずおなかをたたき始めます。",
  },
  {
    no: 25,
    title: "まねっこおやこ",
    author: "おくむらけんいち／マッティ・ピックヤムサ",
    publisher: "ブロンズ新社",
    cover: "",
    comment:
      "フィンランドのイラストレーターの作。お母さん、お父さんに続いて赤ちゃんがまねっこ。最後は3人揃ってやります。",
  },
  {
    no: 26,
    title: "まる さんかく ぞう！",
    author: "及川賢治／竹内繭子",
    publisher: "文溪堂",
    cover: "",
    comment:
      "「さんかく まる しかく」と3つの形が縦に重なり入れ替わります。突如あらわれる象、船、顔、れもんの意外な物に思わず笑い。",
  },
  {
    no: 27,
    title: "まる まる",
    author: "中辻悦子",
    publisher: "福音館書店",
    cover: "",
    comment:
      "画面は人の顔のよう。目に当たる位置の小さな穴と、ページをめくるたびに変わる目の色と顔の形に、赤ちゃんの成長が寄り添います。",
  },
  {
    no: 28,
    title: "まんまん ぱっ！",
    author: "長野麻子／長野ヒデ子",
    publisher: "アリス館",
    cover: "",
    comment:
      "赤ちゃんの好きな丸と音がてんこ盛り。「まんまん」「ぐるぐる」「あわわわ」と弾む音で、ママも声を出して元気になれます。",
  },
  {
    no: 29,
    title: "みず ちゃぽん",
    author: "ひろのみずえ",
    publisher: "福音館書店",
    cover: "",
    comment:
      "「ぴちゃ」と落ちる一粒のしずくから始まり、おしまいには水が画面いっぱいに。お風呂や水遊びを思い出させてくれる絵本。",
  },
  {
    no: 30,
    title: "よこむいて にこっ",
    author: "高畠純",
    publisher: "絵本館",
    cover: "",
    comment:
      "正面を向いた動物の険しい表情が、横を向いた瞬間「にこっ」と微笑みます。見る者の体まで緩み、自然と笑顔になれる絵本。",
  },
];
