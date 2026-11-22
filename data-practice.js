/* Dữ liệu luyện nghe – đọc – dịch – shadowing */

/* Part 2: nghe câu hỏi + 3 câu trả lời, chọn câu đáp phù hợp */
window.P2 = [
  { q: "Where is the staff meeting being held?", o: ["In the conference room on the fifth floor.", "At two o'clock this afternoon.", "Yes, I'll be there."], a: 0, t: "l-p2-wh", d: 1 },
  { q: "When will the new printer be delivered?", o: ["It prints in color.", "Sometime on Thursday.", "To the main office."], a: 1, t: "l-p2-wh", d: 1 },
  { q: "Who's in charge of the budget report?", o: ["About twenty pages.", "It's due next week.", "Ms. Alvarez is handling it."], a: 2, t: "l-p2-wh", d: 1 },
  { q: "Why was the flight delayed?", o: ["Because of the snowstorm.", "Gate fourteen.", "A round-trip ticket."], a: 0, t: "l-p2-wh", d: 1 },
  { q: "Could you help me move these boxes?", o: ["They're in the storage room.", "Sure, where should I put them?", "I moved here last year."], a: 1, t: "l-p2-request", d: 2 },
  { q: "Why don't we order lunch for the team?", o: ["That's a great idea.", "Because I was hungry.", "The lunch menu is new."], a: 0, t: "l-p2-request", d: 2 },
  { q: "Haven't you finished the sales presentation yet?", o: ["The sales were excellent.", "I'm working on the last slide now.", "Yes, it was presented."], a: 1, t: "l-p2-yn", d: 2 },
  { q: "Would you rather meet on Monday or Tuesday?", o: ["Either day works for me.", "Yes, I would.", "We met last week."], a: 0, t: "l-p2-choice", d: 2 },
  { q: "The quarterly report is due tomorrow, isn't it?", o: ["I reported it to the manager.", "Actually, the deadline was extended.", "Every three months."], a: 1, t: "l-p2-yn", d: 3 },
  { q: "How often does the shuttle run to the airport?", o: ["About forty minutes.", "Every half hour.", "From the hotel lobby."], a: 1, t: "l-p2-wh", d: 2 },
  { q: "Where can I find the updated price list?", o: ["Mr. Lee just e-mailed it to everyone.", "The prices went up.", "Yes, I found it."], a: 0, t: "l-p2-indirect", d: 3 },
  { q: "Should I call the client now or after lunch?", o: ["She's in a meeting until two.", "I'll have a sandwich.", "Yes, you should."], a: 0, t: "l-p2-indirect", d: 3 }
];

