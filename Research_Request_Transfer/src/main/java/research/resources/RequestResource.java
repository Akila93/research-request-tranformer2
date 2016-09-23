package research.resources;

/**
 * Created by akila on 8/26/16.
 */
import research.models.Request;
import research.services.RequestService;
import javax.ws.rs.*;

@Path("/request")
public class RequestResource {
    private RequestService service;
    public RequestResource() {
        this.service = new RequestService();
    }
    @POST
    @Produces({"application/json"})
    @Consumes({"application/json"})
    public Request handleRequest(Request request, @HeaderParam("appId") String id) {
        request.setAppId(id);
        return this.service.handleRequest(request);
    }
}