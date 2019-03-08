Given(/^the user is in List Management Page 1$/) do
  visit "http://localhost:8080/CSCI310Project1/index.html"
  fill_in 'query', with: 'Chinese'
  page.find(".btn").click
end
And(/^the user has a pre-defined lsit "L"$/) do
  select "Explore", :from => "dropdown"
  page.find('.button', match: :first).click
end
Then(/^the List Management page will display all the items that are in list "L"$/) do
  expect(page).to have_css(".column")
end

Given(/^the user is in List Management Page 2$/) do
  visit "http://localhost:8080/CSCI310Project1/index.html"
  fill_in 'query', with: 'Chinese'
  page.find(".btn").click
  select "Explore", :from => "dropdown"
  page.find('.button', match: :first).click
end
When(/^the user clicked on one of the recipes displayed$/) do
  visit "http://localhost:8080/CSCI310Project1/recipe.html"
end
Then(/^the user would be directed to the Recipe Page$/) do
  expect(page).to have_title("ImHungry | Recipe")
end

Given(/^the user is in List Management Page 2b$/) do
  visit "http://localhost:8080/CSCI310Project1/index.html"
  fill_in 'query', with: 'Chinese'
  page.find(".btn").click
  select "Explore", :from => "dropdown"
  page.find('.button', match: :first).click
end
When(/^the user clicked on one of the restaurant displayed$/) do
  visit "http://localhost:8080/CSCI310Project1/restaurant.html"
end
Then(/^the user would be directed to the Restaurant Page$/) do
  expect(page).to have_title("ImHungry | Restaurant")
end

Given(/^the user is in List Management Page 3$/) do
  visit "http://localhost:8080/CSCI310Project1/index.html"
  fill_in 'query', with: 'Chinese'
  page.find(".btn").click
  select "Explore", :from => "dropdown"
  page.find('.button', match: :first).click
end
And(/^the user has selected list "B" from the drop down menu$/) do
  select "Explore", :from => "dropdown"
end
And(/^the list currently in display is list "A"$/) do
  page.find("#results")
end
And(/^item "I" is in list "A"$/) do
  expect(page).to have_content(".is-fullwidth")
end
And(/^item "I" is not in list "B"$/) do
  page.find(".has-text-left")
end
When(/^the user clicked on "Add to List" Button$/) do
  page.all('.button')[0].click
end
Then(/^item "I" is removed from list "A"$/) do
  page.find("#results")
end
And(/^item "I" is added to list "B"$/) do
  page.find("#results")
end

Given(/^the user is in List Management Page 3b$/) do
  visit "http://localhost:8080/CSCI310Project1/index.html"
  fill_in 'query', with: 'Chinese'
  page.find(".btn").click
  select "Explore", :from => "dropdown"
  page.find('.button', match: :first).click
end
And(/^the list current in display is list "A"$/) do
  page.find("#results")
end
And(/^item "I" is in list "A"$/) do
  expect(page).to have_content(".is-fullwidth")
end
When(/^the user clicked on "Remove from List" Button$/) do
  page.all('.button')[1].click
end
Then(/^item "I" is removed from list "A"$/) do
  page.find("#results")
end

Given(/^the user is in List Management Page 4$/) do
  visit "http://localhost:8080/CSCI310Project1/index.html"
  fill_in 'query', with: 'Chinese'
  page.find(".btn").click
  select "Explore", :from => "dropdown"
  page.find('.button', match: :first).click
end
When(/^the user clicked on "Back to Results" Button$/) do
  page.all('.button')[1].click
end
Then(/^the user will be directed back to the Results Page$/) do
  expect(page).to have_title("ImHungry | Results")
end

Given(/^the user is in List Management Page 5$/) do
  visit "http://localhost:8080/CSCI310Project1/index.html"
  fill_in 'query', with: 'Chinese'
  page.find(".btn").click
  select "Explore", :from => "dropdown"
  page.find('.button', match: :first).click
end
When(/^the user clicked on "Back to Search" Button$/) do
  page.all('.button')[2].click
end
Then(/^the user will be directed back to the Search Page$/) do
  expect(page).to have_title("ImHungry | Search")
end

Given(/^the user is in List Management Page 6$/) do
  visit "http://localhost:8080/CSCI310Project1/index.html"
  fill_in 'query', with: 'Chinese'
  page.find(".btn").click
  select "Explore", :from => "dropdown"
  page.find('.button', match: :first).click
end
Then(/^display a drop down box 6$/) do
  expect(page).to have_select("dropdown")
end
And(/^default value for it will be empty 6$/) do
  expect(page).to have_select("dropdown", selected: "")
end

Given(/^the user is in List Management Page 7$/) do
  visit "http://localhost:8080/CSCI310Project1/index.html"
  fill_in 'query', with: 'Chinese'
  page.find(".btn").click
  select "Explore", :from => "dropdown"
  page.find('.button', match: :first).click
end
And(/^the user has selected a predefined list from the drop down menu$/) do
  expect(page).to have_select("dropdown")
end
When(/^the user clicked the "Manage List" button$/) do
  page.all('.button')[0].click
end
Then(/^the user will be directed to the List Management page for the list selected in the drop down box.$/) do
  expect(page).to have_title("ImHungry | ManageList")
end

Given(/^the user is in the List Management Page APP2$/) do
  visit "http://localhost:8080/CSCI310Project1/index.html"
   fill_in 'query', with: 'Chinese'
   page.find(".btn").click
   select "Explore", :from => "dropdown"
   page.find('.button', match: :first).click
end
When(/^the List Management Page displays the results$/) do
  expect(page).to have_css(".column")
end
Then(/^Rows in the item lists must alternate their background color between two different shades of gray$/) do
  expect(page).to have_css("has-background-white-ter")
end