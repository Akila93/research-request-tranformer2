package research.resources;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import research.ResearchRequestTransferApplication;
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

    private SpecificationService specificationService;

    private static final Logger logger= LoggerFactory.getLogger(SpecificationResource.class);


    public void setSpecificationService(SpecificationService specificationService) {
        this.specificationService = specificationService;
    }

    @POST
    public Specification createSpecification(Specification specification) {
        logger.info(specification.getList()+"new specification is come to save in the database");
        return specificationService.addSpecification(specification);
    }

    @GET
    public Map<String,ArrayList<String>> getAvailableFormatting() {
        logger.info("available formatting request is come");
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