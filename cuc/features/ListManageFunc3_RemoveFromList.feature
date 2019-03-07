Feature: List Management Page Functionality 3
Scenario: Remove Item from List
Given the user is in List Management Page 3b
And the list current in display is list "A"
And item "I" is in list "A"
When the user clicked on "Remove from List" Button
Then item "I" is removed from list "A"