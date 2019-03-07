
public class Restaurant {
	String alias;
	String name;
	Location location;
	int rating;
	float distance;
	String price;
	String phone;
	String url;
	String type = "Restaurant";
	
	public Restaurant(String name, Location location, int rating, float distance, String price, String phone, String url) {
		this.name = name;
		this.location = location;
		this.rating = rating;
		this.distance = distance;
		this.price = price;
		this.phone = phone;
		this.url = url;
	}
	
	//constructor only for testing purposes
	public Restaurant(String name) {
		this.name = name;
	}
}
