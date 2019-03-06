Feature: Results Page Appearance 2
Scenario: Alternating Background color for results column
Given the user is in the Search Page
When the Search Page displays the results
Then Rows in the results lists must alternate their background color between two different shades of gray