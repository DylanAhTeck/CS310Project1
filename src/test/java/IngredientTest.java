import static org.junit.Assert.*;

import org.junit.Test;

public class IngredientTest {
	Ingredient i = new Ingredient("1", "salt", "2", "tbs", "2 tablespoons of salt");
	@Test
	public void testIngredient() {
		assertEquals("1", i.getId());
		assertEquals("salt", i.getName());
		assertEquals("2", i.getAmount());
		assertEquals("tbs", i.getUnit());
		assertEquals("2 tablespoons of salt", i.getOriginalString());
	}

}
