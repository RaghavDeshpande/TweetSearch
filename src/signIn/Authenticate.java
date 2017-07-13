package signIn;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import support.Helper;


public class Authenticate extends HttpServlet {
	private static final long serialVersionUID = 1L;
    final Helper helper;   
    public Authenticate() {
        super();
        helper = new Helper("http://localhost:8080/TweetSearch/callback");
    }
	
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	String url = request.getRequestURL().toString();
    	int index = url.lastIndexOf("/");
    	url = url.substring(index);
    	String URL = null;
    	if(url.equalsIgnoreCase("/Authenticate")){
    		try {
				response.sendRedirect(helper.getAuthorizationUrl());
			} catch (InterruptedException e) {
				e.printStackTrace();
			} catch (ExecutionException e) {
				e.printStackTrace();
			}
    	}
    	else if(url.equalsIgnoreCase("/callback")){
    		try {
    			if(request.getParameter("denied") == null){
    				String userName =request.getParameter("screen_name");
    				request.getSession().setAttribute("userName", userName);
					if(helper.setAccessToken(request)){
						URL = "home.html";
					}
    			}
			} catch (Exception e) {
				System.out.println(e.getMessage());
			}
    	}
    	
    	else
    		URL = "error.jsp";
    	if(URL != null){
    		request.getSession().setAttribute("helper", helper);
    		RequestDispatcher rd = request.getRequestDispatcher(URL);
    		rd.forward(request, response);
    	}
    	
    	
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	}

}
