
public class Restaurant {
	String name;
	String address;
	int rating;
	float distance;
	String price;
	String phone;
	String url;
	
	public Restaurant(String alias, String address, int rating, float distance, String price, String phone, String url) {
		this.name = alias;
		this.address = address;
		this.rating = rating;
		this.distance = distance;
		this.price = price;
		this.phone = phone;
		this.url = url;
	}
	
	public String getName() {
		return this.name;
	}
	
	public String getAddress() {
		return this.address;
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
