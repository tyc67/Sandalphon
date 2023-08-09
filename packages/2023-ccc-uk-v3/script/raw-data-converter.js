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
    title: '逆襲',
    foreword: '張乾琦烏東戰地攝影紀實',
    credit: '張乾琦',
    ig: 'https://www.instagram.com/chien_chi_chang',
    text: firstPage.text,
  },
  eng_text: {
    title: 'Resistance',
    foreword: 'Chien-Chi Chang Chronicles the Front Line in Eastern Ukraine',
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
          first: '',
          pairs: [
            {
              head: '',
              body: '當台大醫院手術室門滑開時，一股陌生、消毒過的寒氣迎面襲來，青白的日光燈管偶爾發出高頻的滋滋聲，身著綠森森手術袍的醫護人員和銀白不銹鋼的手術器具在冷冽的白光下顯得井然有序，鎮静和專業。從輪椅上，我可以看見達文西手術系統灰白下垂的巨大機械手臂，國內權威的泌尿科黃醫師和他的團隊，即將用它為我施行攝護腺癌切除手術。在此之前，我向一名工作人員詢問是否可以在手術期間播放華格納的《女武神之騎行》？她微笑回答，暗示我只能在進入手術室前聽聽這段音樂。麻醉劑注射不到十秒，我失去了意識。六小時後，手術室冰涼的冷氣已覆蓋全身，且竄入骨頭。我在手術台被喚醒，巨大的機械手臂高高在上，俯視著我！閤上眼，冰冷的身軀動彈不得，只感受到手術後的腫脹和一陣陣劇烈的疼痛。終於被推回我的病房了，牆上貼滿了我在奧地利的孩子們的照片、他們畫的彩色愛心，和祝福早日康復的信。\n\n刺骨的冷意漸漸散去，我凝視著麻木僵硬腫大的肚子上六處有著暗紅血跡的疤痕，是脹痛、刺痛，也許也有驚愕無奈的身心俱痛吧。床邊擺放著一個需自費、裝有微量嗎啡的靜脈注射架，每當感到疼痛難以忍受時，我會按下按鈕暫時止痛，之後即使是又感覺痛得死去活來了，都必須再等十分鐘，才能再次按下這個按鈕。\n\n長夜死寂的幽暗病房長廊裡，偶爾傳來病人的呻吟，護士間或推著換藥車進出護理站。 病房牆上掛鐘的秒針跳動卻顯得異常尖裂，每一秒似乎比前一秒更沈重、更刺耳地撞擊耳膜。我用濕紙巾包滿耳朵，終於在十分鐘後再次按下按鈕， 止痛藥作用下的疲憊身軀再次陷入昏沉。清晨，一次又一次的咳嗽伴隨著六處傷口一陣又一陣同時刺痛。那天是三月四日。在2022年的同一天，即一年前的今天，我帶著裝備抵達烏克蘭，記錄下被俄羅斯入侵的烏克蘭，想著那片因戰火籠罩而被摧毀的無辜土地，此刻，我多麼希望能回到那裡。\n\n兩個月的康復期後，我回到奧地利格拉茲（Graz）的家，彌補過去幾個月與孩子們的分離時光。這裡是我結婚、成為父親後的家。慢慢地，我逐漸恢復元氣，重拾簡單可行的運動鍛煉。儘管醫生和其他攝護腺癌倖存者一再叮嚀不要提超過三公斤的重物！我仍然經常在寬鬆的短外套内穿著防彈背心快走四、五公里，這種配備第四級防彈板的背心重達九公斤。終於，奧地利的泌尿科醫生認為我已「適合旅行」後，我於六月四日抵達基輔（Kyiv）。\n\n儘管基輔在五月時日夜警報不斷，城市和居民持續遭受俄羅斯巡弋飛彈、彈道導彈和伊朗製「見證者」自殺無人機的襲擊，但六月的第一個星期天，天空仍然明亮湛藍。有位朋友在他家陽台目睹了愛國者防空系統攔截擊落導彈，但他警告我不要拍這些畫面。因為五月有一天，三十幾位剛在社交媒體上分享愛國者擊落俄羅斯導彈影像的人立刻遭到逮捕，他們的臉部雖被馬賽克，但均被迫在電視和社交媒體Telegram上道歉和認罪。\n\n自2022年二月底俄羅斯全面入侵烏克蘭以來，這個國家一直處於緊繃和不安之中。在戒嚴狀態下，各地都強化了嚴密保安措施，任何可疑的行動，都會立刻被舉報，烏克蘭國家祕密安全局（SBU）一定立即行動調查，這點無庸置疑。\n\n回想2022年三月某個黃昏，我突然聽到一聲異常尖銳且陌生的聲響從空中迅速接近。尖裂的頻率越來越高。我抬頭看到一枚約八米長的卡里布爾（Kalibr）巡弋飛彈呼嘯而過，緊接著，第二枚，在灰濛的空中，緊隨著第一枚飛嘯衝向城市的郊區，頻率隨著距離的拉遠而詭異地降低和消散，幾秒後，兩聲爆炸巨響瞬間震動了利沃夫（Lviv）的每一寸土地，市郊外緣的一個儲油槽遭導彈攻擊。一團又一團巨大無法穿透的蘑菇雲滾入空中，帶著異味的厚黑濃煙吹向城市，將利沃夫覆蓋上一層令人窒息的爆炸粉塵，這座美麗的古城瞬間變得黯淡。與此同時，消防車和警車的鳴笛尖嘯而過，聚集在起火的油庫周圍。我跑上附近的利查基夫（Lychakiv）公墓山頂，準備紀錄拍下遭導彈襲擊的利沃夫。\n\n當我屏住呼吸，透過觀景窗凝視前方構圖的同時，從眼角餘光中，我感覺到旁人對我指指點點，且投以懷疑的目光，有幾位已經拿起手機，偶爾斜眼看看我。我心裡正納悶著我的新聞嚮導突然不見了！在還沒意識到將發生什麼之前，一位戴著黑色棒球帽的三十多歲男子快速跑上山頂，另外兩位穿著深色風衣、黑色牛仔褲、棒球帽和黑色斜包的男子緊追在後，不到一分鐘，我已被三人包圍，動彈不得。我舉起雙手，他們的第一個命令卻是要我轉身，雙手放在護欄上，「不准動！」我看到其中一個男子的風衣右下方口袋裡有個突出物。我想，那可能是對講機或手槍。他們對我進行了超過一小時的全身搜查，每根手指和腳趾間都不放過，詳盡地嚴格訊問我過去幾個鐘頭和幾天前的每一張照片和所有的通話紀錄，包括WhatsApp、Telegram和Messenger：「Marta是誰？女朋友？」「不是。」「Igor是誰，他是俄羅斯人嗎？」「來自哈爾科夫（Kharkiv）的攝影師朋友。」「你為什麼保留收據？你是美國中央情報局（CIA）嗎？」「不是！」那你是摩薩德（以色列情報機構）嗎？」「不是！」\n\n天色漸暗，溫度驟降，舉目所及惡味寒風凍地。審訊結束後，我終於被允許穿上襪子，此刻，我的雙腳早已凍僵，毫無知覺了。當我環顧四周，之前的旁觀者早已消失無蹤。只剩下我和三個髮型一模一樣、戴著棒球帽、身穿黑衣的男子。附近依稀可聽見對講機的聲音，以及遠處時而響起的警笛聲。\n \n或許我被誤認為是向俄羅斯提供影像與座標的線人。在審訊搜查過程中，我完全配合，誠實地回答每個問題，因為這是證明自己清白的唯一機會。事後，我向一位在北約任職的朋友複述了這次經歷，他冷笑地回答，我很幸運有著一張亞洲臉孔，否則可能在審問之前就已被壓倒在地，先痛打一頓再說。趕在宵禁前，我匆忙地回到飯店，喝完從克拉科夫（Krakow）帶來的最後一口伏特加，撥了通電話給原本應該協助我拍攝行程的在地新聞嚮導，一句話：「你被解僱了。」\n\n2022年戰爭爆發以來，這已經是我第五趟踏足烏克蘭。我到基輔只是想要與幾位友人喝喝酒、敘敘舊並取得新的記者證。我原本計劃在隔天就啟程前往烏東頓巴斯（Donbas）；但隨後發現，巴黎馬格蘭攝影通訊社提交給烏克蘭國防部（MOD）的申請，竟然在數位深淵中消失無蹤。遇到這樣的挫折，我是既錯愕又難以置信，但我別無選擇，只能在基輔立刻重新申請。我聽說，目前還有一千多位申請者在排隊等待批准。路透社的一位同業說這是一個「不可能加速處理的程序」，需要三到四週的時間，而且這並非由國防部決定，還需要上呈到烏克蘭國家祕密安全局（SBU）批准。我無法釐清我是如何繞過隊伍取得記者證，但我永遠感謝在高層的朋友們加速了這個流程！\n \n我和我的新聞嚮導Evhen沿著M03州際公路，從基輔順利駛向第聶伯城（Dnipro）。途中既無空襲警報，也沒有路障或檢查哨。然而，當我們開往頓巴斯的波克羅夫斯克（Pokrovsk）時，公路兩側開始出現深綠色的軍用車輛來回快速急駛。我們放慢駕駛速度，然後在一個鋼筋混凝土檢查哨站停下。大多數時候，當拿著AK-47步槍警察檢查我的護照和記者證時，我的新聞嚮導會開玩笑指著我說：「成龍！」這通常能立刻化解緊張的氣氛，引來一片笑聲。我會緊握右拳，看著警察回應說：「成龍與烏克蘭站在一起！」儘管我不認為成龍這輩子即使吃了熊心豹子膽，也不會有膽量說出這句話。\n\n戰爭對烏克蘭人的生活產生了深刻且難以理解的影響。自從俄羅斯非法入侵以來，每個烏克蘭人都有家人和朋友在前線戰鬥，或被迫流離失所。即使等到戰爭結束，烏克蘭也將面臨前所未有巨大的挑戰和問題。但現在，首要的目標是贏得這場戰爭，解放原本屬於烏克蘭的領土。\n\n眾所期待的反攻其實已在烏東和烏南戰線上默默無聲且慢慢謹慎地展開，在俄羅斯將近一千公里、前三層、後三層的防線找到突破口。俄軍用了超過半年的時間在防線上挖了反坦克壕溝、佈滿大規模的地雷、層層的三角混凝土龍牙樁和鐵製刺蝟樁，後面則是了精密綿延加固的野戰步兵戰壕、以及鐵絲刺網圍欄與各式各樣的火砲。烏克蘭想取回每一平方公尺領土，勢必得經過漫長的戰鬥。\n\n烏克蘭的全面大反攻需要時間、決心、性命，以及大量火力支援。我曾被分派與第59旅砲兵部隊行動，這個小隊配有四十枚GRAD多管火箭發射系統。一進入戰鬥位置，四名士兵先隱藏在樹林中，隨時等待指揮中心的射擊命令。一旦目標確定，他們會駛至指定位置，迅速調整座標並發射。指揮官先確認目標是否被擊中，並在撤至下一隱藏地點前再射出兩至三枚火箭，然後迅速離開，以免成為敵方火砲的目標。這種戰術被稱作「射擊與撤退」，既有效，也節省彈藥。由於我距離發射的火箭很近，不僅聽到巨大的聲響，衝擊波也穿透了我的身體，我也只能用雙手捂住耳朵，張大嘴勉強平衡壓力。\n\n進入前線陣地之前，所有人都必須將手機設為飛航模式。透過「星鏈」是唯一的聯繫方式。一名第72旅的士兵告訴我，俄羅斯士兵就在此刻我們站立地方一公里外的樹林戰壕裡。我們身處在所謂的「零線」上。當你得在一條又一條黑暗、潮濕、擁擠如迷宮般的戰壕中移動時，有一件事再也清楚不過：「想活下去，就得挖！」士兵們在戰壕中堅守陣地，無論發生什麼，都緊握著機關槍、火箭筒、AK步槍和反坦克標槍飛彈，抵禦阻止敵人的進攻。\n\n後來，我隨一個小隊執行無人機襲擊任務，他們的目標是擊殺俄羅斯戰壕的士兵和摧毀高價值設施（如坦克、裝甲運兵車或火砲系統）。他們選擇的武器是底部改裝、加装了40毫米榴彈的大疆無人機DJI Mavic 3 Pro。我們藏身在指揮中心的加固壕溝內，通過平板電腦監控無人機的飛行。陽光削過木頭的裂縫和偽裝網的孔洞灑進幾乎不見天日的壕溝，蚊子、蒼蠅和蜜蜂在裡面飛來飛去。\n\n在一堆倒落的樹枝和落葉旁，無人機鎖定了三名打赤膊的俄羅斯士兵，他們正在挖掘戰壕，我看著無人機在他們上方盤旋，心想他們三人完了！但榴彈投射落後卻沒有爆炸。無人機返回基地換上另一枚榴彈，再次起飛執行任務。這過程就像一段段戰爭影片的片段，直到我們與無人機的連接突然中斷。操作員感到十分沮喪，他一遍遍地試圖重新連接無人機，但此時，無人機可能已被俄羅斯攔截或擊落。\n\n當我們從高處鳥瞰所有俄羅斯前線的陣地時，他們也能看見烏克蘭前線的陣地。當我在前線的樹林中小便時，我不確定他們是否注意到了我？那些惱人的嗡嗡聲，是蜜蜂飛來飛去嗎？還是致命的無人機在我頭上盤旋？那天下午並沒有發生爆炸，這意味著我又多活了一天，可以繼續再為這場戰爭留下紀錄。\n\n在戰爭爆發之前，Nazzri是烏克蘭西邊一省長的諮詢委員，他沒參與過任何戰鬥。而今，他已經成為一名備受尊重的戰爭英雄，並在我被分派到的無人機部隊擔任指揮官。他向我透露，一台售價三千美元的大疆無人機Mavic 3 Pro，壽命只有一星期。他在社交媒體上相當活躍並且深受歡迎，但是每次在白天與他的車隊同行時，我總是忐忑不安，因為俄羅斯懸賞一筆高達五萬美元的奬金，活捉或擊斃他。\n\n透過一個加密應用程式，我與Yuri約在波克羅夫斯克唯一的披薩店裡見面。他是來自美國加州的退役美軍士兵，自2022年春天起，就全心全意地投入對烏克蘭的戰鬥支援。他在人群中顯得低調、踏實且溫和；吃午餐時，他會不時地巡視周遭的環境。他看起來和我在一段網路爆紅的無人機影片中，所看到的快速反應部隊（QRF）的戰士迥異：在影片中，他們在悍馬裝甲車上，對俄羅斯陣地發動猛烈的近距離機槍火力射擊，每當快速反應部隊的士兵們從武装悍馬車跳下後，馬上就進入了自動戰鬥模式：要麼射擊，要麼被射擊；要麼殺敵，要麼被殺。所有訓練都是為了使每位士兵變成精湛的殺敵軍人。我問他對於中國戰機不斷地飛越台灣海峽中線挑釁以及持續的文攻武嚇有何看法？他毫不猶豫地回答：「你們應該更加清楚，並要為可能的攻擊做好準備。」\n\n我記得今年四月中旬，《紐約時報》刊登了一篇由台灣前文化部長受邀撰寫的社論，這篇文章的中英文遣辭造句都好，但顯然撰寫人既沒邏輯，也缺乏常識。文中的論點就好比一群幫派歹徒，每天在無辜平民的庭院前揮舞匕首和開山刀；但儘管屋主一再被欺凌和面臨死亡威脅，文章卻主張屋主應該試圖跟施暴者對話和談，降格求安，降低緊張局勢。\n\n至於數個月前那份由台灣學者共同簽署的反戰聲明，這些學者為何不去向不斷用武力威嚇臺灣中共解放軍要求反戰呢？與此同時，這似乎顯示他們已在養尊處優的象牙塔裡太久了，也從而導致他們失去對社會問題的深層理解與同理心，不辨菽麥了。我是在基層人間、有一說一，實事求是的紀錄者，不懂在濟濟一堂、充滿著博士們的天上人間，他們從高處是如何俯視普通民眾？我也不確定，如果一位博士學者的家被黑社會歹徒襲擊，除了失聲驚叫之外，他會如何反應呢？我認為他們應該先放下高不可攀的思考模式，去感受和理解普羅大眾的生活經驗。如果我家面臨歹徒的攻擊威脅，我的首要之務就是強化房屋的防禦，並團結所有朋友和家人，組建一個有效的反擊網絡！試問，如果我不主動保護家園和所愛之人，又怎能期待任何國內或國外的救援呢？我再說一次，我絕不會向一個黑幫組織磕頭、屈服或投降。\n\n\n若分裂，我們註定失敗；唯有團結，才可能勝利。共軍一再跨越海峽中線，不斷踩紅線，都快踩成紅地毯了，然而大家依然馬跑舞跳，喝洒捉蝦，對中共的武力威脅已習以為常，麻木不仁了！ 之前我受訪時說過：「唯有全面備戰，才能避戰！」若要等到敵人開第一槍後才準備反擊，那是毫無認知和致命的被動。重點不在敵人什麼時候可能開第一槍，而是我們要上下團結再團結，臨深履薄， 常備不懈，全面備戰。\n\n北約和美國對於俄羅斯入侵烏克蘭的反應一直猶豫不決（我必須強調至今仍是！）他們對於實施制裁的決定也一再延緩。與此同時，由於受到源自中國武漢的病毒影響，全球各地都實行了封鎖措施，使得外援大減。然而，我仍記得一位烏克蘭的朋友告訴我，倘若俄羅斯的坦克膽敢駛進基輔，每個窗戶將會有把AK-47步槍和汽油彈對準每一台入侵的坦克反擊再反擊！\n\n入侵遙不可及嗎？對大多數烏克蘭人來說，在2022年2月24日之前確實如此。但誰又能預料到，一夜之間，烏克蘭的前線城鎮遭受大規模摧毀，而即便是距離前線相當遙遠的村莊和城市，也未能幸免於俄羅斯一再的炮火攻擊。\n\n第53旅的新聞官Raisa帶我去了阿夫迪夫卡（Avdiivka），這座城鎮距離前線僅3公里，至今仍被俄羅斯軍隊從北、東、南三方包圍著。這裡已沒有導彈襲擊的空襲警報來警告市民，因為日夜都不斷有俄羅斯火箭攻擊和烏克蘭的火炮回擊。為了避免被俄羅斯的無人機發現，我們快速地在廢墟之間穿梭。軍車疾馳而過，揚起的灰塵鋪蓋在路邊未爆炸的火箭彈上。城裡的每一座房屋、公寓大樓、幼兒園、學校、商店、小巷和道路都被摧毀。沒有一個家庭、沒有一個生命，不受到了俄羅斯入侵的摧殘。儘管我在戰前已多次前往烏克蘭，但我沒想到烏克蘭人對俄羅斯的仇恨，在每一次親人、友人、家園，和國家遭受攻擊和面臨死亡時，正加速積累！\n\n當裝甲救護車的引擎轟鳴聲在遠處響起，暗示著救護車正在疾速向我們靠近。兩隊醫護人員，攜帶著擔架站立一旁，繃緊神經準備就緒。裝甲救護車緊急煞車後飛揚的塵土，籠罩著待命的醫護人員，不到一分鐘，醫護人員已經將一位身中數槍的前線士兵搬上另一輛野戰救護車，前往設備比較齊全的醫療區。\n\n救護車司機抓起他的AK-47自動步槍，跳上車後，猛踩油門，迅速駛離。搶救生命分秒必爭，同時也避免被俄羅斯的火炮襲擊。在這有空調的救護車𥚃，化學藥物和消毒酒精氣味、濕漉漉的惡臭汗水以及濃烈鐵腥的暗紅血跡在狹窄擁擠的救護車內交織著。兩名穿著防彈背心的軍醫，頭戴鋼盔，各自配備著三個步槍彈匣，正試圖為傷勢嚴重的士兵穩定狀態，以防他在救護車行駛於坑疤曲折的道路上過度晃動。這位失去方向感的士兵，眼神中滿溢著恐慌和劇痛，他高大、扭曲的身體上佈滿了炸彈彈片造成的傷痕。整隻左臂雖然在前線以被夾板固定，並用紗布纏繞，其實已完全動彈不得，鮮血仍然從夾板中汨汨滲出，佈滿他已沾滿泥土的手指上。一名醫護人員用剪刀迅速剪開了被血跡浸透的軍服，他身體上多處傷口都已被透明的止血敷料填塞滿。兩名醫生不斷地用緊急創傷繃帶為他纏繞腹部傷口，兩條滿是泥土的止血繃帶已緊緊纏繞在他的左腿鼠蹊部，鮮血依然在他左小腿多處傷口不停流出，染紅了土黃色的軍靴。前線究竟發生了何等慘烈的戰爭？他的遭遇令人難以想像。每位士兵為了奪回自己國家的土地，勇敢衝上前線，卻隨時都可能付出生命的代價。去年八月我在頓巴斯紀錄的兩個小隊中的三名士兵，都已經在戰場上陣亡了。\n\n抵達邊境的醫療安置所後，受傷的士兵被迅速推進急診室，由一組穿著戰術防護鏡的醫生、護士接手救治。我問救護車上的一位軍醫，這位士兵是否有生還的可能？他吐了一口菸後回答，士兵在前線戰場上的任務已經結束，現在他將在醫院裡繼續為生存與死神搏鬥。我撫摸著自己身上已經逐漸消退的手術疤痕，默想著那位士兵，如果他能夠活下來，背負的將不只是身體的傷痛，內心創傷也將如影隨形。 \n\n行駛穿越烏克蘭的途中，我記得一個朋友曾描述烏克蘭的地形「平坦如鬆餅」。廣袤無垠的景致，時刻變化莫測的雲彩，都讓人讚嘆不已。一位朋友在Telegram上傳來消息，普丁將在二十分鐘後發表關於瓦格納兵變的全國性演說。這又是另一個讓我記得身在何處的歷史事件。當時我即將到達利沃夫，準備在傍晚經由波蘭的克拉科夫機埸搭機回家。雖然俄軍最初對烏克蘭戰火的破壞始於東部和南部，但在烏克蘭的西部地區，人們的絕望之情同樣令人心痛。我當時心想這場叛變是否意味着著入侵戰爭結束的開始，或是普丁政權的崩解？我也在思考，這場軍事叛變又可能如何影響中國對台灣持續的武力威脅呢？我沒有答案。唯一能確信的是，唯有全面備戰，才能避戰！\n \n回到格拉茲後就儘量陪伴孩子，幾天後，我得知克拉馬托爾斯克市（Kramatorsk），中心的Ria披薩店在晚餐尖峰時段，遭俄羅斯導彈襲擊的消息，因為我的孩子們就在身邊，我不忍心看著那些被困在瓦礫中，尖叫尋求救援的死難者的畫面。但我的内心像是塌陷了一個洞。我記得那間披薩店。去年八月，我和同事Sergey在克拉馬托爾斯克及巴赫姆特等地工作了兩週。隔日，一位同業發給我一則Interfax的新聞報導，這是一間用三種語言、備受信任的烏克蘭新聞機構。報導指出，烏克蘭祕密安全局在緊急搜捕行動中，逮捕了一名被控在導彈攻擊前，拍下披薩店位置並傳給俄羅斯情報機構的間諜，他將在法庭上為他對人類犯下的戰爭罪行負責。\n\n瓦格納兵變短暫落幕，但仍留下許多未解之謎。我終於完成了照片的編輯。持續在薄外套内穿著第四級防彈背心，沿著河岸走路，保持鍛鍊，並在臭汗淋漓的耳機𥚃聽著《女武神之歌》。\n\n突然，空襲警報在遠處響起！路上行人卻絲毫不受影響，跑步的繼續跑步，推著娃娃車散步的年輕夫婦依然悠哉，出門蹓狗的老鄰居撿拾狗狗的排泄物後，正要放到附近的垃圾筒。奥地利每週一次測試全國警報系統，一年52次，風雨無阻，絕無例外。這又是個奧地利週六正午時分。',
            },
          ],
        },
        caption: '張乾琦。Photo by Ruslan Ganushchak',
        credit: {
          pairs: [
            '撰文：張乾琦',
            '攝影：張乾琦',
            '英文翻譯：許越如',
            '英文校閱：張乾琦',
            // '網頁製作/策展：李文瀚、曾立宇、李又如、王薏晴、簡信昌',
            // '監製：王錦華、簡信昌',
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
          first: '',
          pairs: [
            {
              head: 'Resistance',
              body: `When the surgical ward slides open at National Taiwan University Hospital, a cold clinical air swooshes, and everything inside looks and smells sanitarily clean and calm under the cacophony of fluorescent lights. From my wheelchair, I can see the robot-assisted arms of the Da Vinci surgical system, which Dr. Huang, one of the best urologists in the country, and his team will use to perform my prostatectomy. I asked a uniformed staffer if I could play Wagner’s Ride of the Valkyries during the surgery; she grinned but hinted I could only listen to it before entering the ward. Once the anesthesia was injected, I was out within seconds. Six hours later, I was in my hospital bed in excruciating pain. Behind me, on the wall, were pictures of my kids in Austria and their drawings with colorful hearts and get-well-soon letters.\n\nI looked at the multiple bloody scars across my numb, swollen stomach with disbelief. To ease the agonizing pain, an IV pole with a small dose of morphine stood next to my bed. When I reached my pain threshold, I would squeeze the button. Then I had to wait ten minutes for the next fix, no matter how tortured I felt!\n\nOccasionally, patients moaned, and nurses pushed carts across the hall. Otherwise the night was dreadfully still but for the tick of the second hand of the clock on the wall, each echoing louder than the one before. I stuffed my ears with wet tissues, knocked myself out with another fix of painkiller. In the wee hours of the morning, I woke up after coughing and there was a sharp, stabbing sensation on my belly. It was March 4. On the same day in 2022, the year before, I had arrived in Ukraine to document the invasion of Ukraine, an innocent landscape despoiled by Russia. I wished I were there now.\n\nTwo months after surgery and recovery, I finally returned to Graz, Austria, where I have lived since getting married and becoming a parent, to make up for the lost time with my kids. In addition, I gradually exercised to regain stamina. Despite reminders from my doctors and fellow prostate cancer survivors not to carry heavy stuff over three kilos, I walked regularly with a bulletproof vest equipped with level-four armored plates. That’s about nine kilos. Finally, with “fit-to-travel” permission from my urologist in Austria, I arrived in Kyiv on June 4.\n\nThe first Sunday of June in the capital was bright and blue even though it had been under attack from ballistic cruise missiles and Iranian-made Shahed kamikaze drones. My friend who saw the Patriot air defense system intercepting the incoming missiles warned me not to take pictures of intercepts. One day in May, thirty-two individuals who posted pictures or videos of the Patriot intercepting Russian missiles on social media, were arrested. They were forced to make confessions and apologies on TV and on the social media site Telegram with their faces blurred. \n\nThe country has been living with a palpable sense of tension and unease since the Russia’s full-scaled invasion in February 2022. Under martial law, heightened security measures and constant vigilance are everywhere. Any slight suspicious move will be reported and investigated by the Ukraine State’s Secret Services (SBU.) I know that for a fact!\n\nBack in the late afternoon of March 2022, I heard a high-pitched, piercing whistle moving in the air towards me. The swoosh became higher in pitch. I looked up and it was an eight-meter Kalibr cruise missile. Then another one, both whizzing over my head, the sound died down as it receded, and then seconds later, they struck an oil depot outside the city. The rumbling explosions thumped the earth as an impenetrable mushroom cloud billowed into the air. The wind carried it further spread, darkened and suffocated the beautiful historical city of Lviv. Meanwhile, fire engines and police vehicles, wailing, converged on the engulfed depot. I rushed up to a nearby hilltop of the landmark Lychakiv Cemetery to take pictures. \n\nAs I held my breath and looked through the viewfinder, I could also sense in my peripheral vision that onlookers were sizing me up suspiciously. Before I knew what was happening, a man in his mid-30s with a black baseball cap ran up the hill. Then another two men, in dark windbreakers, black jeans, baseball caps and sling pouches, hurried up. In less than a minute, I was boxed in! I raised both arms but the first order was turn around with both hands on the guard rails and remain absolutely still. I could see something protruding from one of the men’s lower right windbreaker pocket. It’s probably either a walkie-talkie or a pistol, I thought. An hour-long body search examined every pore and between my every finger and toe. Every picture and all the phone records, including WhatsApp, Telegram and Messenger from the previous hours and days were questioned and verified: “Who is Marta? Girlfriend?” “No.” “Who is Igor, is he Russian?” “A photographer friend from Kharkiv.” “Why are you keeping receipts? Are you CIA?” “No!” “Mossad?” “No!”\n\nIt was getting dark and chilly. I was finally allowed to put on my socks upon the somewhat satisfactory completion of the interrogation. As I looked around, all the onlookers had already disappeared. It was just me and three baseball-capped, dark-clothed men, all with identical hair-cuts. There was still audible murmuring and the blaring and wailing far away. \n\nI might have been perceived as an informer taking pictures and providing coordinates for Russia. Being cooperative as I was searched and truthfully answering every question, was my only  chance to prove my innocence. I later related the event to a friend with NATO, and he said I was lucky to have an Asian face, or I could have been mopped on the ground before questioning! I hurried back to my hotel just before the curfew started, had a shot of leftover Polish vodka from Krakow and phoned up my fixer—who supposedly was smoothing my way—with one sentence: “You’re fired.”\n\nThis latest was my fifth trip to Ukraine since the invasion. My only objective in Kyiv was to catch up with colleagues over beer and to pick up my new press credential. I was planning to leave for Donbas the next day. Then I realized that the accreditation application from my agency, Magnum Photos in Paris, to the Ukraine Ministry of Defense (MOD) in Kyiv had been lost in the digital abyss. A major hiccup! I had no choice but to reapply right there and right away. I was told that there were a thousand-plus applicants ahead of me all queuing up for approval. And I was further told that it’s an “immovable process” that requires three to four weeks. It’s not up to the MOD but the SBU for the final approval. I cannot clarify how I jumped the line to get my press card. I am forever grateful to friends in high places for expediting the process!\n\nIt was a smooth drive from Kyiv to Dnipro via Highway M03 with my fixer, Evhen; no air alerts and no checkpoints. But once we were headed towards Pokrovsk in Donbas, drab olive-green military vehicles were zooming by in both directions. We slowed down and stopped at checkpoints newly-reinforced with concrete blocks. More often than not, when a policeman with a Kalashnikov rifle checked my passport and press card, my fixer would joke, “Jackie Chan!” And that often was an immediate ice breaker with grins and laughter. With my right fist clenched, I would respond by saying, “Jackie Chan stands with Ukraine,” although I do not think that Jackie Chan would ever have the gall to say that. Not in this life!\n\nThe war’s impact on life in Ukraine is just as incomprehensible as it is lasting. Since the illegal and immoral invasion, every Ukrainian has families and friends fighting in the war as well as displaced, domestically or overseas. Ukraine will face gigantic problems after the war. But for now, the main goal is to win the war and to liberate the land that belongs to Ukraine. \n\nThe long-anticipated counteroffensive has been silently and cautiously under way on the eastern and southern fronts to puncture Russia’s defenses. Russia had spent months fortifying their lines with anti-tank ditches, vast minefields, concrete “dragon’s teeth,” iron “hedgehogs,” intricate infantry trenches, barbed-wired fences and artillery. Every square meter gained will require a slow and grinding battle. \n\nUkraine will need time, will, lives and a lot of firepower to launch a full-scale counteroffensive. I was with the 59th brigade artillery unit equipped with GRAD, a multiple rocket launcher system. Some forty rockets were loaded on the truck with four soldiers standing by, all camouflaged in the woods, ready for the firing order from the command center. Once a target had been confirmed, they would drive to the position, adjust the coordinates and fire within minutes. The commander would confirm whether the target had been hit or not. Then another two or three rockets could be fired before they swiftly relocated under another tree line lest they too be targeted and take return fire. It’s all “shoot and scoot,” but also to conserve ammo. I was quite near the firing rockets, and so, not just the sound, but the shock wave penetrated my body. I covered my ears and kept my mouth open to balance the pressure.\n\nWe were all told to switch our phones to Airplane mode before reaching front line positions. The only connection was via Starlink. A soldier from the 72nd brigade told me that the Russian soldiers were just behind the tree line about a kilometer away from where we stood. We were on the so-called Zero Line. As we moved around a dark, damp, dense and mazelike trench, it was more than clear: “If you want to live, dig!” The soldiers in the trenches are to hold the position with machine guns, rocket-propelled grenades, AK rifles and Javelins, no matter what!\n\nLater, I was embedded with a platoon that would operate drone attacks on Russian trenches and high-value targets, such as tanks, Armored personnel carriers (APCs) or artillery weapon systems. The choice of weapon has been the modified DJI Mavic 3 Pro with a 40mm grenade attached underneath. From inside a reinforced trench within the command center, we watch the drone’s movement on the tablet. Sunlight  shines through cracks in the wood and the holes of camouflage nets. Mosquitos, flies and bees buzz in and out of the trenches.\n\nThree Russian soldiers without T-shirts were spotted digging trenches under some fallen twigs and leaves. The drone was hovering right above them. I was thinking that they were going to die. The grenade dropped but did not explode. The drone returned to base to mount another grenade and took off again for the mission! It all looked like another video clip of war until the connection with the drone was lost. The drone operator was disheartened. He reset over and over again to try to reconnect the drone, but by then the drone had been intercepted or shot down by Russia. \n\nWe could see all the Russian frontline positions from high above, and so could they see us. Did they spot me when I was taking a leak in the woods on the frontline? Were those annoying buzzes those of wasps skimming around? Or a deadly drone hovering above me? There was no explosion that afternoon! I got to live another day to document the war.\n\nNazzri, a politician with no fighting experience before the war, has been a battle-hardened war hero, and is the commander of the unit I was embedded with. He told me that a three-thousand USD Mavic Pro drone may last for a week. He’s been quite public and popular on social media, but it scares me to travel with his convoy, especially during the hours of daylight; there is a fifty-thousand USD bounty on him, dead or alive. \n\nThrough an encrypted app, I arranged to meet Yuri in the only pizzeria in Pokrovsk. He is a retired American career soldier from California and has been devotedly fighting for Ukraine since the spring of 2022. He’s low-key, down to earth and soft-spoken, occasionally scanning his sectors during the lunch. He didn’t resemble the fighter I saw on viral drone footage of a QRF (quick reaction force) mission, in which he was charging on the lead Humvee, assaulting a Russian position with a machine gun at close range. The moment the fighters jumped out of the Humvees, they were already in auto-pilot mode, with a killer’s instinct. It’s either shoot or be shot, kill or be killed. All the training is to make a soldier into a fighter to kill the enemy. I asked Yuri his opinion of the ongoing Chinese aircraft sorties on Taiwan Strait. He replied firmly, “You guys should know better and be prepared for the attack.”\n\nI recall there was a New York Times editorial in mid-April this year, written by a former Taiwan minister of culture. It was nicely written but clearly by someone without common sense. It was as if organized gangsters were brandishing daggers and machetes before an innocent civilian’s front yard every day, and the homeowner, despite being bullied repeatedly and threatened by deadly weapons, should just bow to defuse and de-escalate the situation. \n\nAs for the jointly signed antiwar statement by the Taiwan scholars a month before that, it seems that the eggheads have comfortably dwelt in an ivory tower for too long. They live away from the practicalities and complexities of the real world, hindering their empathy and a holistic understanding of societal issues. \n\nI have my feet on the ground. I don’t view the world from on high, from a metaphorical tower full of PhDs. What would a PhD do if his or her house were about to be attacked by organized gangsters? I don’t know, but I think, first of all, that he or she should jettison the lofty thinking and be connected with the concerns and experiences of ordinary people.\n\nIf there were an imminent threat that my house would be attacked by gangsters, I would first reinforce my house to make it a fortress. Furthermore, I would mobilize and unite a network of friends and relatives to fight back!\n\nDivided, we fall. United, we stand. In the spring of 2022, NATO and the U.S., were wishy-washy (they still are, I might add!) regarding the Russian invasion of Ukraine, and dawdling about instituting sanctions. The rest of the world was masked up and locked down due to the virus spread from Wuhan, China. Foreign assistance was thin. But I remember a Ukrainian friend telling me that if Russian tanks roared in to Kyiv, there would be Kalashnikov rifles and Molotov cocktails out of every window and aiming at each tank.\n\nIf I don’t take the initiative to protect my home and loved ones, how can I expect any help, domestic or foreign? I don’t kowtow to appease or surrender to an organized mafia. \n\nIs an attack far-fetched? It would have seemed so for most of the Ukrainians before February 24, 2022. Who could have imagined the devastation and destruction on the front-line towns and the shelling of villages and cities far away from the frontline?\n\nRaisa, a 53th brigade press officer, took me to Avdiivka, which is two to three kilometers from the frontline, flanked by Russian troops from the north, the south and the east. Here, there are no air alerts to warn citizens of imminent missile attacks, because there are constant incoming and outgoing rockets, night and day. Every single house, apartment building, kindergarten, school, store, alley and/or road has been destroyed and razed. Not a home, not a life, has been untouched by the Russian invasion. Even though I had been to Ukraine several times earlier in the war, I was unprepared how the hatred Ukrainians feel towards Russian has grown since the invasion.\n\nWe moved swiftly from one pocket of wreckage to another to avoid being detected by the Russian drones. Military trucks with camouflage zoom by, spraying another layer of dirt onto the unexploded rockets on the roadside.\n\nA nearing rumble signaled that an armored ambulance was about to roar in. The engine grumbled and dust shrouded the meeting point where two teams of medics with stretchers had been standing by. In less than a minute, they had transported an injured frontline soldier to another ambulance, en route to a stabilization unit. \n\nThe ambulance driver grabbed his Kalashnikov, slammed the door and sped up. Inside the air-conditioned ambulance, the air was stuffy mixed with chemicals, sweat, and blood stains. The two doctors, in bullet-proof vests with three rifle magazines and helmets, tried to keep the severely injured soldier from bumping up and down as the driver zigzagged through the dirt roads full of potholes. The disoriented soldier’s eyes were full of fear and panic. His tall and heavyset body was covered with shrapnel wounds. His entire left arm was stabilized with splints and wrapped with gauze, but was motionless. Blood was still seeping through the plaster and down to his muddy fingertips. One medic hastily cut open the dark stained fatigues with a pair of shears. His body was already full of chest seal packs to stop the bleeding of multiple wounds. The two doctors used an Israeli abdominal bandage to staunch the wounds. Two tourniquets covered with dirt were already applied near the groin of his left leg after the explosion. What happened on the frontline?! It's hard to fathom that this soldier who risked everything to liberate the land that belongs to his country, could die at any second. Three soldiers I had spent time with in Donbas last August have already sacrificed their lives in battle.\n\nUpon arriving at the boarded-up stabilization unit, the traumatized soldier was rushed into the emergency room. Another team of doctors and nurses with ballistic goggles took over. I asked one of the ambulance doctors if the soldier would survive. He said that the soldier’s fight on the frontlines is over. He will now have to fight for his life in the hospital if he lives. I touched my fading surgery scars thinking of the soldier, if he lives, his scars will be emotional as well as physical.\n\nWhile driving across the country, I remember a friend who described the Ukraine landscape “as flat as pancake.” The vast and ever-changing cloud formation is astonishing and unpredictable. A colleague sent me a Telegram message saying Putin was about to address the nation in 20 minutes regarding the Wagner mutiny. This was the kind of historical event that I will remember where I was and what I was doing. I was reaching Lviv on my way home via Krakow in Poland. In the western part of the Ukraine, there was certainly less destruction but no shortage of despair. I wondered if the mutiny was the start of the end of the war and/or the end of Putin! I also asked myself how the military rebellion would affect China’s continuous armed threat to Taiwan. I don’t know. All I know is do not let your guard down, ever.\n\nA few days after returning to Graz and home with the kids, I heard that Ria Pizza in the center of Kramatorsk was struck by a Russian missile during dinnertime. I couldn’t watch the footage of the dying people screaming for help underneath the rubble—my kids were next to me. But there’s a hole in my heart. I remember the place. I spent two weeks with my colleague Sergey working around Kramatorsk, including Bakhmut, last August. The next day, I received an Interfax news report, a reputable Ukrainian news service in three languages, from a colleague. It stated that SBU “in hot pursuit” detained a spotter activated by Russian military intelligence, who sent a filmed location of the café to Russian intelligence before the missile strike. The detained agent would have to answer before the court for his war crime against humanity! \n\nThe short-lived mutiny ended but the Wagnerian drama lingers. So many unanswered questions. I finally finished editing my pictures. And I continue to exercise and walk along the river with my vest and level-four armored plates, and I could listen to the Ride of Valkyries on my sweaty Air pods. \n\nBut then, all of a sudden, an air alert was on! Ah, yes, it’s the national weekly alert drill, fifty-two times a year. No exception. Just another Saturday noon in Austria.\n`,
            },
          ],
        },
        caption: 'Chien-Chi Chang.  Photo by Ruslan Ganushchak',
        credit: {
          pairs: [
            `Reporting and Photography by Chien-Chi Chang`,
            `Additional reporting by Chen Chang-Yuan`,
            `Curation, design and development by Lee Wen-Han, Tseng Lee-Yu, Lee Yu-Ju, Chen Wen-Yen, Chien Hsin-chan`,
            `Translation by Hung-Chin Chen, Yuhuan Yin, Wang Szu-Han, Chiang I-Ting`,
            `Produce by Chin Hua Wang, Chien Hsin-chan`,
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
