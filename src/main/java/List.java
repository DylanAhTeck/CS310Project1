import java.util.ArrayList;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


public class List {
	String name; 
	ArrayList<Restaurant> RestaurantList;
	ArrayList<Recipe> RecipeList; 
	
public List(String n)
{
	this.name = n;
	this.RestaurantList = new ArrayList<Restaurant>();
	this.RecipeList = new ArrayList<Recipe>();
}


public void addToList(Restaurant r) {
	if(!Contains(r)) RestaurantList.add(r);
}

public void addToList(Recipe r) {
	if(!Contains(r)) RecipeList.add(r);
}

public String checkIfContains(Recipe r)
{
	if(Contains(r)) return "{ \"contains\":\"true\" }"; 
	else return "";
}

public String checkIfContains(Restaurant r)
{
	if(Contains(r)) return "contains"; 
	else return "";
}


public void moveToList(Restaurant r, List l) {
	l.addToList(r);
	Remove(r);
}

public void moveToList(Recipe r, List l) {
	l.addToList(r);
	Remove(r);
}

public void removeFromList(Recipe r)
{
	Remove(r);
}

public void removeFromList (Restaurant r)
{
	Remove(r);
}
public boolean Contains(Restaurant r)
{
	for(int i = 0; i < RestaurantList.size(); i++)
	{
		if (r.name.equals(RestaurantList.get(i).name)) return true;
	}
	
	return false;
}

public boolean Contains(Recipe r)
{
	for(int i = 0; i < RecipeList.size(); i++)
	{
		if (r.title.equals(RecipeList.get(i).title)) return true;
	}
	
	return false;
}
public void Remove(Restaurant r)
{
	for(int i = 0; i < RestaurantList.size(); i++)
	{
		if (r.name.equals(RestaurantList.get(i).name)) RestaurantList.remove(i);
	}
	

}

public void Remove(Recipe r)
{
	for(int i = 0; i < RecipeList.size(); i++)
	{
		if (r.title.equals(RecipeList.get(i).title)) RecipeList.remove(i);
	}
	
}

}