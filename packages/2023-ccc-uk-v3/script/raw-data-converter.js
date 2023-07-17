let datas = require('./raw-data.json')
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

let firstPage = datas.find((data) => data.type === 'L')
firstPage = {
  order: firstPage.order,
  type: 'L',
  name: 'Landing Page',
  filename: firstPage.filename,
  text: {
    title: '凝視頓巴斯\n張乾琦的戰地攝影紀實',
    foreword:
      '過去一年，攝影家張乾琦先後四次進入烏克蘭拍攝，本刊繼去年獨家取得授權，這次將刊載第四次、在烏東頓巴斯地區的影像作品，這裡被視為戰爭決戰點，也是目前兩軍激戰最激烈的地方之一。',
    credit: '張乾琦',
    ig: 'https://www.instagram.com/chien_chi_chang',
    text: firstPage.text,
  },
  eng_text: {
    title:
      'The Frontline of Frontline\nPhotographer Chien-Chi Chang in Ukraine',
    foreword:
      'The Russian invasion of Ukraine started on February 24 is still raging. Taiwanese photographer Chien-Chi Chang went to the war-torn Ukraine twice to record the situation.',
    credit: 'Chien-Chi Chang',
    ig: 'https://www.instagram.com/chien_chi_chang',
    eng_text: firstPage.eng_text,
  },
}

