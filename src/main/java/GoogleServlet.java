

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;

/**
 * Servlet implementation class GoogleServlet
 */
public class GoogleServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GoogleServlet() {
        super();
        // TODO Auto-generated constructor stub
    }
    public String getImageResults(String query) throws IOException {
    	String key ="AIzaSyAt6nXH8XR1AUDEn3nP4WmfxsjuOaNU4-U";
    	String cx = "017921781541195813540:qxb5prra6vs";
    	Gson gson = new Gson();
		String url = "https://www.googleapis.com/customsearch/v1?key="+key+"&cx="+cx+"&q="+query+"&searchType=image&num=10";
		System.out.println(url);
		URL obj = new URL(url);
		HttpURLConnection con = (HttpURLConnection) obj.openConnection();
		con.setRequestMethod("GET");
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
			JsonObject json = new Gson().fromJson(resp.toString(), JsonObject.class);
			return resp.toString();
			/*Type listType = new TypeToken<List<Restaurant>>() {
		    }.getType();
			List<Restaurant> restaurants = gson.fromJson(json.getAsJsonArray("businesses"), listType);
			return gson.toJson(restaurants);*/
		}
		return "Failed to reach Yelp";
    }
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setContentType("application/json");
	    response.setCharacterEncoding("UTF-8");
	    String query = request.getParameter("query");
	    response.getWriter().print(getImageResults(query));
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
