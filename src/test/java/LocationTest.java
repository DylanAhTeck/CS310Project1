import static org.junit.Assert.*;

import org.junit.Test;

public class LocationTest {
	Location l = new Location("Los Angeles", "US", "", "", "CA", "2727 Ellendale Pl", "90001");
	@Test
	public void testLocation() {
		assertEquals("Los Angeles", l.city);
		assertEquals("US", l.country);
		assertEquals("", l.address2);
		assertEquals("", l.address3);
		assertEquals("CA", l.state);
		assertEquals("2727 Ellendale Pl", l.address1);
		assertEquals("90001", l.zip_code);
	}

}
