['registered', 'admin'].each do |r|
  Role.find_or_create_by(name: r)
end

users = User.create!([
  { email: 'admin@email.com', password: 'adminpassword', approved: true, role: Role.find_by_name('admin') },
  { email: 'bro@email.com', password: 'bropassword', approved: true },
  { email: 'gtfo@email.com', password: 'gtfopassword' }
  ])

semesters = Semester.create!([
  {name: 'fa14'},
  {name: 'sp14'},
  {name: 'fa15'},
  {name: 'sp15'},
  {name: 'fa16'},
  {name: 'sp17'}
  ])

current_semester = Semester.last

# Removed from https://github.com/trueb2/triangle-public.git
brothers = Brother.create!([
  {first:'first',middle:'middle',last:'last',major:'CS',pledge_class:'Xmen',city:'Champaign',state:'IL',phone:'867-5309',email:'seed@email.com'},
  ])

brothers.each do |brother|
  semesters.each do |semester|
    brother.semesters << semester
  end
end

images = Image.create!([
  { picture: File.new('images/wings_rings.jpg', 'r'), image_purpose: 0 },
  { picture: File.new('images/cards.png', 'r'), image_purpose: 0 },
  { picture: File.new('images/fruit_ninja.png', 'r'), image_purpose: 0 },
  { picture: File.new('images/cray.jpg', 'r'), image_purpose: 0 },
  { picture: File.new('images/frank.jpg', 'r'), image_purpose: 1 },
  { picture: File.new('images/jacob.jpg', 'r'), image_purpose: 1 },
  { picture: File.new('images/alec.png', 'r'), image_purpose: 1 },
  { picture: File.new('images/kyz.png', 'r'), image_purpose: 1 },
  { picture: File.new('images/luc.png', 'r'), image_purpose: 1 },
  { picture: File.new('images/pat.png', 'r'), image_purpose: 1 },
  { picture: File.new('images/vibs.png', 'r'), image_purpose: 1 },
  { picture: File.new('images/jesse.png', 'r'), image_purpose: 1 }
  ])

last = ['','','','Long', 'Trueb', 'Biesterfeld', 'Zhou', 'Hobart', 'Burke', 'Vanjari', 'Seibert']
4.upto(11) do |i|
  images[i].brother = Brother.find_by_last last[i]
  images[i].save!
end

events = Event.create!([
  { start: DateTime.parse('2017-01-17T19:00-06:00'), short: 'Wings & Rings', long: 'We will be watching the Blackhawks game and eating some fantastic chicken wings and onion rings.', event_type: 0 },
  { start: DateTime.parse('2017-01-18T18:30-06:00'), short: 'After Dinner Entertainment', long: 'Chill with us as we play Euchre and Cards Against Humanity after dinner.', event_type: 0 },
  { start: DateTime.parse('2017-01-19T18:30-06:00'), short: 'Fruit Ninja', long: 'The perennial favorite! It\'ll be fun and fruity, so don\'t wear your best shoes.', event_type: 0 },
  { start: DateTime.parse('2017-02-07T12:00-06:00'), short: 'Cray Tech Talk', long: 'Cray is a famous super computing company that will be hosting. Food and drinks will be provided.', event_type: 2 }
  ])

0.upto(3) do |i|
  images[i].event = events[i]
  images[i].save!
end

events.each do |e|
  e.semesters << current_semester
end

jobs = Job.create!([
  { semester_id: current_semester.id, brother_id: Brother.find_by_first('Patrick').id,
    title: 'President', execb: 1, email: 'triangle.uiuc.pres@gmail.com' },
  { semester_id: current_semester.id, brother_id: Brother.find_by_first('Alec').id,
    title: 'Vice President', execb: 2, email: 'triangle.uiuc.ivp@gmail.com' },
  { semester_id: current_semester.id, brother_id: Brother.find_by_first('Vibhu').id,
    title: 'External Director', execb: 3, email: 'triangle.uiuc.evp@gmail.com' },
  { semester_id: current_semester.id, brother_id: Brother.find_by_first('Jacob').id,
    title: 'Recruitment	Director', execb: 4, email: 'triangle.uiuc.rvp@gmail.com' },
  { semester_id: current_semester.id, brother_id: Brother.find_by_first('Luc').id,
    title: 'Social Director', execb: 5, email: 'triangle.uiuc.social@gmail.com' },
  { semester_id: current_semester.id, brother_id: Brother.find_by_first('Kassidy').id,
    title: 'Treasurer', execb: 6, email: 'triangle.uiuc.tres@gmail.com' },
  { semester_id: current_semester.id, brother_id: Brother.find_by_first('Jesse').id,
    title: 'House Manager', execb: 7, email: 'triangle.uiuc.houseman@gmail.com' },
  { semester_id: current_semester.id, brother_id: Brother.find_by_first('Frank').id,
    title: 'Secretary', execb: 8, email: 'triangle.uiuc.sec@gmail.com' },
  { semester_id: current_semester.id, title: 'Brotherhood Chair' },
  { semester_id: current_semester.id, title: 'Recruitment Chair' },
  { semester_id: current_semester.id, title: 'Membership Development Chair' },
  { semester_id: current_semester.id, title: 'Risk Manager' },
  { semester_id: current_semester.id, title: 'Treasurer' },
  { semester_id: current_semester.id, title: 'Service Chair' },
  { semester_id: current_semester.id, title: 'Academics Chair' },
  { semester_id: current_semester.id, title: 'Assistant Houseman' },
  { semester_id: current_semester.id, title: 'Recruitment Chair' },
  { semester_id: current_semester.id, title: 'Social Chair' },
  { semester_id: current_semester.id, title: 'Historian' },
  { semester_id: current_semester.id, title: 'Public Relations Chair' },
  { semester_id: current_semester.id, title: 'Recruitment Chair' },
  { semester_id: current_semester.id, title: 'Engineering Council Representative' },
  { semester_id: current_semester.id, title: 'Commisar' },
  { semester_id: current_semester.id, title: 'Pledge Educator' },
  { semester_id: current_semester.id, title: 'Philanthropy Chair' },
  { semester_id: current_semester.id, title: 'Tech Chair' }
  ])
