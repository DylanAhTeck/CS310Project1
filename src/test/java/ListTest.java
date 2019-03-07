import static org.junit.Assert.*;

import org.junit.Test;

public class ListTest {
	List f = new List("favorites");
	List d = new List("doNotShow");
	Recipe rec1 = new Recipe("title1");
	Recipe rec2 = new Recipe("title2");
	Recipe rec3 = new Recipe("title3");
	Restaurant res1 = new Restaurant("name1");
	Restaurant res2 = new Restaurant("name2");
	Restaurant res3 = new Restaurant("name3");
	@Test
	public void testAddToList() {
		f.addToList(rec1);
		assertEquals(1, f.RecipeList.size());
		f.addToList(rec2);
		assertEquals(2, f.RecipeList.size());
		f.addToList(rec2);
		assertEquals(2, f.RecipeList.size());
		f.addToList(res1);
		assertEquals(1, f.RestaurantList.size());
		f.addToList(res2);
		assertEquals(2, f.RestaurantList.size());
		f.addToList(res2);
		assertEquals(2, f.RestaurantList.size());
	}
	
	@Test
	public void testMoveToList() {
		f.addToList(rec1);
		f.addToList(rec2);
		f.addToList(res1);
		f.addToList(res2);
		f.moveToList(rec1, d);
		assertEquals(1, f.RecipeList.size());
		assertEquals(1, d.RecipeList.size());
		f.moveToList(res1, d);
		assertEquals(1, f.RestaurantList.size());
		assertEquals(1, d.RestaurantList.size());
	}
	
	@Test
	public void testRemoveFromList() {
		f.addToList(rec1);
		f.addToList(rec2);
		f.addToList(res1);
		f.addToList(res2);
		assertEquals(2, f.RecipeList.size());
		f.removeFromList(rec1);
		assertEquals(1, f.RecipeList.size());
		f.removeFromList(res1);
		assertEquals(1, f.RestaurantList.size());
		f.removeFromList(rec3);
		assertEquals(1, f.RecipeList.size());
		f.removeFromList(res3);
		assertEquals(1, f.RestaurantList.size());
	}

}
