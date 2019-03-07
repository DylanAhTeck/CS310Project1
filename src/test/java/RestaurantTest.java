import static org.junit.Assert.*;

import org.junit.Test;

public class RestaurantTest {
	Restaurant r = new Restaurant("name1", null, 4, 2, "$$", "5555555", "url");
	@Test
	public void test() {
		assertEquals("name1", r.name);
		assertNull("location is null", r.location);
		assertEquals(4, r.rating);
		assertTrue("distance = 2", r.distance == 2);
		assertEquals("$$", r.price);
		assertEquals("5555555", r.phone);
		assertEquals("url", r.url);
		assertEquals("Restaurant", r.type);
	}

}