/* Part 3: hội thoại 2 người, 3 câu hỏi */
window.P3 = [
  { id: "c1", d: 1, lines: [
      ["W", "Hi, I'm calling about the desk I ordered from your Web site last week. It was supposed to arrive yesterday, but I haven't received it."],
      ["M", "I'm sorry about that. Can I have your order number, please?"],
      ["W", "Sure, it's 4-5-8-2-1."],
      ["M", "Thank you. It looks like the delivery truck had a mechanical problem. Your desk will be delivered tomorrow morning. I'll also give you a ten percent discount for the inconvenience."]
    ],
    qs: [
      { q: "Why is the woman calling?", o: ["To order a new desk", "To ask about a late delivery", "To change her address", "To cancel an order"], a: 1, t: "l-p3-main" },
      { q: "What caused the problem?", o: ["A wrong address", "A shortage of items", "A vehicle problem", "Bad weather"], a: 2, t: "l-p3-detail" },
      { q: "What does the man offer to do?", o: ["Give a discount", "Send a new catalog", "Refund the shipping fee", "Call back later"], a: 0, t: "l-p3-next" }
    ]},
  { id: "c2", d: 2, lines: [
      ["M", "Linda, did you see the e-mail about the client visit on Friday? They want a tour of our factory."],
      ["W", "Yes, but Friday is a problem. The assembly line will be shut down that day for its monthly inspection."],
      ["M", "Hmm, that's not ideal. They really want to see the machines running."],
      ["W", "Why don't I contact them and suggest Thursday afternoon instead? I'll also book a table at the Italian restaurant for lunch."]
    ],
    qs: [
      { q: "What are the speakers mainly discussing?", o: ["A new product design", "A client's visit", "A job interview", "A machine repair"], a: 1, t: "l-p3-main" },
      { q: "Why is Friday a problem?", o: ["The office will be closed.", "The woman will be traveling.", "An inspection is scheduled.", "The restaurant is fully booked."], a: 2, t: "l-p3-detail" },
      { q: "What will the woman probably do next?", o: ["Contact the clients", "Repair a machine", "Cancel a reservation", "Write a report"], a: 0, t: "l-p3-next" }
    ]},
  { id: "c3", d: 3, lines: [
      ["W", "Paul, how are the preparations for the training workshop going?"],
      ["M", "Mostly fine. Thirty people have signed up, but the room we booked only holds twenty-five."],
      ["W", "Oh, I see. The auditorium on the second floor is free that day, but the projector there isn't working."],
      ["M", "That's okay. I can bring my laptop and use the large monitor instead. I'll e-mail the participants about the room change this afternoon."]
    ],
    qs: [
      { q: "What problem does the man mention?", o: ["A speaker canceled.", "A room is too small.", "The budget was reduced.", "Registration closed early."], a: 1, t: "l-p3-detail" },
      { q: "What does the woman imply about the auditorium?", o: ["It is too expensive.", "It has a broken projector.", "It is being renovated.", "It is far from the office."], a: 1, t: "l-p3-intent" },
      { q: "What will the man do this afternoon?", o: ["Repair some equipment", "Buy a new laptop", "Send an e-mail", "Book another room"], a: 2, t: "l-p3-next" }
    ]}
];

/* Part 4: bài nói 1 người, 3 câu hỏi */
window.P4 = [
  { id: "k1", d: 1, kind: "Thông báo", text: "Attention, shoppers. Thank you for shopping at Greenway Market. We'd like to remind you that our store will be closing in fifteen minutes. Please bring your final purchases to the registers at the front of the store. Also, don't forget that this weekend, all fresh fruit and vegetables are twenty percent off. We look forward to seeing you again soon.",
    qs: [
      { q: "Where is the announcement being made?", o: ["At a bank", "At a supermarket", "At an airport", "At a library"], a: 1, t: "l-p4-speaker" },
      { q: "What will happen in fifteen minutes?", o: ["A sale will begin.", "The store will close.", "A delivery will arrive.", "A new register will open."], a: 1, t: "l-p4-detail" },
      { q: "What is on sale this weekend?", o: ["Fresh produce", "Frozen food", "Kitchen supplies", "Bakery items"], a: 0, t: "l-p4-detail" }
    ]},
  { id: "k2", d: 2, kind: "Trích đoạn cuộc họp", text: "Good morning, everyone. Before we start, I have some news. As you know, our customer service team has been receiving a lot of calls about the new billing system. To reduce wait times, we're hiring three additional representatives next month. In the meantime, I'd like each of you to spend one hour a day helping with the phones. I'll post a schedule on the board after this meeting, so please sign up for a time slot that works for you.",
    qs: [
      { q: "What problem does the speaker mention?", o: ["A billing system is too expensive.", "Customers are waiting too long.", "Several employees have resigned.", "A phone line is broken."], a: 1, t: "l-p4-purpose" },
      { q: "What are the listeners asked to do?", o: ["Interview new applicants", "Update customer accounts", "Help answer phone calls", "Attend a training session"], a: 2, t: "l-p4-detail" },
      { q: "What will the speaker do after the meeting?", o: ["Post a schedule", "Call a client", "Hire a manager", "Fix the system"], a: 0, t: "l-p4-next" }
    ]},
  { id: "k3", d: 3, kind: "Tin nhắn thoại", text: "Hi, this is Mark Benson from Brightline Printing, returning your call about the brochures for your trade show. Unfortunately, the glossy paper you selected is out of stock until next Wednesday, which would be too late for your event. I can print the brochures on our matte paper instead at no extra charge, and they would still be ready by Friday. Please call me back at 555-0192 to let me know which option you prefer.",
    qs: [
      { q: "Who most likely is the speaker?", o: ["A trade show organizer", "A printing company employee", "A graphic designer", "A delivery driver"], a: 1, t: "l-p4-speaker" },
      { q: "What problem does the speaker mention?", o: ["A design contains errors.", "A price has increased.", "Some paper is unavailable.", "An event was postponed."], a: 2, t: "l-p4-detail" },
      { q: "What does the speaker offer?", o: ["To use a different material", "To deliver the order early", "To reduce the price", "To redesign the brochure"], a: 0, t: "l-p4-purpose" }
    ]}
];

