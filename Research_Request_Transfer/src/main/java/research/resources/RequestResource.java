package research.resources;

/**
 * Created by akila on 8/26/16.
 */

import research.models.Request;
import research.models.Specification;
import research.services.RequestService;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import java.util.HashMap;

@Path("/request")
public class RequestResource {
    private RequestService service;
    public RequestResource() {
        this.service = new RequestService();
    }

    @POST
    @Produces({"application/json"})
    @Consumes({"application/json"})
    public Request handleRequest(Request request) {
        //return (String) ((HashMap<String, Object>) request.getRequest().get("Address")).get("No");
        return this.service.handleRequest(request);
    }
}