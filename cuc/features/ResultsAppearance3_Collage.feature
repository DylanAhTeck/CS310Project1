Feature: Results Page Appearance 3
Scenario: Collage Apperace - Collage
Given the user is in the Search Page
When the Search Page displays the photo collage of the search term
Then the photo collage should be in rectangular shape
And the size of the collage must be between 40 and 60% of the browser viewport width, and the height must be between 35 and 50% of the browser viewport height