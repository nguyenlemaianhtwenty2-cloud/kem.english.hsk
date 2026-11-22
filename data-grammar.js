/* Ngữ pháp TOEIC. Bài tập: {q, o:[A,B,C,D], a: chỉ số đúng, e: giải thích} */
window.TENSES = [
  { id: "ht-don", name: "Hiện tại đơn", en: "Present Simple", band: 0,
    form: { "Khẳng định": "S + V(s/es) · S + am/is/are + N/Adj", "Phủ định": "S + do/does + not + V", "Nghi vấn": "Do/Does + S + V?" },
    use: ["Thói quen, hành động lặp lại", "Sự thật, chân lý", "Lịch trình cố định (tàu, xe, sự kiện) – kể cả trong tương lai"],
    signs: ["always, usually, often, every day/week", "once a month, on Mondays", "Lịch trình: The train leaves at 7 a.m."],
    tip: "Mệnh đề thời gian/điều kiện (when, before, after, as soon as, if, once, until) dùng hiện tại đơn dù nói về tương lai: \"Call me when the shipment arrives.\"",
    ex: [
      { q: "The shuttle bus ___ the hotel every 30 minutes.", o: ["leave", "leaves", "is leaving", "left"], a: 1, e: "Lịch trình lặp lại (every 30 minutes), chủ ngữ số ít → leaves." },
      { q: "Please let Ms. Ford know as soon as the clients ___.", o: ["will arrive", "arrived", "arrive", "are arriving"], a: 2, e: "Sau as soon as (mệnh đề thời gian) dùng hiện tại đơn thay cho tương lai." },
      { q: "Our store ___ at 9 a.m. on weekdays.", o: ["opens", "is opened", "opening", "has opened"], a: 0, e: "Thói quen/lịch cố định (on weekdays) → hiện tại đơn opens." }
    ]},
  { id: "ht-tiepdien", name: "Hiện tại tiếp diễn", en: "Present Continuous", band: 0,
    form: { "Khẳng định": "S + am/is/are + V-ing", "Phủ định": "S + am/is/are + not + V-ing", "Nghi vấn": "Am/Is/Are + S + V-ing?" },
    use: ["Hành động đang xảy ra lúc nói", "Kế hoạch tương lai đã sắp xếp", "Xu hướng đang thay đổi"],
    signs: ["now, right now, at the moment, currently", "Look!, Listen!", "this week, these days"],
    tip: "Part 1 rất hay dùng: \"A man is pouring coffee.\" Không chia tiếp diễn với động từ trạng thái: know, believe, belong, need, own.",
    ex: [
      { q: "Mr. Patel ___ a training session right now, so he can't take your call.", o: ["leads", "is leading", "led", "has led"], a: 1, e: "right now → hiện tại tiếp diễn." },
      { q: "The company ___ its headquarters to Seoul next month; the movers are already booked.", o: ["is moving", "moved", "moves", "had moved"], a: 0, e: "Kế hoạch đã sắp xếp (movers already booked) → hiện tại tiếp diễn mang nghĩa tương lai." },
      { q: "Currently, the marketing team ___ on a new campaign.", o: ["work", "is working", "has worked", "worked"], a: 1, e: "Currently → hiện tại tiếp diễn, chủ ngữ team (số ít) → is working." }
    ]},
  { id: "ht-hoanthanh", name: "Hiện tại hoàn thành", en: "Present Perfect", band: 1,
    form: { "Khẳng định": "S + have/has + V3/ed", "Phủ định": "S + have/has + not + V3/ed", "Nghi vấn": "Have/Has + S + V3/ed?" },
    use: ["Hành động bắt đầu trong quá khứ, kéo dài đến hiện tại", "Hành động vừa mới xảy ra, kết quả còn ở hiện tại", "Trải nghiệm (không rõ thời điểm)"],
    signs: ["since + mốc, for + khoảng thời gian", "already, yet, just, recently, lately, so far", "over the past/last + khoảng thời gian"],
    tip: "Thấy \"since 2020\", \"over the past five years\", \"so far\", \"recently\" → gần như chắc chắn chọn have/has + V3.",
    ex: [
      { q: "Ms. Nguyen ___ at the firm since 2019.", o: ["works", "worked", "has worked", "is working"], a: 2, e: "since 2019 → hiện tại hoàn thành." },
      { q: "Sales ___ steadily over the past three quarters.", o: ["have increased", "increase", "will increase", "had increased"], a: 0, e: "over the past + khoảng thời gian → hiện tại hoàn thành." },
      { q: "We ___ received the signed contract yet.", o: ["didn't", "haven't", "don't", "weren't"], a: 1, e: "yet + V3 (received) → haven't received." }
    ]},
  { id: "ht-htttd", name: "Hiện tại hoàn thành tiếp diễn", en: "Present Perfect Continuous", band: 2,
    form: { "Khẳng định": "S + have/has + been + V-ing", "Phủ định": "S + have/has + not + been + V-ing", "Nghi vấn": "Have/Has + S + been + V-ing?" },
    use: ["Nhấn mạnh tính liên tục của hành động từ quá khứ đến hiện tại (và có thể còn tiếp)"],
    signs: ["for, since, all day, all morning", "How long…?"],
    tip: "Cấu trúc giống HTHT nhưng có \"been + V-ing\". Khi cả hai đều đúng ngữ pháp, chọn đáp án khớp dạng động từ phía sau (been + V-ing).",
    ex: [
      { q: "The technicians have ___ the network problem all morning.", o: ["troubleshoot", "been troubleshooting", "troubleshooting", "be troubleshot"], a: 1, e: "have + been + V-ing, all morning nhấn mạnh tính liên tục." },
      { q: "How long ___ you been waiting for the shuttle?", o: ["do", "are", "have", "did"], a: 2, e: "How long + have + S + been + V-ing." },
      { q: "She has been ___ for the company for ten years.", o: ["work", "worked", "working", "works"], a: 2, e: "has been + V-ing → working." }
    ]},
  { id: "qk-don", name: "Quá khứ đơn", en: "Past Simple", band: 0,
    form: { "Khẳng định": "S + V2/ed · S + was/were", "Phủ định": "S + did not + V", "Nghi vấn": "Did + S + V?" },
    use: ["Hành động đã xảy ra và kết thúc tại thời điểm xác định trong quá khứ"],
    signs: ["yesterday, last week/month/year", "… ago, in 2015", "when + mệnh đề quá khứ"],
    tip: "Thấy mốc thời gian quá khứ cụ thể (last Friday, two days ago) → loại ngay đáp án HTHT.",
    ex: [
      { q: "The board ___ the new budget last Friday.", o: ["approves", "has approved", "approved", "will approve"], a: 2, e: "last Friday → quá khứ đơn." },
      { q: "Ms. Ito ___ the company three years ago.", o: ["joins", "joined", "has joined", "had joined"], a: 1, e: "three years ago → quá khứ đơn." },
      { q: "We ___ not receive the invoice until yesterday.", o: ["do", "have", "did", "were"], a: 2, e: "Phủ định quá khứ: did not + V." }
    ]},
  { id: "qk-tiepdien", name: "Quá khứ tiếp diễn", en: "Past Continuous", band: 1,
    form: { "Khẳng định": "S + was/were + V-ing", "Phủ định": "S + was/were + not + V-ing", "Nghi vấn": "Was/Were + S + V-ing?" },
    use: ["Hành động đang xảy ra tại một thời điểm trong quá khứ", "Hành động đang xảy ra thì hành động khác xen vào (when + QKĐ)"],
    signs: ["at 8 p.m. yesterday, at that time", "while, when"],
    tip: "While + QKTD, QKĐ: \"While I was driving, my phone rang.\" Hành động dài → tiếp diễn, hành động ngắn xen vào → đơn.",
    ex: [
      { q: "The power went out while we ___ the presentation.", o: ["give", "were giving", "have given", "gave"], a: 1, e: "Hành động đang diễn ra (while) bị xen ngang → quá khứ tiếp diễn." },
      { q: "At 3 p.m. yesterday, Mr. Lim ___ with a client.", o: ["meets", "was meeting", "has met", "will meet"], a: 1, e: "Thời điểm cụ thể trong quá khứ → quá khứ tiếp diễn." },
      { q: "When the manager arrived, the staff ___ the room for the event.", o: ["were decorating", "decorate", "have decorated", "decorates"], a: 0, e: "Hành động đang xảy ra khi hành động khác (arrived) chen vào." }
    ]},
  { id: "qk-hoanthanh", name: "Quá khứ hoàn thành", en: "Past Perfect", band: 2,
    form: { "Khẳng định": "S + had + V3/ed", "Phủ định": "S + had + not + V3/ed", "Nghi vấn": "Had + S + V3/ed?" },
    use: ["Hành động xảy ra trước một hành động/mốc khác trong quá khứ"],
    signs: ["before, after, by the time + QKĐ", "already, by + mốc quá khứ"],
    tip: "By the time + QKĐ → mệnh đề chính dùng QKHT: \"By the time we arrived, the meeting had started.\"",
    ex: [
      { q: "By the time the CEO arrived, the meeting ___.", o: ["already began", "had already begun", "has already begun", "begins"], a: 1, e: "By the time + QKĐ → mệnh đề chính QKHT." },
      { q: "She realized she ___ her badge at home.", o: ["leaves", "had left", "has left", "is leaving"], a: 1, e: "Việc để quên xảy ra trước khi nhận ra → QKHT." },
      { q: "The shipment ___ before we placed the second order.", o: ["had arrived", "arrives", "has arrived", "will arrive"], a: 0, e: "Hành động trước (before + QKĐ) → had arrived." }
    ]},
  { id: "qk-httd", name: "Quá khứ hoàn thành tiếp diễn", en: "Past Perfect Continuous", band: 3,
    form: { "Khẳng định": "S + had + been + V-ing", "Phủ định": "S + had + not + been + V-ing", "Nghi vấn": "Had + S + been + V-ing?" },
    use: ["Nhấn mạnh hành động kéo dài liên tục trước một mốc trong quá khứ"],
    signs: ["for + khoảng thời gian + before/when + QKĐ"],
    tip: "Ít gặp trong đề. Nhận dạng bằng \"had been + V-ing\" cùng \"for … before/when\".",
    ex: [
      { q: "He had ___ for the company for 20 years before he retired.", o: ["work", "been working", "working", "works"], a: 1, e: "had + been + V-ing, kéo dài trước khi retired." },
      { q: "The staff ___ waiting for an hour when the speaker finally arrived.", o: ["have been", "had been", "are", "were being"], a: 1, e: "Kéo dài trước mốc quá khứ (arrived) → had been waiting." },
      { q: "They had been ___ the merger for months before it was announced.", o: ["negotiate", "negotiated", "negotiating", "negotiation"], a: 2, e: "had been + V-ing." }
    ]},
  { id: "tl-don", name: "Tương lai đơn & be going to", en: "Future Simple", band: 0,
    form: { "Khẳng định": "S + will + V · S + am/is/are going to + V", "Phủ định": "S + will not (won't) + V", "Nghi vấn": "Will + S + V?" },
    use: ["will: quyết định tức thời, dự đoán, lời hứa, đề nghị", "be going to: dự định đã có từ trước, dự đoán có căn cứ"],
    signs: ["tomorrow, next week/month, soon", "in + thời gian (in two days)", "upcoming, starting next…"],
    tip: "Thấy \"next month\", \"tomorrow\", \"upcoming\" trong câu → chọn will + V hoặc will be + V3 (bị động).",
    ex: [
      { q: "The new branch ___ next month.", o: ["opened", "has opened", "will open", "opens up"], a: 2, e: "next month → tương lai đơn." },
      { q: "Don't worry about the copier. I ___ a technician right now.", o: ["call", "will call", "called", "have called"], a: 1, e: "Quyết định ngay lúc nói → will." },
      { q: "Look at those clouds. It ___ rain soon.", o: ["is going to", "was", "has", "would"], a: 0, e: "Dự đoán có căn cứ (thấy mây) → be going to." }
    ]},
  { id: "tl-tiepdien", name: "Tương lai tiếp diễn", en: "Future Continuous", band: 2,
    form: { "Khẳng định": "S + will be + V-ing", "Phủ định": "S + will not be + V-ing", "Nghi vấn": "Will + S + be + V-ing?" },
    use: ["Hành động sẽ đang diễn ra tại một thời điểm trong tương lai"],
    signs: ["at this time tomorrow/next week", "at 10 a.m. tomorrow"],
    tip: "Hay dùng trong email: \"I will be traveling next week, so please contact my assistant.\"",
    ex: [
      { q: "At this time tomorrow, I ___ to Singapore.", o: ["fly", "will be flying", "flew", "have flown"], a: 1, e: "At this time tomorrow → tương lai tiếp diễn." },
      { q: "Ms. Cho will be ___ the office all next week.", o: ["out of", "outing", "outside of being", "out"], a: 0, e: "will be + giới từ/cụm: will be out of the office." },
      { q: "Our team ___ the booth at the trade fair from 9 to 5.", o: ["will be staffing", "staffed", "has staffed", "staffs"], a: 0, e: "Hành động sẽ diễn ra trong khoảng thời gian tương lai → will be staffing." }
    ]},
  { id: "tl-hoanthanh", name: "Tương lai hoàn thành", en: "Future Perfect", band: 3,
    form: { "Khẳng định": "S + will have + V3/ed", "Phủ định": "S + will not have + V3/ed", "Nghi vấn": "Will + S + have + V3/ed?" },
    use: ["Hành động sẽ hoàn thành trước một mốc trong tương lai"],
    signs: ["by + mốc tương lai (by next year, by the end of…)", "by the time + HTĐ"],
    tip: "\"By the end of this month / By next year\" → will have + V3. Đừng nhầm với by the time + QKĐ (→ QKHT).",
    ex: [
      { q: "By the end of this year, the company ___ 200 new employees.", o: ["hired", "has hired", "will have hired", "had hired"], a: 2, e: "By + mốc tương lai → tương lai hoàn thành." },
      { q: "By the time you arrive, we ___ the report.", o: ["will have finished", "had finished", "finish", "finished"], a: 0, e: "By the time + HTĐ → tương lai hoàn thành." },
      { q: "The renovation will have ___ by June.", o: ["complete", "completing", "been completed", "be completed"], a: 2, e: "Bị động của TLHT: will have been + V3." }
    ]},
  { id: "tl-httd", name: "Tương lai hoàn thành tiếp diễn", en: "Future Perfect Continuous", band: 4,
    form: { "Khẳng định": "S + will have been + V-ing", "Phủ định": "S + will not have been + V-ing", "Nghi vấn": "Will + S + have been + V-ing?" },
    use: ["Nhấn mạnh khoảng thời gian hành động kéo dài đến một mốc tương lai"],
    signs: ["by + mốc tương lai + for + khoảng thời gian"],
    tip: "Rất hiếm trong đề. Nhận dạng: \"By next May, she will have been working here for 10 years.\"",
    ex: [
      { q: "By next May, Mr. Ruiz will have ___ here for ten years.", o: ["work", "been working", "worked being", "be working"], a: 1, e: "will have been + V-ing, có for + khoảng thời gian." },
      { q: "By 2030, the factory ___ for half a century.", o: ["will have been operating", "operated", "has operated", "is operating"], a: 0, e: "By + mốc tương lai + for + khoảng → TLHTTD." },
      { q: "By noon, they will have been ___ for six hours.", o: ["drive", "driven", "driving", "drove"], a: 2, e: "will have been + V-ing." }
    ]}
];

