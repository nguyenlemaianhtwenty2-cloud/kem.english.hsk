/* Bộ từ mở rộng đợt 4. Mỗi dòng: từ|loại|nghĩa|ví dụ. wk = tuần trong lộ trình, big = chủ đề lớn */
(function () {
  const add = (id, group, band, wk, big, name, text) => VOCAB.push({ id, group, band, wk, big, name, en: big, x: 1, words: text.trim().split("\n").map(l => { const [w, pos, vi, ex] = l.trim().split("|"); return [w, "", pos, vi, ex]; }) });
  add("z-warranty", "topic", 2, 6, "Mua sắm & chăm sóc khách hàng", "Bảo hành", `
cover|v.|bao gồm, chi trả|The warranty covers parts and labor.
expire|v.|hết hạn|The warranty expires after two years.
repair|v./n.|sửa chữa|The shop will repair the screen for free.
terms|n.|điều khoản|Read the terms of the warranty carefully.
protect|v.|bảo vệ|This plan protects your phone against damage.
characteristic|n.|đặc điểm|Long battery life is a key characteristic.
consequence|n.|hậu quả|Misuse may have serious consequences.
imply|v.|ngụ ý|The label implies a lifetime guarantee.
promise|v./n.|hứa; lời hứa|The company promises fast service.
require|v.|yêu cầu|A receipt is required for all repairs.`);
  add("z-computer", "topic", 1, 3, "Công nghệ & phát triển sản phẩm", "Máy tính", `
display|n.|màn hình hiển thị|The display is too dark.
keyboard|n.|bàn phím|This keyboard is very quiet.
shut down|phr.|tắt máy|Shut down your computer before you leave.
storage|n.|bộ nhớ lưu trữ|The laptop has plenty of storage.
search|v./n.|tìm kiếm|Search the database for the client's name.
delete|v.|xóa|Do not delete this folder.
failure|n.|sự hỏng hóc|A power failure erased the data.
ignore|v.|bỏ qua|You can ignore this warning.
figure out|phr.|tìm ra cách|I can't figure out this program.
duplicate|v./n.|sao chép; bản sao|Please duplicate the file before editing.`);
  add("z-electronics", "topic", 2, 6, "Công nghệ & phát triển sản phẩm", "Thiết bị điện tử", `
device|n.|thiết bị|Turn off all electronic devices.
charger|n.|bộ sạc|I left my charger at the hotel.
network|n.|mạng|The office network is down.
popular|adj.|phổ biến|This tablet is popular with students.
process|v./n.|xử lý; quy trình|The machine processes orders quickly.
replace|v.|thay thế|Replace the battery every two years.
revolution|n.|cuộc cách mạng|Smartphones started a revolution in travel.
sharp|adj.|sắc nét|The new screen gives a sharp image.
skill|n.|kỹ năng|Basic computer skills are required.
store|v.|lưu trữ|The device stores up to 1,000 photos.`);
  add("z-officetech", "topic", 1, 0, "Văn phòng & lịch làm việc", "Công nghệ văn phòng", `
copier|n.|máy photocopy|The copier on this floor is new.
scanner|n.|máy quét|Use the scanner to send the form.
in use|phr.|đang được dùng|The meeting room is in use.
stock|n.|hàng dự trữ|We keep paper in stock.
capacity|n.|sức chứa, công suất|The tray has a capacity of 500 sheets.
durable|adj.|bền|We need a durable printer.
initiative|n.|sự chủ động|She took the initiative to fix the problem.
physically|adv.|về mặt vật lý|The server is physically located downstairs.
provider|n.|nhà cung cấp dịch vụ|We changed our Internet provider.
recur|v.|lặp lại|The error recurs every morning.`);
  add("z-procedure", "topic", 1, 3, "Văn phòng & lịch làm việc", "Thủ tục văn phòng", `
appreciate|v.|đánh giá cao, cảm kích|We appreciate your quick reply.
be made of|phr.|được làm từ|The folders are made of recycled paper.
bring in|phr.|mời vào, đưa vào|The firm brought in a consultant.
casually|adv.|một cách thoải mái|Staff may dress casually on Fridays.
code|n.|quy tắc; mã|Please follow the dress code.
glimpse|n.|cái nhìn thoáng qua|Visitors get a glimpse of the factory.
out of|phr.|hết|We are out of envelopes.
outdated|adj.|lỗi thời|This manual is outdated.
practice|n.|thông lệ|It is common practice to sign in.
verbally|adv.|bằng lời nói|The offer was made verbally.`);
  add("z-mail", "topic", 2, 9, "Thư tín & giấy tờ", "Thư tín", `
assemble|v.|tập hợp, sắp xếp|Please assemble the pages in order.
beforehand|adv.|trước đó|Send the agenda beforehand.
complication|n.|sự rắc rối|There were complications with the address.
courier|n.|người giao thư|The courier arrives at ten.
fold|v.|gấp|Fold the letter in three.
layout|n.|bố cục|The layout of the letter is clear.
mention|v.|đề cập|She mentioned the delay in her e-mail.
petition|n.|đơn kiến nghị|Residents signed a petition.
proof|n.|bản in thử; bằng chứng|Check the proof before printing.
revise|v.|chỉnh sửa|Please revise the second paragraph.`);
  add("z-invoice", "topic", 2, 7, "Tài chính, ngân hàng & thuế", "Hóa đơn", `
charge|n.|khoản phí|There is an extra charge for delivery.
compile|v.|tổng hợp|He compiled a list of unpaid invoices.
customer|n.|khách hàng|The customer paid in full.
discount|n.|khoản giảm giá|A five percent discount was applied.
efficient|adj.|hiệu quả|Online billing is more efficient.
estimate|v.|ước tính|We estimate the cost at 900 dollars.
impose|v.|áp đặt|The bank imposed a late fee.
mistake|n.|lỗi|There is a mistake on the invoice.
promptly|adv.|đúng hạn|Please pay promptly.
rectify|v.|sửa cho đúng|We will rectify the error today.`);
  add("z-inventory", "topic", 2, 4, "Sản xuất & chuỗi cung ứng", "Kiểm kê hàng hóa", `
adjust|v.|điều chỉnh|We adjusted the order quantity.
automatically|adv.|tự động|Stock levels update automatically.
crucial|adj.|rất quan trọng|Accurate counts are crucial.
discrepancy|n.|sự chênh lệch|There is a discrepancy in the totals.
disturb|v.|làm phiền, làm xáo trộn|Do not disturb the labeled boxes.
liability|n.|trách nhiệm pháp lý|The store accepts no liability for lost items.
reflect|v.|phản ánh|The report reflects last week's sales.
run|v.|vận hành|The system runs a check every night.
scan|v.|quét|Scan each item at the door.
subtract|v.|trừ đi|Subtract the returned items from the total.`);
  add("z-finstate", "topic", 3, 8, "Tài chính, ngân hàng & thuế", "Báo cáo tài chính", `
desire|v./n.|mong muốn|Investors desire steady growth.
detail|n.|chi tiết|The report gives every detail.
forecast|n.|dự báo|The forecast for next year is positive.
level|n.|mức|Debt reached a record level.
overall|adj.|tổng thể|Overall profit increased.
perspective|n.|góc nhìn|From an investor's perspective, the news is good.
project|v.|dự tính|We project a ten percent rise.
realistic|adj.|thực tế|The target is realistic.
translate|v.|chuyển thành|Higher sales translate into higher profit.
typically|adv.|thường thì|Sales are typically slow in January.`);
  add("z-dept", "topic", 1, 3, "Văn phòng & lịch làm việc", "Phòng ban & cơ sở", `
adjacent|adj.|liền kề|The lab is adjacent to the office.
collaboration|n.|sự hợp tác|The design is a collaboration between two teams.
concentrate|v.|tập trung|It is hard to concentrate in a noisy room.
conducive|adj.|có lợi cho|The quiet floor is conducive to work.
disruption|n.|sự gián đoạn|The move caused little disruption.
hamper|v.|cản trở|Noise hampers productivity.
inconsiderately|adv.|thiếu chu đáo|He inconsiderately took two parking spaces.
lobby|n.|sảnh|Wait for me in the lobby.
move up|phr.|thăng tiến|She moved up to the head office.
open to|phr.|sẵn sàng tiếp nhận|The manager is open to new ideas.`);
  add("z-lease", "topic", 2, 9, "Nhà ở & xây dựng", "Thuê & cho thuê", `
apprehensive|adj.|lo ngại|Tenants were apprehensive about the rent increase.
circumstance|n.|hoàn cảnh|Under the circumstances, we will stay.
condition|n.|tình trạng; điều kiện|The apartment is in good condition.
due to|phr.|do|The move was delayed due to rain.
fluctuate|v.|dao động|Rents fluctuate with demand.
get out of|phr.|thoát khỏi|He wants to get out of the lease.
indicator|n.|chỉ số|Rent is an indicator of demand.
lock into|phr.|ràng buộc vào|We are locked into a two-year contract.
occupy|v.|sử dụng, chiếm chỗ|The firm occupies three floors.
subject to|phr.|phải chịu, tùy thuộc|Prices are subject to change.`);
  add("z-lunch", "topic", 0, 1, "Ăn uống, sự kiện & hội nghị", "Đặt đồ ăn", `
burden|n.|gánh nặng|Ordering for fifty people is a burden.
commonly|adv.|thường|Sandwiches are commonly ordered for meetings.
delivery|n.|việc giao hàng|Delivery takes thirty minutes.
elegant|adj.|thanh lịch|The restaurant has an elegant dining room.
fall to|phr.|thuộc trách nhiệm của|The task fell to the new assistant.
impress|v.|gây ấn tượng|The meal impressed our guests.
individual|adj.|riêng lẻ|Each lunch comes in an individual box.
multiple|adj.|nhiều|We placed multiple orders.
narrow|v.|thu hẹp|Let's narrow the choices to three.
settle|v.|thanh toán|I'll settle the bill.`);
  add("z-cook", "topic", 1, 2, "Ăn uống, sự kiện & hội nghị", "Nấu ăn & bếp", `
accustom|v.|làm quen|Chefs are accustomed to long hours.
apprentice|n.|người học việc|He began as an apprentice in a bakery.
culinary|adj.|thuộc nấu nướng|She studied at a culinary school.
demanding|adj.|đòi hỏi cao|Cooking is a demanding job.
draw|v.|thu hút|The new menu draws large crowds.
incorporate|v.|kết hợp|The chef incorporates local herbs.
influx|n.|dòng đổ vào|There was an influx of tourists.
method|n.|phương pháp|Steaming is a healthy cooking method.
outlet|n.|cửa hàng, chi nhánh|The chain has ten outlets.
relinquish|v.|từ bỏ|He relinquished his role as head chef.`);
  add("z-movie", "topic", 1, 5, "Giáo dục, giải trí & thể thao", "Phim ảnh", `
attain|v.|đạt được|The film attained great success.
combine|v.|kết hợp|The movie combines comedy and drama.
continue|v.|tiếp tục|The story continues in part two.
description|n.|mô tả|Read the description of the film.
disperse|v.|giải tán|The crowd dispersed after the show.
entertainment|n.|sự giải trí|The city offers plenty of entertainment.
influence|v./n.|ảnh hưởng|Reviews influence ticket sales.
range|n.|phạm vi, loạt|The theater shows a wide range of films.
release|v.|phát hành|The film will be released in June.
represent|v.|đại diện|The actor represents a new generation.`);
  add("z-music", "topic", 1, 5, "Giáo dục, giải trí & thể thao", "Âm nhạc & sân khấu", `
available|adj.|có sẵn|Tickets are available online.
broaden|v.|mở rộng|Travel broadens your taste in music.
category|n.|thể loại|Jazz is my favorite category.
disparate|adj.|khác biệt|The band mixes disparate styles.
divide|v.|chia|The audience was divided into two groups.
favor|v.|ưa thích|Young listeners favor pop music.
instinct|n.|bản năng|She plays by instinct.
prefer|v.|thích hơn|I prefer live concerts.
reason|n.|lý do|There is a reason for the delay.
taste|n.|sở thích|The two friends have similar taste in music.`);
  add("z-museum", "topic", 1, 6, "Giáo dục, giải trí & thể thao", "Bảo tàng & triển lãm", `
acquire|v.|mua được, có được|The museum acquired a rare painting.
admire|v.|ngưỡng mộ|Visitors admired the sculptures.
collection|n.|bộ sưu tập|The collection includes 300 photographs.
criticism|n.|sự phê bình|The show received some criticism.
express|v.|bày tỏ|Art lets people express ideas.
fashion|n.|thời trang; kiểu cách|The exhibit covers a century of fashion.
leisure|n.|thời gian rảnh|She paints in her leisure time.
respond|v.|phản hồi|Critics responded warmly.
schedule|v.|lên lịch|The tour is scheduled for noon.
spectrum|n.|phổ, dải|The show covers a broad spectrum of styles.`);
  add("z-hospital", "topic", 2, 4, "Sức khỏe & môi trường", "Bệnh viện", `
admit|v.|cho nhập viện|He was admitted last night.
authorize|v.|cho phép|The doctor authorized the test.
designate|v.|chỉ định|Park only in designated areas.
escort|v.|hộ tống, đưa đi|A nurse will escort you to the room.
identify|v.|xác định|Please identify yourself at the desk.
mission|n.|sứ mệnh|The hospital's mission is to serve the community.
permit|v.|cho phép|Visitors are permitted after 2 p.m.
pertinent|adj.|có liên quan|Bring all pertinent records.
procedure|n.|thủ thuật, quy trình|The procedure takes an hour.
result|n.|kết quả|The test results will be ready tomorrow.`);
  add("z-pharmacy", "topic", 2, 4, "Sức khỏe & môi trường", "Hiệu thuốc", `
consult|v.|tham khảo ý kiến|Consult your pharmacist first.
control|v.|kiểm soát|This medicine controls pain.
convenient|adj.|tiện lợi|The pharmacy has convenient hours.
detect|v.|phát hiện|The test detects problems early.
factor|n.|yếu tố|Age is an important factor.
interaction|n.|sự tương tác|Ask about drug interactions.
limit|n.|giới hạn|Do not exceed the daily limit.
monitor|v.|theo dõi|Nurses monitor patients closely.
potential|adj.|tiềm ẩn|Read about potential side effects.
volunteer|n./v.|tình nguyện viên; tình nguyện|Volunteers deliver medicine to elderly patients.`);
  add("z-career", "topic", 2, 10, "Nhân sự & tuyển dụng", "Sự nghiệp", `
ability|n.|năng lực|She has the ability to lead.
abundant|adj.|dồi dào|Jobs are abundant in this field.
accomplishment|n.|thành tựu|List your accomplishments on your résumé.
background|n.|nền tảng, lý lịch|He has a background in law.
call in|phr.|gọi vào|We called in five candidates.
confidence|n.|sự tự tin|She answered with confidence.
constantly|adv.|liên tục|He is constantly learning.
expert|n.|chuyên gia|She is an expert in tax law.
hesitant|adj.|do dự|He was hesitant to accept.
present|v.|trình bày|Present your ideas clearly.`);
  add("z-hiring", "topic", 2, 10, "Nhân sự & tuyển dụng", "Tuyển dụng & đào tạo", `
conduct|v.|tiến hành|We conduct interviews on Fridays.
generate|v.|tạo ra|The ad generated many applications.
hire|v.|tuyển|The firm hired ten graduates.
keep up with|phr.|theo kịp|Training helps staff keep up with changes.
look up to|phr.|kính trọng|New staff look up to her.
on track|phr.|đúng hướng|Your training is on track.
reject|v.|từ chối|Two applicants were rejected.
set up|phr.|sắp xếp|HR set up an interview.
success|n.|thành công|The program was a success.
update|v.|cập nhật|Please update your contact details.`);
  add("z-traffic", "topic", 1, 5, "Giao thông & địa điểm", "Giao thông đô thị", `
rush hour|n.|giờ cao điểm|Avoid driving during rush hour.
lane|n.|làn đường|The left lane is closed.
pedestrian|n.|người đi bộ|Pedestrians must use the bridge.
traffic light|n.|đèn giao thông|Turn right at the traffic light.
road work|n.|công trình sửa đường|Expect delays because of road work.
commuter|n.|người đi làm hằng ngày|Commuters complained about the fare.
speed limit|n.|giới hạn tốc độ|The speed limit is fifty.
sidewalk|n.|vỉa hè|The sidewalk is being repaired.
shortcut|n.|đường tắt|He knows a shortcut to the station.
be stuck in traffic|phr.|bị kẹt xe|I was stuck in traffic for an hour.`);
  add("z-train", "topic", 0, 1, "Giao thông & địa điểm", "Tàu xe công cộng", `
platform|n.|sân ga|The train leaves from platform three.
ticket office|n.|quầy vé|The ticket office opens at six.
timetable|n.|bảng giờ tàu xe|Check the timetable online.
one-way|adj.|một chiều|A one-way ticket costs nine dollars.
transfer|v.|chuyển tuyến|Transfer to the blue line at Central.
subway|n.|tàu điện ngầm|The subway is faster than the bus.
stop|n.|điểm dừng|Get off at the next stop.
get on|phr.|lên xe|Get on the bus at the front door.
seat|n.|chỗ ngồi|Is this seat taken?
conductor|n.|nhân viên soát vé|The conductor checked our tickets.`);
  add("z-plan", "topic", 3, 11, "Chiến lược, dự án & kinh tế", "Kế hoạch kinh doanh", `
address|v.|giải quyết|The plan addresses three problems.
avoid|v.|tránh|We want to avoid extra costs.
demonstrate|v.|chứng minh|The data demonstrate strong demand.
develop|v.|phát triển|We developed a five-year plan.
evaluate|v.|đánh giá|The board will evaluate the proposal.
gather|v.|thu thập|We gathered data from 200 stores.
offer|v./n.|đề nghị|They offered a lower price.
primarily|adv.|chủ yếu|The plan focuses primarily on Asia.
strategy|n.|chiến lược|We need a new pricing strategy.
substitution|n.|sự thay thế|No substitution is allowed.`);
  add("z-feel", "topic", 1, 2, "Cảm xúc & thái độ", "Cảm xúc", `
pleased|adj.|hài lòng|We are pleased with the results.
disappointed|adj.|thất vọng|Customers were disappointed by the delay.
confident|adj.|tự tin|She is confident about the interview.
concerned|adj.|lo ngại|We are concerned about the cost.
grateful|adj.|biết ơn|I am grateful for your help.
frustrated|adj.|bực bội|He was frustrated by the slow system.
eager|adj.|háo hức|The team is eager to start.
relieved|adj.|nhẹ nhõm|We were relieved to hear the news.
impressed|adj.|ấn tượng|The client was impressed with the demo.
upset|adj.|buồn bực|She was upset about the mistake.`);
  add("z-opinion", "topic", 2, 6, "Cảm xúc & thái độ", "Ý kiến & đánh giá", `
recommend|v.|đề xuất|I recommend the earlier flight.
agree|v.|đồng ý|We agree with your proposal.
doubt|v./n.|nghi ngờ|I doubt that it will arrive today.
convince|v.|thuyết phục|She convinced the board.
approve of|phr.|tán thành|The manager approves of the change.
object to|phr.|phản đối|Several residents objected to the plan.
point out|phr.|chỉ ra|He pointed out an error.
in my opinion|phr.|theo ý tôi|In my opinion, the price is fair.
suggest|v.|gợi ý|I suggest meeting on Monday.
prefer|v.|thích hơn|Most guests prefer a quiet room.`);
  add("z-verbs2", "part", 2, 7, "Part 5 · Từ loại hay gặp", "Động từ hay gặp 2", `
announce|v.|thông báo|The firm announced a new product.
confirm|v.|xác nhận|Please confirm your attendance.
provide|v.|cung cấp|We provide free training.
receive|v.|nhận|You will receive an e-mail shortly.
complete|v.|hoàn thành|Complete the form in ink.
increase|v.|tăng|We increased production.
offer|v.|cung cấp, mời|The hotel offers free parking.
schedule|v.|lên lịch|The meeting is scheduled for nine.
review|v.|xem xét|The lawyer reviewed the contract.
contact|v.|liên hệ|Contact us by phone.`);
  add("z-verbs3", "part", 3, 8, "Part 5 · Từ loại hay gặp", "Động từ hay gặp 3", `
acknowledge|v.|xác nhận đã nhận|We acknowledge receipt of your letter.
enhance|v.|nâng cao|The update enhances security.
facilitate|v.|tạo điều kiện|The app facilitates payment.
streamline|v.|tinh giản|We streamlined the process.
undergo|v.|trải qua|The hotel is undergoing repairs.
authorize|v.|ủy quyền|Only managers can authorize refunds.
designate|v.|chỉ định|She was designated team leader.
oversee|v.|giám sát|He oversees three stores.
retain|v.|giữ lại|Retain your ticket until the end.
commence|v.|bắt đầu|Work will commence on Monday.`);
  add("z-adjs2", "part", 2, 7, "Part 5 · Từ loại hay gặp", "Tính từ hay gặp 2", `
available|adj.|có sẵn|The room is available on Friday.
responsible|adj.|chịu trách nhiệm|Who is responsible for sales?
successful|adj.|thành công|The launch was successful.
recent|adj.|gần đây|See our recent report.
necessary|adj.|cần thiết|A visa is necessary.
convenient|adj.|thuận tiện|Choose a convenient time.
similar|adj.|tương tự|The two plans are similar.
various|adj.|đa dạng|We sell various sizes.
entire|adj.|toàn bộ|The entire team attended.
significant|adj.|đáng kể|There was a significant increase.`);
  add("z-adjs3", "part", 3, 8, "Part 5 · Từ loại hay gặp", "Tính từ hay gặp 3", `
mandatory|adj.|bắt buộc|Attendance is mandatory.
preliminary|adj.|sơ bộ|These are preliminary figures.
subsequent|adj.|tiếp theo|Subsequent orders ship free.
versatile|adj.|đa năng|It is a versatile tool.
prospective|adj.|tiềm năng|We met prospective buyers.
complimentary|adj.|miễn phí|Guests get complimentary tea.
accessible|adj.|dễ tiếp cận|The site is accessible by bus.
competent|adj.|có năng lực|She is a competent manager.
cautious|adj.|thận trọng|Investors remain cautious.
adequate|adj.|đầy đủ|The room has adequate lighting.`);
  add("z-advs2", "part", 3, 8, "Part 5 · Từ loại hay gặp", "Trạng từ hay gặp 2", `
steadily|adv.|đều đặn|Sales grew steadily.
considerably|adv.|đáng kể|Costs fell considerably.
directly|adv.|trực tiếp|Report directly to Ms. Lin.
thoroughly|adv.|kỹ lưỡng|Read the manual thoroughly.
consistently|adv.|nhất quán|He consistently meets his targets.
primarily|adv.|chủ yếu|The store sells primarily shoes.
occasionally|adv.|thỉnh thoảng|We occasionally work on weekends.
eventually|adv.|cuối cùng|The package eventually arrived.
closely|adv.|chặt chẽ|The teams work closely together.
accordingly|adv.|cho phù hợp|Plan your trip accordingly.`);
  add("z-nouns2", "part", 2, 7, "Part 5 · Từ loại hay gặp", "Danh từ hay gặp 2", `
application|n.|đơn đăng ký|Send your application by May 5.
delivery|n.|sự giao hàng|Delivery is free.
payment|n.|khoản thanh toán|Payment is due on Friday.
schedule|n.|lịch trình|The schedule is online.
request|n.|yêu cầu|Your request was approved.
position|n.|vị trí|The position is still open.
location|n.|địa điểm|The new location is downtown.
decision|n.|quyết định|The decision is final.
department|n.|phòng ban|Call the sales department.
service|n.|dịch vụ|The service was excellent.`);
  add("z-nouns3", "part", 3, 8, "Part 5 · Từ loại hay gặp", "Danh từ hay gặp 3", `
compliance|n.|sự tuân thủ|Compliance with the rules is required.
competition|n.|sự cạnh tranh|Competition is strong.
availability|n.|tình trạng có sẵn|Check the availability of rooms.
confirmation|n.|sự xác nhận|You will get a confirmation by e-mail.
productivity|n.|năng suất|Productivity rose last year.
distribution|n.|sự phân phối|She manages distribution.
assessment|n.|sự đánh giá|The assessment takes an hour.
priority|n.|ưu tiên|Safety is a priority.
alternative|n.|lựa chọn thay thế|Is there an alternative?
procedure|n.|quy trình|Follow the standard procedure.`);
  add("z-quant", "part", 2, 7, "Part 5 · Cụm từ, giới từ, liên từ", "Số lượng & thời gian", `
a variety of|phr.|nhiều loại|We offer a variety of services.
a series of|phr.|một loạt|He gave a series of talks.
plenty of|phr.|nhiều|There is plenty of time.
the majority of|phr.|phần lớn|The majority of staff agreed.
within|prep.|trong vòng|Reply within three days.
throughout|prep.|suốt, khắp|The sale runs throughout May.
no later than|phr.|không muộn hơn|Arrive no later than nine.
at least|phr.|ít nhất|Bring at least two copies.
up to|phr.|lên tới|Save up to fifty percent.
every other|phr.|cách một|We meet every other week.`);
  add("z-prepcol", "part", 3, 8, "Part 5 · Cụm từ, giới từ, liên từ", "Tính từ + giới từ", `
aware of|phr.|biết về|Are you aware of the change?
capable of|phr.|có khả năng|She is capable of leading a team.
familiar with|phr.|quen thuộc với|He is familiar with the software.
interested in|phr.|quan tâm đến|We are interested in your offer.
satisfied with|phr.|hài lòng với|Clients are satisfied with the result.
dependent on|phr.|phụ thuộc vào|The price is dependent on size.
similar to|phr.|tương tự|This model is similar to the old one.
committed to|phr.|cam kết|We are committed to quality.
equipped with|phr.|được trang bị|Each room is equipped with a desk.
subject to|phr.|tùy thuộc vào|The plan is subject to approval.`);
  add("z-verbprep", "part", 3, 8, "Part 5 · Cụm từ, giới từ, liên từ", "Động từ + giới từ", `
apply for|phr.|nộp đơn xin|He applied for a loan.
comply with|phr.|tuân theo|Comply with all rules.
depend on|phr.|phụ thuộc|It depends on the budget.
participate in|phr.|tham gia|Everyone participated in the survey.
refer to|phr.|tham khảo|Refer to page ten.
result in|phr.|dẫn đến|The error resulted in a delay.
specialize in|phr.|chuyên về|The firm specializes in tax law.
consist of|phr.|bao gồm|The team consists of five people.
respond to|phr.|trả lời|Please respond to this e-mail.
benefit from|phr.|hưởng lợi từ|Staff benefit from the new policy.`);
  add("z-p7c", "part", 3, 10, "Part 7 · Đọc hiểu", "Quảng cáo & thông báo", `
valid|adj.|có hiệu lực|The coupon is valid until May 31.
exclusive|adj.|độc quyền|Members get exclusive offers.
complimentary|adj.|miễn phí|Enjoy a complimentary drink.
while supplies last|phr.|đến khi hết hàng|Free gifts while supplies last.
redeem|v.|đổi (phiếu)|Redeem this coupon in store.
eligible|adj.|đủ điều kiện|New customers are eligible.
in person|phr.|trực tiếp|Apply in person.
terms and conditions|n.|điều khoản và điều kiện|Terms and conditions apply.
inquire|v.|hỏi thông tin|Inquire at the front desk.
RSVP|v.|xác nhận tham dự|Please RSVP by Friday.`);
  add("z-p7d", "part", 4, 11, "Part 7 · Đọc hiểu", "Từ trong bài báo", `
according to|phr.|theo|According to the mayor, work starts soon.
spokesperson|n.|người phát ngôn|A spokesperson confirmed the news.
unveil|v.|công bố|The firm unveiled a new logo.
founder|n.|người sáng lập|The founder still runs the company.
resident|n.|cư dân|Residents welcomed the plan.
award|v./n.|trao giải; giải thưởng|She was awarded first prize.
initially|adv.|ban đầu|The shop initially sold only tea.
predecessor|n.|người tiền nhiệm|He is more careful than his predecessor.
renowned|adj.|nổi tiếng|She is a renowned chef.
surge|n./v.|sự tăng vọt|There was a surge in orders.`);
  add("z-p3c", "part", 1, 3, "Part 3 · Hội thoại", "Đề nghị & phản hồi", `
how about|phr.|thế còn… thì sao|How about meeting at three?
I'd rather|phr.|tôi muốn… hơn|I'd rather take the train.
that works for me|phr.|vậy tiện cho tôi|Friday? That works for me.
I'm afraid|phr.|tôi e rằng|I'm afraid the room is booked.
let me see|phr.|để tôi xem|Let me see if he is free.
do you mind if|phr.|bạn có phiền nếu|Do you mind if I open the window?
no problem|phr.|không vấn đề gì|No problem, I'll send it now.
I was wondering if|phr.|tôi muốn hỏi liệu|I was wondering if you could help.
sounds good|phr.|nghe ổn đấy|Lunch at noon? Sounds good.
I'll get right on it|phr.|tôi làm ngay|The report? I'll get right on it.`);
  add("z-p4c", "part", 2, 5, "Part 4 · Bài nói", "Bản tin & dự báo", `
commute|n.|quãng đường đi làm|Expect a slow commute this morning.
expect|v.|dự kiến|Expect rain this evening.
delay|n.|sự chậm trễ|There are delays on Route 9.
alternate route|n.|tuyến đường thay thế|Drivers should take an alternate route.
listeners|n.|thính giả|Listeners can call in with questions.
coming up|phr.|sắp tới|Coming up next is the sports report.
partly cloudy|phr.|có mây rải rác|Tomorrow will be partly cloudy.
lows|n.|nhiệt độ thấp nhất|Expect lows of ten degrees.
host|n.|người dẫn chương trình|I'm your host, Dana Reed.
stay tuned|phr.|tiếp tục theo dõi|Stay tuned for more news.`);
  add("z-p1c", "part", 0, 0, "Part 1 · Mô tả tranh", "Đồ vật & vị trí", `
next to|phr.|bên cạnh|A lamp is next to the sofa.
in front of|phr.|phía trước|A car is parked in front of the building.
on top of|phr.|ở trên|A box is on top of the cabinet.
in a row|phr.|thành một hàng|Chairs are placed in a row.
side by side|phr.|cạnh nhau|Two men are walking side by side.
pile|n.|chồng, đống|There is a pile of books on the desk.
empty|adj.|trống|The room is empty.
lean over|phr.|cúi người|A woman is leaning over a table.
lie|v.|nằm|Some papers are lying on the floor.
face|v.|hướng về|The chairs face the screen.`);
})();