const endingPage = datas
  .filter((data) => data.type === 'E')
  .reduce((first, second) => {
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
              body: '1961年1月生於台中市烏日區。\n\n',
            },
            {
              head: '學經歷：',
              body: '美國印第安那大學教育碩士，曾任《西雅圖時報》《巴爾的摩太陽報》攝影記者，現為馬格蘭通訊社終身會員。\n\n',
            },
            {
              head: '攝影作品：',
              body: '《鍊》（The Chain）、《我願意》（I do I do I do）、《囍》（Double Happiness）、《時差》（Jet Lag）、《唐人街》（Chinatown）、《脫北者》(Escape from North Korea )等。\n\n',
            },
            {
              head: '獲獎：',
              body: '曾獲荷蘭世界新聞攝影獎、美國NPPA年度攝影師、法國影像Visa國際紀實攝影獎、尤金．史密斯攝影獎、美國年度新聞攝影獎、加拿大人權攝影獎多媒體類首獎、第二十八屆東元獎人文類獎。攝影作品廣泛刊於《國家地理雜誌》、《時代雜誌》、《泰晤士報》、《費加洛報》等國際知名媒體。\n\n',
            },
            {
              head: '展覽與典藏：',
              body: '曾參與威尼斯雙年展、巴西聖保羅雙年展、紐約攝影三年展、斐列茲藝術博覽會等國際展覽。攝影作品獲亨利·卡地亞-布列松基金會、喬治伊斯曼博物館、紐約國際攝影博物館、台南奇美博物館、台灣美術館、紐約皇后藝術博物館等納為典藏。',
            },
          ],
        },
        second: {
          first:
            '過去一年，攝影家張乾琦先後四次進入烏克蘭拍攝，本刊繼去年獨家取得授權，這次將刊載第四次、在烏東頓巴斯地區的影像作品，這裡被視為戰爭決戰點，也是目前兩軍激戰最激烈的地方之一。\n\n張乾琦說：「我的工作的荒謬性或許在於，我傾向前往人們不停逃出的地方，一個逆行者。」儘管多次躲在戰壕中，躲過砲彈轟炸，他仍計畫未來將前往戰地持續記錄。有別於聲色激動的媒體即時影像，透過他的觀景窗，我們靜靜地看見戰爭中的殘酷、力量與荒涼。',
          pairs: [
            {
              head: '慢慢靠近被攝者的心',
              body: '撰文：管中祥\n\n近年已移居奧地利的張乾琦，一直關心烏克蘭局勢，戰爭開打，深覺自己有義務記錄、報導這場不義入侵，決定前往採訪。他也認為台灣面對中國缺乏危機意識，希望用影像分享戰地所見所聞，告訴大家「唯有全面備戰才能避戰」。\n\n張乾琦已到烏克蘭四次，其中三次是自費，未來若有機會，還會再到戰場。雖然他可能是前往烏克蘭戰地報導次數最多的台灣人，不過，張乾琦最令人關注的成就，還是他長年累積的作品。\n\n張乾琦曾獲多個重要的國際新聞獎項，同時是2022年台灣卓越新聞獎—「新聞志業特殊貢獻獎」的得主，主辦單位的得獎理由這麼說：\n\n「張乾琦不只有人道主義的關懷，亦有人類學家的田野與同理，細緻觀察對象及其與場域、整體環境的關係，亦能因為同理與客觀，精確描述報導對象的狀態及處境。為了深入議題，他恆常把自己放在第一線與報導對象在一起生活，深具全球性視野，卻又聚焦於無人關注的角落，是一位持續固守在第一線新聞崗位上的攝影工作者，用鏡頭表達他對新聞事件或社會現象的洞察力，影像震撼，為同儕表率。」\n\n他到中正大學分享烏克蘭拍攝經驗時，有同學問：「如何知道畫面能不能拍？會不會拍出好照片？」張乾琦一如以往簡短回答：相機拿起的當下就知道了。\n\n這個答案對同學或許會有點錯愕，但對經驗老道的紀實攝影家來說的確是如此。戰爭現場複雜多變，沒有太多的時間考慮美學、構圖，或者思考什麼是「好照片」？當腦、眼，和心在同一軸線時，按下快門，絕對沒有一觸可及，只是一直專注、不斷專注。長期累積的經驗能讓你在正確的瞬間按下相機上的快門，有時候甚至是「心的快門」在當下作出的決定。\n\n一名優秀的新聞工作者，或是紀實攝影家，除了必要的專業技能、精準的判斷力，以及廣博的知識外，有人類學家走進現場的田野能力更是重要的條件之一。\n\n進入田野首先需要有開放、謙卑的態度，即使已有觀點與立場，也得開放心胸，才不致讓自己的有色眼鏡限制了視野，也要打開感官，用心感受、同理觀察到的人事物，體會被報導者的真實處境，進而了解背後複雜的結構性因素。\n\n我曾在《燦爛時光會客室》節目中問張乾琦，知名的戰地攝影記者 Robert Capa 曾說過：「如果你的照片不夠好，是因為你不夠近」，難道越靠近新聞現場照片就會拍得越好？張乾琦直說，許多人誤以為這只是物理的距離，認為越靠近就能拍得越好，但他認為，所謂的遠近不只是身體距離，還有拍攝者與被攝者之間的心理距離，也就是能否有同理心體貼對方，得到信任，否則被攝者若築起高牆，就算靠得再近，能理解、能呈現的也十分有限。\n\n張乾琦的重要作品幾乎都是經歷過長時間的田野歷程，例如，反諷台灣婚紗攝影生態的《我願意》從1994到拍到2001年；為了拍攝探討跨國婚姻的《囍》，他在2003 到2004年間曾到越南胡志明市六次；而引發諸多討論的《鍊》，則是從1993年到1999年期間前往龍發堂近二十次，每回都待上幾天或一個禮拜，就住在雞場庫房或小廟裡，在廟方同意及關注下觀察他們平日的生活、廟方與院民的互動與管理方式，並且進行拍攝。後來展出的照片僅是在1998年10月的某個下午拍攝完成，拍攝時間雖短，但也因為長期田野，才能讓一張張令人不捨與荒謬的照片透露出院民的現實處境。\n\n而《唐人街》是張乾琦從1992年便開始拍攝的作品，他在那裡和非法移工一起生活過三次，共三個月，為了延伸報導，還曾到這些移工在中國福州的老家逐戶採訪，和12個分散的家庭仍然保持連繫，拍攝計畫仍在進行。\n\n要這樣做得有充分時間與資源，更重要的是價值與心態。張乾琦曾說，透過攝影、透過機器、透過觀景窗看對方，一開始是有距離的，但待久了、接觸多了，會從疏離的旁觀者慢慢轉換成被動的參與者。而當心態、身份與關係的轉變，反而能從日常中看到最真實的東西。《唐人街》系列有張令人印象深刻的照片，有位穿著內褲的非法移工坐在大廈頂樓的逃生梯吃麵，對照一旁車水馬龍的紐約街頭，形成強烈對比，這也是張乾琦的代表作。\n\n有不少人詢問是怎麼拍到？張乾琦說，這是工人們的日常，紐約夏日悶熱，頂樓較為通風，窄小、外掛的逃生梯就成了工人休息、吃飯平台。當時他在那裡住了六個禮拜，和工人一同作息，自然就拍了下來。外人覺得驚豔的照片，對已逐漸成為「局內人」的張乾琦而言，恐怕只是日常生活的一部分。不過，也因為出身貧困，很容易進入惡劣的環境，苦其所苦，更能了解移工們的生活與所行所思，張乾琦強調，因為人在現場，才能掌握到他們的生活節奏。\n\n客觀，並不是刻意保持距離，做個單純的旁觀者；客觀，是一種能更清楚理解事實的方法，有時得接近，保持清明地進入對方的生活，站在當事人的角度，才有機會發現與呈現最接近日常的事實，進而探究其背後複雜的因素。不過，要強調的是，接近未必就是沒有距離，也不是因此全然失去自己的觀察與觀點。\n\n張乾琦不是機構內的記者，有較大的自主空間，但這並不代表新聞工作者就不需要具備這樣的條件。這是新聞工作的基本能力，但也越來越脫離新聞產業的現實，這樣的空間在強調速度、即時、短期獲利的台灣新聞業越來越少見，有些媒體為降低成本，低薪聘任改寫新聞的小編產製新聞，連到新聞現場的機會都沒有，更別說培養像張乾琦這樣的新聞人。即使是有心、有能力的新聞工作者，也很難不被老闆念茲在茲的經營現實給框限。\n\n新聞需要快、狠、準，但也需要深入田野、深度報導的慢新聞；新聞要獲利，也要有監督權力，讓弱勢發聲、社會進步的影響力。曾受《人間雜誌》影響的張乾琦，用鏡頭傳達偷渡客、遊民、精神病患、逃亡者、移民的處境與心聲，不但是以真實的生命突顯出政治經濟文化下的種種問題，同時也是底層民眾的陪伴力量，或許，還能為其帶來微微光亮。\n\n',
            },
          ],
        },
        caption: '張乾琦。Photo by Ruslan Ganushchak',
        credit: {
          pairs: [
            '攝影：張乾琦',
            '網頁製作/策展：李文瀚、曾立宇、李又如、王薏晴、簡信昌',
            '翻譯：陳虹瑾、尹俞歡、曾芷筠、蔣宜婷、王思涵',
            '監製：王錦華、簡信昌',
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
              body: 'Born in January, 1961. From Taichung, Taiwan.\n\n',
            },
            {
              head: 'Education and Work Experience',
              body: 'Chang received an MS from Indiana University, Bloomington. He worked as a photo journalist at The Seattle Times and The Baltimore Sun. His photographic works have been widely published in internationally renowned media such as National Geographic, Time, The Times, and Le Figaro.\nChang joined Magnum Photos in 1995 and was elected as a Full Member in 2001.\n\n',
            },
            {
              head: 'Photography Works',
              body: 'The Chain, I do I do I do, Double Happiness, Jet Lag, Chinatown, Escape from North Korea, and etc.\n\n',
            },
            {
              head: 'Awards',
              body: "First prize, Daily Life Stories, World Press Photos, Amsterdam.\nMagazine Photographer of the Year, National Press Photographers Association, US. \nVisa d'Or, Visa pour l'image, Perpignan, France. \nW. Eugene Smith Grant, W. Eugene Smith Memorial Fundfor Humanistic PhotographyChien-Chi Chang: An Outlander in the Strange Land, New York.\n2021 TECO Award Culture Category, Taiwan.\n\n",
            },
            {
              head: 'Selected Exhibitions and Collections',
              body: 'Chang’s works have been shown in galleries and museums around the world including Venice Biennale, São Paulo Biennial, International Center of Photography. His photographic works has been collection by Henri Cartier-Bresson Foundation, George Eastman Museum, International Center of Photography, Queens Museum, National Taiwan Museum of Fine Arts, Chimei Museum, and so on.',
            },
          ],
        },
        second: {
          first:
            'As a full member of Magnum Photos, Chien-Chi Chang is the only ethnic Chinese and Taiwanese photographer of this most prestigious organization in documentary photography.\n\nThe Ukraine-Russian war began on the 24th of February, Chang went to Ukraine on the 4th of March and began his documentary work immediately.\n\nAlthough he is 61 years old, he still went straight to the frontline with his bulletproof vest, helmet and camera. He said he did this because of “the younger generation in Taiwan.”\n\nMirror Media has obtained the exclusive authorization to publish these rare documentary images and his reflection notes on the battlefield. “I want to be the frontline of frontline,” he said. Owing to Chien-Chi Chang, we no longer perceive the war only by the views of western media. We are going to develop our ways of seeing to document the present and history.',
          pairs: [
            {
              head: 'An Outlander in The Strange Land',
              body: 'In May, we talked to Chien-Chi Chang via the internet calls, a Magnum Photos photographer, who was at Zaporizhzhia, a city eight hours away from Kyiv.‘When I was at a restaurant, there’s missile flying from the hill.’ he said. His tone was so calm, as it was just birds flying by. \nUkraine-Russian war began on 24th of February, Chang went to Ukraine on 4th of March, recording funerals, bullet holes, ruins, gunshots, and all of the daily lives in the war zone through camera since then. His lenses always focus on a sense of tranquility, all of the humbleness, fractions, accidents and pain on the field, are covered with his unique and human touch.\n\n',
            },
            {
              head: '',
              body: 'Chang joined Magnum Photos in 1995 and has been the only Chinese and Taiwanese photographer since then. Magnum Photos was founded in Paris in 1947 by Robert Capa, David ""Chim"" Seymour, Henri Cartier-Bresson. Magnum refers to a big bottle of wine, the name""Magnum"" was chosen because the founding members always drank a bottle of champagne during the first meetings. Magnum Photos is reckoned as the most prestigious organization in the field of documentary photography. Chang’s works not only collected and exhibited by museums around the world, has also won The Academy Award for Best Picture，World Press Photo daily life first prize, and W.Eugene Smith Award.\n\n',
            },
            {
              head: '',
              body: 'In 1996, Chang moved to New York Chinatown, where he lived with illegal Chinese immigrants in poor apartments for six years in order to uncover their living situation. Series works allowed the Department of Labor to investigate and improve their living standard. Chang’s work“The Chain” shows how an asylum in Kaohsiung uses virtual and physical chains to contain its patients, “Double Happiness” revealed human traffickers arranging marriages between Vietnamese women and Taiwanese men.Chang had also hired by ‘National Geography’ to follow the process of a Korean who escaped all the way from North Korea and fled to Thailand. In 2021, Chang received the Humanities Award from TECO Technology Foundation, for hw ‘putTaiwanese viewpoint on world’s top platform’.\n\n',
            },
            {
              head: '',
              body: `Estrangement and connection can be seen in Chang’s work, which may relate to his living status. He lives in Austria and often travels for work, which always makes him feel like a stranger. Pei-Chang Wang, a documentary producer, says most photographers can easily recover from suffering and walk away, but Chang can’t : “He has no interest in emotional attractions. His pictures always come with the feeling of coming home, even if it's in unfamiliar places and nothing exists, they still make you keep thinking about it.”\n\n`,
            },
            {
              head: '',
              body: `Chang’s friend, San-Tai Hsieh, also a photographer, says: “ I asked Chang to keep safe in war zone, he only replied that he wanted to go East of Ukraine, I asked him to be more careful, he said ‘only want to be the frontline of frontline, maybe I’m crazy.’ His message shows he loves photography more than himself, and also implies that when he sees injustice he would do anything to reveal the cruel truth.”\n\n`,
            },
            {
              head: '',
              body: `Relationship between Ukraine and Russia is just like Taiwan and China. A photographer who sees himself as a stranger is now in another foreign country recording the war as a Taiwanese, and also opened a window for Taiwanese to see the cruelty of war.`,
            },
          ],
        },
        caption: 'Chien-Chi Chang.  Photo by Ruslan Ganushchak',
        credit: `Reporting and Photography by Chien-Chi Chang\nAdditional reporting by Chen Chang-Yuan\nCuration, design and development by Lee Wen-Han, Tseng Lee-Yu, Lee Yu-Ju, Chen Wen-Yen, Chien Hsin-chan\nTranslation by Hung-Chin Chen, Yuhuan Yin, Wang Szu-Han, Chiang I-Ting\nProduce by Chin Hua Wang, Chien Hsin-chan`,
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
    image = order === '1' ? 'images/map1.jpeg' : 'images/map2.jpeg'
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
