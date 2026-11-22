/* Bộ từ mở rộng đợt 2. Mỗi dòng: từ|loại|nghĩa|ví dụ */
(function () {
  const add = (id, group, band, name, en, text) => VOCAB.push({ id, group, band, name, en, x: 1, words: text.trim().split("\n").map(l => { const [w, pos, vi, ex] = l.trim().split("|"); return [w, "", pos, vi, ex]; }) });
  add("x-time", "topic", 0, "Thời gian & lịch hẹn", "Time & scheduling", `
schedule|n./v.|lịch trình; lên lịch|The schedule for next week is on the board.
calendar|n.|lịch|Please mark the date on your calendar.
available|adj.|rảnh, có sẵn|Are you available on Tuesday morning?
on time|phr.|đúng giờ|The train arrived on time.
in a hurry|phr.|đang vội|She left in a hurry after the call.
weekday|n.|ngày trong tuần|The office is open on every weekday.
annual|adj.|hằng năm|The annual meeting is held in March.
punctual|adj.|đúng giờ|Our new driver is always punctual.
overtime|n.|giờ làm thêm|He worked overtime to finish the order.
day off|n.|ngày nghỉ|I'd like to take a day off next Friday.`);
  add("x-eat", "topic", 0, "Ăn uống & quán xá", "Food & dining", `
menu|n.|thực đơn|Could we see the menu, please?
order|v./n.|gọi món; đơn hàng|Are you ready to order?
bill|n.|hóa đơn thanh toán|Can we have the bill, please?
tip|n.|tiền boa|We left a tip for the waiter.
chef|n.|đầu bếp|The chef prepares fresh pasta every day.
ingredient|n.|nguyên liệu|We only use local ingredients.
dessert|n.|món tráng miệng|Would you like some dessert?
takeout|n.|đồ ăn mang đi|Let's get takeout for lunch.
vegetarian|adj.|chay|Do you have any vegetarian dishes?
book a table|phr.|đặt bàn|I'd like to book a table for six.`);
  add("x-equip", "topic", 0, "Thiết bị & văn phòng phẩm", "Office supplies", `
printer|n.|máy in|The printer is out of ink.
stapler|n.|cái dập ghim|May I borrow your stapler?
envelope|n.|phong bì|Put the form in this envelope.
folder|n.|bìa hồ sơ, thư mục|The contracts are in the blue folder.
cabinet|n.|tủ hồ sơ|Old files are stored in the cabinet.
projector|n.|máy chiếu|The projector in room B is not working.
supplies|n.|vật tư, văn phòng phẩm|We need to order more office supplies.
cartridge|n.|hộp mực|Please replace the empty cartridge.
drawer|n.|ngăn kéo|The keys are in the top drawer.
bulletin board|n.|bảng thông báo|The notice is posted on the bulletin board.`);
  add("x-price", "topic", 0, "Giá cả & thanh toán", "Prices & payment", `
price|n.|giá|The price includes tax.
cash|n.|tiền mặt|Do you accept cash?
credit card|n.|thẻ tín dụng|You can pay by credit card.
change|n.|tiền thừa|Here is your change.
affordable|adj.|giá phải chăng|The hotel offers affordable rooms.
charge|v./n.|tính phí; khoản phí|There is no charge for delivery.
half price|phr.|nửa giá|All shoes are half price today.
total|n.|tổng cộng|The total comes to forty dollars.
coupon|n.|phiếu giảm giá|This coupon is valid until June.
cost|v./n.|có giá; chi phí|How much does the ticket cost?`);
  add("x-jobs", "topic", 0, "Nghề nghiệp & chức danh", "Jobs & titles", `
receptionist|n.|lễ tân|The receptionist will give you a visitor badge.
accountant|n.|kế toán viên|Our accountant prepares the monthly report.
cashier|n.|thu ngân|Please pay the cashier at the front.
manager|n.|quản lý|The store manager approved the refund.
assistant|n.|trợ lý|Her assistant scheduled the meeting.
sales representative|n.|nhân viên kinh doanh|A sales representative will contact you soon.
architect|n.|kiến trúc sư|The architect designed the new library.
mechanic|n.|thợ máy|The mechanic checked the engine.
executive|n.|giám đốc điều hành|Several executives attended the launch.
clerk|n.|nhân viên văn phòng, bán hàng|The clerk helped me find the right size.`);
  add("x-places", "topic", 0, "Địa điểm & chỉ đường", "Places & directions", `
across from|phr.|đối diện|The bank is across from the post office.
intersection|n.|ngã tư|Turn left at the next intersection.
entrance|n.|lối vào|Please use the main entrance.
lobby|n.|sảnh|Let's meet in the hotel lobby.
downtown|adv./n.|trung tâm thành phố|Our office is located downtown.
second floor|n.|tầng hai|The cafeteria is on the second floor.
nearby|adj./adv.|gần đây|Is there a pharmacy nearby?
headquarters|n.|trụ sở chính|The company's headquarters is in Seoul.
branch|n.|chi nhánh|A new branch opened last month.
directions|n.|chỉ dẫn đường đi|Could you give me directions to the station?`);
  add("x-bank", "topic", 1, "Ngân hàng", "Banking", `
account|n.|tài khoản|I'd like to open a savings account.
balance|n.|số dư|You can check your balance online.
loan|n.|khoản vay|The bank approved our business loan.
interest rate|n.|lãi suất|The interest rate will rise next month.
teller|n.|giao dịch viên|The teller counted the cash twice.
transfer|v./n.|chuyển khoản|Please transfer the payment by Friday.
statement|n.|sao kê|Your monthly statement is available online.
mortgage|n.|khoản vay mua nhà|They applied for a mortgage last year.
currency|n.|tiền tệ|You can exchange currency at the airport.
overdue|adj.|quá hạn|The payment is two weeks overdue.`);
  add("x-post", "topic", 1, "Bưu điện & chuyển phát", "Mail & shipping", `
package|n.|bưu kiện|A package arrived for you this morning.
postage|n.|bưu phí|How much is the postage to Japan?
courier|n.|dịch vụ chuyển phát|The documents were sent by courier.
fragile|adj.|dễ vỡ|This box contains fragile items.
recipient|n.|người nhận|The recipient must show an ID.
express mail|n.|thư chuyển phát nhanh|Send the contract by express mail.
deliver|v.|giao hàng|We deliver within two business days.
return address|n.|địa chỉ người gửi|Write the return address on the back.
weigh|v.|cân nặng|The parcel weighs three kilograms.
customs|n.|hải quan|The shipment was held at customs.`);
  add("x-rent", "topic", 1, "Thuê xe & phương tiện", "Car rental", `
rent|v.|thuê|We rented a car for the weekend.
driver's license|n.|bằng lái xe|Please show your driver's license.
insurance coverage|n.|phạm vi bảo hiểm|Full insurance coverage costs extra.
mileage|n.|số dặm đã đi|The rental includes unlimited mileage.
fuel|n.|nhiên liệu|Return the car with a full tank of fuel.
compact car|n.|xe cỡ nhỏ|A compact car is cheaper to rent.
drop-off location|n.|điểm trả xe|The drop-off location is at the airport.
reserve|v.|đặt trước|I reserved a van for Saturday.
rate|n.|mức giá|The daily rate is fifty dollars.
late fee|n.|phí trả muộn|A late fee applies after 6 p.m.`);
  add("x-fun", "topic", 1, "Giải trí & nghệ thuật", "Entertainment", `
exhibition|n.|triển lãm|The exhibition opens on Friday.
performance|n.|buổi biểu diễn|Tonight's performance is sold out.
audience|n.|khán giả|The audience applauded loudly.
admission|n.|vé vào cửa|Admission is free on Sundays.
gallery|n.|phòng trưng bày|The gallery displays local artists' work.
box office|n.|quầy bán vé|Tickets are available at the box office.
rehearsal|n.|buổi diễn tập|The rehearsal starts at five.
intermission|n.|giờ giải lao|There is a short intermission after act one.
sold out|adj.|hết vé|The concert was sold out in an hour.
venue|n.|địa điểm tổ chức|The venue can hold 500 people.`);
  add("x-news", "topic", 1, "Thời tiết & tin tức", "Weather & news", `
forecast|n.|dự báo|The forecast calls for rain tomorrow.
temperature|n.|nhiệt độ|The temperature will drop tonight.
storm|n.|cơn bão|The storm delayed several flights.
humid|adj.|ẩm ướt|It is hot and humid in July.
headline|n.|tiêu đề tin|The merger made headlines today.
reporter|n.|phóng viên|A reporter interviewed the mayor.
update|n./v.|cập nhật|Here is an update on the traffic.
expected|adj.|được dự đoán|Heavy snow is expected this weekend.
local|adj.|địa phương|Local stores will close early.
clear up|phr.|quang đãng trở lại|The sky should clear up by noon.`);
  add("x-pay", "topic", 1, "Lương & phúc lợi", "Salary & benefits", `
salary|n.|lương tháng|The position offers a competitive salary.
wage|n.|tiền công|The minimum wage went up this year.
bonus|n.|tiền thưởng|Staff received a year-end bonus.
raise|n.|đợt tăng lương|She asked for a raise.
paid leave|n.|nghỉ phép có lương|Employees get fifteen days of paid leave.
pension|n.|lương hưu|He will receive a pension at sixty.
payroll|n.|bảng lương|The payroll department handles payments.
incentive|n.|khoản khuyến khích|The company offers incentives for top sellers.
sick leave|n.|nghỉ ốm|She is on sick leave today.
compensation|n.|thù lao, đền bù|The compensation package includes health insurance.`);
  add("x-acct", "topic", 2, "Kế toán", "Accounting", `
ledger|n.|sổ cái|Every payment is recorded in the ledger.
asset|n.|tài sản|The building is the firm's largest asset.
liability|n.|khoản nợ|The report lists all assets and liabilities.
fiscal year|n.|năm tài chính|The fiscal year ends in June.
accurate|adj.|chính xác|Please make sure the figures are accurate.
calculate|v.|tính toán|The software calculates taxes automatically.
outstanding balance|n.|số dư chưa thanh toán|Please pay the outstanding balance.
bookkeeping|n.|việc ghi sổ kế toán|She handles bookkeeping for the shop.
deduct|v.|khấu trừ|Taxes are deducted from your pay.
quarterly|adj.|hằng quý|The quarterly report is due next week.`);
  add("x-invest", "topic", 2, "Đầu tư", "Investment", `
invest|v.|đầu tư|The firm will invest in new equipment.
shareholder|n.|cổ đông|Shareholders approved the plan.
stock|n.|cổ phiếu|The company's stock rose five percent.
portfolio|n.|danh mục đầu tư|He manages a large portfolio.
return|n.|lợi tức|The fund offers a steady return.
risk|n.|rủi ro|Every investment carries some risk.
fund|n./v.|quỹ; cấp vốn|The project is funded by the city.
dividend|n.|cổ tức|The dividend is paid twice a year.
long-term|adj.|dài hạn|This is a long-term investment.
advisor|n.|cố vấn|Talk to a financial advisor first.`);
  add("x-retail", "topic", 2, "Bán lẻ", "Retail", `
merchandise|n.|hàng hóa|All merchandise is ten percent off.
display|v./n.|trưng bày|New items are displayed near the door.
checkout|n.|quầy thanh toán|There is a long line at the checkout.
clearance sale|n.|đợt xả hàng|The clearance sale ends on Sunday.
retailer|n.|nhà bán lẻ|The retailer has stores in six cities.
wholesale|adj.|bán sỉ|We buy at wholesale prices.
aisle|n.|lối đi giữa các kệ|Bread is in aisle four.
customer loyalty|n.|sự trung thành của khách|Rewards help build customer loyalty.
brand|n.|thương hiệu|This brand is popular with teenagers.
purchase|v./n.|mua; món hàng mua|Thank you for your purchase.`);
  add("x-qc", "topic", 2, "Kiểm soát chất lượng", "Quality control", `
defect|n.|lỗi, khuyết tật|Each unit is checked for defects.
standard|n.|tiêu chuẩn|Our products meet international standards.
inspect|v.|kiểm tra|Workers inspect every item by hand.
durable|adj.|bền|The case is light but durable.
guarantee|v./n.|bảo đảm|We guarantee delivery within a week.
flaw|n.|khiếm khuyết|A small flaw was found in the design.
recall|v./n.|thu hồi sản phẩm|The company recalled the faulty heaters.
reliable|adj.|đáng tin cậy|This model is very reliable.
sample|n.|mẫu thử|We tested a sample from each batch.
meet requirements|phr.|đáp ứng yêu cầu|The parts did not meet requirements.`);
  add("x-product", "topic", 2, "Phát triển sản phẩm", "Product development", `
prototype|n.|bản mẫu|The team built a working prototype.
feature|n.|tính năng|The app has several new features.
feedback|n.|phản hồi|We collected feedback from users.
release|v./n.|phát hành|The update will be released in May.
innovative|adj.|sáng tạo, đổi mới|It is an innovative design.
user-friendly|adj.|dễ sử dụng|The new menu is more user-friendly.
improve|v.|cải thiện|We improved the battery life.
patent|n.|bằng sáng chế|The firm holds a patent on the device.
demand|n.|nhu cầu|Demand for the product is growing.
test|v.|thử nghiệm|The software was tested for a month.`);
  add("x-conf", "topic", 2, "Hội nghị & triển lãm", "Conferences", `
conference|n.|hội nghị|The conference lasts three days.
register|v.|đăng ký|Please register before April 10.
booth|n.|gian hàng|Visit our booth in hall B.
name tag|n.|thẻ tên|Pick up your name tag at the entrance.
panel discussion|n.|buổi thảo luận nhóm chuyên gia|The panel discussion begins at two.
presenter|n.|người thuyết trình|Each presenter has twenty minutes.
trade show|n.|hội chợ thương mại|We met several buyers at the trade show.
networking|n.|việc kết nối quan hệ|There is a networking event tonight.
brochure|n.|tờ giới thiệu|Take a brochure from the table.
participant|n.|người tham gia|Participants will receive lunch.`);
  add("x-policy", "topic", 2, "Chính sách công ty", "Company policy", `
policy|n.|chính sách|The return policy has changed.
dress code|n.|quy định trang phục|The dress code is business casual.
guideline|n.|hướng dẫn|Please follow the safety guidelines.
approval|n.|sự phê duyệt|You need approval from your manager.
prohibit|v.|cấm|Smoking is prohibited in the building.
require|v.|yêu cầu|The form requires a signature.
confidential|adj.|bảo mật|This information is confidential.
effective|adj.|có hiệu lực|The rule is effective from Monday.
violation|n.|sự vi phạm|Any violation will be reported.
handbook|n.|sổ tay|Read the employee handbook carefully.`);
  add("x-legal", "topic", 3, "Pháp lý", "Legal", `
attorney|n.|luật sư|Our attorney reviewed the lease.
dispute|n.|tranh chấp|The dispute was settled last week.
liable|adj.|chịu trách nhiệm pháp lý|The seller is liable for any damage.
clause|n.|điều khoản|Clause five covers late payment.
binding|adj.|có tính ràng buộc|The agreement is legally binding.
breach|n.|sự vi phạm (hợp đồng)|That would be a breach of contract.
regulation|n.|quy định|New regulations take effect in July.
lawsuit|n.|vụ kiện|The firm faces a lawsuit.
consent|n.|sự đồng ý|Written consent is required.
terminate|v.|chấm dứt|Either party may terminate the contract.`);
  add("x-strategy", "topic", 3, "Chiến lược kinh doanh", "Business strategy", `
expand|v.|mở rộng|The chain plans to expand into Asia.
market share|n.|thị phần|Our market share grew by two percent.
competitive|adj.|có tính cạnh tranh|We offer competitive prices.
partnership|n.|quan hệ đối tác|The two firms formed a partnership.
restructure|v.|tái cơ cấu|The company will restructure its sales team.
outsource|v.|thuê ngoài|They outsource their customer support.
forecast|v.|dự báo|Analysts forecast strong growth.
objective|n.|mục tiêu|Our main objective is to cut costs.
diversify|v.|đa dạng hóa|The firm wants to diversify its products.
initiative|n.|sáng kiến|The new initiative reduces waste.`);
  add("x-project", "topic", 3, "Quản lý dự án", "Project management", `
milestone|n.|cột mốc|We reached the first milestone on time.
timeline|n.|tiến độ thời gian|The timeline was extended by a month.
allocate|v.|phân bổ|More staff were allocated to the project.
coordinate|v.|điều phối|She coordinates work between two teams.
progress report|n.|báo cáo tiến độ|Send a progress report every Friday.
on track|phr.|đúng tiến độ|The project is on track.
delegate|v.|giao phó|Good managers delegate tasks.
priority|n.|ưu tiên|Safety is our top priority.
setback|n.|trở ngại|The delay was a minor setback.
finalize|v.|hoàn tất|We will finalize the plan tomorrow.`);
  add("x-tax", "topic", 3, "Bảo hiểm & thuế", "Insurance & tax", `
premium|n.|phí bảo hiểm|The monthly premium is thirty dollars.
claim|n./v.|yêu cầu bồi thường|She filed a claim after the accident.
coverage|n.|phạm vi bảo hiểm|The plan offers dental coverage.
deductible|n.|mức khấu trừ|The deductible is five hundred dollars.
policyholder|n.|người mua bảo hiểm|Each policyholder receives a card.
tax return|n.|tờ khai thuế|File your tax return by April.
exempt|adj.|được miễn|Some goods are exempt from tax.
income|n.|thu nhập|Report all income for the year.
withhold|v.|khấu trừ, giữ lại|The employer withholds tax from wages.
refund|n.|khoản hoàn lại|He received a tax refund.`);
  add("x-research", "topic", 3, "Nghiên cứu thị trường", "Market research", `
questionnaire|n.|bảng câu hỏi|Please complete the questionnaire.
respondent|n.|người trả lời khảo sát|Most respondents were satisfied.
trend|n.|xu hướng|The trend is toward online shopping.
analyze|v.|phân tích|We analyzed last year's sales data.
focus group|n.|nhóm khảo sát tập trung|A focus group tested the new flavor.
findings|n.|kết quả nghiên cứu|The findings were published today.
preference|n.|sự ưa thích|Customer preferences change quickly.
indicate|v.|cho thấy|The data indicate a rise in demand.
statistics|n.|số liệu thống kê|The statistics support our plan.
segment|n.|phân khúc|This segment prefers low prices.`);
  add("x-verbs", "part", 3, "Part 5 · Động từ hay gặp", "Key verbs", `
implement|v.|triển khai|The new system was implemented in June.
conduct|v.|tiến hành|We will conduct a survey next month.
obtain|v.|có được|You must obtain a permit first.
ensure|v.|đảm bảo|Please ensure that the door is locked.
notify|v.|thông báo|Notify your supervisor of any changes.
exceed|v.|vượt quá|Sales exceeded our expectations.
attend|v.|tham dự|All staff must attend the meeting.
accommodate|v.|đáp ứng, chứa được|The hall can accommodate 300 guests.
anticipate|v.|dự đoán, lường trước|We anticipate a busy season.
verify|v.|xác minh|Please verify your e-mail address.`);
  add("x-adjs", "part", 3, "Part 5 · Tính từ hay gặp", "Key adjectives", `
additional|adj.|bổ sung|An additional fee may apply.
qualified|adj.|đủ năng lực|We are looking for qualified engineers.
reasonable|adj.|hợp lý|The hotel offers reasonable rates.
temporary|adj.|tạm thời|This is a temporary position.
valid|adj.|còn hiệu lực|Bring a valid passport.
extensive|adj.|sâu rộng|She has extensive experience in sales.
potential|adj.|tiềm năng|We met several potential clients.
efficient|adj.|hiệu quả|The new process is more efficient.
initial|adj.|ban đầu|The initial cost is high.
essential|adj.|thiết yếu|Good service is essential to our success.`);
  add("x-advs", "part", 3, "Part 5 · Trạng từ hay gặp", "Key adverbs", `
promptly|adv.|nhanh chóng, đúng giờ|The meeting will begin promptly at nine.
approximately|adv.|khoảng chừng|The trip takes approximately two hours.
frequently|adv.|thường xuyên|The site is updated frequently.
currently|adv.|hiện tại|The item is currently unavailable.
previously|adv.|trước đây|He previously worked in finance.
exclusively|adv.|dành riêng|This offer is exclusively for members.
relatively|adv.|tương đối|The test was relatively easy.
shortly|adv.|ngay sau đây|The manager will be with you shortly.
recently|adv.|gần đây|We recently opened a new store.
immediately|adv.|ngay lập tức|Please report any problems immediately.`);
  add("x-preps", "part", 4, "Part 5 · Cụm giới từ nâng cao", "Advanced prepositions", `
in compliance with|phr.|tuân theo|The factory operates in compliance with the law.
with regard to|phr.|liên quan đến|I am writing with regard to your order.
in the event of|phr.|trong trường hợp|In the event of rain, the picnic will be moved indoors.
on account of|phr.|do, vì|The road is closed on account of flooding.
in exchange for|phr.|để đổi lấy|You get a discount in exchange for your feedback.
as a result of|phr.|do kết quả của|Sales fell as a result of the strike.
in favor of|phr.|ủng hộ|Most members voted in favor of the plan.
by means of|phr.|bằng cách|Payment is made by means of bank transfer.
in terms of|phr.|xét về mặt|The city is first in terms of population.
aside from|phr.|ngoài ra|Aside from the price, the offer is good.`);
  add("x-confuse", "part", 4, "Part 5 · Cặp từ dễ nhầm", "Confusing words", `
affect|v.|ảnh hưởng đến|The delay will affect our schedule.
effect|n.|tác động, hiệu lực|The new rule had a positive effect.
rise|v.|tăng lên (không có tân ngữ)|Prices rise every year.
raise|v.|nâng lên (có tân ngữ)|The store will raise its prices.
economic|adj.|thuộc kinh tế|The country faces an economic crisis.
economical|adj.|tiết kiệm|This car is very economical.
considerable|adj.|đáng kể|The project took considerable time.
considerate|adj.|chu đáo|The staff were kind and considerate.
lend|v.|cho mượn|Can you lend me your pen?
borrow|v.|mượn|May I borrow your charger?`);
  add("x-para", "part", 4, "Part 7 · Cách diễn đạt lại", "Paraphrasing", `
free of charge|phr.|miễn phí (= complimentary)|Parking is free of charge for guests.
get in touch with|phr.|liên lạc với (= contact)|Please get in touch with our office.
put off|phr.|hoãn (= postpone)|The launch was put off until May.
set up|phr.|thành lập, sắp xếp (= establish)|She set up her own company.
take over|phr.|tiếp quản (= assume control)|Mr. Lin will take over the department.
turn down|phr.|từ chối (= reject)|He turned down the job offer.
carry out|phr.|thực hiện (= conduct)|The team carried out a safety check.
fill out|phr.|điền (= complete)|Please fill out this form.
hand in|phr.|nộp (= submit)|Hand in your report by noon.
look over|phr.|xem qua (= review)|Could you look over my proposal?`);
  add("x-shop", "context", 0, "Mua hàng ở cửa hàng", "In a store", `
try on|phr.|mặc thử|Can I try on this jacket?
fitting room|n.|phòng thử đồ|The fitting room is at the back.
on sale|phr.|đang giảm giá|These shoes are on sale this week.
in a different color|phr.|màu khác|Do you have this in a different color?
gift wrap|v.|gói quà|Could you gift wrap it, please?
size|n.|kích cỡ|What size do you wear?
shopping cart|n.|xe đẩy hàng|He pushed the shopping cart to the car.
I'm just looking|phr.|tôi chỉ xem thôi|Thanks, I'm just looking.
pay at the counter|phr.|thanh toán tại quầy|You can pay at the counter.
price tag|n.|nhãn giá|The price tag says twenty dollars.`);
  add("x-it", "context", 1, "Báo sự cố & hỗ trợ kỹ thuật", "IT support", `
log in|phr.|đăng nhập|I can't log in to my account.
reset the password|phr.|đặt lại mật khẩu|Click here to reset the password.
restart|v.|khởi động lại|Try to restart your computer.
be down|phr.|bị sập, ngừng hoạt động|The server has been down since noon.
error message|n.|thông báo lỗi|An error message appeared on the screen.
plug in|phr.|cắm điện|Make sure the printer is plugged in.
help desk|n.|bộ phận hỗ trợ|Call the help desk for assistance.
back up|phr.|sao lưu|Remember to back up your files.
freeze|v.|bị treo|My laptop keeps freezing.
remotely|adv.|từ xa|The technician fixed it remotely.`);
  add("x-doctor", "context", 1, "Đặt lịch khám & phòng khám", "At the clinic", `
make an appointment|phr.|đặt lịch hẹn|I'd like to make an appointment with Dr. Kim.
checkup|n.|buổi khám tổng quát|It's time for your annual checkup.
waiting room|n.|phòng chờ|Please take a seat in the waiting room.
fill a prescription|phr.|mua thuốc theo đơn|You can fill a prescription at the pharmacy.
symptom|n.|triệu chứng|What symptoms do you have?
reschedule|v.|đổi lịch|I need to reschedule my visit.
insurance card|n.|thẻ bảo hiểm|Please bring your insurance card.
medical record|n.|hồ sơ bệnh án|We will update your medical record.
dentist|n.|nha sĩ|The dentist is available on Thursday.
pharmacy|n.|hiệu thuốc|The pharmacy closes at nine.`);
  add("x-report", "context", 2, "Báo cáo & thuyết trình", "Reports & presentations", `
according to|phr.|theo|According to the chart, sales doubled.
as you can see|phr.|như bạn thấy|As you can see, costs fell in May.
increase by|phr.|tăng thêm|Profits increased by ten percent.
decline|v./n.|giảm|Orders declined in the third quarter.
remain steady|phr.|giữ ổn định|Prices remained steady all year.
peak|n./v.|đỉnh; đạt đỉnh|Visits peaked in August.
summarize|v.|tóm tắt|Let me summarize the main points.
handle questions|phr.|trả lời câu hỏi|I'll handle questions at the end.
chart|n.|biểu đồ|This chart shows monthly revenue.
in conclusion|phr.|tóm lại|In conclusion, the campaign was a success.`);
})();