/* Part 6: điền vào đoạn văn. {1}..{4} là chỗ trống */
window.P6 = [
  { id: "r6a", d: 2, title: "E-mail", text: "To: All staff\nFrom: Facilities Department\nSubject: Parking lot repairs\n\nPlease be aware that the east parking lot {1} from Monday, March 4, to Friday, March 8. During this time, the lot will be repaved and new lights will be installed. {2}, employees who normally park in the east lot should use the visitor lot on Oak Street. {3}. We apologize for any {4} this may cause.",
    qs: [
      { q: "(1)", o: ["closes", "will be closed", "was closed", "has closed"], a: 1, e: "Sự việc tương lai (Monday, March 4), bãi xe bị đóng → will be closed.", t: "bi-dong" },
      { q: "(2)", o: ["However", "Therefore", "Otherwise", "Instead of"], a: 1, e: "Kết quả của việc sửa bãi xe → Therefore.", t: "lien-tu" },
      { q: "(3)", o: ["The new lights were very expensive.", "A free shuttle will run from that lot to the main entrance every ten minutes.", "Oak Street is closed to traffic this week.", "Employees are not allowed to park on weekends."], a: 1, e: "Câu chèn phải tiếp nối ý bãi xe Oak Street và hợp logic → shuttle từ bãi đó.", t: "r-p6-sentence" },
      { q: "(4)", o: ["inconvenience", "inconvenient", "inconveniently", "inconvenienced"], a: 0, e: "any + N → inconvenience.", t: "tu-loai" }
    ]},
  { id: "r6b", d: 3, title: "Thông báo", text: "Harbor City Library is pleased to announce the {1} of its newly renovated reading room. The room now features comfortable seating, faster Wi-Fi, and twenty additional computer stations. {2} the renovation was completed ahead of schedule, the library will host a celebration on Saturday, June 15. {3}. Visitors {4} the event will receive a free tote bag while supplies last.",
    qs: [
      { q: "(1)", o: ["open", "opened", "opening", "opens"], a: 2, e: "the + ___ + of → danh từ opening.", t: "tu-loai" },
      { q: "(2)", o: ["Because", "Despite", "Due to", "Unless"], a: 0, e: "Sau là mệnh đề, nghĩa nguyên nhân → Because.", t: "lien-tu" },
      { q: "(3)", o: ["The library will be closed for renovation.", "Activities will include a children's story hour and a talk by a local author.", "Wi-Fi is not available in the building.", "Library cards must be renewed every year."], a: 1, e: "Câu chèn mô tả buổi lễ vừa nhắc đến.", t: "r-p6-sentence" },
      { q: "(4)", o: ["attend", "attending", "attended", "to attend"], a: 1, e: "Rút gọn MĐQH chủ động (who attend) → attending.", t: "phan-tu" }
    ]}
];

