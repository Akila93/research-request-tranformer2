package research.resources;

/**
 * Created by akila on 8/26/16.
 */
import research.models.Beam;
import research.models.Request;
import research.services.RequestService;
import javax.ws.rs.*;
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
    public HashMap<String,Object> handleRequest(HashMap<String,Object> requestBoby, @HeaderParam("appId") String id) {
        Request request = new Request();
        request.setAppId(id);
        request.setRequestBody(requestBoby);
        return this.service.handleRequest(request).getRequestBody();
    }

    @Path("/preview")
    @POST
    @Produces({"application/json"})
    @Consumes({"application/json"})
    public Request handleRequestPreview(Beam beam) {
        System.out.println(beam);
        System.out.println(this.service.handleRequestPreview(beam).getRequestBody());

        return this.service.handleRequestPreview(beam);

    }
}