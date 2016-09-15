package research.resources;

import research.models.SpecificationItem;
import research.models.Specification;
import research.services.SpecificationService;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.Map;
import java.util.Set;

/**
 * Created by akila on 8/23/16.
 */
@Path("/specification")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class SpecificationResource {

    private SpecificationService specificationService = new SpecificationService();


    @Path("/add")
    @POST
    public void createSpecification(Specification specification) {
        specificationService.addSpecification(specification);
    }

    @GET

    public Map<String,ArrayList<String>> getAvailableFormatting() {
            Map<String, ArrayList<String>> availableFormatting = specificationService.getAvailableFormatting();
            return availableFormatting;
    }


    public String hi(@Context HttpServletResponse response){
        response.addHeader("Access-Control-Allow-Origin","*");
        return "my name is nuwantha";
    }


}