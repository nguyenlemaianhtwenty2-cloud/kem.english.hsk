/* Câu hỏi luyện thi bổ sung (tự soạn theo dạng đề TOEIC) */
P2.push(
  { q: "Who's going to pick up the clients from the airport?", o: ["At terminal two.", "I think Daniel offered to.", "Around six o'clock."], a: 1, t: "l-p2-wh", d: 1 },
  { q: "When does the pharmacy close on weekends?", o: ["At five, I believe.", "Next to the bakery.", "Yes, it's very close."], a: 0, t: "l-p2-wh", d: 1 },
  { q: "Where should I leave these packages?", o: ["By express mail.", "Just put them on my desk.", "They arrived yesterday."], a: 1, t: "l-p2-wh", d: 1 },
  { q: "How long will the renovation take?", o: ["About three weeks.", "On the second floor.", "It's quite long."], a: 0, t: "l-p2-wh", d: 2 },
  { q: "Would you mind turning down the air conditioner?", o: ["No, not at all.", "It's on the left.", "I turned it in already."], a: 0, t: "l-p2-request", d: 2 },
  { q: "Let's take a short break before the next session.", o: ["It broke last week.", "Good idea, I need some coffee.", "The session was useful."], a: 1, t: "l-p2-request", d: 2 },
  { q: "Did you send the invoice to the supplier?", o: ["I'll do it right after lunch.", "The voice was too quiet.", "A new supplier."], a: 0, t: "l-p2-yn", d: 2 },
  { q: "Do you want the report printed or e-mailed?", o: ["Yes, I do.", "An e-mail would be easier.", "The printer is new."], a: 1, t: "l-p2-choice", d: 2 },
  { q: "Why hasn't the shipment arrived yet?", o: ["There was a delay at customs.", "By ship.", "Yes, it has."], a: 0, t: "l-p2-wh", d: 2 },
  { q: "Who should I talk to about getting a parking permit?", o: ["The lot is full.", "Try the security office downstairs.", "It costs ten dollars."], a: 1, t: "l-p2-indirect", d: 3 },
  { q: "The new intern starts on Monday, doesn't she?", o: ["That's what I was told.", "She interned in Paris.", "Yes, on the second floor."], a: 0, t: "l-p2-yn", d: 3 },
  { q: "Is the conference room available this afternoon?", o: ["The marketing team reserved it until four.", "It's a large room.", "The conference was great."], a: 0, t: "l-p2-indirect", d: 3 }
);
P3.push(
  { id: "c4", d: 2, lines: [
      ["M", "Good morning. I'd like to rent a car for three days, starting tomorrow."],
      ["W", "Certainly. We have compact cars and vans available. The compact is forty dollars a day."],
      ["M", "The compact is fine. Does the price include insurance?"],
      ["W", "Basic insurance is included. I just need to see your driver's license and a credit card to complete the booking."]
    ],
    qs: [
      { q: "Where most likely are the speakers?", o: ["At a car rental agency", "At a repair shop", "At an airport gate", "At an insurance office"], a: 0, t: "l-p3-main" },
      { q: "What does the man ask about?", o: ["The size of the car", "The return location", "Insurance", "A discount"], a: 2, t: "l-p3-detail" },
      { q: "What does the woman ask the man to provide?", o: ["A deposit in cash", "A license and a credit card", "A confirmation number", "A home address"], a: 1, t: "l-p3-next" }
    ]},
  { id: "c5", d: 3, lines: [
      ["W", "Kevin, the sales figures for the new tablet came in. They're lower than we expected."],
      ["M", "I saw that. Customers like the design, but many say the battery doesn't last long enough."],
      ["W", "Right. The engineers say an improved battery won't be ready until autumn."],
      ["M", "Then let's offer a free portable charger with every purchase for now. I'll draft the announcement and send it to you by noon."]
    ],
    qs: [
      { q: "What problem are the speakers discussing?", o: ["A late shipment", "Disappointing sales", "A design error", "A staff shortage"], a: 1, t: "l-p3-main" },
      { q: "What do customers complain about?", o: ["The price", "The screen size", "The battery life", "The color options"], a: 2, t: "l-p3-detail" },
      { q: "What does the man say he will do?", o: ["Write an announcement", "Contact the engineers", "Lower the price", "Visit a store"], a: 0, t: "l-p3-next" }
    ]}
);
P4.push(
  { id: "k4", d: 2, kind: "Quảng cáo", text: "Are you tired of slow Internet at home? Switch to Brightwave today and enjoy speeds up to five times faster than your current service. For this month only, new customers pay no installation fee and receive the first two months at half price. Our technicians can set up your connection in under an hour. Visit our Web site or stop by any Brightwave store to sign up.",
    qs: [
      { q: "What is being advertised?", o: ["A mobile phone", "An Internet service", "A computer store", "A repair service"], a: 1, t: "l-p4-purpose" },
      { q: "What is offered to new customers this month?", o: ["A free device", "Free installation", "A longer contract", "Free repairs"], a: 1, t: "l-p4-detail" },
      { q: "How can listeners sign up?", o: ["By calling a technician", "By sending a letter", "By visiting a store or Web site", "By attending an event"], a: 2, t: "l-p4-next" }
    ]},
  { id: "k5", d: 3, kind: "Hướng dẫn tham quan", text: "Welcome to the Harlow Chocolate Factory. My name is Jenna, and I'll be your guide today. Our tour will last about forty-five minutes. We'll start in the roasting room, then move on to the packaging area. Because of safety rules, please do not touch any of the machines, and keep your phones in your bags. At the end of the tour, you'll each receive a free sample box, and you can buy more at our gift shop.",
    qs: [
      { q: "Who most likely is the speaker?", o: ["A factory manager", "A tour guide", "A shop clerk", "A safety inspector"], a: 1, t: "l-p4-speaker" },
      { q: "What are listeners asked not to do?", o: ["Take a sample", "Ask questions", "Touch the machines", "Enter the gift shop"], a: 2, t: "l-p4-detail" },
      { q: "What will listeners receive at the end?", o: ["A discount coupon", "A free sample box", "A photo", "A map"], a: 1, t: "l-p4-next" }
    ]}
);
P7.push(
  { id: "r7d", d: 2, title: "Thông báo", text: "NOTICE TO RESIDENTS OF MAPLE COURT\n\nThe water supply to Buildings A and B will be turned off on Thursday, April 18, from 9:00 A.M. to 1:00 P.M. while workers replace a section of pipe in the basement. Building C will not be affected.\n\nWe suggest that you fill several containers with water the night before. If the work is finished early, service will be restored right away. Questions may be directed to the management office at 555-0126.",
    qs: [
      { q: "What is the purpose of the notice?", o: ["To announce a rent increase", "To inform residents of a service interruption", "To introduce a new manager", "To advertise an apartment"], a: 1, t: "r-p7-main" },
      { q: "What are residents advised to do?", o: ["Store some water in advance", "Leave the building", "Call a plumber", "Move their cars"], a: 0, t: "r-p7-detail" },
      { q: "What is indicated about Building C?", o: ["It is being repaired.", "It has a new basement.", "Its water will stay on.", "It is currently empty."], a: 2, t: "r-p7-infer" }
    ]},
  { id: "r7e", d: 3, title: "Chuỗi tin nhắn", text: "Olivia Grant (10:02 A.M.): Hi Sam. I'm at the print shop. They say the banners for Saturday's fair won't be ready until Monday.\n\nSam Ortiz (10:04 A.M.): That's too late. Can they rush the order?\n\nOlivia Grant (10:07 A.M.): Only two of the five. It would cost an extra thirty dollars.\n\nSam Ortiz (10:08 A.M.): Go for it. Two is enough for the entrance. We can use last year's signs inside.\n\nOlivia Grant (10:09 A.M.): Will do. I'll pick them up Friday afternoon.",
    qs: [
      { q: "What problem does Ms. Grant report?", o: ["An order will be late.", "A fair was canceled.", "A shop is closed.", "A price was wrong."], a: 0, t: "r-p7-main" },
      { q: "At 10:08 A.M., what does Mr. Ortiz mean when he writes, \"Go for it\"?", o: ["He wants Ms. Grant to leave the shop.", "He approves paying for the rush order.", "He will go to the fair early.", "He wants all five banners."], a: 1, t: "r-p7-infer" },
      { q: "When will Ms. Grant collect the banners?", o: ["On Thursday", "On Friday", "On Saturday", "On Monday"], a: 1, t: "r-p7-detail" }
    ]}
);
