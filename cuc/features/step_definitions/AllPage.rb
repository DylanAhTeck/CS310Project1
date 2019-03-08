Given(/^the user is on the any page 1$/) do
  visit "http://localhost:8080/CSCI310Project1/index.html"
  visit "http://localhost:8080/CSCI310Project1/results.html"
  visit "http://localhost:8080/CSCI310Project1/recipe.html"
  visit "http://localhost:8080/CSCI310Project1/restaurant.html"
  visit "http://localhost:8080/CSCI310Project1/managelist.html"
end
Then(/the background color should be Whitesmoke$/) do
  page.find(:css, 'body')
end