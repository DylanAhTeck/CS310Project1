

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;

/**
 * Servlet implementation class SpoonacularApi
 */
public class SpoonacularApi extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SpoonacularApi() {
        super();
        // TODO Auto-generated constructor stub
    }
    public String getRecipeApiResultsHelper(ArrayList<String> ids) throws IOException {
    	Gson gson = new GsonBuilder()
                .setPrettyPrinting()
                .serializeNulls()
                .create();
    	String idText="";
    	for(int i = 0; i < ids.size(); i++) {
    		idText += ids.get(i);
    		if(i != ids.size() - 1) {
    			idText += "%2C";
    		}
    	}
    	System.out.println(idText);
    	String url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk?ids=" + idText;
		URL obj = new URL(url);
		HttpURLConnection con = (HttpURLConnection) obj.openConnection();
		con.setRequestMethod("GET");
		con.setRequestProperty("X-RapidAPI-Key", "0338cd7961msh20c35cdb444b4aap17b509jsn7f4c40a7e81a");
		int responseCode = con.getResponseCode();
		System.out.println(responseCode);
		if(responseCode == 200) {
			BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
			String inputLine;
			StringBuffer resp = new StringBuffer();
			while((inputLine = in.readLine()) != null) {
				resp.append(inputLine);
			}
			in.close();
			System.out.println(resp.toString());
			JsonArray json = new Gson().fromJson(resp.toString(), JsonArray.class);
			Type listType = new TypeToken<ArrayList<Recipe>>() {
		    }.getType();
			ArrayList<Recipe> recipes = gson.fromJson(json, listType);
			return gson.toJson(recipes);
		}
		return "Failed to reach api";
    }
    public String getRecipeApiResults(String query, String size) throws IOException {
    	Gson gson = new GsonBuilder()
                .setPrettyPrinting()
                .serializeNulls()
                .create();
		String url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?number="+size+"&query="+query;
		System.out.println(url);
		URL obj = new URL(url);
		HttpURLConnection con = (HttpURLConnection) obj.openConnection();
		con.setRequestMethod("GET");
		con.setRequestProperty("X-RapidAPI-Key", "0338cd7961msh20c35cdb444b4aap17b509jsn7f4c40a7e81a");
		int responseCode = con.getResponseCode();
		System.out.println(responseCode);
		if(responseCode == 200) {
			BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
			String inputLine;
			StringBuffer resp = new StringBuffer();
			while((inputLine = in.readLine()) != null) {
				resp.append(inputLine);
			}
			in.close();
			System.out.println("Spoonacular recipe ids = " + resp.toString());
			JsonObject json = new Gson().fromJson(resp.toString(), JsonObject.class);
			JsonArray recipeIds = json.getAsJsonArray("results");
			ArrayList<String> ids = new ArrayList<String>();
			for(int i = 0; i < recipeIds.size(); i++) {
				String id = recipeIds.get(i).getAsJsonObject().get("id").toString();
				ids.add(id);
			}
			
			
			return getRecipeApiResultsHelper(ids);
		}
		return "Failed to reach Spoonacular";
    }
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setContentType("application/json");
	    response.setCharacterEncoding("UTF-8");
	    Gson gson = new GsonBuilder()
                .setPrettyPrinting()
                .serializeNulls()
                .create();
		String query = request.getParameter("query");
		String size = request.getParameter("size");
		System.out.println("Making request to Spoonacular for " + query);
		
		response.getWriter().print(getRecipeApiResults(query, size));
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
