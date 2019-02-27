

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.InputStreamReader;

/**
 * Servlet implementation class SearchServlet
 */
public class YelpApi extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public YelpApi() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		Gson gson = new Gson();
		String query = request.getParameter("query");
		String size = request.getParameter("size");
		String latitude = "34.0206";
		String longitude = "118.2854";
		System.out.println(query + " " + size);
		String url = "https://api.yelp.com/v3/businesses/search?location=801%20Childs%20Way,%20Los%20Angeles,%20CA%2090089&term="+ query + "&limit=" + size + "&sort_by=distance";
		System.out.println(url);
		URL obj = new URL(url);
		HttpURLConnection con = (HttpURLConnection) obj.openConnection();
		con.setRequestMethod("GET");
		con.setRequestProperty("Authorization", "Bearer vA1w5vh_CQ8cDc_ro1pu9E_7fHDhQqeUUfn5f7sNKEE9ib3akOutyXVU4o9SpMGPk11y_B7hv9zTAiytKRknZpP6g9s1Klnc7TnpQqlnDIPs1qx3pPy-qRpKfNp1XHYx");
		int responseCode = con.getResponseCode();
		if(responseCode == 200) {
			BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
			String inputLine;
			StringBuffer resp = new StringBuffer();
			while((inputLine = in.readLine()) != null) {
				resp.append(inputLine);
			}
			in.close();
			
			JsonObject json = new Gson().fromJson(resp.toString(), JsonObject.class);
			Type listType = new TypeToken<List<Restaurant>>() {
		    }.getType();
			List<Restaurant> restaurants = gson.fromJson(json.getAsJsonArray("businesses"), listType);
			System.out.println(restaurants.get(0).getName());
			response.getWriter().println(gson.toJson(restaurants));
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
