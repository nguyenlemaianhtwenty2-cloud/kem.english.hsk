/* Chủ điểm ngữ pháp bổ sung, có ví dụ song ngữ (eg) cho dễ học */
GRAMMAR.push(
  { id: "mao-tu", name: "Mạo từ a / an / the", en: "Articles", band: 0, wk: 1,
    theory: [["a / an", "Dùng trước danh từ đếm được số ít, nhắc đến lần đầu hoặc chưa xác định. an đứng trước âm nguyên âm: an hour, an office."], ["the", "Dùng khi người nghe đã biết vật nào: đã nhắc trước đó, chỉ có một, hoặc có cụm xác định phía sau (the report on your desk)."], ["Không dùng mạo từ", "Danh từ số nhiều và không đếm được khi nói chung chung: Information is important. Trước tên bữa ăn, môn thể thao, hầu hết tên nước."]],
    tips: ["Danh từ đếm được số ít không bao giờ đứng một mình: phải có a/an/the hoặc my, this…", "Thấy \"of\" phía sau danh từ thì thường dùng the: the cost of living.", "So sánh nhất và số thứ tự đi với the: the best, the first."],
    eg: [["I need a pen. The pen on your desk is fine.", "Tôi cần một cây bút. Cây bút trên bàn bạn là được."], ["She works for an insurance company.", "Cô ấy làm cho một công ty bảo hiểm."], ["Equipment is expensive.", "Thiết bị thì đắt (nói chung, không dùng mạo từ)."]],
    ex: [
      { q: "Ms. Lee is ___ accountant at a large firm.", o: ["a", "an", "the", "(không cần)"], a: 1, e: "accountant bắt đầu bằng âm nguyên âm → an." },
      { q: "Please close ___ door when you leave.", o: ["a", "an", "the", "(không cần)"], a: 2, e: "Cánh cửa cả hai đều biết → the." },
      { q: "___ information you sent was very helpful.", o: ["A", "An", "The", "(không cần)"], a: 2, e: "Thông tin đã xác định (you sent) → The." },
      { q: "This is ___ best offer we have received.", o: ["a", "an", "the", "(không cần)"], a: 2, e: "So sánh nhất đi với the." }
    ]},
  { id: "modal", name: "Động từ khuyết thiếu", en: "Modal Verbs", band: 1, wk: 2,
    theory: [["Công thức", "S + modal + V nguyên mẫu (không to, không chia). Bị động: modal + be + V3."], ["Khả năng, xin phép", "can, could, may, be able to"], ["Bắt buộc, cần thiết", "must, have to, need to · không cần: don't have to · cấm: must not"], ["Lời khuyên", "should, ought to, had better"], ["Khả năng xảy ra", "may, might, could (có thể) · must (chắc hẳn) · can't (không thể nào)"]],
    tips: ["Sau modal luôn là động từ nguyên mẫu: will be, must submit, should have.", "must not là cấm; don't have to là không bắt buộc.", "Đáp án có to V sau modal (trừ ought to, have to) là sai."],
    eg: [["You must wear a badge.", "Bạn phải đeo thẻ."], ["You don't have to come early.", "Bạn không cần đến sớm."], ["The package should arrive tomorrow.", "Bưu kiện chắc sẽ đến ngày mai."]],
    ex: [
      { q: "All visitors must ___ at the front desk.", o: ["sign in", "to sign in", "signing in", "signed in"], a: 0, e: "Sau must là động từ nguyên mẫu." },
      { q: "Employees ___ park in the visitor lot; it is strictly forbidden.", o: ["don't have to", "must not", "might", "should"], a: 1, e: "Cấm → must not." },
      { q: "The form should ___ by Friday.", o: ["return", "be returned", "returning", "to return"], a: 1, e: "Mẫu đơn được nộp → modal + be + V3." },
      { q: "You ___ bring your laptop; we provide one.", o: ["must", "don't have to", "must not", "can't"], a: 1, e: "Không cần thiết → don't have to." }
    ]},
  { id: "cau-hoi", name: "Câu hỏi đuôi & câu hỏi gián tiếp", en: "Tag & Indirect Questions", band: 1, wk: 2,
    theory: [["Câu hỏi đuôi", "Câu khẳng định + đuôi phủ định, câu phủ định + đuôi khẳng định: It's late, isn't it? · You haven't met, have you?"], ["Trả lời câu hỏi đuôi", "Trả lời theo sự thật, không theo dạng câu hỏi: The store is closed, isn't it? — Yes, it is."], ["Câu hỏi gián tiếp", "Do you know + từ hỏi + S + V (không đảo trợ động từ): Do you know where the bank is?"], ["Câu hỏi Yes/No gián tiếp", "Dùng if / whether: Could you tell me if the room is free?"]],
    tips: ["Part 2: câu hỏi đuôi thực chất là câu hỏi Yes/No.", "Câu hỏi gián tiếp không đảo: where the bank is, không phải where is the bank.", "Do you know…? thường được trả lời thẳng vào thông tin, không chỉ Yes/No."],
    eg: [["The meeting starts at ten, doesn't it?", "Cuộc họp bắt đầu lúc mười giờ, phải không?"], ["Do you know when the shop opens?", "Bạn có biết khi nào cửa hàng mở không?"], ["Could you tell me if he is in?", "Bạn cho tôi biết ông ấy có ở đó không?"]],
    ex: [
      { q: "You sent the invoice, ___ you?", o: ["did", "didn't", "don't", "haven't"], a: 1, e: "Câu khẳng định quá khứ đơn → đuôi didn't." },
      { q: "Do you know where ___?", o: ["is the station", "the station is", "does the station", "the station does"], a: 1, e: "Câu hỏi gián tiếp không đảo: where + S + V." },
      { q: "The manager hasn't arrived yet, ___ she?", o: ["has", "hasn't", "is", "did"], a: 0, e: "Câu phủ định → đuôi khẳng định has." },
      { q: "Could you tell me ___ the store is open on Sundays?", o: ["that", "what", "if", "which"], a: 2, e: "Câu hỏi Yes/No gián tiếp dùng if." }
    ]},
  { id: "tinh-trang", name: "Tính từ hay trạng từ?", en: "Adjective or Adverb", band: 1, wk: 4,
    theory: [["Tính từ", "Bổ nghĩa cho danh từ; đứng sau be, become, seem, remain, look, feel, sound: The plan seems reasonable."], ["Trạng từ", "Bổ nghĩa cho động từ, tính từ, trạng từ khác hoặc cả câu: She speaks clearly; a highly skilled worker."], ["Từ có hai dạng", "hard (chăm chỉ) / hardly (hầu như không) · late (muộn) / lately (gần đây) · near / nearly (gần như) · high / highly (rất)"], ["Không thêm -ly", "fast, early, hard, late vừa là tính từ vừa là trạng từ."]],
    tips: ["Sau linking verb (seem, remain, become) chọn tính từ, không chọn trạng từ.", "Trước tính từ hoặc V3 cần trạng từ: fully booked, newly opened.", "hardly, lately, nearly có nghĩa khác hẳn hard, late, near."],
    eg: [["Prices remain stable.", "Giá cả vẫn ổn định (sau remain là tính từ)."], ["The room was carefully cleaned.", "Căn phòng được dọn cẩn thận."], ["He hardly works.", "Anh ấy hầu như không làm việc."]],
    ex: [
      { q: "The new assistant seems very ___.", o: ["capable", "capably", "capability", "capabilities"], a: 0, e: "Sau seem là tính từ." },
      { q: "The hotel is ___ booked for the holidays.", o: ["full", "fully", "fullness", "fill"], a: 1, e: "Trước V3/tính từ booked cần trạng từ." },
      { q: "She has been working very ___ this month.", o: ["hard", "hardly", "harder than", "hardness"], a: 0, e: "work hard: làm chăm chỉ; hardly = hầu như không." },
      { q: "Sales have increased ___ in recent weeks.", o: ["late", "lately", "later", "latest"], a: 1, e: "lately = gần đây." }
    ]},
  { id: "md-trang-ngu", name: "Mệnh đề trạng ngữ", en: "Adverb Clauses", band: 2, wk: 6,
    theory: [["Thời gian", "when, while, before, after, until, as soon as, once, since + S + V"], ["Nguyên nhân", "because, since, as, now that + S + V"], ["Nhượng bộ", "although, though, even though, while + S + V"], ["Điều kiện", "if, unless, as long as, provided that, in case + S + V"], ["Mục đích, kết quả", "so that + S + can/will + V · so + adj + that + S + V"]],
    tips: ["Mệnh đề thời gian và điều kiện nói về tương lai dùng hiện tại đơn, không dùng will.", "Liên từ + mệnh đề; giới từ (during, despite, because of) + cụm danh từ.", "Có thể rút gọn khi cùng chủ ngữ: While waiting, he read the report."],
    eg: [["Call me as soon as you arrive.", "Gọi cho tôi ngay khi bạn đến."], ["Although it was late, they kept working.", "Dù đã muộn, họ vẫn làm việc."], ["Speak up so that everyone can hear.", "Nói to lên để mọi người nghe được."]],
    ex: [
      { q: "___ the shipment arrives, we will notify you.", o: ["During", "Once", "Despite", "Due to"], a: 1, e: "Sau là mệnh đề, nghĩa một khi → Once." },
      { q: "We will start the meeting when the director ___.", o: ["will arrive", "arrives", "arrived", "arriving"], a: 1, e: "Mệnh đề thời gian tương lai dùng hiện tại đơn." },
      { q: "___ the store was crowded, the staff remained friendly.", o: ["Despite", "Because", "Even though", "Unless"], a: 2, e: "Sau là mệnh đề, nghĩa trái ngược → Even though." },
      { q: "Please write clearly ___ we can read your address.", o: ["so that", "because of", "in order to", "although"], a: 0, e: "Mục đích + mệnh đề → so that." }
    ]},
  { id: "so-such", name: "so / such / too / enough", en: "So, Such, Too, Enough", band: 2, wk: 7,
    theory: [["so … that", "so + adj/adv + that + mệnh đề: so busy that…"], ["such … that", "such + (a/an) + adj + N + that + mệnh đề: such a busy day that…"], ["too … to", "too + adj/adv + to V: quá… đến nỗi không thể"], ["enough", "adj/adv + enough + to V · enough + N + to V"]],
    tips: ["Sau chỗ trống có danh từ → such; chỉ có tính từ → so.", "enough đứng SAU tính từ nhưng TRƯỚC danh từ.", "so many / so much + N vẫn dùng so."],
    eg: [["The box was so heavy that I couldn't lift it.", "Cái hộp nặng đến nỗi tôi không nhấc được."], ["It was such a good offer that we accepted.", "Đó là lời đề nghị tốt đến nỗi chúng tôi nhận lời."], ["The room is large enough to hold fifty people.", "Căn phòng đủ rộng để chứa năm mươi người."]],
    ex: [
      { q: "It was ___ a successful event that we will hold it again.", o: ["so", "such", "too", "very"], a: 1, e: "a + adj + N phía sau → such." },
      { q: "The print is ___ small to read.", o: ["so", "such", "too", "enough"], a: 2, e: "too + adj + to V." },
      { q: "We don't have ___ chairs for all the guests.", o: ["enough", "too", "so", "such"], a: 0, e: "enough + danh từ." },
      { q: "The line was ___ long that we left.", o: ["such", "so", "too", "enough"], a: 1, e: "so + adj + that." }
    ]},
  { id: "song-song", name: "Cấu trúc song song", en: "Parallel Structure", band: 3, wk: 9,
    theory: [["Nguyên tắc", "Các thành phần nối bằng and, or, but phải cùng dạng: danh từ với danh từ, V-ing với V-ing, to V với to V."], ["Cặp liên từ", "both A and B · either A or B · neither A nor B · not only A but also B: A và B cùng dạng."], ["So sánh", "Hai vế so sánh cùng dạng: Walking is cheaper than driving."]],
    tips: ["Thấy and / or ngay trước hoặc sau chỗ trống → nhìn dạng của từ bên kia và chọn cùng dạng.", "Trong danh sách ba thứ, cả ba cùng dạng.", "Sau to chỉ cần nhắc một lần: to plan, organize and lead."],
    eg: [["She likes reading, writing and traveling.", "Cô ấy thích đọc, viết và đi du lịch."], ["The job requires speed and accuracy.", "Công việc đòi hỏi tốc độ và sự chính xác."], ["You can pay either by cash or by card.", "Bạn có thể trả bằng tiền mặt hoặc bằng thẻ."]],
    ex: [
      { q: "The manager is responsible for hiring, training and ___ staff.", o: ["evaluate", "evaluating", "to evaluate", "evaluation of"], a: 1, e: "Song song với hiring, training → V-ing." },
      { q: "The new system is fast, reliable and ___.", o: ["afford", "affordably", "affordable", "affordability"], a: 2, e: "Song song với hai tính từ." },
      { q: "You may either call the office ___ send an e-mail.", o: ["and", "or", "nor", "but"], a: 1, e: "either … or." },
      { q: "We need to reduce costs and ___ quality.", o: ["improving", "improved", "improve", "improvement"], a: 2, e: "Song song với to reduce → động từ nguyên mẫu." }
    ]},
  { id: "md-danh-tu", name: "Mệnh đề danh từ", en: "Noun Clauses", band: 3, wk: 10,
    theory: [["that + S + V", "Làm tân ngữ sau say, think, announce, confirm, ensure: The firm announced that it would expand."], ["whether / if + S + V", "Liệu… có hay không: We don't know whether he will come."], ["Từ hỏi + S + V", "what, when, where, how, why: Please tell us when you will arrive."], ["what", "= the thing that, mệnh đề sau thiếu chủ ngữ hoặc tân ngữ: What we need is more time."]],
    tips: ["that: mệnh đề sau đầy đủ thành phần. what: mệnh đề sau thiếu một thành phần.", "Sau giới từ dùng whether, không dùng if.", "whether … or not là cụm cố định."],
    eg: [["We confirmed that the order had shipped.", "Chúng tôi xác nhận rằng đơn hàng đã được gửi."], ["Let me know whether you can attend.", "Cho tôi biết bạn có tham dự được không."], ["What she said surprised everyone.", "Điều cô ấy nói làm mọi người ngạc nhiên."]],
    ex: [
      { q: "The report shows ___ sales have doubled.", o: ["what", "that", "whether", "which"], a: 1, e: "Mệnh đề sau đầy đủ → that." },
      { q: "___ the customers want is faster delivery.", o: ["That", "What", "Whether", "Which"], a: 1, e: "Mệnh đề thiếu tân ngữ của want → What." },
      { q: "We have not decided ___ to renew the contract or not.", o: ["that", "what", "whether", "if only"], a: 2, e: "whether … or not." },
      { q: "Please let us know ___ you plan to arrive.", o: ["what", "when", "that", "which"], a: 1, e: "Hỏi về thời điểm → when." }
    ]}
);
