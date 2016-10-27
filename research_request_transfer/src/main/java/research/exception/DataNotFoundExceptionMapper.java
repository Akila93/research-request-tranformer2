package research.exception;

import research.models.ErrorMessage;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

/**
 * Created by nuwantha on 10/26/16.
 */
@Provider
public class DataNotFoundExceptionMapper implements ExceptionMapper<DataNotFoundException> {

    @Override
    public Response toResponse(DataNotFoundException e) {
        System.out.println("mapper catch the error");
        ErrorMessage errorMessage = new ErrorMessage(e.getMessage(), 601, "still no documetation");
        return Response.status(Response.Status.NOT_FOUND).entity(errorMessage).build();

    }
}
