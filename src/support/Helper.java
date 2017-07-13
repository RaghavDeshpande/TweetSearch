package support;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

import javax.servlet.http.HttpServletRequest;
import javax.xml.ws.WebServiceException;

import com.github.scribejava.apis.TwitterApi;
import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.model.OAuth1AccessToken;
import com.github.scribejava.core.model.OAuth1RequestToken;
import com.github.scribejava.core.model.OAuthRequest;
import com.github.scribejava.core.model.Response;
import com.github.scribejava.core.model.Verb;
import com.github.scribejava.core.oauth.OAuth10aService;
import com.sun.xml.internal.ws.Closeable;

public class Helper implements Closeable {
 private static final String _api_key;
 private static final String _api_secret;
 private OAuth10aService service;
 private OAuth1RequestToken requestToken;
 private OAuth1AccessToken accessToken;
 public String oauth_verifier;
 
 static {
	 _api_key = "api key here";
	 _api_secret = "api secret key";
}

 public Helper(String callbackURL){
	 this.service = new ServiceBuilder(_api_key).apiSecret(_api_secret).callback(callbackURL).build(TwitterApi.instance());
 }
 public String getAuthorizationUrl() throws IOException, InterruptedException, ExecutionException{
	 requestToken = service.getRequestToken();
	 return service.getAuthorizationUrl(requestToken);
 }
 public boolean setAccessToken(HttpServletRequest request) throws IOException, InterruptedException, ExecutionException{
	 if(accessToken == null){
		 oauth_verifier = request.getParameter("oauth_verifier");
		 accessToken = service.getAccessToken(requestToken, oauth_verifier);
	 }
	 if(accessToken != null)
		 return true;
	 else return false;
 }
 public String getTrends() throws InterruptedException, ExecutionException, IOException{
	 if(accessToken != null){
		 OAuthRequest req = new OAuthRequest(Verb.GET, "https://api.twitter.com/1.1/trends/place.json?id=23424848");
		 service.signRequest(accessToken, req);
		 Response res = service.execute(req);
		 return res.getBody();
	 }
	 else
		 return null;
 }
 public String getAccountSettings() throws InterruptedException, ExecutionException, IOException{
	 if(accessToken != null){
		 OAuthRequest req = new OAuthRequest(Verb.GET, "https://api.twitter.com/1.1/account/settings.json");
		 service.signRequest(accessToken, req);
		 Response res = service.execute(req);
		 return res.getBody();
	 }
	 else
		 return null;
 }
 public String getSearchResults(String query) throws InterruptedException, ExecutionException, IOException{
	 if(accessToken != null){
		 OAuthRequest req = new OAuthRequest(Verb.GET, "https://api.twitter.com/1.1/search/tweets.json?q="+query + "&count=1");
		 service.signRequest(accessToken, req);
		 Response res = service.execute(req);
		 return res.getBody();
	 }
	 else
		 return null;
 }
@Override
public void close() throws WebServiceException {
	
}
 
}
