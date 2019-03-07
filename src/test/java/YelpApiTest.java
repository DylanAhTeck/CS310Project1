import static org.junit.Assert.*;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;

import org.junit.Test;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

public class YelpApiTest {
	YelpApi api = new YelpApi();
	@Test
	public void testYelpApi() throws IOException {
		Gson gson = new Gson();
		String results = api.getYelpApiResults("chinese", "50");
		Type listType = new TypeToken<ArrayList<Restaurant>>() {
	    }.getType();
		ArrayList<Restaurant> restaurants = gson.fromJson(results, listType);
		assertEquals(50, restaurants.size());
		results = api.getYelpApiResults("pasta", "50");
		restaurants = gson.fromJson(results, listType);
		assertEquals(50, restaurants.size());
		results = api.getYelpApiResults("pizza", "50");
		restaurants = gson.fromJson(results, listType);
		assertEquals(50, restaurants.size());
	}

}
