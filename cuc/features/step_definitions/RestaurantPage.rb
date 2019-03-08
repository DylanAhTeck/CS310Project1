Given(/^the user is in Restaurant Page 1$/) do
  visit "http://localhost:8080/CSCI310Project1/index.html"
  fill_in 'query', with: 'Chinese'
  page.find(".btn").click
  page.find_by_id("restaurants").find('.card', match: :first).find('.card-content').click
end
Then(/^the Restaurant page will display the name of the restaurant$/) do
  expect(page).to have_css("#restaurant-name", text: "Panda Express")
end
Then(/^the Restaurant page will display the phone number of the restaurant$/) do
  expect(page).to have_css("#restaurant-phone-number", text: "+12138213482")
end
Then(/^the Restaurant page will display the website link of the restaurant$/) do
  expect(page).to have_css("#restaurant-link", text: "https%3A%2F%2Fwww.yelp.com%2Fbiz%2Fpanda-express-los-angeles-27%3Fadjust_creative%3Dptmh1J_WwIl-nsPuODg88Q%26utm_campaign%3Dyelp_api_v3%26utm_medium%3Dapi_v3_business_search%26utm_source%3Dptmh1J_WwIl-nsPuODg88Q")
end

Given(/^the user is in Restaurant Page 1a$/) do
  visit "http://localhost:8080/CSCI310Project1/index.html"
  fill_in 'query', with: 'Chinese'
  page.find(".btn").click
  page.find_by_id("restaurants").find('.card', match: :first).find('.card-content').click
end
When(/^the user clicks on the address of the restaurant$/) do
  page.find_by_id("restaurant-address").click
end
Then(/^the user will be directed to Google Maps directions page$/) do
  expect(page).to have_title("Tommy Trojan to 3607 Trousdale Pkwy, Los Angeles, CA 90089 - Google Maps")
end

Given(/^the user is in Restaurant Page 1b$/) do
  visit "http://localhost:8080/CSCI310Project1/index.html"
  fill_in 'query', with: 'Chinese'
  page.find(".btn").click
  page.find_by_id("restaurants").find('.card', match: :first).find('.card-content').click
end
And(/^the website link of the restaurant is valid$/) do
  expect(page).to have_css("#restaurant-link")
end
When(/^the user clicks website link of the restaurant$/) do
  page.find_by_id("restaurant-link").click
end
Then(/^the user will be directed to the restaurant’s home page$/) do
  expect(page).to have_url("http://localhost:8080/CSCI310Project1/https%3A%2F%2Fwww.yelp.com%2Fbiz%2Fpanda-express-los-angeles-27%3Fadjust_creative%3Dptmh1J_WwIl-nsPuODg88Q%26utm_campaign%3Dyelp_api_v3%26utm_medium%3Dapi_v3_business_search%26utm_source%3Dptmh1J_WwIl-nsPuODg88Q")
end

Given(/^the user is in Restaurant Page 2$/) do
  visit "http://localhost:8080/CSCI310Project1/index.html"
  fill_in 'query', with: 'Chinese'
  page.find(".btn").click
  page.find_by_id("restaurants").find('.card', match: :first).find('.card-content').click
end
When(/^the user clicks the "Print" button$/) do
  expect(page.find(".button", match: :first))
end
Then(/^a printable version of the Restaurant Page will be shown$/) do
  page.find(".button", match: :first).click
end

Given(/^the user is in Restaurant Page 3$/) do
  visit "http://localhost:8080/CSCI310Project1/index.html"
  fill_in 'query', with: 'Chinese'
  page.find(".btn").click
  page.find_by_id("restaurants").find('.card', match: :first).find('.card-content').click
end
When(/^the user clicks the "Back to Results" button$/) do
  page.all('.button')[1].click
end
Then(/^the user should be directed back to the Results Page$/) do
  expect(page).to have_title("ImHungry | Results")
end

Given(/^the user is in Restaurant Page 4$/) do
  visit "http://localhost:8080/CSCI310Project1/index.html"
  fill_in 'query', with: 'Chinese'
  page.find(".btn").click
  page.find_by_id("restaurants").find('.card', match: :first).find('.card-content').click
end
Then(/^display a drop down box 4$/) do
  page.find('.dropdown')
end
And(/^default value for it will be empty 4$/) do
  expect(page).to have_select("dropdown", selected: "")
end

Given(/^the user is in Restaurant Page 5$/) do
  visit "http://localhost:8080/CSCI310Project1/index.html"
  fill_in 'query', with: 'Chinese'
  page.find(".btn").click
  page.find_by_id("restaurants").find('.card', match: :first).find('.card-content').click
end
And(/^a list is selected from the drop down menu 5$/) do
  select "Explore", :from => "dropdown"
end
When(/^the "Add to List" Button is clicked$/) do
  page.find('.dropdown-trigger').click
end
Then(/^the restaurant will be added to the selected list$/) do
  page.find('.dropdown-trigger').click
end