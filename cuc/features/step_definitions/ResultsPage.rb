Given(/^the user is in Results Page 1$/) do
  visit "http://localhost:8080/CSCI310Project1/results.html"
end
Then(/^display a collage of photos with search term$/) do
  page.find(".is-four-fifths")
end


Given(/^the user is in Results Page 2$/) do
  visit "http://localhost:8080/CSCI310Project1/results.html"
end
Then(/^display a title of the form “Results for F”$/) do
  page.find(".title")
end

Given(/^the user is in Results Page 3$/) do
  visit "http://localhost:8080/CSCI310Project1/results.html"
end
Then(/^display a drop down box$/) do
  expect(page).to have_select("dropdown")
end
And(/^default value for it will be empty$/) do
  expect(page).to have_select("dropdown", selected: "")
end

Given(/^the user is in Results Page 4$/) do
  visit "http://localhost:8080/CSCI310Project1/results.html"
end
Then(/^display a ManageList Button$/) do
  expect(page).to have_content("Manage List")
end

Given(/^the user is in Results Page 4a$/) do
  visit "http://localhost:8080/CSCI310Project1/results.html"
end
And(/^a list is selected from the drop down menu$/) do
  select "Explore", :from => "dropdown"
end
When(/^the ManageList Button is clicked$/) do
  click_on(class: 'button')
end
Then(/^direct the user to the List Management Page$/) do
  expect(page).to have_title("ImHungry | ManageList")
end

Given(/^the user is in Results Page 5$/) do
  visit "http://localhost:8080/CSCI310Project1/index.html"
  fill_in 'query', with: 'Chinese'
  page.find(".btn").click
end
Then(/^display a column of results of restaurant$/) do
  page.find_by_id("restaurants")
end

Given(/^the user is in Results Page 5b$/) do
  visit "http://localhost:8080/CSCI310Project1/index.html"
  fill_in 'query', with: 'Chinese'
  page.find(".btn").click
end
Then(/^the Results Page displays the column of restaurants$/) do
  page.find_by_id("restaurants")
end
And(/^the restaurants must include the following information: i. Name of the restaurant; ii. Address of the restaurant; iv. Minutes of driving to get to the restaurant ;v. Price range of the restaurant$/) do
  expect(page).to has_css(".card-content")
end

Given(/^the user is in Results Page 5c$/) do
  visit "http://localhost:8080/CSCI310Project1/index.html"
    fill_in 'query', with: 'Chinese'
    page.find(".btn").click
end
When(/^the user clicks on the restaurant$/) do
  click_on(class: 'toclick')
end
Then(/^the user should be directed to the Restaurant Page$/) do
  expect(page).to have_title("ImHungry | Restaurant")
end

Given(/^the user is in Results Page 6$/) do
  visit "http://localhost:8080/CSCI310Project1/index.html"
    fill_in 'query', with: 'Chinese'
    page.find(".btn").click
end
Then(/^display a column of results of recipe$/) do
  page.find_by_id("recipes")
end

Given(/^the user is in Results Page 6b$/) do
  visit "http://localhost:8080/CSCI310Project1/index.html"
  fill_in 'query', with: 'Chinese'
  page.find(".btn").click
end
Then(/^the Results Page displays the column of recipes$/) do
  page.find_by_id("recipes")
end
And(/^the restaurants must include the following information: i. Name of the restaurant; ii. Address of the restaurant; iv. Minutes of driving to get to the restaurant ;v. Price range of the restaurant$/) do
  expect(page).to has_css(".card-content")
end

Given(/^the user is in Results Page 6c$/) do
  visit "http://localhost:8080/CSCI310Project1/index.html"
    fill_in 'query', with: 'Chinese'
    page.find(".btn").click
end
When(/^the user clicks on the recipe$/) do
  click_on(class: 'toclick')
end
Then(/^the user should be directed to the Recipe Page$/) do
  expect(page).to have_title("ImHungry | Recipe")
end

Given(/^the user is in Results Page 7a$/) do
  visit "http://localhost:8080/CSCI310Project1/index.html"
    fill_in 'query', with: 'Chinese'
    page.find(".btn").click
end
And(/^the user selects a predefined list from the drop down menu$/) do
  select "Explore", :from => "dropdown"
end
When(/^the user clicks the "Add to List" button on the result$/) do
  page.find_by_id("recipes")
end
Then(/^the result should be added to the selected list$/) do
  page.find_by_id("recipes")
end

Given(/^the user is in Results Page 7b$/) do
  visit "http://localhost:8080/CSCI310Project1/index.html"
    fill_in 'query', with: 'Chinese'
    page.find(".btn").click
end
When(/^a result is in the favorite list$/) do
  
end
Then(/^the result should be ranked ahead of all items not in the favorite list$/) do
  
end

Given(/^the user is in Results Page 7c$/) do
  visit "http://localhost:8080/CSCI310Project1/index.html"
    fill_in 'query', with: 'Chinese'
    page.find(".btn").click
end
When(/^a result is in the Do-Not-Show list$/) do
  
end
Then(/^the result should not appear in the Results Page$/) do
  
end

Given(/^the user is in Results Page 8$/) do
  visit "http://localhost:8080/CSCI310Project1/results.html"
end
When(/^the user clicks on the "Back to Search" button$/) do
  click_on(class: 'button')
end
Then(/^the user should be directed back to the Search Page$/) do
  expect(page).to have_title("ImHungry | Index")
end

Given(/^the user is in the Search Page App2$/) do
  visit "http://localhost:8080/CSCI310Project1/index.html"
    fill_in 'query', with: 'Chinese'
    page.find(".btn").click
end
When(/^the Search Page displays the results$/) do
  page.find_by_id("recipes")
  page.find_by_id("restaurants")
end
Then(/^Rows in the results lists must alternate their background color between two different shades of gray$/) do
  expect(page).to have_field(".has-background-white-ter")
end

Given(/^the user is in the Search Page App 3c$/) do
  visit "http://localhost:8080/CSCI310Project1/index.html"
    fill_in 'query', with: 'Chinese'
    page.find(".btn").click
end
And(/^the Search Page displays the photo collage of the search term$/) do
  page.find(".is-four-fifths")
end
Then(/^the photo collage should be in rectangular shape$/) do
  
end
And(/^the size of the collage must be between 40 and 60% of the browser viewport width, and the height must be between 35 and 50% of the browser viewport height$/) do
  
end

Given(/^the user is in the Search Page App 3p$/) do
  visit "http://localhost:8080/CSCI310Project1/index.html"
    fill_in 'query', with: 'Chinese'
    page.find(".btn").click
end
And(/^the Search Page displays the photo collage of the search term$/) do
  page.find(".is-four-fifths")
end
Then(/^the photos should be from the results of performing a Google image search with the search term and using the top 10 photos returned in the results$/) do
  
end
And(/^there is no photo frames for individual photos$/) do
  
end
And(/^all photos should be scaled to fit within the space allocated for the collage$/) do
  
end
And(/^photos should be displayed in the collage with a random rotation of -45 to 45 degrees$/) do
  
end
