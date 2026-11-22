/* Bộ từ mở rộng đợt 5 – ưu tiên ngữ cảnh. Mỗi dòng: từ|loại|nghĩa|ví dụ */
(function () {
  const add = (id, group, band, wk, big, name, text) => VOCAB.push({ id, group, band, wk, big, name, en: big, x: 1, words: text.trim().split("\n").map(l => { const [w, pos, vi, ex] = l.trim().split("|"); return [w, "", pos, vi, ex]; }) });
  add("q-restaurant", "context", 0, 1, "Ở nhà hàng & khách sạn", "Gọi món", `
a table for two|phr.|bàn cho hai người|A table for two, please.
today's special|n.|món đặc biệt hôm nay|What is today's special?
I'll have|phr.|tôi sẽ dùng|I'll have the grilled fish.
anything to drink|phr.|uống gì không|Would you like anything to drink?
separate checks|n.|hóa đơn riêng|Could we have separate checks?
to go|phr.|mang đi|I'd like a coffee to go.
refill|n./v.|rót thêm|Could I get a refill?
allergic to|phr.|dị ứng với|I'm allergic to nuts.
well done|adj.|chín kỹ|I'd like my steak well done.
keep the change|phr.|giữ lại tiền thừa|Thank you, keep the change.`);
  add("q-hotelreq", "context", 1, 4, "Ở nhà hàng & khách sạn", "Yêu cầu ở khách sạn", `
extra towel|n.|khăn tắm thêm|Could I have an extra towel?
extend my stay|phr.|ở thêm|I'd like to extend my stay by one night.
room key|n.|chìa khóa phòng|I lost my room key.
not working|phr.|không hoạt động|The air conditioner is not working.
store my luggage|phr.|gửi hành lý|Can you store my luggage until three?
quiet room|n.|phòng yên tĩnh|I'd prefer a quiet room.
airport shuttle|n.|xe đưa đón sân bay|What time does the airport shuttle leave?
charge it to my room|phr.|tính vào tiền phòng|Please charge it to my room.
early check-in|n.|nhận phòng sớm|Is early check-in possible?
receipt|n.|biên lai|May I have a receipt, please?`);
  add("q-bankdesk", "context", 1, 4, "Ở ngân hàng & bưu điện", "Giao dịch ngân hàng", `
open an account|phr.|mở tài khoản|I'd like to open an account.
make a deposit|phr.|gửi tiền|I need to make a deposit.
withdraw cash|phr.|rút tiền mặt|You can withdraw cash at the machine.
exchange rate|n.|tỷ giá|What is today's exchange rate?
fill out a form|phr.|điền mẫu đơn|Please fill out a form first.
photo ID|n.|giấy tờ có ảnh|May I see a photo ID?
service fee|n.|phí dịch vụ|There is a small service fee.
wire transfer|n.|chuyển tiền điện tử|The wire transfer takes two days.
sign here|phr.|ký vào đây|Please sign here.
take a number|phr.|lấy số thứ tự|Take a number and wait.`);
  add("q-postdesk", "context", 1, 4, "Ở ngân hàng & bưu điện", "Gửi bưu kiện", `
send a parcel|phr.|gửi bưu kiện|I'd like to send a parcel to Canada.
by air|phr.|bằng đường hàng không|How much is it by air?
tracking number|n.|mã theo dõi|Here is your tracking number.
handle with care|phr.|xin nhẹ tay|Mark the box "handle with care."
how long does it take|phr.|mất bao lâu|How long does it take to arrive?
customs form|n.|tờ khai hải quan|Please complete a customs form.
insure|v.|mua bảo hiểm|Would you like to insure the package?
stamp|n.|tem|I need ten stamps.
zip code|n.|mã bưu chính|What is the zip code?
signature required|phr.|cần ký nhận|This delivery is signature required.`);
  add("q-warehouse", "context", 2, 6, "Trong nhà máy & kho", "Trong kho hàng", `
forklift|n.|xe nâng|Only trained staff may drive the forklift.
pallet|n.|kệ kê hàng|Stack the boxes on a pallet.
loading dock|n.|khu bốc dỡ hàng|The truck is at the loading dock.
label|v./n.|dán nhãn; nhãn|Label every box clearly.
count|v.|đếm|Count the items twice.
shelf space|n.|chỗ trên kệ|We are running out of shelf space.
incoming|adj.|sắp đến|Check all incoming shipments.
pick an order|phr.|soạn đơn hàng|Two workers pick orders in the morning.
damaged goods|n.|hàng bị hỏng|Report damaged goods at once.
shift supervisor|n.|trưởng ca|Ask the shift supervisor for help.`);
  add("q-safety", "context", 2, 6, "Trong nhà máy & kho", "An toàn lao động", `
safety gear|n.|đồ bảo hộ|Wear your safety gear at all times.
helmet|n.|mũ bảo hộ|A helmet is required here.
emergency exit|n.|lối thoát hiểm|Keep the emergency exit clear.
fire drill|n.|buổi diễn tập cứu hỏa|A fire drill will be held today.
hazard|n.|mối nguy|Wet floors are a hazard.
first aid|n.|sơ cứu|The first aid kit is in the office.
restricted area|n.|khu vực hạn chế|This is a restricted area.
report an accident|phr.|báo cáo tai nạn|Report an accident immediately.
turn off|phr.|tắt|Turn off the machine before cleaning.
precaution|n.|biện pháp phòng ngừa|Take every precaution.`);
  add("q-apology", "context", 1, 3, "Sự cố & xin lỗi", "Xin lỗi & giải thích", `
I apologize for|phr.|tôi xin lỗi vì|I apologize for the late reply.
my mistake|phr.|lỗi của tôi|Sorry, that was my mistake.
it won't happen again|phr.|sẽ không lặp lại|I promise it won't happen again.
misunderstanding|n.|sự hiểu lầm|There was a misunderstanding.
make up for|phr.|bù đắp|We'd like to make up for the delay.
sorry to bother you|phr.|xin lỗi đã làm phiền|Sorry to bother you, but I need help.
unfortunately|adv.|rất tiếc|Unfortunately, the item is sold out.
beyond our control|phr.|ngoài tầm kiểm soát|The delay was beyond our control.
as soon as possible|phr.|sớm nhất có thể|We will fix it as soon as possible.
thank you for understanding|phr.|cảm ơn bạn đã thông cảm|Thank you for understanding.`);
  add("q-problem", "context", 1, 3, "Sự cố & xin lỗi", "Báo sự cố thiết bị", `
jammed|adj.|bị kẹt|The printer is jammed again.
won't turn on|phr.|không bật lên được|My monitor won't turn on.
out of paper|phr.|hết giấy|The copier is out of paper.
make a noise|phr.|phát ra tiếng ồn|The fan is making a noise.
call maintenance|phr.|gọi bảo trì|We should call maintenance.
broken|adj.|bị hỏng|The handle is broken.
have a look|phr.|xem thử|Could you have a look at my laptop?
keep crashing|phr.|cứ bị sập|The program keeps crashing.
under warranty|phr.|còn bảo hành|Is it still under warranty?
spare part|n.|linh kiện thay thế|We ordered a spare part.`);
  add("q-resched", "context", 1, 2, "Lịch hẹn & thay đổi kế hoạch", "Đổi lịch", `
something came up|phr.|có việc đột xuất|Sorry, something came up.
move the meeting|phr.|dời cuộc họp|Can we move the meeting to Friday?
push back|phr.|lùi lại|Let's push back the deadline.
bring forward|phr.|đẩy lên sớm hơn|They brought the launch forward.
make it|phr.|đến được|I can't make it on Tuesday.
is that okay with you|phr.|vậy có ổn với bạn không|Is that okay with you?
conflict|n.|trùng lịch|I have a scheduling conflict.
free|adj.|rảnh|Are you free at two?
at short notice|phr.|báo gấp|Thanks for coming at short notice.
confirm the time|phr.|xác nhận giờ|Let me confirm the time.`);
  add("q-invite", "context", 0, 1, "Lịch hẹn & thay đổi kế hoạch", "Mời & nhận lời", `
would you like to|phr.|bạn có muốn|Would you like to join us for lunch?
I'd love to|phr.|tôi rất muốn|I'd love to, thanks.
maybe next time|phr.|để lần sau nhé|Maybe next time.
are you coming|phr.|bạn có đến không|Are you coming to the party?
count me in|phr.|tính cả tôi|Count me in.
I have other plans|phr.|tôi có kế hoạch khác|Sorry, I have other plans.
what time|phr.|mấy giờ|What time does it start?
bring|v.|mang theo|Should I bring anything?
invitation|n.|lời mời|Thank you for the invitation.
looking forward to it|phr.|rất mong chờ|I'm looking forward to it.`);
  add("q-direction", "context", 0, 0, "Hướng dẫn & chỉ đường", "Chỉ đường", `
go straight|phr.|đi thẳng|Go straight for two blocks.
turn left|phr.|rẽ trái|Turn left at the bank.
on your right|phr.|bên tay phải|The store is on your right.
around the corner|phr.|ngay góc đường|The café is around the corner.
how do I get to|phr.|làm sao đến|How do I get to the station?
far from here|phr.|xa đây|Is it far from here?
take the elevator|phr.|đi thang máy|Take the elevator to the fifth floor.
down the hall|phr.|cuối hành lang|The restroom is down the hall.
you can't miss it|phr.|bạn sẽ thấy ngay|It's a red building; you can't miss it.
block|n.|dãy nhà|It's three blocks away.`);
  add("q-instruction", "context", 2, 5, "Hướng dẫn & chỉ đường", "Hướng dẫn sử dụng", `
first of all|phr.|trước hết|First of all, plug in the machine.
press the button|phr.|nhấn nút|Press the button on the left.
make sure|phr.|hãy chắc rằng|Make sure the lid is closed.
step by step|phr.|từng bước|Follow the guide step by step.
insert|v.|đưa vào|Insert your card here.
select|v.|chọn|Select your language.
hold down|phr.|giữ|Hold down the key for three seconds.
once you have|phr.|sau khi bạn đã|Once you have signed, return the form.
do not|phr.|không được|Do not open the cover.
when finished|phr.|khi xong|When finished, log out.`);
  add("q-smalltalk", "context", 0, 0, "Trò chuyện công sở", "Chào hỏi & xã giao", `
how's it going|phr.|dạo này thế nào|Hi Tom, how's it going?
nice to meet you|phr.|rất vui được gặp bạn|Nice to meet you, Ms. Park.
long time no see|phr.|lâu rồi không gặp|Long time no see!
how was your weekend|phr.|cuối tuần của bạn thế nào|How was your weekend?
have a good one|phr.|chúc một ngày tốt lành|See you later. Have a good one.
take care|phr.|giữ gìn nhé|Take care on your trip.
congratulations|n.|chúc mừng|Congratulations on your promotion.
by the way|phr.|nhân tiện|By the way, have you met Lisa?
see you then|phr.|hẹn gặp lúc đó|Friday at ten? See you then.
what do you do|phr.|bạn làm nghề gì|So, what do you do?`);
  add("q-teamwork", "context", 1, 3, "Trò chuyện công sở", "Nhờ giúp & phân việc", `
give me a hand|phr.|giúp tôi một tay|Could you give me a hand?
cover for|phr.|làm thay|Can you cover for me tomorrow?
take over|phr.|tiếp quản|Sara will take over the project.
split the work|phr.|chia việc|Let's split the work.
in charge|phr.|phụ trách|Who is in charge today?
let me know|phr.|báo cho tôi biết|Let me know if you need help.
I'm on it|phr.|tôi đang lo việc đó|The report? I'm on it.
got a minute|phr.|có rảnh một phút không|Have you got a minute?
double-check|v.|kiểm tra lại|Please double-check the figures.
by the end of the day|phr.|trước cuối ngày|I need it by the end of the day.`);
  add("q-present", "context", 2, 6, "Họp, gọi điện & thuyết trình", "Mở đầu & kết thúc bài nói", `
I'd like to begin by|phr.|tôi xin bắt đầu bằng|I'd like to begin by thanking you all.
the purpose of|phr.|mục đích của|The purpose of this talk is to explain the plan.
let's move on to|phr.|hãy chuyển sang|Let's move on to the budget.
as I mentioned|phr.|như tôi đã nói|As I mentioned, sales are up.
take a look at|phr.|hãy nhìn vào|Take a look at this chart.
to sum up|phr.|tóm lại|To sum up, we met our goals.
any questions|phr.|có câu hỏi nào không|Are there any questions?
thank you for your attention|phr.|cảm ơn đã lắng nghe|Thank you for your attention.
handout|n.|tài liệu phát tay|You will find the figures in the handout.
key point|n.|ý chính|The key point is quality.`);
  add("q-negomeet", "context", 2, 5, "Họp, gọi điện & thuyết trình", "Nêu ý kiến trong họp", `
I see your point|phr.|tôi hiểu ý bạn|I see your point, but costs are high.
I agree with|phr.|tôi đồng ý với|I agree with Ms. Chen.
I'm not sure about|phr.|tôi không chắc về|I'm not sure about the timing.
what do you think|phr.|bạn nghĩ sao|What do you think, David?
could you clarify|phr.|bạn nói rõ được không|Could you clarify the last point?
let's vote|phr.|hãy biểu quyết|Let's vote on the proposal.
make a suggestion|phr.|đưa ra đề xuất|May I make a suggestion?
go with|phr.|chọn theo|Let's go with the second option.
run out of time|phr.|hết giờ|We are running out of time.
action item|n.|việc cần làm|Each action item has an owner.`);
  add("q-startup", "topic", 3, 11, "Chiến lược, dự án & kinh tế", "Khởi nghiệp & vốn", `
entrepreneur|n.|doanh nhân khởi nghiệp|The entrepreneur opened her first shop at 25.
investor|n.|nhà đầu tư|Investors liked the idea.
funding|n.|nguồn vốn|The firm secured funding.
profitable|adj.|có lãi|The business became profitable in a year.
revenue stream|n.|nguồn thu|Ads are our main revenue stream.
launch|v.|khởi động|They launched the service in May.
venture|n.|dự án kinh doanh|The venture failed.
break even|phr.|hòa vốn|We expect to break even next year.
pitch|n./v.|bài chào mời đầu tư|She gave a short pitch.
scale up|phr.|mở rộng quy mô|The company plans to scale up.`);
  add("q-ecommerce", "topic", 2, 6, "Marketing & bán lẻ", "Thương mại điện tử", `
online store|n.|cửa hàng trực tuyến|Our online store is open all day.
add to cart|phr.|thêm vào giỏ|Click "add to cart."
checkout|n.|bước thanh toán|Enter the code at checkout.
shipping address|n.|địa chỉ giao hàng|Check your shipping address.
promo code|n.|mã khuyến mãi|Use this promo code for ten percent off.
in-store pickup|n.|nhận tại cửa hàng|In-store pickup is free.
rating|n.|điểm đánh giá|The product has a high rating.
return policy|n.|chính sách đổi trả|Read our return policy.
out for delivery|phr.|đang giao|Your order is out for delivery.
subscribe|v.|đăng ký|Subscribe to get weekly deals.`);
  add("q-socialres", "topic", 3, 12, "Sức khỏe & môi trường", "Trách nhiệm xã hội", `
donate|v.|quyên góp|The firm donated computers to schools.
charity|n.|tổ chức từ thiện|All proceeds go to charity.
volunteer|v.|tình nguyện|Staff volunteer once a month.
community|n.|cộng đồng|We support the local community.
fundraiser|n.|buổi gây quỹ|The fundraiser raised 5,000 dollars.
sustainability|n.|tính bền vững|Sustainability is part of our plan.
carbon footprint|n.|lượng phát thải carbon|We cut our carbon footprint.
ethical|adj.|có đạo đức|We choose ethical suppliers.
awareness|n.|nhận thức|The campaign raises awareness.
proceeds|n.|tiền thu được|Proceeds will help the hospital.`);
  add("q-insur2", "topic", 3, 12, "Tài chính, ngân hàng & thuế", "Bảo hiểm", `
policy|n.|hợp đồng bảo hiểm|The policy covers fire damage.
insured|adj.|được bảo hiểm|The building is fully insured.
file a claim|phr.|nộp yêu cầu bồi thường|He filed a claim after the flood.
beneficiary|n.|người thụ hưởng|Name a beneficiary on the form.
renewal|n.|sự gia hạn|The renewal date is June 1.
liability insurance|n.|bảo hiểm trách nhiệm|Contractors need liability insurance.
assess the damage|phr.|đánh giá thiệt hại|An agent will assess the damage.
payout|n.|khoản chi trả|The payout arrived in a week.
exclude|v.|loại trừ|The plan excludes dental work.
agent|n.|đại lý|Call your insurance agent.`);
  add("q-realty2", "topic", 3, 9, "Nhà ở & xây dựng", "Mua bán nhà", `
down payment|n.|tiền đặt cọc mua nhà|They saved for a down payment.
listing|n.|tin rao bán|The listing shows three bedrooms.
open house|n.|buổi mở cửa xem nhà|The open house is on Sunday.
appraisal|n.|sự thẩm định giá|The appraisal was lower than expected.
closing|n.|buổi hoàn tất giao dịch|The closing is set for May 2.
neighborhood|n.|khu dân cư|It is a quiet neighborhood.
square meter|n.|mét vuông|The flat is eighty square meters.
renovate|v.|cải tạo|They renovated the kitchen.
move-in date|n.|ngày dọn vào|The move-in date is July 1.
owner|n.|chủ sở hữu|The owner accepted the offer.`);
  add("q-edu2", "topic", 1, 2, "Giáo dục, giải trí & thể thao", "Khóa học & chứng chỉ", `
sign up|phr.|đăng ký|Sign up for the evening class.
course fee|n.|học phí khóa học|The course fee includes books.
beginner|n.|người mới bắt đầu|This class is for beginners.
deadline|n.|hạn chót|The registration deadline is Friday.
attend|v.|tham dự|You must attend every session.
lecture|n.|bài giảng|The lecture lasts an hour.
pass|v.|đỗ|She passed the exam.
degree|n.|bằng cấp|He has a degree in finance.
online course|n.|khóa học trực tuyến|I took an online course in design.
assignment|n.|bài tập|Submit the assignment by Monday.`);
  add("q-publish", "topic", 3, 11, "Truyền thông & tin tức", "Xuất bản & sách", `
author|n.|tác giả|The author will sign books at noon.
edition|n.|ấn bản|A new edition comes out in May.
manuscript|n.|bản thảo|She sent the manuscript to her editor.
bestseller|n.|sách bán chạy|The novel became a bestseller.
chapter|n.|chương|Read the first chapter.
copy|n.|bản, cuốn|We sold 2,000 copies.
review|n.|bài phê bình|The book got good reviews.
publisher|n.|nhà xuất bản|The publisher is based in London.
print run|n.|số lượng in|The first print run sold out.
book signing|n.|buổi ký tặng sách|The book signing is at the mall.`);
  add("q-agri", "topic", 2, 5, "Sản xuất & chuỗi cung ứng", "Nông sản & thực phẩm", `
crop|n.|vụ mùa, cây trồng|Rain damaged the crop.
harvest|n./v.|thu hoạch|The harvest begins in June.
organic|adj.|hữu cơ|We sell organic vegetables.
produce|n.|nông sản|Fresh produce arrives daily.
farm|n.|trang trại|The farm supplies local markets.
grocery|n.|cửa hàng thực phẩm|The grocery opens at seven.
supply|v.|cung cấp|They supply fruit to hotels.
fresh|adj.|tươi|The bread is fresh every morning.
packaging|n.|bao bì|The packaging is recyclable.
expiration date|n.|hạn sử dụng|Check the expiration date.`);
  add("q-hr3", "topic", 1, 2, "Nhân sự & tuyển dụng", "Nghỉ phép & quy định", `
vacation|n.|kỳ nghỉ|She is on vacation this week.
request time off|phr.|xin nghỉ|Request time off two weeks ahead.
approve|v.|phê duyệt|My manager approved the request.
absence|n.|sự vắng mặt|Report any absence by phone.
maternity leave|n.|nghỉ thai sản|She is on maternity leave.
part-time|adj.|bán thời gian|He has a part-time job.
full-time|adj.|toàn thời gian|We need two full-time workers.
flexible hours|n.|giờ làm linh hoạt|The firm offers flexible hours.
work from home|phr.|làm việc tại nhà|I work from home on Fridays.
time sheet|n.|bảng chấm công|Hand in your time sheet.`);
  add("q-event2", "topic", 2, 5, "Ăn uống, sự kiện & hội nghị", "Tổ chức sự kiện", `
organize|v.|tổ chức|She organized the dinner.
guest list|n.|danh sách khách mời|Check the guest list.
decoration|n.|đồ trang trí|The decorations are ready.
ceremony|n.|buổi lễ|The ceremony starts at six.
anniversary|n.|lễ kỷ niệm|It is our tenth anniversary.
reception|n.|tiệc chiêu đãi|A reception follows the talk.
set up|phr.|bố trí|Staff set up the tables.
entertainment|n.|tiết mục giải trí|Live music is the entertainment.
seating|n.|chỗ ngồi|Seating is limited.
book|v.|đặt trước|We booked the hall.`);
  add("q-travel2", "topic", 1, 4, "Du lịch & hàng không", "Sự cố khi đi lại", `
miss a flight|phr.|lỡ chuyến bay|He missed his flight.
lost luggage|n.|hành lý thất lạc|Report lost luggage at the desk.
be canceled|phr.|bị hủy|The train was canceled.
rebook|v.|đặt lại vé|The airline rebooked us.
standby|n.|danh sách chờ|I am on standby.
overbooked|adj.|bán quá số chỗ|The flight was overbooked.
voucher|n.|phiếu ưu đãi|We got a meal voucher.
stopover|n.|chặng dừng|There is a stopover in Doha.
travel agency|n.|đại lý du lịch|The travel agency changed our tickets.
on board|phr.|trên máy bay, tàu|Meals are served on board.`);
  add("q-mail2", "topic", 1, 3, "Thư tín & giấy tờ", "Biểu mẫu & giấy tờ", `
form|n.|mẫu đơn|Complete this form.
signature|n.|chữ ký|Your signature is required.
copy|n.|bản sao|Keep a copy for yourself.
original|n.|bản gốc|Bring the original.
attach|v.|đính kèm|Attach a photo.
due date|n.|ngày đến hạn|The due date is March 3.
document|n.|tài liệu|Scan the document.
stamp|v.|đóng dấu|The clerk stamped the form.
submit|v.|nộp|Submit it online.
blank|adj.|để trống|Do not leave any field blank.`);
  add("q-p2c", "part", 0, 1, "Part 2 · Hỏi – đáp", "Câu đáp thường gặp", `
sure, no problem|phr.|được, không sao|Can you help me? — Sure, no problem.
I think so|phr.|tôi nghĩ vậy|Is he in today? — I think so.
not yet|phr.|chưa|Have you eaten? — Not yet.
right away|phr.|ngay lập tức|Send it? — Right away.
that's a good idea|phr.|ý hay đấy|Shall we walk? — That's a good idea.
I'd appreciate that|phr.|tôi rất cảm kích|I can drive you. — I'd appreciate that.
it's on the second floor|phr.|ở tầng hai|Where's the café? — It's on the second floor.
about an hour|phr.|khoảng một tiếng|How long? — About an hour.
I'm afraid not|phr.|tôi e là không|Is there a seat? — I'm afraid not.
whichever you prefer|phr.|tùy bạn thích|Red or blue? — Whichever you prefer.`);
  add("q-p3d", "part", 1, 4, "Part 3 · Hội thoại", "Từ trong câu hỏi Part 3", `
most likely|adv.|nhiều khả năng|Where most likely are the speakers?
imply|v.|ngụ ý|What does the man imply?
be concerned about|phr.|lo lắng về|What is the woman concerned about?
offer to do|phr.|đề nghị làm|What does the man offer to do?
take place|phr.|diễn ra|Where does the conversation take place?
according to|phr.|theo|According to the woman, what is the problem?
suggest|v.|đề xuất|What does the man suggest?
mention|v.|nhắc đến|What does the woman mention about the store?
purpose|n.|mục đích|What is the purpose of the call?
next|adv.|tiếp theo|What will the man do next?`);
  add("q-p4d", "part", 2, 5, "Part 4 · Bài nói", "Từ trong câu hỏi Part 4", `
intended for|phr.|dành cho|Who is the talk intended for?
be advised to|phr.|được khuyên|What are listeners advised to do?
be asked to|phr.|được yêu cầu|What are listeners asked to do?
be reminded to|phr.|được nhắc|What are listeners reminded to do?
announce|v.|thông báo|What is being announced?
speaker|n.|người nói|Who is the speaker?
main topic|n.|chủ đề chính|What is the main topic of the talk?
look at the graphic|phr.|nhìn vào bảng biểu|Look at the graphic. Which room will be used?
later today|phr.|cuối ngày hôm nay|What will happen later today?
encourage|v.|khuyến khích|What does the speaker encourage listeners to do?`);
  add("q-p6c", "part", 3, 9, "Part 6 · Hoàn thành đoạn văn", "Từ nối nâng cao", `
as a result|phr.|kết quả là|As a result, sales doubled.
in contrast|phr.|trái lại|In contrast, costs fell.
furthermore|adv.|hơn nữa|Furthermore, delivery is free.
similarly|adv.|tương tự|Similarly, the second store did well.
in fact|phr.|thực tế là|In fact, it was our best year.
on the other hand|phr.|mặt khác|On the other hand, rent is high.
specifically|adv.|cụ thể là|Specifically, we need two drivers.
afterward|adv.|sau đó|Afterward, lunch will be served.
alternatively|adv.|hoặc là|Alternatively, you may pay online.
to that end|phr.|để đạt điều đó|To that end, we hired more staff.`);
  add("q-p6d", "part", 3, 9, "Part 6 · Hoàn thành đoạn văn", "Động từ trong thư tín", `
inform|v.|thông báo|We are writing to inform you of a change.
remind|v.|nhắc|This e-mail is to remind you of the deadline.
confirm|v.|xác nhận|We confirm your booking.
enclose|v.|gửi kèm|I enclose my résumé.
request|v.|yêu cầu|We request your reply by Friday.
invite|v.|mời|We invite you to our opening.
apologize|v.|xin lỗi|We apologize for the error.
appreciate|v.|trân trọng|We appreciate your business.
regret|v.|lấy làm tiếc|We regret the delay.
welcome|v.|chào đón|We welcome your comments.`);
  add("q-p7e", "part", 3, 10, "Part 7 · Đọc hiểu", "Từ trong câu hỏi Part 7", `
be indicated|phr.|được nêu|What is indicated about the store?
be suggested|phr.|được ngụ ý|What is suggested about Mr. Lee?
be stated|phr.|được nói rõ|What is stated about the offer?
closest in meaning to|phr.|gần nghĩa nhất với|The word is closest in meaning to "begin."
be true about|phr.|đúng về|What is true about the event?
best belong|phr.|phù hợp nhất|In which position does the sentence best belong?
inferred|adj.|được suy ra|What can be inferred from the notice?
be required to|phr.|bị yêu cầu|What are applicants required to do?
in the second e-mail|phr.|trong e-mail thứ hai|What is requested in the second e-mail?
NOT mentioned|phr.|không được nhắc đến|What is NOT mentioned as a benefit?`);
  add("q-p7f", "part", 3, 10, "Part 7 · Đọc hiểu", "Thư xin việc & giới thiệu", `
I am writing to apply|phr.|tôi viết thư để ứng tuyển|I am writing to apply for the sales position.
relevant experience|n.|kinh nghiệm liên quan|I have relevant experience in retail.
as shown in my résumé|phr.|như trong CV của tôi|As shown in my résumé, I speak Korean.
recommend highly|phr.|hết sức giới thiệu|I recommend her highly.
reliable|adj.|đáng tin cậy|He is a reliable worker.
contribute to|phr.|đóng góp cho|I hope to contribute to your team.
at your convenience|phr.|khi bạn tiện|I can meet at your convenience.
qualifications|n.|trình độ|My qualifications match the job.
former employer|n.|chủ cũ|Contact my former employer.
strong candidate|n.|ứng viên mạnh|She is a strong candidate.`);
  add("q-p1d", "part", 0, 0, "Part 1 · Mô tả tranh", "Hành động tay & tư thế", `
hold|v.|cầm|A man is holding a cup.
point at|phr.|chỉ vào|She is pointing at a screen.
carry|v.|mang|He is carrying a bag.
push|v.|đẩy|A woman is pushing a cart.
pull|v.|kéo|He is pulling a suitcase.
bend over|phr.|cúi xuống|A man is bending over a desk.
kneel|v.|quỳ|A worker is kneeling on the floor.
shake hands|phr.|bắt tay|Two people are shaking hands.
lift|v.|nhấc|They are lifting a box.
stand in line|phr.|đứng xếp hàng|Customers are standing in line.`);
})();
