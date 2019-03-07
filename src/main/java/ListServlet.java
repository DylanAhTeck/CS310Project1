

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;


/**
 * Servlet implementation class List
 */
public class ListServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ListServlet() {
        super();
        // TODO Auto-generated constructor stub
    }
  
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setContentType("application/json");
	    response.setCharacterEncoding("UTF-8");

		
		String jsonResult = request.getParameter("item");
		System.out.println("jsonResult: " + jsonResult);
		
		Gson gson = new GsonBuilder()
                .setPrettyPrinting()
                .serializeNulls()
                .create();
		
		JsonObject json = new Gson().fromJson(jsonResult, JsonObject.class); 
		System.out.println("this is json: " + json);
		
		String type = request.getParameter("type"); 
		String function = request.getParameter("function");
		String list = request.getParameter("list");
		String moveToList = request.getParameter("moveToList");
		
		HttpSession session = request.getSession();
		
		
		if(session.getAttribute("favorites") == null) session.setAttribute("favorites", new List("favorites"));
		if(session.getAttribute("do-not-show") == null) session.setAttribute("do-not-show", new List("do-not-show"));
		if(session.getAttribute("explore") == null) session.setAttribute("explore", new List("explore"));
		

		List l = (List) session.getAttribute(list); 
		//System.out.println("this is recipe: " + t)
		List mtl = (List) session.getAttribute(moveToList); 
	
	
		
		if(type.equals("recipe"))
		{
			Recipe recipe = gson.fromJson(json, Recipe.class);
			
			if(function.equals("check"))  response.getWriter().print(gson.toJson(l.checkIfContains(recipe)));
			if(function.equals("add")) l.addToList(recipe);
			if(function.equals("remove")) l.removeFromList(recipe);
			if(function.equals("move")) l.moveToList(recipe, mtl);
			if(function.equals("return")) 
			{
			
				response.getWriter().print(gson.toJson(l.RecipeList));
			}	
		}
		if(type.equals("restaurant"))
		{
			Restaurant restaurant = gson.fromJson(json, Restaurant.class);
			
			if(function.equals("check"))  response.getWriter().print(gson.toJson(l.checkIfContains(restaurant)));
			if(function.equals("add")) l.addToList(restaurant);
			if(function.equals("remove")) l.removeFromList(restaurant);
			if(function.equals("move")) l.moveToList(restaurant, mtl);
			if(function.equals("return")) 
			{
				
				response.getWriter().print(gson.toJson(l.RestaurantList));
			}
		}
		
		session.setAttribute(list, l);
		if(moveToList != null) session.setAttribute(moveToList, mtl);		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
