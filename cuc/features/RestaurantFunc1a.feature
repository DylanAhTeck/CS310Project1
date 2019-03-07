Feature: Restaurant Page Functionality 1a
Scenario: Directed to Google Map when Clicking on Address
Given the user is in Restaurant Page 1a
When the user clicks on the address of the restaurant
Then the user will be directed to Google Maps directions page
And the destination is prefilled with the address of the restaurant
And the starting point is prefilled as Tommy Trojan