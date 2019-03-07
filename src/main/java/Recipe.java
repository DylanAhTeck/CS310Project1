
public class Recipe {
	String preparationMinutes;
	String cookingMinutes;
	String spoonacularScore;
	Ingredient extendedIngredients[];
	String id;
	String title;
	String readyInMinutes;
	String image;
	String instructions;
	
	public Recipe(String preparationMinutes, String cookingMinutes, String spoonacularScore, Ingredient extendedIngredients[], String id, String title, String readyInMinutes, String image, String instructions) {
		this.preparationMinutes = preparationMinutes;
		this.cookingMinutes = cookingMinutes;
		this.spoonacularScore = spoonacularScore;
		this.extendedIngredients = extendedIngredients;
		this.id = id;
		this.title = title;
		this.readyInMinutes = readyInMinutes;
		this.image = image;
		this.instructions = instructions;
	}
	//constructor only for testing purposes
	public Recipe(String title) {
		this.title = title;
	}
}
