Given(/^Tomcat is initialized$/) do
  visit "http://localhost:8080/CSCI310Project1/index.html"
end
Then(/^Search Page should be opened$/) do
  visit "http://localhost:8080/CSCI310Project1/index.html"
end


Given(/^the user is in Search Page 2$/) do
  visit "http://localhost:8080/CSCI310Project1/index.html"
end
Then(/^It should display a text box$/) do
  expect(page).to have_content("query")
end
And(/^with the prompt text “Enter food”$/) do
  expect(page).to have_field("query", :placeholder => "Enter food")
end

Given(/^the user is in Search Page 3$/) do
  visit "http://localhost:8080/CSCI310Project1/index.html"
end
Then(/^it should display a text box$/) do
  expect(page).to have_field("size")
end
And(/^the default value should be 5$/) do
  expect(page).to have_field("size", :with => 5)
end

Given(/^the user is in Search Page 3b$/) do
  visit "http://localhost:8080/CSCI310Project1/index.html"
end
When(/^hover their mouse above the text box$/) do
  page.find(".input").hover
end
Then(/^the default value should be 5$/) do
  expect(page).to have_field("size", :title => "Number of items to show in results")
end

Given(/^user is in Search Page 4$/) do
  visit "http://localhost:8080/CSCI310Project1/index.html"
end
Then(/^display a button with the label “Feed Me!”$/) do
  page.find(".btn")
end

Given(/^the user is on the Search Page 5$/) do
  visit "http://localhost:8080/CSCI310Project1/index.html"
end
And(/^input entered correctly$/) do
  fill_in 'query', with: 'Chinese'
end
When(/^"Feed me" button is clicked$/) do
  page.find(".btn").click
end
Then(/^the user should be directed to Results page$/) do
  expect(page).to have_title "ImHungry | Results"
end

