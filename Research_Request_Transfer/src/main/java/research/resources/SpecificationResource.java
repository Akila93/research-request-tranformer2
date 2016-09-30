package research.resources;

import research.models.Specification;
import research.services.SpecificationService;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.Map;

/**
 * Created by akila on 8/23/16.
 */
@Path("/specification")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class SpecificationResource {

    private SpecificationService specificationService = new SpecificationService();


    @POST
    public Specification createSpecification(Specification specification) {
        return specificationService.addSpecification(specification);
    }

    @GET
    public Map<String,ArrayList<String>> getAvailableFormatting() {
            Map<String, ArrayList<String>> availableFormatting = specificationService.getAvailableFormatting();
            return availableFormatting;
    }


    @DELETE
    @Path("/{appId}")
    public Specification deleteSpecification(@PathParam("appId") String id) {

        Specification specification = specificationService.deleteSpecification(id);
        return specification;

    }


}