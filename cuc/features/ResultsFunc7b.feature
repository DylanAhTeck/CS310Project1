Feature: Results Page Functionality 7b
Scenario: Rank Results in Favorite List
Given the user is in Results Page
When a result is in the favorite list
Then the result should be ranked ahead of all items not in the favorite list