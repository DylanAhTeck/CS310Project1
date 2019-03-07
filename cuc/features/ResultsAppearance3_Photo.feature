Feature: Results Page Appearance 3
Scenario: Collage Apperace - Photo
Given the user is in the Search Page APP 3p
And the Search Page displays the photo collage of the search term
Then the photos should be from the results of performing a Google image search with the search term and using the top 10 photos returned in the results
And there is no photo frames for individual photos
And all photos should be scaled to fit within the space allocated for the collage
And photos should be displayed in the collage with a random rotation of -45 to 45 degrees