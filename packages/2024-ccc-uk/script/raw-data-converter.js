let datas = require('./csv/output/raw-data.json')
const fs = require('fs')
const path = require('path')

let i18n_zh_tw = []
let i18n_en = []
let pages = []

/*
  欠缺landing page 圖片\前言、map for mobile
*/

datas = datas.sort((a, b) => {
  if (a.order - 0 < b.order - 0) {
    return -1
  } else if (a.order > b.order) {
    return 1
  } else {
    return 0
  }
})

const htmlMeta = {
  text: {
    title: '勿忘烏克蘭：張乾琦．戰地紀實',
  },
  eng_text: {
    title: `Ukraine: Lest We Forget. Chien-Chi Chang's Reportage of the Two-Year Anniversary of the Russia-Ukraine War`,
  },
}

let firstPage = datas.find((data) => data.type === 'L')
firstPage = {
  order: firstPage.order,
  type: 'L',
  name: 'Landing Page',
  filename: firstPage.filename,
  text: {
    title: '勿忘烏克蘭\n張乾琦．戰地紀實',
    foreword:
      '當奧地利人以高空煙火慶祝新年時，烏克蘭人卻在爆炸聲中驚醒。張乾琦冒著嚴寒浴雪而行，第八次前往烏克蘭戰地，見證前線「絞肉機」般漫長艱苦的戰況。',
    credit: '張乾琦 Chien-Chi Chang',
    ig: 'https://www.instagram.com/chien_chi_chang',
    text: firstPage.text,
  },
  eng_text: {
    title: `Ukraine: Lest We Forget\nChien-Chi Chang's Reportage of the Two-Year Anniversary of the Russia-Ukraine War`,
    foreword: `Braving the severe cold and snow, he travels for the eighth time to the Ukrainian war zone, witnessing the prolonged and arduous conditions on the frontlines, often likened to a "meat grinder.”`,
    credit: 'Chien-Chi Chang',
    ig: 'https://www.instagram.com/chien_chi_chang',
    eng_text: firstPage.eng_text,
  },
}