/* Part 7: đọc hiểu */
window.P7 = [
  { id: "r7a", d: 1, title: "Quảng cáo", text: "SUNRISE FITNESS CENTER\nGrand Opening Special!\n\nJoin before July 31 and pay only $25 per month for the first six months (regular price: $40).\n• Open 24 hours a day, 7 days a week\n• Free parking for members\n• Group classes in yoga, cycling, and dance\n\nVisit us at 120 Pine Avenue or sign up online at www.sunrisefit.com.",
    qs: [
      { q: "What is being advertised?", o: ["A sports store", "A fitness center", "A dance school", "A parking garage"], a: 1, t: "r-p7-main" },
      { q: "How much will new members pay per month at first?", o: ["$15", "$25", "$40", "$60"], a: 1, t: "r-p7-detail" },
      { q: "What is NOT mentioned as a feature?", o: ["Free parking", "Group classes", "Personal trainers", "24-hour access"], a: 2, t: "r-p7-not" }
    ]},
  { id: "r7b", d: 2, title: "E-mail", text: "To: Rachel Kim\nFrom: David Moreno\nSubject: Your interview\n\nDear Ms. Kim,\n\nThank you for applying for the position of marketing coordinator at Velta Foods. We were impressed by your résumé and would like to invite you for an interview on Tuesday, May 9, at 10:00 a.m. The interview will last about an hour and will include a short presentation. Please prepare a five-minute talk on a recent advertising campaign that you admire.\n\nKindly confirm your availability by replying to this e-mail by Friday.\n\nBest regards,\nDavid Moreno\nHuman Resources Manager",
    qs: [
      { q: "Why did Mr. Moreno write the e-mail?", o: ["To offer a job", "To schedule an interview", "To request a résumé", "To describe a product"], a: 1, t: "r-p7-main" },
      { q: "What is Ms. Kim asked to prepare?", o: ["A list of references", "A writing sample", "A short presentation", "A budget proposal"], a: 2, t: "r-p7-detail" },
      { q: "The word \"admire\" in paragraph 1 is closest in meaning to", o: ["respect", "watch", "create", "question"], a: 0, t: "r-p7-synonym" }
    ]},
  { id: "r7c", d: 3, title: "Bài báo", text: "LOCAL BUSINESS NEWS\n\nTANNER BAY — Coastal Coffee, the popular café chain founded by Elena Ruiz eight years ago, announced on Monday that it will open its first location outside the state next spring. The new café will be in Portland, where the company has already been selling its packaged coffee beans in grocery stores for two years.\n\n\"Customers in Portland have been asking us to open a café there for a long time,\" said Ms. Ruiz. \"Strong sales of our beans showed us that there is real demand.\"\n\nThe Portland café will be the company's largest, with seating for 80 customers and a small roasting area where visitors can watch beans being roasted. Coastal Coffee currently operates twelve cafés, all in the Tanner Bay area.",
    qs: [
      { q: "What is the article mainly about?", o: ["A new coffee product", "A company's expansion", "A change in leadership", "A grocery store opening"], a: 1, t: "r-p7-main" },
      { q: "What is suggested about Coastal Coffee?", o: ["It was founded in Portland.", "Its products are already known in Portland.", "It plans to close some cafés.", "It recently changed its name."], a: 1, t: "r-p7-infer" },
      { q: "How many cafés does Coastal Coffee operate now?", o: ["Eight", "Twelve", "Thirteen", "Eighty"], a: 1, t: "r-p7-detail" }
    ]}
];

