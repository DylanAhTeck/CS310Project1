
public class Ingredient {
	String id;
	String name;
	String amount;
	String unit;
	String originalString;
	public Ingredient(String id, String name, String amount, String unit, String originalString) {
		this.id = id;
		this.name = name;
		this.amount = amount;
		this.unit = unit;
		this.originalString = originalString;
	}
	public String getId() {
		return this.id;
	}
	public String getName() {
		return this.name;
	}
	
	public String getAmount() {
		return this.amount;
	}
	public String getUnit() {
		return this.unit;
	}
	public String getOriginalString() {
		return this.originalString;
	}
}



