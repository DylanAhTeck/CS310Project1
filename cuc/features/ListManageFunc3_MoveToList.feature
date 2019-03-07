Feature: List Management Page Functionality 3
Scenario: Move Item to List
Given the user is in List Management Page 3
And the user has selected list "B" from the drop down menu
And the list currently in display is list "A"
And item "I" is in list "A"
And item "I" is not in list "B"
When the user clicked on "Add to List" Button
Then item "I" is removed from list "A"
And item "I" is added to list "B"