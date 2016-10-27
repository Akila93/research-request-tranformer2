package research.resources;

/**
 * Created by akila on 8/26/16.
 */


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import research.exception.DataNotFoundException;
import research.models.PreviewRequest;
import research.models.Request;
import research.services.RequestService;

import javax.ws.rs.*;
import java.util.HashMap;

@Path("/request")
public class RequestResource {

    private RequestService service;
    private Request request;
    private static final Logger logger= LoggerFactory.getLogger(RequestResource.class);
    public RequestResource() {

    }

    public void setService(RequestService service) {
        this.service = service;
    }

    public void setRequest(Request request) {
        this.request = request;
    }

    @POST
    @Produces({"application/json"})
    @Consumes({"application/json"})
    public HashMap<String, Object> handleRequest(HashMap<String, Object> requestBoby, @HeaderParam("appId") String id) {
        logger.info("request is arrived with appId : "+id);
        request.setAppId(id);
        request.setRequestBody(requestBoby);
        return this.service.handleRequest(request).getRequestBody();
    }

    @Path("/preview")
    @POST
    @Produces({"application/json"})
    @Consumes({"application/json"})
    public Request handleRequestPreview(PreviewRequest previewRequest) {
        logger.debug("new preview request is arrived");
        return this.service.handleRequestPreview(previewRequest);
    }
}