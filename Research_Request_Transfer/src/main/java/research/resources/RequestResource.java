package research.resources;

/**
 * Created by akila on 8/26/16.
 */
import com.fasterxml.jackson.databind.util.JSONPObject;
import com.mongodb.util.JSON;
import io.dropwizard.jackson.Jackson;
import org.bson.types.ObjectId;
import research.models.Beam;
import research.models.Request;
import research.services.RequestService;
import javax.ws.rs.*;
import java.util.HashMap;
import java.util.List;

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
        requestBoby.get("mark");


        //JSONPObject mark = new JSONPObject(requestBoby.get("mark"));
        List<Object> marks = (List<Object>) requestBoby.get("marks");
        HashMap<String, String> map = (HashMap<String, String>) marks.get(0);
        map.keySet();


//        marks.get(0);
        //new JSONObject()

        System.err.println(map.get("marks"));
        request.setRequestBody(requestBoby);
        return this.service.handleRequest(request).getRequestBody();
    }

    @Path("/preview")
    @POST
    @Produces({"application/json"})
    @Consumes({"application/json"})
    public Request handleRequestPreview(Beam beam) {

        System.err.println(beam.getRequest().getRequestBody());
        return this.service.handleRequestPreview(beam);

    }
}