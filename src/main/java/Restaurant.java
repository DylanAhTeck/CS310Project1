
public class Restaurant {
	String alias;
	String name;
	Location location;
	int rating;
	float distance;
	String price;
	String phone;
	String url;
	
	public Restaurant(String name, Location location, int rating, float distance, String price, String phone, String url) {
		this.name = name;
		this.location = location;
		this.rating = rating;
		this.distance = distance;
		this.price = price;
		this.phone = phone;
		this.url = url;
	}
	
	public String getName() {
		return this.name;
	}
	
	public int getRatins() {
		return this.rating;
	}
	
	public float getDistance() {
		return this.distance;
	}
	
	public String getPrice() {
		return this.price;
	}
	
	public String getPhone() {
		return this.phone;
	}
	
	public String getUrl() {
		return this.url;
	}
	
	
}
