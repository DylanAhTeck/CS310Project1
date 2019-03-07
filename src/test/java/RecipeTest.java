import static org.junit.Assert.*;

import org.junit.Test;

public class RecipeTest {
	Recipe r = new Recipe("5", "10" ,"100", null, "id1", "title1", "15", "imageUrl", "instructions");
	@Test
	public void testRecipe() {
		assertEquals("5", r.preparationMinutes);
		assertEquals("10", r.cookingMinutes);
		assertEquals("100", r.spoonacularScore);
		assertNull("ingredients should be null", r.extendedIngredients);
		assertEquals("id1", r.id);
		assertEquals("title1", r.title);
		assertEquals("15", r.readyInMinutes);
		assertEquals("imageUrl", r.image);
		assertEquals("instructions", r.instructions);
	}

}