/* Luyện dịch: lv 1 cơ bản, 2 trung cấp, 3 nâng cao. kw = từ khóa phải có trong bản dịch Anh */
window.TRANSLATE = [
  { id: "d1", lv: 1, vi: "Cuộc họp sẽ bắt đầu lúc 9 giờ sáng mai.", en: "The meeting will start at 9 a.m. tomorrow.", kw: ["meeting", "9", "tomorrow"] },
  { id: "d2", lv: 1, vi: "Vui lòng nộp báo cáo trước thứ Sáu.", en: "Please submit the report by Friday.", kw: ["submit", "report", "friday"] },
  { id: "d3", lv: 1, vi: "Tôi muốn đặt bàn cho bốn người.", en: "I'd like to make a reservation for four people.", kw: ["reservation", "four"] },
  { id: "d4", lv: 1, vi: "Chuyến bay bị hoãn vì thời tiết xấu.", en: "The flight was delayed because of bad weather.", kw: ["flight", "delayed", "weather"] },
  { id: "d5", lv: 1, vi: "Đồng nghiệp của tôi đang làm việc tại văn phòng chi nhánh.", en: "My colleague is working at the branch office.", kw: ["colleague", "branch", "office"] },
  { id: "d6", lv: 2, vi: "Tất cả nhân viên phải tham dự buổi đào tạo an toàn vào tuần tới.", en: "All employees must attend the safety training session next week.", kw: ["employees", "attend", "safety", "training"] },
  { id: "d7", lv: 2, vi: "Chúng tôi đã nhận được nhiều lời phàn nàn về dịch vụ giao hàng.", en: "We have received many complaints about the delivery service.", kw: ["received", "complaints", "delivery"] },
  { id: "d8", lv: 2, vi: "Công ty sẽ hoàn trả chi phí đi lại cho nhân viên.", en: "The company will reimburse employees for travel expenses.", kw: ["reimburse", "travel", "expenses"] },
  { id: "d9", lv: 2, vi: "Sản phẩm mới sẽ được ra mắt vào mùa xuân năm sau.", en: "The new product will be launched next spring.", kw: ["product", "launched", "spring"] },
  { id: "d10", lv: 2, vi: "Mặc dù giá cao, sản phẩm này vẫn bán rất chạy.", en: "Despite its high price, this product still sells very well.", kw: ["despite", "price", "sells"] },
  { id: "d11", lv: 3, vi: "Nếu quý khách có bất kỳ câu hỏi nào, xin vui lòng liên hệ bộ phận chăm sóc khách hàng.", en: "Should you have any questions, please contact our customer service department.", kw: ["questions", "contact", "customer service"] },
  { id: "d12", lv: 3, vi: "Những ứng viên đủ điều kiện sẽ được liên hệ để phỏng vấn trong vòng hai tuần.", en: "Qualified candidates will be contacted for an interview within two weeks.", kw: ["qualified", "contacted", "interview", "within"] },
  { id: "d13", lv: 3, vi: "Hợp đồng phải được ký trước khi dự án có thể bắt đầu.", en: "The contract must be signed before the project can begin.", kw: ["contract", "signed", "before", "project"] },
  { id: "d14", lv: 3, vi: "Doanh thu đã tăng đáng kể kể từ khi chiến dịch quảng cáo được triển khai.", en: "Revenue has increased significantly since the advertising campaign was launched.", kw: ["revenue", "increased", "since", "campaign"] },
  { id: "d15", lv: 3, vi: "Ban quản lý đề nghị rằng mỗi phòng ban cắt giảm 10% ngân sách.", en: "The management recommended that each department reduce its budget by 10 percent.", kw: ["recommended", "department", "reduce", "budget"] },
  { id: "e1", lv: 1, dir: "en", en: "The store is closed for renovation.", vi: "Cửa hàng đóng cửa để sửa sang." },
  { id: "e2", lv: 1, dir: "en", en: "Please keep your receipt.", vi: "Vui lòng giữ lại biên lai của bạn." },
  { id: "e3", lv: 2, dir: "en", en: "The shipment is expected to arrive ahead of schedule.", vi: "Lô hàng dự kiến sẽ đến sớm hơn kế hoạch." },
  { id: "e4", lv: 2, dir: "en", en: "Employees are eligible for paid leave after six months.", vi: "Nhân viên đủ điều kiện nghỉ phép có lương sau sáu tháng." },
  { id: "e5", lv: 3, dir: "en", en: "In light of recent feedback, we have revised our return policy accordingly.", vi: "Dựa trên các phản hồi gần đây, chúng tôi đã điều chỉnh chính sách đổi trả cho phù hợp." },
  { id: "e6", lv: 3, dir: "en", en: "Notwithstanding the delays, the merger was completed successfully.", vi: "Bất chấp những sự chậm trễ, việc sáp nhập đã hoàn tất thành công." }
];

