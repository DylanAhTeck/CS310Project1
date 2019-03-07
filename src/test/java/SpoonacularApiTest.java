import static org.junit.Assert.*;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;

import org.junit.Test;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

public class SpoonacularApiTest {
	SpoonacularApi api = new SpoonacularApi();
	@Test
	public void testGetRecipeApiResults() throws IOException {
		Gson gson = new Gson();
		String results = api.getRecipeApiResults("bacon", "50");
		Type listType = new TypeToken<ArrayList<Recipe>>() {
	    }.getType();
		ArrayList<Recipe> recipes = gson.fromJson(results, listType);
		assertEquals(50, recipes.size());
		results = api.getRecipeApiResults("chicken", "50");
		recipes = gson.fromJson(results, listType);
		assertEquals(50, recipes.size());
	}
	
}
