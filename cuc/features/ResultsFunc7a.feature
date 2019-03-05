Feature: Results Page Functionality 7a
Scenario: Add Result to List
Given the user is in Results Page
When the user clicks the "Add to List" button on the result
And the user selects a predefined list from the drop down menu
Then the result should be added to the selected list