/* Shadowing: lv 1 câu ngắn, 2 câu dài, 3 đoạn Part 4 */
window.SHADOW = [
  { id: "s1", lv: 1, en: "A man is pouring coffee into a cup.", vi: "Một người đàn ông đang rót cà phê vào cốc." },
  { id: "s2", lv: 1, en: "Where is the nearest post office?", vi: "Bưu điện gần nhất ở đâu?" },
  { id: "s3", lv: 1, en: "The meeting has been moved to Thursday.", vi: "Cuộc họp đã được dời sang thứ Năm." },
  { id: "s4", lv: 1, en: "Could you send me the file by noon?", vi: "Bạn có thể gửi tôi tệp trước buổi trưa không?" },
  { id: "s5", lv: 1, en: "Boxes have been stacked against the wall.", vi: "Những cái hộp đã được xếp chồng sát tường." },
  { id: "s6", lv: 2, en: "I'm calling to confirm your appointment with Dr. Lee on Monday at ten.", vi: "Tôi gọi để xác nhận cuộc hẹn của bạn với bác sĩ Lee lúc 10 giờ thứ Hai." },
  { id: "s7", lv: 2, en: "Unfortunately, the item you ordered is currently out of stock.", vi: "Rất tiếc, món hàng bạn đặt hiện đang hết." },
  { id: "s8", lv: 2, en: "Why don't we ask the caterer to add a few vegetarian dishes?", vi: "Sao chúng ta không nhờ bên cung cấp đồ ăn thêm vài món chay?" },
  { id: "s9", lv: 2, en: "The new software will be installed on all computers over the weekend.", vi: "Phần mềm mới sẽ được cài trên tất cả máy tính vào cuối tuần." },
  { id: "s10", lv: 2, en: "Please remember to sign up for the workshop before Friday.", vi: "Hãy nhớ đăng ký hội thảo trước thứ Sáu." },
  { id: "s11", lv: 3, en: "Attention, passengers. Flight 237 to Tokyo has been delayed due to bad weather. The new departure time is 6:45 p.m. We apologize for the inconvenience.", vi: "Hành khách chú ý. Chuyến bay 237 đi Tokyo bị hoãn do thời tiết xấu. Giờ khởi hành mới là 6:45 tối. Chúng tôi xin lỗi vì sự bất tiện." },
  { id: "s12", lv: 3, en: "Welcome to today's workshop. Before we begin, please make sure you have a copy of the handout. We'll take a short break at eleven, and lunch will be served in the main hall.", vi: "Chào mừng đến với hội thảo hôm nay. Trước khi bắt đầu, hãy chắc rằng bạn có tài liệu phát tay. Chúng ta sẽ nghỉ ngắn lúc 11 giờ và bữa trưa được phục vụ ở sảnh chính." },
  { id: "s13", lv: 3, en: "Thank you for calling Greenfield Bank. Our offices are currently closed. Our regular business hours are Monday through Friday, from nine a.m. to five p.m.", vi: "Cảm ơn quý khách đã gọi đến Ngân hàng Greenfield. Văn phòng hiện đã đóng cửa. Giờ làm việc thông thường là từ thứ Hai đến thứ Sáu, 9 giờ sáng đến 5 giờ chiều." }
];

window.QUOTES = [
  ["Small steps every day add up to big results.", "Mỗi ngày một bước nhỏ sẽ thành kết quả lớn."],
  ["The expert in anything was once a beginner.", "Chuyên gia nào cũng từng là người mới bắt đầu."],
  ["Learning never exhausts the mind.", "Học không bao giờ làm tâm trí cạn kiệt."],
  ["It always seems impossible until it's done.", "Mọi thứ luôn có vẻ bất khả thi cho đến khi hoàn thành."],
  ["Practice makes progress.", "Luyện tập tạo nên tiến bộ."],
  ["Don't watch the clock; do what it does. Keep going.", "Đừng nhìn đồng hồ; hãy làm như nó. Cứ tiếp tục đi."],
  ["Success is the sum of small efforts, repeated day in and day out.", "Thành công là tổng của những nỗ lực nhỏ, lặp lại mỗi ngày."]
];