const endingPage = datas
  .filter((data) => data.type === 'E')
  .reduce((first) => {
    return {
      order: first.order,
      type: first.type,
      name: first.name,
      filename: first.filename,
      text: {
        first: {
          name: '張乾琦',
          ig: 'https://www.instagram.com/chien_chi_chang',
          pairs: [
            {
              head: '出生：',
              body: '1961年生於台中市烏日區。\n\n',
            },
            {
              head: '學經歷：',
              body: '東吳大學英文學士，美國印第安那大學教育碩士，曾任《西雅圖時報》《巴爾的摩太陽報》攝影記者，現為馬格蘭通訊社終身會員。\n\n',
            },
            {
              head: '攝影作品：',
              body: '《鍊》（The Chain）、《我願意》（I do I do I do）、《囍》（Double Happiness）、《時差》（Jet Lag）、《唐人街》（Chinatown）、《脫北者》(Escape from North Korea )等。\n\n',
            },
            {
              head: '獲獎：',
              body: '曾獲荷蘭世界新聞攝影獎、美國NPPA年度攝影師、法國影像Visa國際紀實攝影獎、尤金．史密斯攝影獎、美國年度新聞攝影書獎、第二十八屆東元獎人文類獎、2022年新聞志業特殊貢獻獎，菲利普瓊斯格里菲斯攝影獎，第27屆臺北文化獎。\n\n',
            },
            {
              head: '展覽與典藏：',
              body: '曾參與威尼斯雙年展、巴西聖保羅雙年展、紐約攝影三年展、斐列茲藝術博覽會等國際展覽。攝影作品獲亨利·卡地亞-布列松基金會、喬治伊斯曼博物館、紐約國際攝影博物館、台南奇美博物館、國立台灣美術館、紐約皇后藝術博物館等納為典藏。',
            },
          ],
        },
        second: {
          first: `你還記得布查大屠殺嗎？戰爭的殘忍景象曾讓全球民主國家憤慨，各國政要紛紛表達支持烏克蘭。2年過去了，不少西方國家已經產生戰爭疲勞，質疑為何繼續資助這場戰爭的聲音愈來愈高；一般人的悲憫之情也在消退，對戰爭畫面已逐漸無感。\n\n張乾琦始終沒有忘記烏克蘭。他在文章裡說，當奧地利人以高空煙火慶祝新年時，烏克蘭人卻在爆炸聲中驚醒。他冒著嚴寒浴雪而行，第8次前往烏克蘭戰地，見證前線「絞肉機」般漫長艱苦的戰況。（備註：全文以英文寫成，經翻譯後由張乾琦校正）`,
          pairs: [
            {
              head: '',
              body: `二○二三年十二月二十九日，俄羅斯全面入侵烏克蘭的第六七四天，我正在一班從烏克蘭首都基輔（Kyiv）出發、前往西部城市利沃夫（Lviv）的早班火車上。我對於即將在奧地利與孩子團聚，一同慶祝新年充滿著期待。火車啟程後不久，我收到一封簡訊，在烏克蘭新聞通訊社擔任編輯的朋友Peter詢問我行程是否遭到延誤？我說沒有，但為什麼這樣問呢？他立即回覆，告知一個嚴峻的情況：「…今天早上，空中有許多敵人的導彈…眾多死亡和破壞…」`,
            },
            {
              head: '炮擊轟鳴不斷　軍援現疲態',
              body: `反思之後，我意識到前一晚我的飯店走廊中不斷迴盪著持續而尖銳刺耳的空襲警報聲，廣播系統一再指示客人迅速前往指定的飯店防空避難所。隨後的調查揭示，俄羅斯發動了一場全面的空襲。透過社群媒體Telegram的即時新聞更新，得知這是自二○二二年二月俄羅斯全面攻擊以來，規模最大的一波攻勢。值得注意的是，在長達十八小時的空中彈幕中，烏克蘭的防空系統成功攔截了大多數針對主要城市的一二二枚導彈和三十六架伊朗見證者（Shahed）自殺無人機的攻擊。\n\n二○二三年的結束，悲劇地與其開始一樣，體現著烏克蘭人民正承受著的嚴重暴力。儘管我的火車一直平穩向西行駛，卻遇到了數次行程外的臨時停靠。與此同時，令人不安的新聞更新持續透過手機簡訊傳遞而來，詳細描述了一些悲痛慘烈事件，包括婦產科醫院、學校和公寓大樓遭受摧毀破壞。此刻，我思忖著是否能及時抵達利沃夫，以趕上預定前往波蘭克拉科夫（Krakow）機場的交通工具。與此同時，我感到一種不安—這是由於缺乏戰鬥後解壓期（通常約需七至十四天）—因為我從烏東頓巴斯前線，經過基輔，然後就已直接在回家的路上。我的心理狀態仍然深陷在戰區，對可能在頭頂上出現的無人機活動保持高度警覺，以及來自遠處空中，超音速飛行、人眼不可見的火箭和迫擊炮的不祥威脅，接著是爆炸後的震盪和耳畔一直有揮之不去的轟鳴聲。但這些不就是創傷後壓力症候群（PTSD）的症狀嗎？\n\n與俄羅斯投入的軍火相較，烏克蘭的炮火反擊僅為其四分之一，造成這種不對稱的顯著因素之一，據二○二三年十一月十四日的美聯社（AP）新聞報導，其中引述了白宮的消息，報導稱北韓向俄羅斯輸入了超過一千個貨櫃的裝備和彈藥。這些軍火包括短程彈道飛彈、反坦克飛彈、迫擊炮、火箭發射器和炮彈。此外，美國和歐盟在人道援助和軍事支援方面已經明顯不足。北約因被認為缺乏果斷行動力，而被戲稱為「只說不做」（No Action Talk Only，NATO，是北約的英文縮寫）。而這增加了烏克蘭在持續衝突中所面臨的挑戰。冬季來臨減緩了戰爭的推進，促使烏克蘭將其戰略焦點轉向防禦工事，包括構築反坦克三角水泥龍牙棒樁，鐵絲刺網路障和挖掘壕溝。`,
            },
            {
              head: '絞肉機的現實　擬擴大徵兵',
              body: `有一天早晨，我獲准隨軍採訪狂怒旅（Fury Brigade），這是一支由前警察執法人員組成的部隊，駐紮在前線城鎮康士坦丁尼夫卡（Kostyantynivka）附近。在這裡，我目睹了AZP S-60 57公釐高射炮的迅速部署，啟動後產生強大的崩裂聲，將炮彈密集狂射向俄羅斯的陣地。與該旅新聞官代號Bars的對話中，他傳達了一個訊息，即儘管他們的部隊持續不歇從陸地和空中發動了猛烈的攻擊，導致俄羅斯軍隊遭受了重大損失，但敵人仍然一再地挺進。這一認識強調了用「絞肉機」（meat grinder）一詞來描述這場戰爭的漫長而艱苦、悲慘而殘酷的本質。有關烏克蘭和俄羅斯的確切部隊數量和傷亡人數仍然未公開，皆為保密狀態。儘管缺乏官方統計數據，但烏克蘭士兵、志願役和徵召兵在過去數個月的戰爭中持續承受嚴酷考驗。烏克蘭國內民眾逐漸認知到一點，這也表示他們必須做好準備，準備長期投入衝突對抗。而起初企盼戰爭能在二○二四年劃下句點的樂觀情緒，正一點一滴地消逝。\n\n作為對長期參與的回應，烏克蘭內閣正在起草一項新的強制兵役法。截至二月十二日，這項法案已提交給議會進行通過，並在第一次審閱中獲得批准。總統澤倫斯基（Volodymyr Zelensky）必須簽署該法案，然而這並不受到民眾支持。它可能會將徵兵年齡從二十七歲降低到二十五歲的男性，擁有醫學或藥學教育背景的女性也將被強制徵召。逃避強制兵役的處罰可能也會被納入其中。這項新法律強調了該國對衝突持久性的認識。受到新法律影響的其中一人是我之前的新聞嚮導（fixer），目前正在接受軍事訓練的Serhiy。我曾與其他三位新聞嚮導合作，他們都已婚，也都可能在今年面臨強制徵兵。`,
            },
            {
              head: '穿梭陰濕壕溝　受未知襲擊',
              body: `在與馬爾基夫斯卡（Markivska）附近狂怒旅的士兵互動期間，我與一位一○五公釐榴彈炮助理炮手交談，他以代號Happy（快樂）而聞名，他友善的舉止，始終洋溢在充滿笑容的臉上。在操作榴彈炮射擊和裝填之間的空檔，他說自己僅接受三天的火炮操作訓練，而且主要是透過YouTube來學習。\n\n穿越二十公分深的黑色、潮濕、黏滑的泥濘地，對於我這個六十三歲、癌症倖存者來說是相當具有挑戰性的，而對我的新聞嚮導Slava來說，儘管比我年輕三十歲，他也遇到類似的困難。然而，我們必須迅速移動，避免遭俄羅斯偵察或自殺型無人機發現。每到一個獲准前往的前線基地時，部隊指揮官或新聞官員總是首先告知，若遭遇俄羅斯火箭炮襲擊，我們該由哪一條路線盡快通往戰壕庇護所。穿越骯髒泥濘的地形時，全身灰溜溜的老鼠在我眼前竄來竄去。對於在潮濕、黑暗、面積僅十平方公尺、在地下兩公尺深的狹小壕溝休息處的三名士兵來說，老鼠是一個持續的困擾。黑暗像一層厚重的布幕籠罩著狹窄的空間。一盞孤寂昏黃、閃爍的LED燈發出微弱光芒，映照著一片了無生機、寂靜籠罩的幽冥八荒，只有偶爾傳來老鼠爬行的聲音在漆黑中迴盪。士兵們缺乏有效的對策，只能寄望陣地裡來回穿梭的黃鼠狼捉老鼠。與此同時，一片死寂靜默的陣地裡，突然間、無預警、不停歇、又是此起彼落的炮擊，猶如柴可夫斯基《一八一二序曲》最後樂章中華麗澎湃卻又令人憎厭的十一響炮聲，前線的現實簡單粗暴地提醒著他們每天所面對的殘酷環境，以及生與死不歇的無常。下一次火箭襲擊的時間和地點，未知。`,
            },
            {
              head: '改日慶祝耶誕　消弭俄文化',
              body: `自一九一七年以來，烏克蘭根據東正教曆法，總在一月七日慶祝耶誕節。直到二○二三年，烏克蘭正式與其他西方基督教徒一樣改在十二月二十五日慶祝。這一天，基輔聖蘇菲亞廣場（St. Sophia Square）上的人工耶誕樹高達十二公尺，點綴著該國國旗顏色藍與黃的心形裝飾，上面有著烏克蘭的國徽，這是近一個世紀以來，烏克蘭首次象徵性地拉開與俄羅斯的距離。自俄羅斯入侵以來，烏克蘭已採取種種措施，如更改街道名稱和拆除紀念碑，以弭除俄羅斯和蘇聯帝國時期的痕跡。耶誕節前兩天，我拍攝了在烏東前線小鎮金德拉帝夫斯卡（Kindrativska）附近四二五特種突擊旅Skala的狙擊手部隊，三十八歲的副指揮官代號是Best，他以該部隊最頂尖的狙擊手而聞名。我問他們耶誕夜要做什麼？Best咧嘴笑著說：「我們要戰鬥！」在Best的臨時辦公室裡，兩個即時傳送的無人機偵察影像顯示在兩台四十三英寸的平板電視上，呈現出一個處處斷垣殘壁、幾乎無法辨認的巴赫穆特（Bakhmut）。Best分享了一段影片，展示了他在一七七○公尺和一八二○公尺的距離外擊中兩名移動中的俄羅斯士兵，他語帶自豪，強調其中的複雜度—包括風阻、彈道和因地球自轉使得物體運動時呈現複雜曲線的科氏力（Coriolis Effect）。螢幕上，一架俄羅斯無人機迅速飛過並隱沒至視線之外，這凸顯了威脅始終存在的事實。\n\n在這個部隊裡，四十二歲的司機曾是一名煤礦工人，現在他擁有除了駕駛之外的技能，包括射擊和操控無人機。每位部隊成員都具有相同能力。在採訪期間，他為我和新聞嚮導準備了傳統的紅色羅宋湯。他說，他的母親每天都會到教堂為每一位士兵祈禱。至截稿前，他們的部隊仍然投入在巴赫穆特周邊的作戰行動中。隨後，在基夫沙里夫卡（Kivsharivka）附近，一名當地東正教牧師，在教堂裡為年長者和士兵祈禱祝福，營造出一種敬畏和驚嘆的氛圍，只有來自遠處炮擊的衝擊波打斷了這片肅穆寧靜。儀式結束後，鐘聲響起，飽滿濃烈的鈴聲在四周迴盪。\n\n鐵軌發出刺耳聲響、火車突然停止，行程中斷，孩子看著他們的父母；乘客想找出旅程受到干擾的原因。沒有發生空襲抑或響起警報，附近也沒有戰鬥機飛行。是虛驚一場嗎？我不知道，我只知道在外頭，冬天的景象在貧瘠但如電影般的全景中展開，露出地平線的田野，如此平坦遼闊，我幾乎可以感覺到地球兩端的曲率。幾分鐘後，火車鳴笛，聲音響徹雲霄，宣告旅程繼續。`,
            },
            {
              head: '勿忘戰爭教訓　港殞落前例',
              body: `在我旁邊的乘客Aleks來自基輔，是一位農業工程師，經常出差。我們談論了世界上主要的地區衝突，像是納戈爾諾╴卡拉巴赫（Nagorno-Karabakh）、以色列和哈瑪斯、朝鮮半島、南海、以及台灣和中國之間的緊張局勢。他問我，台灣是否有從烏克蘭和俄羅斯戰爭中學到教訓，並且做好自衛的準備？我聳聳肩說道，當然希望如此，因為我相信，一個國家的和平與安全必須植根於其維護和保護其人民、土地和主權的力量和能力上。此外，我們不要忘記，台灣雖然不大，卻迷人親切，且蘊含微妙而隱密的力量。\n\n台灣人民是否要為不可避免的情況做好準備，這是一個值得嚴肅考慮的問題。令人不安的是看到馬前總統接受《德國之聲》（DW）訪談時，他提議台灣應設法以一切可能的方式安撫中國。三十五年來，我經常在局勢不穩定的地區旅行、拍攝記錄，遇到這種希望採納侵略者的觀點、合理化或為其辯護的個人是極為罕見的。這種複雜的心理動態，以及對遭虐待的否認，這不就與斯德哥爾摩綜合症（Stockholm syndrome）的概念相符嗎？\n\n一個令人痛心的例子是香港。二○一九年，我曾六次前往這座城市，記錄報導了百萬港人的反送中抗議行動。然而，隨後在二○二○年初，嚴苛的國家安全法（NSL）隨之頒布實施，香港自此走向令人憾惜的轉變—從眾所周知的自由社會、璀璨的大都會和「亞洲最好的城市」，變為已從昔日光輝蒙上陰影，一座需不斷面對額外治理的歐威爾式的島城。\n\n幸運的是，我的火車準時抵達了利沃夫，沒有任何耽擱。儘管如此，到了跨越邊境時，氣氛由令人期待變得充滿沮喪。由於烏克蘭和波蘭的邊境手續有時錯綜複雜，接下來是四小時的漫長等待。這意外的延誤導致我錯過了航班。雖然心情沮喪，但我立刻決定搭次日第一班飛機回家。這次經歷和意想不到的障礙，也再次說明了，旅行本就充滿許多不可預測的事物。`,
            },
            {
              head: '長年堅定抵抗　為國家存亡',
              body: `從飽受戰爭蹂躪的烏克蘭回來，能夠抱著孩子，喜悅是難以言喻的。每一次擁抱，都感覺是從混亂的衝突中成功奪回的寶貴時刻。然後，隔天晚上，接近午夜時分，隨著午夜教堂鐘聲敲響新年，奧地利格拉茲（Graz）搖身一變，成了一場高空慶典。黑夜綻放出耀眼的光芒，煙火從各個角落點燃、射出、噴發，點綴天鵝絨般的夜空。與此同時，歡天喜地的鄰居們在庫爾夥伴（Kool &amp; The Gang）的〈Celebration〉或麥可布雷（Michael Bublé）的〈It's a Beautiful Day〉等旋律中，舉杯跳舞。\n\n一月三日，俄羅斯全面入侵烏克蘭的第六七九天，烏克蘭總統澤倫斯基表示，俄羅斯在僅僅五天內就發射了五百枚導彈和無人機對烏克蘭進行攻擊。全國至少有六十人在這波襲擊中喪生，東北部的哈爾基夫（Kharkiv）、南部的札波羅熱（Zaporizhia）、南部海岸的敖德薩（Odesa），甚至最西部的利沃夫等城市，都深受重擊。\n\n數百萬烏克蘭人在爆炸聲中驚醒，這或許提醒了大家，這些聲響應該在全球引起共鳴。烏克蘭官員呼籲西方盟友增加空中防禦，這也彰顯了由於戰爭疲勞而導致的支持壓力。英國的堅定支持受到關注，其首相蘇納克（Rishi Sunak）強調，只要有需要，就必會與烏克蘭同在。\n\nPeter，我在烏克蘭新聞通訊社的編輯朋友，一直在社群媒體Substack（“ukraine@war”）上撰寫有關過去兩年戰爭的文章。自二○二二年二月二十四日俄羅斯全面入侵烏克蘭，到今年二月二十四日即將滿兩年了。他強調三六五加三六五天的累積影響，相當於七三○天。不僅於此，他再加上另外的二九二二天，標誌著自俄羅斯於二○一四年二月入侵並吞併克里米亞半島以來的十年。也就是說，烏克蘭總計已經持續三六五二天與世界第二大軍事強權進行血腥的衝突和對抗。烏克蘭的志願者和士兵，已經在多年戰鬥中磨練出經驗，持續以堅定不移的決心和必須忍受進一步逆境的強大精神，以確保自己的國家能夠生存下來。勿忘烏克蘭！`,
            },
          ],
        },
        caption: '攝影：Viacheslav Ratynskyi',
        credit: {
          pairs: [
            '撰文：張乾琦',
            '攝影：張乾琦 / 馬格蘭通訊社',
            '網頁製作/策展：',
            '李文瀚、曾立宇、李又如、王薏晴、簡信昌',
            '英文翻譯：羅翊寧',
            '英文校閱：張乾琦',
          ],
        },
      },
      eng_text: {
        first: {
          name: 'Chien-Chi Chang',
          ig: 'https://www.instagram.com/chien_chi_chang',
          pairs: [
            {
              head: '',
              body: 'Born 1961, Taichung, Taiwan.\n\n',
            },
            {
              head: 'Education and Work Experience',
              body: 'Chang received a BA from Soochow University in Taipei and an MS from Indiana University, Bloomington.\nHe worked as a photojournalist at The Seattle Times and The Baltimore Sun. \nChang joined Magnum Photos in 1995 and was elected as a Full Member in 2001. \nHis photographic works have been widely published in internationally renowned media such as National Geographic, TIME magazine, New York Times and Der Spiegel.\n\n',
            },
            {
              head: 'Photography Works',
              body: 'The Chain, I do I do I do, Double Happiness, Jet Lag, Chinatown, Escape from North Korea, and etc.\n\n',
            },
            {
              head: 'Awards',
              body: "Magazine Photographer of the Year, National Press Photographers Association (POY), US, 1999 \nFirst prize, Daily Life Stories, World Press Photos, Netherlands, 1999 \nVisa d'Or, Visa pour l'image, Perpignan, France, 1999 \nW. Eugene Smith Memorial Fund for Humanistic Photography, 1999 \nThe Best of Photography Book, The Chain, POY, US, 2003 \nTECO Award Culture Category, Taiwan, 2021 \nPhilip Jones Griffiths Award, UK, 2022 \nThe Foundation for Excellent Journalism Special Contribution Award, Taiwan, 2022 \nTaipei Cultural Award, Taiwan, 2023\n\n",
            },
            {
              head: 'Selected Exhibitions and Collections',
              body: `Chang's works have been shown in galleries and museums around the world including Venice Biennale, São Paulo Biennial, International Center of Photography. His photographic works has been in the collection of Henri Cartier-Bresson Foundation, George Eastman Museum, International Center of Photography, Queens Museum, Taipei Fine Arts Museume, Chimei Museum, and National Taiwan Museum of Fine Arts.`,
            },
          ],
        },
        second: {
          first: `Do you still remember the Bucha massacre? The brutal scenes of war once stirred indignation among democratic nations worldwide, with leaders expressing support for Ukraine. Two years have passed, and many Western countries have developed war fatigue, questioning why they should continue funding this war. The voices of ordinary people expressing compassion have also faded, gradually becoming desensitized to the images of war.\n\nChien-Chi Chang has never forgotten Ukraine. In his article, he mentions that while Austrians celebrate the new year with sky-bound fireworks, Ukrainians wake up to the sounds of explosions. Braving the cold, he travels through the snow for the eighth time to the Ukrainian war zone, witnessing the prolonged and arduous conditions on the frontlines, often likened to a "meat grinder." (Note: The original text was written in English. It was translated by Yi-Ling Lo and was proofread by Chien-Chi Chang.)`,
          pairs: [
            {
              head: '',
              body: `On December 29, 2023, which marked the 674th day of Russia's full-scale invasion of Ukraine, I found myself aboard an early morning train journeying from the capital, Kyiv, to the western city of Lviv. My anticipation for reuniting with my children in Austria for New Year celebrations was palpable. Shortly after the train's departure, I received a text message from Peter, an editor friend at Interfax (Ukrainian News Services,) inquiring about any potential delays to my travel plans. I said no, but why? This immediately prompted him to convey a grave situation: "...many enemy projectiles in the air this morning...lots of death and destruction...”\n\nUpon reflection, I became aware that the persistent, high-pitched air siren alerts reverberated through the corridors of my hotel the previous night. The public address system repeatedly instructed guests to proceed to the designated hotel bomb shelter expeditiously. Subsequent inquiries revealed that Russia had initiated an extensive aerial assault, constituting the most substantial offensive since the commencement of all-out attacks in February 2022. Notably, Ukraine's air defense successfully intercepted a majority of the 122 missiles and 36 Iranian Shahed-type suicide drones targeted at major Ukrainian cities during an 18-hour aerial barrage, as communicated and updated through Telegram news messages.\n\nTragically, the year 2023 drew to a close, mirroring its commencement — marked by grievous violence inflicted upon the people of Ukraine. Despite the steady westward progression of my train, it encountered unscheduled halts. Simultaneously, distressing updates persisted through mobile alerts, detailing the dire events such as the destruction of a maternity hospital, schools, and apartment complex.\n\nMeanwhile, I contemplated the feasibility of reaching Lviv on time to catch my scheduled transportation to Krakow Airport. Concurrently, I experienced a sense of unease due to the absence of a combat decompression period (usually seven to 14 days), having transitioned directly from the Donbas frontline to Kyiv and subsequently en route to my home. My mental state remained entrenched in the war zone, with a heightened awareness and wariness of potential drone activity overhead, as well as the ominous threat of incoming rockets and mortars traversing the sky with supersonic speed, rendering them nearly invisible to the human eye, followed by explosive concussions and everlasting deafening humming. But aren't these the symptoms of post-traumatic stress disorder (PTSD)?\n\nIn contrast to Ukraine's artillery response, which amounted to only a quarter of Russia's ammunition, a notable factor contributing to this discrepancy is, in part, the reported influx of over 1,000 containers comprising equipment and munitions from North Korea to Russia. This arsenal includes short-range ballistic missiles, anti-tank missiles, mortars, rocket launchers, and shells, as detailed in an Associated Press (AP) news report citing information from the White House on November 14, 2023.\n\nFurthermore, a conspicuous deficit in aid and military support from the United States and the European Union has become evident. The perceived lack of assertiveness from NATO, characterized by a colloquial "No Action Talk Only" sentiment, adds to the challenges faced by Ukraine in the ongoing conflict.\n\nThe onset of winter has slowed the war's progression, prompting Ukraine to shift its strategic focus towards defensive fortification efforts, including constructing barb-wired barricades with anti-tank triangular cemented dragon teeth and excavating trenches. One morning, I was embedded with the Fury Brigade, a contingent of former policemen stationed near the frontline town of Kostiantynivka. At this location, I observed the expeditious deployment of AZP S-60 57mm anti-aircraft guns, which, upon activation, generated a formidable cannonade, intensively delivering explosive force straight into Russian positions.\n\nIn conversation with the brigade's press officer, identified by the code name "Bars," it was conveyed that despite the relentless assaults launched by their unit from the land and in the air, resulting in substantial casualties among Russian forces, the adversaries continued to advance. This realization underscored the tragically fitting and brutal appropriateness of the term "meat grinder" to describe the protracted and grueling nature of the war.\n\nThe exact troop numbers and casualty figures for both Ukraine and Russia remain undisclosed, shrouded in secrecy. Notwithstanding the absence of official statistics, the rigorous nature of the conflict has been endured by Ukrainian soldiers, volunteers, and conscripts over months of sustained warfare. A growing realization has taken hold within Ukraine, indicating preparedness for an enduring commitment to the conflict. The initial optimism regarding the potential resolution of the war in 2024 is diminishing.\n\nIn response to the prolonged engagement, Ukraine's Cabinet of Ministers is drafting a new law on forced military conscription. As of February 12, the draft law has been submitted to Parliament for adoption and approved in the first reading. The measure President Volodymyr Zelensky must sign into law will not be popular. It will likely lower the draft age from 27 to 25 and include women possessing medical or pharmaceutical education. Penalties for evading forced conscription are likely to be included. The new legislation underscores the nation's acknowledgment of the protracted nature of the conflict. Among those impacted by the new law is Serhiy, one of my fixers currently undergoing military training. I have worked with three other fixers, all of whom are married, who may face potential forced conscription this year. \n\nDuring interactions with soldiers from the Fury Brigade near Markivska, I spoke with a 105mm howitzer assistant gunner known by the code name "Happy," whose affable demeanor was reflected in his smiley face. He shared that he had received only three days of training for operating the cannon between firing and loading the howitzer. He acquired additional skills through online resources, mainly on YouTube.\n\nNavigating through the 20-centimeter-deep black, moist, sticky mud proved challenging, especially for someone my age, 63, a cancer survivor. This also posed difficulties for my fixer, Slava, who encountered similar obstacles despite being 30 years younger. However, our movement was swift, avoiding detection by Russia's reconnaissance or suicide drones. In the frontline outposts we visited, unit commanders or press officers consistently provided instructions on where to seek shelter in the event of Russian rocket shelling.\n\nTraversing the filthy and muddy terrain before me, sleek gray mice are scurrying around, a persistent nuisance for soldiers in the dark, damp, 10-square-meter, and two-meter-below-ground sleep quarters for three soldiers. Darkness envelops the tiny space like a heavy shroud in the cramped quarters of the trench. The pale glow of a solitary, flickering LED casts feeble light, revealing an area devoid of life. A pervasive stillness reigns, broken only by the occasional crawling of mice echoing through the desolation. The soldiers, lacking effective countermeasures, relied on weasels to catch mice. Amid continuous incoming and outgoing shelling, akin to the 11 cannon shots of the adorned and abhorred final movement in Tchaikovsky's 1812 Overture, the frontline reality brings a stark reminder of the unforgiving environment they navigate daily and the constant uncertainty of life and death, with the next rocket strike unknown in timing and location.\n\nSince 1917, Ukraine has traditionally celebrated Christmas on January 7th, according to the Eastern Orthodox calendar. However, starting in 2023, Ukraine officially shifted its Christmas celebration to December 25th, aligning with the practice of other Western Christians. On this day, a 12-meter artificial Christmas tree on Kyiv's St. Sophia Square is adorned with heart-shaped decorations in the colors of the national flag (blue and yellow). These decorations proudly display the emblem of Ukraine, symbolizing a symbolic distance from Russia for the first time in nearly a century. Since the Russian invasion, Ukraine has undertaken various measures, such as renaming streets and removing monuments, to erase traces of the Russian and Soviet imperial periods.\n\nTwo days before Christmas, I was with the sniper unit of the 425th Assault Battalion Skala near Kindrativska, engaging in conversation with the 38-year-old deputy commander, code sign "Best," renowned as the brigade's top sniper. I asked what he would do Christmas Eve; Best grinned and said, “We want to fight!” Inside Best's make-shift office, real-time drone reconnaissance images of a devasted Bakhmut ruined beyond recognition are transmitted on two 43-inch flat-screen TVs. Sharing a video clip of shooting two moving Russian soldiers from distances of 1,770 and 1,820 meters, Best, with a sense of pride, highlighted the complexities involved, including windage, bullet drop, and the impact of the earth's rotation resulting in the objects following complex curved paths, known as the Coriolis Effect. A Russian drone swiftly moved beneath one of the screens, underscoring the ever-present threat.\n\nThe unit's 42-year-old driver, formerly a coal miner, now possessed skills beyond driving, including shooting and flying drones. Every unit member has the same abilities. He prepared traditional red borscht for the fixer and me during the visit. He conveyed that his mother prayed for every soldier daily in the church. As of the current update, their unit remains actively engaged in operations around Bakhmut.\n\nSubsequently, a local Orthodox priest near Kivsharivka blessed senior residents and soldiers in the church, creating an atmosphere of reverence and awe, interrupted only by the shockwave from distant shelling. After the service, the bell resonated, producing a rich, full-bodied tone that echoed through the surroundings.\n\nWhen the train journey was marked by the screeching of tracks and sudden stops, children looked at their parents; passengers sought explanations for the interruption. No air raids or emergency sirens ensued, and no fighter jets were observed flying nearby. False alarm? I don't know, except outside, the winterized landscape unfolded in a barren but cinematic panorama, revealing fields giving way to the horizon, so flat and vast that I could almost sense the earth's curvature on both ends. A few minutes later, the train's whistle pierced the air, announcing the journey continued.\n\nThe passenger next to me, Aleks, a well-traveled agricultural engineer from Kyiv, had a conversation concerning flashpoints in major regional conflicts, including Nagorno-Karabakh, Israel and Hamas, the Korean Peninsula, the South China Sea, and tensions between Taiwan and China. He asked me if Taiwan had learned from the aftermath of the war between Ukraine and Russia and been well-prepared to defend itself. I shrugged and said I certainly hoped so, for I believe a nation's peace and security are only anchored in its strength and ability to preserve and protect its people, land, and sovereignty. Furthermore, let's not forget that Taiwan, though small in size, exudes a charming sweetness combined with a subtle and stealthy strength.\n\nThe need for preparedness among the people of Taiwan in anticipation of potential eventualities is a matter that warrants serious consideration. It is disconcerting to observe former President Ma's interview with Deutsche Welle (DW), during which he suggested that Taiwan should seek to appease China by all available means. Over my 35 years of extensive travel, documenting regions facing precarious situations and encounters with individuals expressing a desire to adopt the perspective, rationalize, or justify the actions of their aggressors has been rare. Such a phenomenon, marked by intricate psychological dynamics and characterized by a denial of abuse, doesn't it align with the concept of Stockholm Syndrome?\n\nDrawing a parallel with Hong Kong serves as a poignant example. My presence in the city on six occasions in 2019 allowed me to cover the unfolding protests by millions of Hong Kongers. However, the subsequent implementation of the draconian national security law (NSL) in early 2020 marked a regrettably transformative shift for Hong Kong — from being recognized as a free society, lustrous metropolis, and "Asia's finest" to evolving into an Orwellian island city that grapples with an additional layer of governance that casts a shadow over its former radiance.\n\nFortuitously, my train arrived right on schedule in Lviv without any delays. However, upon reaching the border crossing into Poland, the atmosphere shifted to one of anticipation mixed with frustration. A tedious four-hour wait ensued, characterized by the bureaucratic intricacies of the Ukrainian and Polish border procedures. This unforeseen delay led to a missed flight. Disheartened yet determined, I returned home the following day on the first morning flight. The experience, marked by unexpected setbacks, encapsulated the unpredictable nature of travel again.\n\nThe joy of holding my children after returning from war-torn Ukraine is ineffable. Each embrace feels like a precious moment reclaimed from the tumultuous backdrop of conflict. Then, the following evening, close to midnight, Graz metamorphosed into a tableau of celestial celebration as the stroke of midnight marked the transition into the New Year. A night sky erupted into a dazzling display as fireworks ignited, shot, and erupted from every corner, adorning the velvety expanse of the night. Simultaneously, jubilant neighbors engaged in toasts and dance, accompanied by melodies such as "Celebration" by Kool & The Gang or "It's a Beautiful Day" by Michael Bublé.\n\nAs of January 3, marking Day 679 of Russia's full-scale invasion of Ukraine, President Volodymyr Zelensky reported that Russia had unleashed 500 missiles and drones against Ukraine within just five days. The impact of this aggression extended far beyond the capital. Nationwide, at least 60 lives were lost in this wave of attacks, with cities such as Kharkiv in the northeast, Zaporizhia in the south, Odesa on the southern coast, and even Lviv in the far west all bearing the brunt of the strikes.\n\nMillions of Ukrainians awoke to explosions; that should be a reminder that these echoes should resonate globally. Ukrainian officials have appealed to Western allies for increased air defenses, highlighting the strain on support due to war fatigue. The United Kingdom's steadfast support was noted, with Prime Minister Sunak emphasizing the need to stand with Ukraine for as long as necessary.\n\nPeter, my editor friend at Kyiv-based Interfax-Ukraine news agency, has written articles about the war on the Substack social media platform ("ukraine@war”) for the past two years. Since the full-scale Russian invasion of Ukraine on February 24, 2022, it is about to mark two years until February 24. He emphasizes the cumulative impact of 365 + 365 days, equivalent to 730 days. Moreover, adding another 2922 days marks ten years since Russia invaded and annexed the Crimean Peninsula in February 2014. In other words, Ukraine has endured a total of 3,652 days of bloody conflict and confrontation with the world's second-largest military power. Ukrainian volunteers and soldiers, seasoned by years of combat, continue with unwavering determination and a resilient spirit, enduring further adversity to ensure the survival of their country, lest we forget Ukraine!`,
            },
          ],
        },
        caption: 'Photo by Viacheslav Ratynskyi',
        credit: {
          pairs: [
            `Article by: Chien-Chi Chang`,
            `Photography by: Chien-Chi Chang`,
            'Curation, design and development by:',
            'Wen-Han Lee, Lee-Yu Tseng, Yu-Ju Lee, I-Ching Wang, Hsin-Chan Chien',
            'English Translation: Yi-Ning Lo',
            `English Proofreading: Chien-Chi Chang`,
          ],
        },
      },
    }
  })

