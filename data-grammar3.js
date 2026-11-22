/* Chủ điểm ngữ pháp bổ sung đợt 2 */
GRAMMAR.push(
  { id: "so-huu", name: "Sở hữu cách & danh từ ghép", en: "Possessives & Compound Nouns", band: 0, wk: 0,
    theory: [["'s với người", "the manager's office, Ms. Lee's report. Danh từ số nhiều có s chỉ thêm dấu ': the employees' lounge."], ["of với vật", "the end of the month, the cost of the repairs."], ["Danh từ ghép", "Danh từ đứng trước bổ nghĩa cho danh từ sau và không thêm s: a sales report, a customer service desk, a job interview."]],
    tips: ["Chỗ trống đứng trước một danh từ khác và đáp án có danh từ → có thể là danh từ ghép.", "Số đếm + danh từ ghép không thêm s: a three-day trip, a ten-page report.", "Danh từ ghép hay gặp: safety regulations, sales figures, application form, delivery date."],
    eg: [["Please sign the application form.", "Vui lòng ký vào mẫu đơn đăng ký."], ["The employees' lounge is on the second floor.", "Phòng nghỉ của nhân viên ở tầng hai."], ["We took a two-day course.", "Chúng tôi học một khóa hai ngày."]],
    ex: [
      { q: "Please send your ___ form by Friday.", o: ["apply", "application", "applied", "applicable"], a: 1, e: "Danh từ ghép application form." },
      { q: "The ___ office is next to the elevator.", o: ["manager", "manager's", "managers", "managing of"], a: 1, e: "Văn phòng của quản lý → manager's." },
      { q: "We attended a ___ workshop last week.", o: ["three-days", "three-day", "three day's", "threes-day"], a: 1, e: "Số đếm + danh từ làm tính từ không thêm s." }
    ]},
  { id: "bat-dinh", name: "Đại từ bất định & other / another", en: "Indefinite Pronouns", band: 1, wk: 3,
    theory: [["some / any", "some trong câu khẳng định và lời mời; any trong câu phủ định, câu hỏi."], ["every-, some-, any-, no-", "everyone, someone, anything, nothing… đi với động từ số ít."], ["another", "một cái khác (số ít, chưa xác định): another copy."], ["other / others", "other + danh từ số nhiều: other options · others = những cái khác (không có danh từ)."], ["the other / the others", "cái còn lại / những cái còn lại (đã xác định)."]],
    tips: ["another + danh từ số ít; other + danh từ số nhiều.", "Everyone, each, nobody → động từ số ít.", "each other / one another: lẫn nhau."],
    eg: [["Would you like another cup?", "Bạn có muốn thêm một cốc nữa không?"], ["Some staff work here; others work from home.", "Một số nhân viên làm ở đây; những người khác làm tại nhà."], ["Everyone has received the memo.", "Mọi người đã nhận được bản ghi nhớ."]],
    ex: [
      { q: "This printer is broken. Please use ___ one.", o: ["other", "another", "others", "the others"], a: 1, e: "Một cái khác, số ít → another." },
      { q: "Everyone in the department ___ invited.", o: ["are", "is", "were", "have been"], a: 1, e: "Everyone đi với động từ số ít." },
      { q: "Some customers pay by card; ___ prefer cash.", o: ["other", "another", "others", "the other"], a: 2, e: "Đứng một mình, số nhiều → others." }
    ]},
  { id: "menh-lenh", name: "Câu mệnh lệnh & lời đề nghị", en: "Imperatives & Suggestions", band: 0, wk: 1,
    theory: [["Mệnh lệnh", "Bắt đầu bằng động từ nguyên mẫu: Close the door. Phủ định: Do not / Don't + V. Lịch sự: Please + V."], ["Đề nghị cùng làm", "Let's + V · Why don't we + V? · How about + V-ing? · Shall we + V?"], ["Nhờ vả", "Could you + V? · Would you mind + V-ing? · Can you + V?"]],
    tips: ["Đầu câu là chỗ trống, sau đó là tân ngữ và không có chủ ngữ → chọn động từ nguyên mẫu.", "How about / What about + V-ing; Why don't we + V nguyên mẫu.", "Part 2: đáp lại lời đề nghị bằng That's a good idea / Sure / I'd rather not."],
    eg: [["Please turn off your phone.", "Vui lòng tắt điện thoại."], ["Let's meet at ten.", "Hãy gặp nhau lúc mười giờ."], ["How about taking a taxi?", "Đi taxi thì sao?"]],
    ex: [
      { q: "Please ___ the form before you leave.", o: ["complete", "completes", "completing", "completed"], a: 0, e: "Câu mệnh lệnh dùng động từ nguyên mẫu." },
      { q: "How about ___ the meeting to Friday?", o: ["move", "moving", "to move", "moved"], a: 1, e: "How about + V-ing." },
      { q: "Why don't we ___ a short break?", o: ["take", "taking", "to take", "took"], a: 0, e: "Why don't we + V nguyên mẫu." }
    ]},
  { id: "used-to", name: "used to / be used to / get used to", en: "Used to", band: 2, wk: 5,
    theory: [["used to + V", "Thói quen hoặc trạng thái trong quá khứ, nay không còn: She used to work in sales."], ["be used to + V-ing / N", "Đã quen với: He is used to working at night."], ["get used to + V-ing / N", "Dần quen với: You will get used to the new system."]],
    tips: ["used to + V nguyên mẫu; be/get used to + V-ing.", "Phủ định và câu hỏi: didn't use to, Did you use to…?", "Đừng nhầm với be used to + V (bị động của use): This tool is used to cut metal."],
    eg: [["I used to take the bus.", "Trước đây tôi hay đi xe buýt."], ["She is used to giving presentations.", "Cô ấy đã quen với việc thuyết trình."], ["You'll get used to it.", "Bạn sẽ quen thôi."]],
    ex: [
      { q: "Mr. Park used to ___ in the Tokyo office.", o: ["work", "working", "worked", "works"], a: 0, e: "used to + V nguyên mẫu." },
      { q: "The new staff are not used to ___ so early.", o: ["start", "starting", "started", "starts"], a: 1, e: "be used to + V-ing." },
      { q: "It took a month to get used to ___ the software.", o: ["use", "using", "used", "be used"], a: 1, e: "get used to + V-ing." }
    ]},
  { id: "wish", name: "wish / would rather / it's time", en: "Wish & Would Rather", band: 3, wk: 9,
    theory: [["wish về hiện tại", "wish + S + V quá khứ (were): I wish I had more time."], ["wish về quá khứ", "wish + S + had + V3: I wish I had applied earlier."], ["would rather", "would rather + V (than + V) · would rather + S + V quá khứ."], ["it's time", "It's (high) time + S + V quá khứ: It's time we left."]],
    tips: ["Sau wish lùi một thì so với thực tế.", "would rather + V nguyên mẫu, không có to.", "prefer + V-ing / to V; would rather + V."],
    eg: [["I wish the office were closer.", "Ước gì văn phòng gần hơn."], ["I'd rather stay home tonight.", "Tối nay tôi thích ở nhà hơn."], ["It's time we updated the system.", "Đã đến lúc chúng ta cập nhật hệ thống."]],
    ex: [
      { q: "I wish I ___ more experience in marketing.", o: ["have", "had", "will have", "having"], a: 1, e: "wish về hiện tại + V quá khứ." },
      { q: "I would rather ___ by train than drive.", o: ["go", "to go", "going", "went"], a: 0, e: "would rather + V nguyên mẫu." },
      { q: "She wishes she ___ the earlier flight yesterday.", o: ["takes", "took", "had taken", "would take"], a: 2, e: "wish về quá khứ + had + V3." }
    ]},
  { id: "bi-dong-2", name: "Bị động nâng cao", en: "Advanced Passive", band: 3, wk: 10,
    theory: [["It is said that…", "It is said / reported / expected + that + mệnh đề."], ["S + be + V3 + to V", "The company is expected to grow · He is said to be an expert."], ["be supposed to", "be supposed to + V: được cho là, có nhiệm vụ phải."], ["Bị động với hai tân ngữ", "She was given a bonus · A bonus was given to her."], ["need + V-ing", "The printer needs repairing = needs to be repaired."]],
    tips: ["be expected / required / scheduled / supposed + to V rất hay ra ở Part 5.", "Sau need, vật làm chủ ngữ → V-ing hoặc to be V3.", "Giới từ giữ nguyên sau động từ bị động: The issue was dealt with."],
    eg: [["Sales are expected to rise.", "Doanh số được dự đoán sẽ tăng."], ["You are supposed to sign in.", "Bạn có nhiệm vụ phải ký tên khi vào."], ["The roof needs repairing.", "Mái nhà cần được sửa."]],
    ex: [
      { q: "The new store is expected ___ in May.", o: ["open", "to open", "opening", "opened"], a: 1, e: "be expected + to V." },
      { q: "All visitors are required ___ a badge.", o: ["wear", "wearing", "to wear", "worn"], a: 2, e: "be required + to V." },
      { q: "The copier needs ___ before the meeting.", o: ["fix", "fixing", "fixed", "to fix"], a: 1, e: "Vật + need + V-ing." }
    ]},
  { id: "so-sanh-2", name: "So sánh nâng cao", en: "Advanced Comparisons", band: 3, wk: 11,
    theory: [["Càng… càng", "The + so sánh hơn + S + V, the + so sánh hơn + S + V."], ["Gấp bao nhiêu lần", "twice / three times + as + adj + as."], ["as … as possible", "as soon as possible, as quickly as possible."], ["So sánh với số lượng", "as many + N đếm được + as · as much + N không đếm được + as."], ["Nhất trong số", "one of the + so sánh nhất + N số nhiều · the second largest."]],
    tips: ["Nhấn mạnh so sánh hơn: much, far, even, considerably. Nhấn mạnh so sánh nhất: by far.", "the same + N + as; similar to; different from.", "prefer A to B; superior / inferior to (không dùng than)."],
    eg: [["The sooner we start, the better.", "Chúng ta bắt đầu càng sớm càng tốt."], ["This model is twice as fast as the old one.", "Mẫu này nhanh gấp đôi mẫu cũ."], ["It is by far the best offer.", "Đó rõ ràng là đề nghị tốt nhất."]],
    ex: [
      { q: "The more we advertise, the ___ customers we get.", o: ["many", "more", "most", "much"], a: 1, e: "The more…, the more…" },
      { q: "The new office is twice as ___ as the old one.", o: ["large", "larger", "largest", "more large"], a: 0, e: "as + tính từ nguyên mẫu + as." },
      { q: "Our service is superior ___ that of our competitors.", o: ["than", "to", "from", "with"], a: 1, e: "superior to." }
    ]},
  { id: "there-it", name: "There is / It is", en: "There & It", band: 0, wk: 0,
    theory: [["There is / are", "Nói có cái gì ở đâu. Động từ chia theo danh từ phía sau: There is a problem · There are two problems."], ["It làm chủ ngữ giả", "It is + adj + to V: It is important to arrive early."], ["It chỉ thời gian, thời tiết, khoảng cách", "It is ten o'clock · It is raining · It is two kilometers."], ["It takes", "It takes + thời gian + to V: It takes an hour to get there."]],
    tips: ["There + be + danh từ; It + be + tính từ.", "There has been / There will be cũng chia theo danh từ phía sau.", "It is + adj + that + mệnh đề: It is clear that sales fell."],
    eg: [["There are three printers on this floor.", "Tầng này có ba máy in."], ["It is easy to use.", "Nó dễ sử dụng."], ["It takes two days to deliver.", "Mất hai ngày để giao hàng."]],
    ex: [
      { q: "___ are several reasons for the delay.", o: ["It", "There", "They", "These"], a: 1, e: "There are + danh từ số nhiều." },
      { q: "___ is necessary to book in advance.", o: ["There", "It", "That", "This"], a: 1, e: "It is + adj + to V." },
      { q: "There ___ a meeting at three o'clock.", o: ["are", "is", "have", "be"], a: 1, e: "a meeting số ít → is." }
    ]}
);
