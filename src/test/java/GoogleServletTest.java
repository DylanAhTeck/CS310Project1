import java.io.IOException;

import org.junit.Test;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import junit.framework.TestCase;

public class GoogleServletTest extends TestCase {
	GoogleServlet g = new GoogleServlet();
	Gson gson = new Gson();
	@Test
	public void testGetImageResults() {
		try {
			String results = g.getImageResults("pizza");
			JsonObject obj = gson.fromJson(results, JsonObject.class);
			JsonArray items = obj.getAsJsonArray("items");
			assertEquals(10, items.size());
			results = g.getImageResults("chinese");
			obj = gson.fromJson(results, JsonObject.class);
			items = obj.getAsJsonArray("items");
			assertEquals(10, items.size());
			results = g.getImageResults("");
			assertEquals(results, "empty query");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
