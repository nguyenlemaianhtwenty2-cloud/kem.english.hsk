/* Bộ từ mở rộng đợt 3. Mỗi dòng: từ|loại|nghĩa|ví dụ */
(function () {
  const add = (id, group, band, name, en, text) => VOCAB.push({ id, group, band, name, en, x: 1, words: text.trim().split("\n").map(l => { const [w, pos, vi, ex] = l.trim().split("|"); return [w, "", pos, vi, ex]; }) });
  add("y-clothes", "topic", 0, "Quần áo & phụ kiện", "Clothing", `
uniform|n.|đồng phục|All staff must wear a uniform.
jacket|n.|áo khoác|He left his jacket in the meeting room.
casual|adj.|thường ngày, thoải mái|Casual clothes are allowed on Fridays.
formal|adj.|trang trọng|The dinner requires formal wear.
fit|v.|vừa vặn|These shoes don't fit me.
fabric|n.|vải|The fabric is soft and light.
sleeve|n.|tay áo|The shirt has short sleeves.
accessory|n.|phụ kiện|The shop sells bags and other accessories.
wear|v.|mặc, đeo|She is wearing a name badge.
tailor|n.|thợ may|The tailor shortened the trousers.`);
  add("y-home", "topic", 0, "Nhà cửa & đồ gia dụng", "Household", `
appliance|n.|thiết bị gia dụng|The store sells kitchen appliances.
refrigerator|n.|tủ lạnh|The refrigerator is on sale this week.
furniture|n.|đồ nội thất|We bought new furniture for the lobby.
light bulb|n.|bóng đèn|The light bulb needs to be changed.
shelf|n.|kệ|Books are arranged on the shelf.
curtain|n.|rèm cửa|She opened the curtains.
vacuum|v./n.|hút bụi; máy hút bụi|The cleaner vacuums the carpet every night.
microwave|n.|lò vi sóng|There is a microwave in the break room.
heater|n.|máy sưởi|The heater was repaired yesterday.
sink|n.|bồn rửa|Dishes are piled in the sink.`);
  add("y-daily", "topic", 0, "Việc văn phòng hằng ngày", "Daily office tasks", `
type|v.|đánh máy|She is typing a report.
print out|phr.|in ra|Please print out ten copies.
file|v.|lưu hồ sơ|He filed the invoices by date.
sign|v.|ký|Please sign at the bottom of the page.
send out|phr.|gửi đi|The invitations were sent out today.
answer the phone|phr.|trả lời điện thoại|Could you answer the phone for me?
make a copy|phr.|sao chụp một bản|I need to make a copy of this form.
attach|v.|đính kèm|Attach the file to your e-mail.
log|v.|ghi lại|Please log your working hours.
proofread|v.|đọc soát lỗi|Can you proofread this letter?`);
  add("y-p1out", "part", 0, "Part 1 · Cảnh ngoài trời", "Outdoor scenes", `
cross the street|phr.|băng qua đường|Some people are crossing the street.
be parked|phr.|được đỗ|Cars are parked along the road.
bench|n.|ghế băng|A man is sitting on a bench.
railing|n.|lan can|She is holding onto the railing.
pave|v.|lát đường|Workers are paving a road.
water the plants|phr.|tưới cây|A woman is watering the plants.
dock|n.|bến tàu|A boat is tied to the dock.
shade|n.|bóng râm|People are resting in the shade.
overlook|v.|nhìn ra, hướng ra|The balcony overlooks a river.
path|n.|lối đi|A path leads to the entrance.`);
  add("y-p1in", "part", 0, "Part 1 · Cảnh trong nhà", "Indoor scenes", `
hang|v.|treo|A picture is hanging on the wall.
be seated|phr.|đang ngồi|Customers are seated at a table.
reach for|phr.|với lấy|He is reaching for a book.
wipe|v.|lau|She is wiping a counter.
set the table|phr.|dọn bàn ăn|A waiter is setting the table.
be displayed|phr.|được trưng bày|Shoes are displayed in a window.
face each other|phr.|đối diện nhau|Two people are facing each other.
hand|v.|trao, đưa|A clerk is handing a bag to a customer.
adjust|v.|điều chỉnh|He is adjusting a microphone.
be occupied|phr.|đang có người dùng|All the seats are occupied.`);
  add("y-hotel", "topic", 1, "Khách sạn & lưu trú", "Hotels", `
vacancy|n.|phòng trống|The hotel has no vacancy tonight.
amenities|n.|tiện nghi|Amenities include a pool and a gym.
housekeeping|n.|bộ phận dọn phòng|Housekeeping will clean your room at ten.
suite|n.|phòng hạng sang|We upgraded you to a suite.
concierge|n.|nhân viên hỗ trợ khách|The concierge can book a taxi for you.
wake-up call|n.|cuộc gọi báo thức|I'd like a wake-up call at six.
valet parking|n.|dịch vụ đỗ xe hộ|Valet parking is available at the entrance.
late checkout|n.|trả phòng muộn|Late checkout costs twenty dollars.
double room|n.|phòng đôi|A double room is ninety dollars a night.
occupancy|n.|công suất phòng|Occupancy is highest in summer.`);
  add("y-air", "topic", 1, "Hàng không", "Air travel", `
gate|n.|cổng lên máy bay|The flight leaves from gate 22.
connecting flight|n.|chuyến bay nối tiếp|She missed her connecting flight.
overhead bin|n.|ngăn hành lý trên đầu|Put your bag in the overhead bin.
flight attendant|n.|tiếp viên hàng không|A flight attendant served drinks.
take off|phr.|cất cánh|The plane will take off shortly.
land|v.|hạ cánh|We landed twenty minutes early.
boarding time|n.|giờ lên máy bay|Boarding time is 7:15.
window seat|n.|ghế cạnh cửa sổ|He asked for a window seat.
turbulence|n.|sự rung lắc|Please stay seated during turbulence.
round-trip ticket|n.|vé khứ hồi|A round-trip ticket is cheaper.`);
  add("y-sport", "topic", 1, "Thể thao & phòng tập", "Fitness", `
membership|n.|tư cách hội viên|Gym membership costs forty dollars a month.
trainer|n.|huấn luyện viên|A trainer will show you the machines.
locker|n.|tủ khóa|Leave your bag in a locker.
work out|phr.|tập luyện|She works out three times a week.
stadium|n.|sân vận động|The stadium holds 40,000 fans.
tournament|n.|giải đấu|The tournament begins on Saturday.
equipment|n.|thiết bị|Wipe the equipment after use.
schedule a class|phr.|đặt lịch lớp học|You can schedule a class online.
facility|n.|cơ sở vật chất|The facility opens at 6 a.m.
routine|n.|thói quen tập luyện|Morning exercise is part of his routine.`);
  add("y-tour", "topic", 1, "Tham quan & du lịch", "Sightseeing", `
tour guide|n.|hướng dẫn viên|The tour guide speaks three languages.
landmark|n.|địa danh nổi bật|The tower is a famous landmark.
souvenir|n.|quà lưu niệm|She bought souvenirs for her team.
sightseeing|n.|việc tham quan|We spent the day sightseeing.
brochure|n.|tờ giới thiệu|The brochure lists all the tours.
admission fee|n.|phí vào cửa|The admission fee is ten dollars.
depart|v.|khởi hành|The bus departs at nine sharp.
scenic|adj.|có cảnh đẹp|We took the scenic route.
excursion|n.|chuyến đi chơi ngắn|The price includes a boat excursion.
historic|adj.|mang tính lịch sử|The tour visits the historic district.`);
  add("y-p2", "part", 1, "Part 2 · Câu đáp gián tiếp", "Indirect answers", `
it depends on|phr.|còn tùy vào|It depends on the weather.
I'm not in charge of that|phr.|tôi không phụ trách việc đó|Who booked the room? — I'm not in charge of that.
you'd better ask|phr.|bạn nên hỏi|You'd better ask the manager.
it hasn't been decided|phr.|việc đó chưa được quyết định|When is the launch? — It hasn't been decided.
I thought you did|phr.|tôi tưởng bạn làm rồi|Did you call the client? — I thought you did.
didn't you get the e-mail|phr.|bạn không nhận được e-mail à|Where's the meeting? — Didn't you get the e-mail?
I'll find out|phr.|tôi sẽ tìm hiểu|How much is it? — I'll find out.
either is fine|phr.|cái nào cũng được|Tea or coffee? — Either is fine.
not until|phr.|phải đến… mới|Is the store open? — Not until ten.
that's what I heard|phr.|tôi nghe nói vậy|Is he retiring? — That's what I heard.`);
  add("y-review", "topic", 2, "Đánh giá & thăng tiến", "Performance review", `
performance review|n.|đánh giá hiệu quả công việc|Her performance review is next week.
evaluate|v.|đánh giá|Managers evaluate staff twice a year.
promotion|n.|sự thăng chức|He earned a promotion to team leader.
achievement|n.|thành tích|The award recognizes her achievements.
dedicated|adj.|tận tâm|She is a dedicated employee.
supervise|v.|giám sát|He supervises a team of twelve.
productivity|n.|năng suất|The new tools increased productivity.
recognize|v.|ghi nhận|The firm recognized his hard work.
transfer|v.|điều chuyển|She was transferred to the Tokyo office.
resign|v.|từ chức|The director resigned last month.`);
  add("y-ads", "topic", 2, "Quảng cáo & truyền thông số", "Digital marketing", `
advertisement|n.|quảng cáo|The advertisement appeared in the local paper.
social media|n.|mạng xã hội|We promote events on social media.
slogan|n.|khẩu hiệu|The new slogan is easy to remember.
endorse|v.|quảng bá, chứng thực|A famous chef endorses the brand.
audience|n.|đối tượng khán giả|The ad targets a young audience.
flyer|n.|tờ rơi|Volunteers handed out flyers.
visibility|n.|độ nhận diện|The campaign raised our visibility.
newsletter|n.|bản tin|Sign up for our monthly newsletter.
sponsor|v.|tài trợ|A bank sponsored the festival.
attract|v.|thu hút|The sale attracted many new customers.`);
  add("y-supply", "topic", 2, "Chuỗi cung ứng", "Supply chain", `
distribute|v.|phân phối|The products are distributed nationwide.
vendor|n.|nhà cung cấp|We compared prices from three vendors.
stock|v./n.|trữ hàng; hàng trong kho|The shop stocks imported tea.
shortage|n.|sự thiếu hụt|There is a shortage of drivers.
load|v.|chất hàng|Workers are loading the truck.
raw material|n.|nguyên liệu thô|The price of raw materials has risen.
on schedule|phr.|đúng lịch|The delivery arrived on schedule.
logistics|n.|hậu cần|She manages logistics for the region.
purchase order|n.|đơn đặt hàng|Please send a purchase order first.
lead time|n.|thời gian chờ hàng|The lead time is about three weeks.`);
  add("y-energy", "topic", 2, "Năng lượng & môi trường", "Energy", `
solar panel|n.|tấm pin mặt trời|Solar panels were installed on the roof.
consumption|n.|sự tiêu thụ|Energy consumption fell by ten percent.
waste|n.|rác thải|The plant reduces waste by recycling.
pollution|n.|ô nhiễm|The city is working to cut air pollution.
efficient|adj.|tiết kiệm, hiệu quả|The new lights are more energy efficient.
power outage|n.|sự cố mất điện|A power outage closed the office.
reduce|v.|giảm|We aim to reduce plastic use.
eco-friendly|adj.|thân thiện môi trường|The hotel uses eco-friendly products.
resource|n.|tài nguyên|Water is a limited resource.
generate|v.|tạo ra|The wind farm generates electricity.`);
  add("y-p3", "part", 2, "Part 3 · Cụm động từ công sở", "Workplace phrasal verbs", `
call off|phr.|hủy bỏ|The picnic was called off because of rain.
deal with|phr.|xử lý|I'll deal with the supplier myself.
hand out|phr.|phát|She handed out the agenda.
turn in|phr.|nộp|Please turn in your time sheet today.
take care of|phr.|lo liệu|Don't worry, I'll take care of the booking.
go ahead with|phr.|tiến hành|We decided to go ahead with the plan.
catch up on|phr.|làm bù|I need to catch up on my e-mail.
stop by|phr.|ghé qua|Can you stop by my office later?
check with|phr.|hỏi lại|Let me check with my manager.
be short of|phr.|thiếu|We are short of staff this week.`);
  add("y-p4", "part", 2, "Part 4 · Quảng cáo & hướng dẫn", "Ads & tours", `
limited time offer|n.|ưu đãi có hạn|This is a limited time offer.
stay tuned|phr.|tiếp tục theo dõi|Stay tuned for the weather report.
feel free to|phr.|cứ tự nhiên|Feel free to ask questions.
on display|phr.|đang được trưng bày|The paintings are on display until May.
this way, please|phr.|mời đi lối này|This way, please, to the main hall.
grand opening|n.|lễ khai trương|Join us for our grand opening.
hurry in|phr.|hãy nhanh chân đến|Hurry in while supplies last.
be sure to|phr.|hãy nhớ|Be sure to bring your ticket.
take advantage of|phr.|tận dụng|Take advantage of our summer sale.
free estimate|n.|báo giá miễn phí|Call today for a free estimate.`);
  add("y-service", "topic", 2, "Dịch vụ khách hàng nâng cao", "Customer care", `
satisfaction|n.|sự hài lòng|Customer satisfaction is our goal.
respond|v.|phản hồi|We respond to every e-mail within a day.
assist|v.|hỗ trợ|A staff member will assist you shortly.
apologize|v.|xin lỗi|We apologize for the mistake.
representative|n.|nhân viên đại diện|A representative will call you back.
handle|v.|xử lý|She handles all customer complaints.
feedback form|n.|phiếu góp ý|Please fill in the feedback form.
loyal customer|n.|khách hàng thân thiết|Loyal customers get early access.
waive|v.|miễn (phí)|We will waive the delivery fee.
escalate|v.|chuyển lên cấp trên|The issue was escalated to a manager.`);
  add("y-econ", "topic", 3, "Kinh tế", "Economy", `
inflation|n.|lạm phát|Inflation slowed in the second quarter.
recession|n.|suy thoái|Many shops closed during the recession.
unemployment|n.|thất nghiệp|Unemployment fell to four percent.
growth|n.|sự tăng trưởng|Economic growth remains strong.
export|v./n.|xuất khẩu|The country exports rice and coffee.
import|v./n.|nhập khẩu|Most of our parts are imported.
fluctuate|v.|dao động|Oil prices fluctuate daily.
stable|adj.|ổn định|The currency has been stable this year.
industry|n.|ngành công nghiệp|The tourism industry is recovering.
boost|v.|thúc đẩy|Lower taxes may boost spending.`);
  add("y-mna", "topic", 3, "Mua bán & sáp nhập", "Mergers", `
acquisition|n.|việc mua lại|The acquisition was completed in May.
subsidiary|n.|công ty con|The firm has a subsidiary in Vietnam.
stake|n.|cổ phần|They bought a twenty percent stake.
board of directors|n.|hội đồng quản trị|The board of directors approved the deal.
bid|n./v.|giá thầu; đấu thầu|Three firms bid for the contract.
takeover|n.|sự tiếp quản|The takeover surprised investors.
negotiation|n.|cuộc đàm phán|Negotiations lasted two months.
joint venture|n.|liên doanh|The two brands formed a joint venture.
valuation|n.|sự định giá|The valuation was higher than expected.
approve|v.|phê duyệt|Regulators approved the merger.`);
  add("y-medical", "topic", 3, "Y tế & dược", "Healthcare", `
patient|n.|bệnh nhân|The clinic sees fifty patients a day.
treatment|n.|sự điều trị|The treatment takes three weeks.
vaccine|n.|vắc xin|The vaccine is free for staff.
clinical trial|n.|thử nghiệm lâm sàng|The drug is in a clinical trial.
side effect|n.|tác dụng phụ|Side effects are rare.
diagnose|v.|chẩn đoán|The doctor diagnosed the problem quickly.
dose|n.|liều lượng|Take one dose after meals.
surgeon|n.|bác sĩ phẫu thuật|The surgeon explained the operation.
recovery|n.|sự hồi phục|Full recovery takes a month.
pharmaceutical|adj.|thuộc dược phẩm|She works for a pharmaceutical company.`);
  add("y-p6", "part", 3, "Part 6 · Mở đầu & kết thư", "Letter phrases", `
thank you for your interest in|phr.|cảm ơn bạn đã quan tâm đến|Thank you for your interest in our products.
we are pleased to inform you|phr.|chúng tôi vui mừng thông báo|We are pleased to inform you that your order has shipped.
we regret to inform you|phr.|chúng tôi rất tiếc phải thông báo|We regret to inform you that the event is canceled.
please note that|phr.|xin lưu ý rằng|Please note that the office closes at noon.
as a reminder|phr.|xin nhắc lại|As a reminder, the deadline is Friday.
enclosed|adj.|được gửi kèm|Enclosed is a copy of the contract.
should you need|phr.|nếu bạn cần|Should you need more details, call us.
effective immediately|phr.|có hiệu lực ngay|Effective immediately, the gate will be locked at night.
we appreciate your patience|phr.|cảm ơn sự kiên nhẫn của bạn|We appreciate your patience during the repairs.
best regards|phr.|trân trọng|Best regards, Tom Hale`);
  add("y-nouns", "part", 3, "Part 5 · Danh từ hay gặp", "Key nouns", `
proposal|n.|bản đề xuất|The proposal was accepted.
requirement|n.|yêu cầu|Experience is a requirement for the job.
expansion|n.|sự mở rộng|The expansion will create fifty jobs.
replacement|n.|vật thay thế, người thay thế|We are looking for a replacement.
attendance|n.|sự có mặt|Attendance at the workshop is required.
contribution|n.|sự đóng góp|Thank you for your contribution.
reduction|n.|sự cắt giảm|There was a reduction in costs.
preference|n.|sự ưu tiên|Please state your seating preference.
permission|n.|sự cho phép|You need permission to enter.
recommendation|n.|lời đề xuất|The report includes three recommendations.`);
  add("y-colloc", "part", 3, "Part 5 · Động từ + danh từ", "Verb collocations", `
meet a deadline|phr.|kịp hạn chót|We worked late to meet the deadline.
reach an agreement|phr.|đạt thỏa thuận|Both sides reached an agreement.
make a reservation|phr.|đặt chỗ|I made a reservation for eight.
take measures|phr.|thực hiện biện pháp|The city took measures to reduce traffic.
place an advertisement|phr.|đăng quảng cáo|We placed an advertisement online.
raise awareness|phr.|nâng cao nhận thức|The event raises awareness of recycling.
hold a meeting|phr.|tổ chức cuộc họp|We hold a meeting every Monday.
make a payment|phr.|thanh toán|You can make a payment by card.
gain experience|phr.|tích lũy kinh nghiệm|Interns gain experience in sales.
address a concern|phr.|giải quyết mối lo ngại|The manager addressed our concerns.`);
  add("y-conj", "part", 4, "Part 5 · Liên từ nâng cao", "Advanced connectors", `
provided that|conj.|với điều kiện là|You may leave early provided that your work is done.
whereas|conj.|trong khi (đối lập)|Sales rose in Asia, whereas they fell in Europe.
as long as|conj.|miễn là|You can stay as long as you are quiet.
in case|conj.|phòng khi|Take an umbrella in case it rains.
now that|conj.|vì bây giờ|Now that the repairs are done, the pool is open.
even if|conj.|ngay cả khi|We will go even if it snows.
so that|conj.|để mà|Speak slowly so that everyone understands.
once|conj.|một khi|Once you sign, the order is final.
given that|conj.|xét rằng|Given that costs are rising, prices will change.
unless otherwise noted|phr.|trừ khi có ghi chú khác|All prices are in dollars unless otherwise noted.`);
  add("y-p7b", "part", 4, "Part 7 · Từ đa nghĩa", "Words with several meanings", `
issue|v.|cấp, phát hành|The office will issue new ID cards.
book|v.|đặt trước|She booked a room for the workshop.
charge|n.|sự phụ trách|Mr. Wu is in charge of hiring.
party|n.|bên (trong hợp đồng)|Both parties signed the lease.
stock|n.|hàng tồn kho|The item is out of stock.
terms|n.|điều khoản|Read the terms before you sign.
interest|n.|tiền lãi|The account pays two percent interest.
board|n.|ban lãnh đạo|The board meets every quarter.
launch|n.|buổi ra mắt|The launch attracted many reporters.
firm|n.|công ty|She works for a law firm.`);
  add("y-memo", "context", 2, "Thông báo nội bộ", "Internal memos", `
effective|adj.|có hiệu lực từ|Effective June 1, the office opens at eight.
all staff|phr.|toàn thể nhân viên|This notice is for all staff.
be required to|phr.|được yêu cầu phải|Employees are required to wear badges.
remind|v.|nhắc nhở|We would like to remind you of the deadline.
in the meantime|phr.|trong lúc chờ đợi|In the meantime, please use the side door.
access|n.|quyền ra vào, truy cập|Access to the lab is limited.
take effect|phr.|có hiệu lực|The change takes effect next month.
cooperation|n.|sự hợp tác|Thank you for your cooperation.
notify|v.|thông báo|Please notify your supervisor in advance.
on a first-come, first-served basis|phr.|ai đến trước được trước|Seats are given on a first-come, first-served basis.`);
  add("y-nego", "context", 3, "Đàm phán & báo giá", "Negotiation", `
quote|n.|bảng báo giá|Could you send us a quote?
counteroffer|n.|đề nghị ngược lại|They made a counteroffer the next day.
bulk discount|n.|chiết khấu số lượng lớn|We offer a bulk discount on large orders.
terms of payment|n.|điều khoản thanh toán|The terms of payment are thirty days.
flexible|adj.|linh hoạt|We can be flexible on the delivery date.
compromise|n./v.|sự thỏa hiệp|Both sides reached a compromise.
deal|n.|thỏa thuận|We closed the deal on Friday.
budget constraint|n.|giới hạn ngân sách|We have a budget constraint this year.
come to terms|phr.|đi đến thỏa thuận|The two firms finally came to terms.
in writing|phr.|bằng văn bản|Please confirm the price in writing.`);
  add("y-firstday", "context", 1, "Ngày đầu đi làm", "First day at work", `
orientation|n.|buổi định hướng|Orientation starts at nine in room 3.
ID badge|n.|thẻ nhân viên|Wear your ID badge at all times.
show around|phr.|dẫn đi tham quan|Lisa will show you around the office.
fill out paperwork|phr.|điền giấy tờ|You need to fill out some paperwork.
workstation|n.|chỗ làm việc|Your workstation is by the window.
get used to|phr.|làm quen với|You will get used to the system quickly.
break room|n.|phòng nghỉ|Coffee is available in the break room.
report to|phr.|báo cáo cho|You will report to Mr. Ito.
training manual|n.|tài liệu đào tạo|Please read the training manual.
shift|n.|ca làm việc|Your shift starts at seven.`);
})();
