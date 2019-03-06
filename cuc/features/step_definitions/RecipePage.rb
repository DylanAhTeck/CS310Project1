Given(/^the user is in Recipe Page 1-5$/) do
  visit "http://localhost:8080/CSCI310Project1/index.html"
  fill_in 'query', with: 'Chinese'
  page.find(".btn").click
  page.find_by_id("restaurants").find('.card  ')
end
Then(/^the Recipe page will display the title of the recipe$/) do
  
end
Then(/^the Recipe page will display the picture of the dish$/) do
  
end
Then(/^the Recipe page will display prep and cook times of the recipe$/) do
  
end
Then(/^the Recipe page will display all ingredients$/) do
  
end
Then(/^the Recipe page will display step by step instructions$/) do
  
end
