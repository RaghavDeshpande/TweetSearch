package org;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import support.Helper;


public class Home extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
    public Home() {
        super();
    }
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Helper helper = (Helper) request.getSession().getAttribute("helper");
		if(helper == null) { request.getRequestDispatcher("error.html").forward(request, response); }
		String url = request.getRequestURL().toString();
    	int index = url.lastIndexOf("/");
    	url = url.substring(index);
    	if(url.equalsIgnoreCase("/getTrends")){
    		response.setContentType("application/json");
    		try {
    			response.getWriter().print(helper.getTrends());
			} catch (Exception e) {
				System.out.println("Exception has occured in org.home while getting trends " + e.getMessage());
				e.printStackTrace();
			}
    	}
    	else if(url.equalsIgnoreCase("/accountSettings")){
    		response.setContentType("application/json");
    		try {
    			response.getWriter().print(helper.getAccountSettings());
			} catch (Exception e) {
				System.out.println("Exception has occured in org.home while account settings " + e.getMessage());
				e.printStackTrace();
			}
    	}
    	else if(url.equalsIgnoreCase("/getSearchResults")){
    		response.setContentType("application/json");
    		String query = request.getParameter("query");
    		try {
    			response.getWriter().println(helper.getSearchResults(query));
			} catch (Exception e) {
				System.out.println("Exception has occured in org.home while search results " + e.getMessage());
				e.printStackTrace();
			}
    	}
		else if(url.equalsIgnoreCase("/signout")){
			helper.close();
			response.getWriter().flush();
			response.getWriter().close();
			System.out.println("signout");
			request.getRequestDispatcher("logout").forward(request, response);
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
	}

}