window.GRAMMAR = [
  { id: "tu-loai", name: "Từ loại & vị trí từ", en: "Parts of Speech", band: 0,
    theory: [
      ["Danh từ (N)", "Sau a/an/the, tính từ sở hữu (my, their), tính từ; làm chủ ngữ/tân ngữ. Đuôi: -tion, -sion, -ment, -ness, -ity, -ance/-ence, -er/-or, -ist, -ship."],
      ["Tính từ (Adj)", "Trước danh từ; sau to be và linking verbs (become, seem, remain, look). Đuôi: -ful, -less, -ous, -ive, -able/-ible, -al, -ic, -ent/-ant."],
      ["Trạng từ (Adv)", "Bổ nghĩa cho động từ, tính từ, cả câu. Vị trí: giữa trợ động từ và V (has carefully reviewed), trước V, cuối câu, trước tính từ (highly effective). Đuôi chủ yếu: -ly."],
      ["Động từ (V)", "Sau chủ ngữ; sau to, modal (can, must, should). Đuôi: -ize, -ify, -en, -ate."]
    ],
    tips: ["Đọc 2 từ trước và sau chỗ trống trước khi dịch nghĩa – 70% câu từ loại giải được trong 5 giây.", "the + ___ + of → danh từ.", "be + ___ + V3 hoặc has + ___ + V3 → trạng từ.", "a/an/the + ___ + N → tính từ (hoặc danh từ ghép nếu đáp án không có tính từ phù hợp)."],
    ex: [
      { q: "The manager praised the team for its ___ work on the project.", o: ["except", "exceptional", "exceptionally", "exception"], a: 1, e: "its + ___ + N (work) → tính từ exceptional." },
      { q: "The proposal was ___ reviewed by the committee.", o: ["care", "careful", "carefully", "carefulness"], a: 2, e: "was + ___ + V3 → trạng từ carefully." },
      { q: "The ___ of the new software took two days.", o: ["install", "installed", "installation", "installing"], a: 2, e: "the + ___ + of → danh từ installation." },
      { q: "Customers find the new interface very ___.", o: ["use", "useful", "usefully", "usefulness"], a: 1, e: "find + O + Adj; sau very cần tính từ." },
      { q: "Ms. Tran will ___ the details of the merger at the meeting.", o: ["clarity", "clear", "clarify", "clarification"], a: 2, e: "Sau will cần động từ nguyên mẫu → clarify." },
      { q: "Prices have risen ___ since last year.", o: ["significant", "significance", "significantly", "signify"], a: 2, e: "Bổ nghĩa cho động từ risen → trạng từ significantly." }
    ]},
  { id: "dai-tu", name: "Đại từ", en: "Pronouns", band: 0,
    theory: [
      ["Chủ ngữ", "I, you, he, she, it, we, they – đứng đầu câu/mệnh đề, trước động từ."],
      ["Tân ngữ", "me, you, him, her, it, us, them – sau động từ, sau giới từ."],
      ["Tính từ sở hữu", "my, your, his, her, its, our, their – luôn đi kèm danh từ phía sau."],
      ["Đại từ sở hữu", "mine, yours, his, hers, ours, theirs – đứng một mình, thay cho cụm (tính từ sở hữu + N)."],
      ["Phản thân", "myself, yourself, himself, herself, itself, ourselves, themselves – khi chủ ngữ và tân ngữ là một; by + oneself = một mình."]
    ],
    tips: ["Sau chỗ trống có danh từ → tính từ sở hữu (their report).", "Sau chỗ trống KHÔNG có danh từ và đứng sau động từ/giới từ → tân ngữ hoặc đại từ sở hữu.", "by + ___ → luôn chọn đại từ phản thân."],
    ex: [
      { q: "Ms. Ahmed prefers to complete the reports by ___.", o: ["she", "her", "hers", "herself"], a: 3, e: "by + phản thân = tự mình." },
      { q: "The employees submitted ___ time sheets on Friday.", o: ["they", "them", "their", "theirs"], a: 2, e: "Trước danh từ (time sheets) → tính từ sở hữu their." },
      { q: "If you can't find your umbrella, you can borrow ___.", o: ["my", "mine", "me", "myself"], a: 1, e: "Đứng một mình thay cho my umbrella → mine." },
      { q: "Please send the documents to Mr. Diaz or ___ assistant.", o: ["he", "him", "his", "himself"], a: 2, e: "Trước danh từ assistant → his." },
      { q: "The director thanked ___ for their hard work.", o: ["we", "us", "our", "ours"], a: 1, e: "Tân ngữ sau động từ thanked → us." }
    ]},
  { id: "danh-tu", name: "Danh từ & Lượng từ", en: "Nouns & Quantifiers", band: 0,
    theory: [
      ["Đếm được / không đếm được", "Không đếm được hay gặp: information, equipment, furniture, advice, luggage, baggage, machinery, merchandise, feedback, research, staff (tập hợp)."],
      ["Đi với N số nhiều", "many, few, a few, several, a number of, both, various, numerous"],
      ["Đi với N không đếm được", "much, little, a little, a great deal of, an amount of"],
      ["Đi với cả hai", "some, any, a lot of, lots of, plenty of, most, all, no"],
      ["Đi với N số ít", "each, every, another, either, neither"]
    ],
    tips: ["each/every + N số ít + V số ít: \"Every employee has…\"", "a number of + N số nhiều + V số nhiều; the number of + N số nhiều + V số ít.", "one of the + N số nhiều."],
    ex: [
      { q: "___ applicant must submit a portfolio.", o: ["All", "Each", "Many", "Several"], a: 1, e: "applicant số ít → Each." },
      { q: "The store sells a wide range of office ___.", o: ["furnitures", "furniture", "furnishing", "furnish"], a: 1, e: "furniture không đếm được, không thêm s." },
      { q: "There is very ___ information about the new policy.", o: ["few", "many", "little", "a few"], a: 2, e: "information không đếm được → little." },
      { q: "A number of customers ___ complained about the delay.", o: ["has", "have", "is", "was"], a: 1, e: "A number of + N số nhiều + V số nhiều." },
      { q: "Mr. Hale is one of the most experienced ___ in the department.", o: ["engineer", "engineers", "engineering", "engineered"], a: 1, e: "one of the + N số nhiều." }
    ]},
  { id: "hoa-hop", name: "Hòa hợp chủ ngữ – động từ", en: "Subject–Verb Agreement", band: 1,
    theory: [
      ["Nguyên tắc", "Chủ ngữ số ít → V số ít (is, has, V-s); số nhiều → V số nhiều."],
      ["Chủ ngữ dài", "Bỏ qua cụm giới từ / mệnh đề quan hệ để tìm danh từ chính: \"The list of new members IS…\"."],
      ["Danh động từ / mệnh đề làm chủ ngữ", "V-ing hoặc To V đứng đầu → V số ít: \"Reviewing contracts takes time.\""],
      ["Either/Neither… or/nor", "Động từ chia theo chủ ngữ gần nhất."]
    ],
    tips: ["Gạch bỏ cụm \"of + N\" và \"who/which…\" để thấy chủ ngữ thật.", "Đáp án có 4 dạng của cùng 1 động từ → kiểm tra 3 thứ: số ít/nhiều, chủ động/bị động, thì."],
    ex: [
      { q: "The results of the survey ___ posted online yesterday.", o: ["was", "were", "is", "has been"], a: 1, e: "Chủ ngữ chính là results (số nhiều), yesterday → were." },
      { q: "Learning new software ___ patience.", o: ["require", "requires", "requiring", "are required"], a: 1, e: "V-ing làm chủ ngữ → động từ số ít." },
      { q: "Neither the manager nor the employees ___ aware of the change.", o: ["was", "is", "were", "has"], a: 2, e: "Chia theo chủ ngữ gần nhất employees → were." },
      { q: "The equipment in the labs ___ checked every month.", o: ["are", "is", "have", "were being"], a: 1, e: "equipment không đếm được → is." },
      { q: "Every one of the rooms ___ a view of the sea.", o: ["have", "has", "having", "are having"], a: 1, e: "Every one of + N → động từ số ít has." }
    ]},
  { id: "bi-dong", name: "Câu bị động", en: "Passive Voice", band: 2,
    theory: [
      ["Công thức", "S + be (chia theo thì) + V3/ed (+ by O)"],
      ["Theo thì", "HTĐ: am/is/are + V3 · QKĐ: was/were + V3 · HTHT: have/has been + V3 · TL: will be + V3 · Modal: can/must/should be + V3 · Tiếp diễn: is being + V3"],
      ["Khi nào dùng", "Khi chủ ngữ là vật/người chịu tác động; người thực hiện không quan trọng."]
    ],
    tips: ["Sau chỗ trống có tân ngữ (danh từ) → chủ động; không có tân ngữ → thường là bị động.", "Chủ ngữ là vật (report, order, package) + động từ cần tân ngữ (send, approve, deliver) → bị động.", "be + ___ + by → V3."],
    ex: [
      { q: "All orders ___ within two business days.", o: ["ship", "are shipped", "shipping", "have shipped"], a: 1, e: "Chủ ngữ orders là vật, không có tân ngữ sau → bị động." },
      { q: "The conference room must ___ in advance.", o: ["reserve", "reserving", "be reserved", "reserved"], a: 2, e: "Modal + be + V3." },
      { q: "The new policy has been ___ to all staff.", o: ["announce", "announcing", "announced", "announcement"], a: 2, e: "has been + V3 → bị động HTHT." },
      { q: "The award ___ to Ms. Lopez at last night's banquet.", o: ["presented", "was presented", "presents", "has presented"], a: 1, e: "Vật (award) được trao, last night → was presented." },
      { q: "The road is currently being ___.", o: ["repair", "repaired", "repairing", "repairs"], a: 1, e: "is being + V3 → bị động tiếp diễn." },
      { q: "Ms. Park ___ the contract before she left the office.", o: ["was signed", "signed", "was signing by", "is signed"], a: 1, e: "Có tân ngữ (the contract), người làm là Ms. Park → chủ động." }
    ]},
  { id: "quan-he", name: "Mệnh đề quan hệ", en: "Relative Clauses", band: 2,
    theory: [
      ["who", "Thay cho người, làm chủ ngữ: the man who called"],
      ["whom", "Thay cho người, làm tân ngữ (sau giới từ): to whom"],
      ["which", "Thay cho vật; dùng được sau dấu phẩy"],
      ["that", "Thay cho người/vật; KHÔNG dùng sau dấu phẩy, sau giới từ"],
      ["whose", "Sở hữu: whose + N (the client whose order was delayed)"],
      ["where / when", "Nơi chốn / thời gian = giới từ + which"]
    ],
    tips: ["Sau chỗ trống là danh từ không có mạo từ → whose.", "Sau chỗ trống là động từ → who (người) / which (vật).", "Dấu phẩy + ___ → loại that.", "Giới từ + ___ → whom/which."],
    ex: [
      { q: "Employees ___ wish to attend the seminar should register by Friday.", o: ["which", "who", "whom", "whose"], a: 1, e: "Thay cho người, làm chủ ngữ của wish → who." },
      { q: "The client ___ order was delayed has received a full refund.", o: ["who", "which", "whose", "that"], a: 2, e: "___ + danh từ (order) → whose." },
      { q: "The new printer, ___ was installed last week, is already broken.", o: ["that", "which", "who", "what"], a: 1, e: "Sau dấu phẩy, thay cho vật → which." },
      { q: "The person to ___ you should send your résumé is Ms. Grant.", o: ["who", "whom", "whose", "that"], a: 1, e: "Sau giới từ, chỉ người → whom." },
      { q: "This is the hotel ___ we stayed during the conference.", o: ["which", "where", "when", "whose"], a: 1, e: "Nơi chốn, mệnh đề sau đủ thành phần → where." }
    ]},
  { id: "so-sanh", name: "So sánh", en: "Comparisons", band: 1,
    theory: [
      ["So sánh bằng", "as + adj/adv + as · not as/so … as"],
      ["So sánh hơn", "adj-er + than · more + adj + than · less + adj + than"],
      ["So sánh nhất", "the + adj-est · the most + adj (+ in/of/ever)"],
      ["Bất quy tắc", "good/well → better → best · bad → worse → worst · far → farther/further · many/much → more → most"],
      ["Nhấn mạnh", "much, far, even, still, a lot + so sánh hơn (much cheaper)"]
    ],
    tips: ["Thấy than → so sánh hơn; thấy the + ___ + of/in/ever → so sánh nhất.", "as ___ as → tính từ/trạng từ nguyên mẫu; chọn adj hay adv dựa vào động từ phía trước.", "the + so sánh hơn, the + so sánh hơn: \"The sooner, the better.\""],
    ex: [
      { q: "The new model is ___ than the previous one.", o: ["light", "lighter", "lightest", "most light"], a: 1, e: "Có than → so sánh hơn lighter." },
      { q: "This is the ___ successful product we have ever launched.", o: ["more", "most", "much", "very"], a: 1, e: "the + most + adj + ever → so sánh nhất." },
      { q: "Please respond as ___ as possible.", o: ["quick", "quicker", "quickly", "quickest"], a: 2, e: "Bổ nghĩa cho động từ respond → trạng từ, as … as dùng dạng nguyên." },
      { q: "Shipping costs are ___ higher this year than last year.", o: ["very", "much", "most", "so"], a: 1, e: "much + so sánh hơn để nhấn mạnh; very không đi với so sánh hơn." },
      { q: "The ___ you register, the better seat you will get.", o: ["early", "earlier", "earliest", "more early"], a: 1, e: "The + so sánh hơn, the + so sánh hơn." }
    ]},
  { id: "gioi-tu", name: "Giới từ", en: "Prepositions", band: 1,
    theory: [
      ["Thời gian", "at + giờ (at 9 a.m.) · on + ngày/thứ (on Monday, on May 5) · in + tháng/năm/buổi (in June, in 2025, in the morning)"],
      ["Khoảng thời gian", "for + khoảng · since + mốc · during + N (sự kiện) · within + khoảng (trong vòng) · by + mốc (trước/không muộn hơn) · until + mốc (cho đến khi)"],
      ["Nơi chốn", "at + điểm cụ thể (at the front desk) · in + không gian (in the room) · on + bề mặt/tầng (on the 5th floor)"],
      ["Cụm hay gặp", "in charge of, in addition to, according to, because of, due to, instead of, in spite of, prior to, regardless of, in light of, on behalf of, from … to …, between … and …"]
    ],
    tips: ["by vs until: by = hạn chót (submit by Friday); until = kéo dài đến (stay open until 9).", "during + danh từ; while + mệnh đề.", "within + khoảng thời gian/phạm vi: within 30 days, within the city."],
    ex: [
      { q: "Please submit the form ___ Friday at the latest.", o: ["until", "by", "since", "during"], a: 1, e: "Hạn chót → by." },
      { q: "No talking is allowed ___ the performance.", o: ["while", "during", "for", "since"], a: 1, e: "Theo sau là danh từ → during." },
      { q: "Returns are accepted ___ 30 days of purchase.", o: ["within", "among", "between", "along"], a: 0, e: "within + khoảng thời gian = trong vòng." },
      { q: "The store will remain open ___ 10 p.m. during the holidays.", o: ["by", "until", "at", "on"], a: 1, e: "Kéo dài đến → until." },
      { q: "The seminar will be held ___ June 12.", o: ["in", "at", "on", "by"], a: 2, e: "Ngày cụ thể → on." },
      { q: "The museum is open daily ___ 9 a.m. to 5 p.m.", o: ["between", "from", "since", "at"], a: 1, e: "from … to …" }
    ]},
  { id: "lien-tu", name: "Liên từ & Từ nối", en: "Conjunctions", band: 2,
    theory: [
      ["Nhượng bộ", "although / though / even though + mệnh đề · despite / in spite of + N/V-ing"],
      ["Nguyên nhân", "because / since / as + mệnh đề · because of / due to / owing to + N"],
      ["Mục đích", "so that + mệnh đề · in order to / so as to + V"],
      ["Điều kiện", "if, unless (= if not), provided that, as long as, in case"],
      ["Cặp liên từ", "both … and · either … or · neither … nor · not only … but also"],
      ["Trạng từ nối (đầu câu + dấu phẩy)", "however, therefore, moreover, otherwise, consequently, nevertheless"]
    ],
    tips: ["Bước 1: sau chỗ trống là mệnh đề (S + V) hay cụm danh từ? → loại một nửa đáp án.", "Bước 2: quan hệ nghĩa – trái ngược, nguyên nhân hay điều kiện.", "Trạng từ nối (however, therefore) không nối được 2 mệnh đề bằng dấu phẩy."],
    ex: [
      { q: "___ the heavy traffic, Mr. Chen arrived on time.", o: ["Although", "Despite", "Because", "Even though"], a: 1, e: "Sau là cụm danh từ, nghĩa trái ngược → Despite." },
      { q: "The event was canceled ___ the speaker became ill.", o: ["because of", "because", "due to", "despite"], a: 1, e: "Sau là mệnh đề, nghĩa nguyên nhân → because." },
      { q: "You will not receive a refund ___ you have the receipt.", o: ["if", "unless", "so that", "whether"], a: 1, e: "unless = trừ khi (if not)." },
      { q: "The package was delivered late ___ a shortage of drivers.", o: ["owing to", "since", "although", "so that"], a: 0, e: "Sau là cụm danh từ, nguyên nhân → owing to." },
      { q: "The new phone is not only faster ___ cheaper.", o: ["and", "or", "but also", "as well"], a: 2, e: "not only … but also." },
      { q: "Please save your work often; ___, you may lose data.", o: ["however", "otherwise", "moreover", "therefore"], a: 1, e: "Nếu không thì → otherwise." }
    ]},
  { id: "danh-dong-tu", name: "V-ing & To V", en: "Gerunds & Infinitives", band: 2,
    theory: [
      ["Theo sau là V-ing", "avoid, consider, enjoy, finish, mind, postpone, recommend, suggest, keep, deny, delay"],
      ["Theo sau là To V", "agree, decide, expect, hope, plan, promise, refuse, want, afford, intend, aim, strive"],
      ["V + O + To V", "ask, allow, encourage, enable, invite, remind, require, permit, advise"],
      ["Giới từ + V-ing", "look forward to V-ing, be committed to V-ing, be used to V-ing, be dedicated to V-ing, object to V-ing"],
      ["Đổi nghĩa", "stop to V (dừng để làm) / stop V-ing (ngừng làm) · remember/forget to V (việc sẽ làm) / V-ing (việc đã làm)"]
    ],
    tips: ["Sau giới từ luôn là V-ing – kể cả \"to\" khi nó là giới từ: look forward to meeting you.", "be + adj + to V: be able to, be eager to, be likely to, be pleased to."],
    ex: [
      { q: "We look forward to ___ with you.", o: ["work", "working", "worked", "be working"], a: 1, e: "look forward to + V-ing." },
      { q: "The manager decided ___ the meeting until next week.", o: ["postpone", "postponing", "to postpone", "postponed"], a: 2, e: "decide + to V." },
      { q: "Would you mind ___ the door?", o: ["close", "to close", "closing", "closed"], a: 2, e: "mind + V-ing." },
      { q: "The new system enables staff ___ files remotely.", o: ["access", "accessing", "to access", "accessed"], a: 2, e: "enable + O + to V." },
      { q: "The company is committed to ___ high-quality service.", o: ["provide", "providing", "provided", "provides"], a: 1, e: "be committed to + V-ing (to là giới từ)." }
    ]},
  { id: "phan-tu", name: "Phân từ & Rút gọn mệnh đề", en: "Participles", band: 3,
    theory: [
      ["V-ing (chủ động)", "Danh từ tự thực hiện hành động: the rising costs, a growing company · cảm xúc gây ra: an interesting report"],
      ["V3/ed (bị động)", "Danh từ chịu tác động: the attached file, a revised schedule, qualified applicants · cảm xúc của người: interested customers"],
      ["Rút gọn MĐQH", "the man who is standing → the man standing · the report which was written → the report written"],
      ["Rút gọn trạng ngữ", "When/After/Before/While + V-ing (chủ động) · Once/When/If/Unless + V3 (bị động): \"Once completed, the form should be returned.\""]
    ],
    tips: ["Hỏi: danh từ TỰ làm hay BỊ làm? Tự làm → V-ing, bị làm → V3.", "Cụm cố định nên thuộc: attached, enclosed, revised, detailed, experienced, qualified, limited, preferred / leading, existing, remaining, outstanding, demanding.", "Sau chỗ trống có tân ngữ → V-ing; không có → V3 (khi rút gọn)."],
    ex: [
      { q: "Please review the ___ document before the meeting.", o: ["attach", "attaching", "attached", "attachment"], a: 2, e: "Tài liệu được đính kèm → attached." },
      { q: "Only ___ applicants will be contacted for an interview.", o: ["qualify", "qualifying", "qualified", "qualification"], a: 2, e: "qualified applicants: ứng viên đủ tiêu chuẩn (cụm cố định)." },
      { q: "Visitors ___ the factory must wear safety helmets.", o: ["tour", "touring", "toured", "are touring"], a: 1, e: "Rút gọn MĐQH chủ động (who tour) → touring, có tân ngữ the factory." },
      { q: "When ___ the form, please use black ink.", o: ["complete", "completing", "completed", "completion"], a: 1, e: "When + V-ing (chủ ngữ ẩn là you, có tân ngữ the form)." },
      { q: "Once ___, the contract cannot be changed.", o: ["signing", "signed", "sign", "signs"], a: 1, e: "Hợp đồng được ký → Once + V3." },
      { q: "The staff were ___ by the announcement.", o: ["surprising", "surprised", "surprise", "surprisingly"], a: 1, e: "Người bị tác động cảm xúc → surprised." }
    ]},
  { id: "dieu-kien", name: "Câu điều kiện", en: "Conditionals", band: 3,
    theory: [
      ["Loại 0", "If + HTĐ, HTĐ – sự thật, quy luật"],
      ["Loại 1", "If + HTĐ, will/can/may + V – có thể xảy ra ở tương lai"],
      ["Loại 2", "If + QKĐ (were), would/could + V – trái với hiện tại"],
      ["Loại 3", "If + had + V3, would have + V3 – trái với quá khứ"],
      ["Đảo ngữ", "Should + S + V (= If loại 1) · Were + S + to V/N (loại 2) · Had + S + V3 (loại 3)"]
    ],
    tips: ["Nhìn vế còn lại để chọn loại: would have + V3 → had + V3.", "Đầu câu có chỗ trống + S + V nguyên mẫu, câu mang tính lịch sự trong email → Should: \"Should you have any questions, …\"", "Mệnh đề If loại 1 không dùng will."],
    ex: [
      { q: "___ you have any questions, please contact our help desk.", o: ["If only", "Should", "Unless", "Had"], a: 1, e: "Đảo ngữ loại 1: Should + S + V." },
      { q: "If the shipment ___ late, we will contact you.", o: ["will be", "is", "were", "had been"], a: 1, e: "Loại 1: If + HTĐ." },
      { q: "If we had left earlier, we ___ the train.", o: ["will catch", "would catch", "would have caught", "caught"], a: 2, e: "Loại 3: would have + V3." },
      { q: "___ the weather been better, the picnic would have taken place.", o: ["If", "Had", "Should", "Were"], a: 1, e: "Đảo ngữ loại 3: Had + S + V3." },
      { q: "If I ___ you, I would accept the offer.", o: ["am", "was being", "were", "had"], a: 2, e: "Loại 2: If I were you." }
    ]},
  { id: "nho-va", name: "Câu nhờ vả (Causative)", en: "Causative", band: 3,
    theory: [
      ["have", "have + người + V (nguyên mẫu) · have + vật + V3"],
      ["get", "get + người + to V · get + vật + V3"],
      ["make / let / help", "make + O + V (bắt) · let + O + V (cho phép) · help + O + (to) V"]
    ],
    tips: ["Sau have/get + vật → V3 (have the car repaired).", "make/let + O + V nguyên mẫu, không có to."],
    ex: [
      { q: "We had the copier ___ yesterday.", o: ["repair", "repaired", "repairing", "to repair"], a: 1, e: "have + vật + V3." },
      { q: "The manager had her assistant ___ the meeting.", o: ["arrange", "arranged", "to arrange", "arranging"], a: 0, e: "have + người + V nguyên mẫu." },
      { q: "I got the technician ___ the software.", o: ["update", "to update", "updated", "updating"], a: 1, e: "get + người + to V." },
      { q: "The new policy lets employees ___ from home on Fridays.", o: ["work", "to work", "working", "worked"], a: 0, e: "let + O + V nguyên mẫu." }
    ]},
  { id: "gia-dinh", name: "Câu giả định", en: "Subjunctive", band: 4,
    theory: [
      ["Với động từ", "recommend, suggest, request, require, insist, ask, demand, propose + that + S + V nguyên mẫu (không chia)"],
      ["Với tính từ", "It is essential/important/necessary/imperative/vital + that + S + V nguyên mẫu"],
      ["Bị động", "that + S + be + V3: \"It is required that all visitors be accompanied.\""]
    ],
    tips: ["Thấy recommend/request/essential + that → chọn V nguyên mẫu (be, submit), kể cả chủ ngữ số ít.", "Bẫy: đáp án chia -s hoặc will thường là sai."],
    ex: [
      { q: "The manager requested that every employee ___ the form by Friday.", o: ["submits", "submit", "submitted", "will submit"], a: 1, e: "request that + S + V nguyên mẫu." },
      { q: "It is essential that the report ___ before the meeting.", o: ["is finished", "be finished", "finishes", "will be finished"], a: 1, e: "essential that + S + be + V3." },
      { q: "The consultant recommended that the company ___ its prices.", o: ["lowers", "lowered", "lower", "lowering"], a: 2, e: "recommend that + S + V nguyên mẫu." },
      { q: "We suggest that each guest ___ a valid ID.", o: ["bring", "brings", "brought", "bringing"], a: 0, e: "suggest that + S + V nguyên mẫu." }
    ]},
  { id: "dao-ngu", name: "Đảo ngữ", en: "Inversion", band: 4,
    theory: [
      ["Phủ định đầu câu", "Never / Rarely / Seldom / Hardly / Not only + trợ động từ + S + V"],
      ["Only", "Only after / Only when / Only by … + trợ động từ + S + V"],
      ["So / Such", "So + adj + be + S + that … · Such + be + N + that …"],
      ["Điều kiện", "Should / Were / Had + S … (xem Câu điều kiện)"]
    ],
    tips: ["Đầu câu là Never/Rarely/Not only/Only + … → sau đó phải có trợ động từ đứng trước chủ ngữ.", "Not only + trợ động từ + S + V, but S + also V."],
    ex: [
      { q: "Never ___ such a successful product launch.", o: ["we have seen", "have we seen", "we saw", "seen we have"], a: 1, e: "Never đầu câu → đảo trợ động từ: have we seen." },
      { q: "Only after the contract is signed ___ the work begin.", o: ["will", "does", "is", "has"], a: 0, e: "Only after … + trợ động từ + S + V → will the work begin." },
      { q: "Not only ___ the project on time, but she also stayed under budget.", o: ["she finished", "did she finish", "she did finish", "finished she"], a: 1, e: "Not only + trợ động từ + S + V." },
      { q: "Rarely ___ the CEO attend department meetings.", o: ["do", "does", "is", "has"], a: 1, e: "Rarely + does + S (CEO số ít) + V." }
    ]}
];