datas = [
  firstPage,
  ...datas.filter((data) => data.type !== 'E' && data.type !== 'L'),
  endingPage,
]

datas.forEach(({ text, eng_text, order, type, filename, name }, index) => {
  i18n_zh_tw.push({ text })
  i18n_en.push({ text: eng_text })
  let image
  if (type === 'M') {
    image = JSON.parse(filename)
  } else {
    image = filename ? filename : ''
  }
  pages.push({
    id: index,
    type,
    image,
    name,
  })
})

i18n_zh_tw[0].meta = htmlMeta.text
i18n_en[0].meta = htmlMeta.eng_text

i18n_zh_tw[0].rotate = {
  hint: '此專題建議以橫向格式閱讀\n請橫置手機\n以獲得最佳閱讀體驗',
  confirm: '確定',
}
i18n_en[0].rotate = {
  hint: 'Rotate your phone for best experience',
  confirm: 'OK',
}

i18n_zh_tw[2].tutorial = {
  caption: {
    title: '操作說明',
    hint: '點擊螢幕任意處，開啟圖片說明\n再次點擊可關閉',
  },
  navigate: '點擊按鈕開啟側欄，選擇縮圖，可快速跳轉至指定照片',
  arrow: '點擊左右箭頭，或直接滑動螢幕，可播放下一張照片',
}
i18n_en[2].tutorial = {
  caption: {
    title: 'Instructions',
    hint: 'To click anywhere on the screen will open the caption.\nClick again to close the caption.',
  },
  navigate:
    'Click the button and choose a thumbnail. It can skip to the chosen photo swiftly.',
  arrow:
    'To click left and right arrow buttons or to swipe the screen can display the next photo.',
}

console.log(`pages has ${pages.length} pages`)
console.log(`i18n_tw has ${i18n_zh_tw.length} pages`)
console.log(`i18n_en has ${i18n_en.length} pages`)

fs.writeFile(
  path.join(__dirname, '../datas/pages.json'),
  JSON.stringify(pages),
  (err) => {
    if (err) {
      console.error(err)
    }
  }
)
fs.writeFile(
  path.join(__dirname, '../i18n/zh-TW.json'),
  JSON.stringify(i18n_zh_tw),
  (err) => {
    if (err) {
      console.error(err)
    }
  }
)
fs.writeFile(
  path.join(__dirname, '../i18n/en.json'),
  JSON.stringify(i18n_en),
  (err) => {
    if (err) {
      console.error(err)
    }
  }
)