/* Câu hỏi từ vựng Part 5 (dùng trong luyện thi) */
window.VOCAB_P5 = [
  { q: "Ms. Kwan was ___ to the position of regional manager last month.", o: ["promoted", "advanced", "raised", "lifted"], a: 0, e: "be promoted to + vị trí: được thăng chức.", t: "v-hr" },
  { q: "Employees who work overtime are ___ for additional pay.", o: ["capable", "eligible", "possible", "available"], a: 1, e: "be eligible for: đủ điều kiện nhận.", t: "v-colloc" },
  { q: "Please keep your ___ as proof of purchase.", o: ["recipe", "receipt", "reception", "receiver"], a: 1, e: "receipt: biên lai.", t: "v-shopping" },
  { q: "The flight was canceled ___ to severe weather.", o: ["owing", "because", "due", "since"], a: 2, e: "due to + N.", t: "v-colloc" },
  { q: "All products must ___ with national safety standards.", o: ["obey", "follow", "comply", "observe"], a: 2, e: "comply with: tuân thủ (obey/follow/observe không đi với with).", t: "v-contract" },
  { q: "The company will ___ employees for travel expenses.", o: ["refund", "reimburse", "repay", "return"], a: 1, e: "reimburse sb for sth: hoàn trả chi phí cho ai.", t: "v-finance" },
  { q: "The meeting has been ___ scheduled for Thursday, pending the director's approval.", o: ["tentatively", "hesitantly", "temporarily", "doubtfully"], a: 0, e: "tentatively scheduled: lên lịch tạm thời/dự kiến.", t: "v-advanced" },
  { q: "Guests staying at the hotel receive a ___ breakfast.", o: ["complimentary", "complementary", "complimented", "compliment"], a: 0, e: "complimentary: miễn phí (khác complementary: bổ sung).", t: "v-event" },
  { q: "The parking garage is ___ to the convention center.", o: ["nearby", "adjacent", "beside", "neighbor"], a: 1, e: "be adjacent to: liền kề với. nearby/beside không đi với to.", t: "v-advanced" },
  { q: "Mr. Ortiz is ___ for training all new sales staff.", o: ["responsible", "charged", "liable", "capable"], a: 0, e: "be responsible for: chịu trách nhiệm.", t: "v-colloc" },
  { q: "Sales have increased ___ since the new campaign was launched.", o: ["substantial", "substantially", "substance", "substantiate"], a: 1, e: "Bổ nghĩa cho động từ increased → trạng từ.", t: "tu-loai" },
  { q: "The lease will ___ at the end of June unless it is renewed.", o: ["expire", "expend", "exceed", "explore"], a: 0, e: "expire: hết hạn.", t: "v-contract" },
  { q: "The technician could not ___ the cause of the malfunction.", o: ["figure out", "fill in", "drop off", "sign up"], a: 0, e: "figure out: tìm ra.", t: "v-phrasal" },
  { q: "We have received numerous ___ about the new product line.", o: ["inquiries", "inquire", "inquired", "inquiring"], a: 0, e: "numerous + N số nhiều → inquiries.", t: "danh-tu" }
];
